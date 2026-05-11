import { useCallback, useState } from 'react';

import { postAttachment } from '@/shared/api';
import { useTusUpload } from '@/shared/hooks/use-tus-upload';

const REST_UPLOAD_LIMIT = 10 * 1024 * 1024;

const getAttachmentType = (file: File): AttachmentType => {
  if (file.type.startsWith('image/')) return 'IMAGE';
  if (file.type.startsWith('video/')) return 'VIDEO';
  if (file.type.startsWith('audio/')) return 'AUDIO';
  if (file.type.startsWith('application/pdf') || file.type.startsWith('text/')) return 'DOCUMENT';

  return 'FILE';
};

export const useOnlineCourseAttachmentUpload = () => {
  const tusUpload = useTusUpload();
  const [isRestUploading, setIsRestUploading] = useState(false);

  const uploadAttachment = useCallback(
    async (file: File): Promise<string> => {
      if (file.size <= REST_UPLOAD_LIMIT) {
        setIsRestUploading(true);
        try {
          const response = await postAttachment({
            file,
            params: {
              type: getAttachmentType(file)
            }
          });

          return response.data.data.id;
        } finally {
          setIsRestUploading(false);
        }
      }

      const result = await tusUpload.upload(file);
      return result.uploadId;
    },
    [tusUpload]
  );

  return {
    error: tusUpload.error,
    isUploading: isRestUploading || tusUpload.isUploading,
    progress: tusUpload.progress,
    uploadAttachment
  };
};
