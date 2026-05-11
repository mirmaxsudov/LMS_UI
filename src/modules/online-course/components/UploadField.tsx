import { useLingui } from '@lingui/react/macro';
import { UploadCloudIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface UploadFieldProps {
  accept?: string;
  currentUrl?: string | null;
  disabled?: boolean;
  file: File | null;
  label: string;
  onFileChange: (file: File | null) => void;
}

export const UploadField = ({
  accept,
  currentUrl,
  disabled,
  file,
  label,
  onFileChange
}: UploadFieldProps) => {
  const { t } = useLingui();
  const [inputKey, setInputKey] = useState(0);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : currentUrl), [file, currentUrl]);

  useEffect(() => {
    return () => {
      if (file && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);

  return (
    <div className='grid gap-2'>
      <p className='text-sm font-medium'>{label}</p>
      <label
        className={cn(
          'border-border bg-muted/30 hover:bg-muted/60 flex min-h-36 cursor-pointer items-center gap-4 rounded-lg border border-dashed p-4 transition-colors',
          disabled && 'pointer-events-none opacity-60'
        )}
      >
        <div className='bg-background grid size-24 shrink-0 place-items-center overflow-hidden rounded-md border'>
          {previewUrl && accept?.includes('image') ? (
            <img alt='' className='size-full object-cover' src={previewUrl} />
          ) : (
            <UploadCloudIcon className='text-muted-foreground size-8' />
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <p className='font-medium'>{file?.name ?? t`Choose a file`}</p>
          <p className='text-muted-foreground mt-1 text-sm'>
            {t`Small files use attachment upload. Large files use resumable TUS upload.`}
          </p>
        </div>
        <input
          key={inputKey}
          accept={accept}
          className='sr-only'
          disabled={disabled}
          type='file'
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        />
      </label>
      {(file || currentUrl) && (
        <Button
          className='w-fit'
          disabled={disabled}
          size='sm'
          type='button'
          variant='outline'
          onClick={() => {
            setInputKey((value) => value + 1);
            onFileChange(null);
          }}
        >
          <XIcon />
          {t`Clear file`}
        </Button>
      )}
    </div>
  );
};
