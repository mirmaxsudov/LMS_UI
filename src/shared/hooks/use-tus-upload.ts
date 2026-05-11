import * as React from 'react';

const TUS_VERSION = '1.0.0';
const DEFAULT_CHUNK_SIZE = 10 * 1024 * 1024; // 10 MiB
const TUS_ENDPOINT = '/files';

export interface TusUploadResult {
  downloadUrl: string;
  uploadId: string;
  uploadUrl: string;
}

export interface TusServerCapabilities {
  extensions: string[];
  maxSize: number;
  version: string;
}

export interface UseTusUploadOptions {
  chunkSize?: number;
  onError?: (error: Error) => void;
  onProgress?: (percent: number) => void;
  onSuccess?: (result: TusUploadResult) => void;
}

export interface UseTusUploadReturn {
  error: Error | null;
  isUploading: boolean;
  progress: number;
  deleteUpload: (uploadId: string) => Promise<void>;
  getServerCapabilities: () => Promise<TusServerCapabilities>;
  reset: () => void;
  resume: (file: File, uploadUrl: string) => Promise<TusUploadResult>;
  upload: (file: File) => Promise<TusUploadResult>;
}

function encodeTusMetadata(metadata: Record<string, string>): string {
  return Object.entries(metadata)
    .map(([key, value]) => `${key} ${btoa(unescape(encodeURIComponent(value)))}`)
    .join(',');
}

async function createTusUpload(file: File): Promise<string> {
  const response = await fetch(TUS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Tus-Resumable': TUS_VERSION,
      'Upload-Length': String(file.size),
      'Upload-Metadata': encodeTusMetadata({
        filename: file.name,
        contentType: file.type || 'application/octet-stream'
      })
    }
  });

  if (!response.ok) {
    throw new Error(`Create upload failed: ${response.status}`);
  }

  const location = response.headers.get('Location');
  if (!location) {
    throw new Error('Upload Location header is missing');
  }

  return location;
}

async function getTusOffset(uploadUrl: string): Promise<number> {
  const response = await fetch(uploadUrl, {
    method: 'HEAD',
    headers: {
      'Tus-Resumable': TUS_VERSION
    }
  });

  if (!response.ok) {
    throw new Error(`Get upload offset failed: ${response.status}`);
  }

  return Number(response.headers.get('Upload-Offset') || 0);
}

async function uploadChunks(
  file: File,
  uploadUrl: string,
  initialOffset: number,
  chunkSize: number,
  onProgress?: (percent: number) => void,
  signal?: AbortSignal
): Promise<TusUploadResult> {
  let offset = initialOffset;

  while (offset < file.size) {
    if (signal?.aborted) {
      throw new Error('Upload aborted');
    }

    const chunk = file.slice(offset, Math.min(offset + chunkSize, file.size));

    const response = await fetch(uploadUrl, {
      method: 'PATCH',
      headers: {
        'Tus-Resumable': TUS_VERSION,
        'Upload-Offset': String(offset),
        'Content-Type': 'application/offset+octet-stream'
      },
      body: chunk,
      signal
    });

    if (!response.ok) {
      throw new Error(`Upload chunk failed: ${response.status}`);
    }

    offset = Number(response.headers.get('Upload-Offset') || offset + chunk.size);
    onProgress?.((offset / file.size) * 100);
  }

  const uploadId = uploadUrl.substring(uploadUrl.lastIndexOf('/') + 1);

  return {
    uploadUrl,
    uploadId,
    downloadUrl: `${TUS_ENDPOINT}/${uploadId}`
  };
}

export function useTusUpload(options: UseTusUploadOptions = {}): UseTusUploadReturn {
  const { chunkSize = DEFAULT_CHUNK_SIZE, onProgress, onSuccess, onError } = options;

  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const reset = React.useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setProgress(0);
    setIsUploading(false);
    setError(null);
  }, []);

  const handleProgress = React.useCallback(
    (percent: number) => {
      setProgress(percent);
      onProgress?.(percent);
    },
    [onProgress]
  );

  const upload = React.useCallback(
    async (file: File): Promise<TusUploadResult> => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsUploading(true);
      setError(null);
      setProgress(0);

      try {
        const uploadUrl = await createTusUpload(file);
        const offset = await getTusOffset(uploadUrl);
        const result = await uploadChunks(
          file,
          uploadUrl,
          offset,
          chunkSize,
          handleProgress,
          abortControllerRef.current.signal
        );

        onSuccess?.(result);
        return result;
      } catch (err) {
        const uploadError = err instanceof Error ? err : new Error(String(err));
        setError(uploadError);
        onError?.(uploadError);
        throw uploadError;
      } finally {
        setIsUploading(false);
      }
    },
    [chunkSize, handleProgress, onSuccess, onError]
  );

  const resume = React.useCallback(
    async (file: File, uploadUrl: string): Promise<TusUploadResult> => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsUploading(true);
      setError(null);

      try {
        const offset = await getTusOffset(uploadUrl);
        setProgress((offset / file.size) * 100);

        const result = await uploadChunks(
          file,
          uploadUrl,
          offset,
          chunkSize,
          handleProgress,
          abortControllerRef.current.signal
        );

        onSuccess?.(result);
        return result;
      } catch (err) {
        const uploadError = err instanceof Error ? err : new Error(String(err));
        setError(uploadError);
        onError?.(uploadError);
        throw uploadError;
      } finally {
        setIsUploading(false);
      }
    },
    [chunkSize, handleProgress, onSuccess, onError]
  );

  const deleteUpload = React.useCallback(async (uploadId: string): Promise<void> => {
    const response = await fetch(`${TUS_ENDPOINT}/${uploadId}`, {
      method: 'DELETE',
      headers: {
        'Tus-Resumable': TUS_VERSION
      }
    });

    if (!response.ok) {
      throw new Error(`Delete upload failed: ${response.status}`);
    }
  }, []);

  const getServerCapabilities = React.useCallback(async (): Promise<TusServerCapabilities> => {
    const response = await fetch(TUS_ENDPOINT, {
      method: 'OPTIONS',
      headers: {
        'Tus-Resumable': TUS_VERSION
      }
    });

    if (!response.ok) {
      throw new Error(`OPTIONS request failed: ${response.status}`);
    }

    return {
      maxSize: Number(response.headers.get('Tus-Max-Size') || 0),
      extensions: (response.headers.get('Tus-Extension') || '').split(',').filter(Boolean),
      version: response.headers.get('Tus-Version') || TUS_VERSION
    };
  }, []);

  React.useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    upload,
    resume,
    deleteUpload,
    getServerCapabilities,
    progress,
    isUploading,
    error,
    reset
  };
}
