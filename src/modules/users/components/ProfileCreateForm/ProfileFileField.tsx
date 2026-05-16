import { useLingui } from '@lingui/react/macro';
import { ImageIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface ProfileFileFieldProps {
  disabled?: boolean;
  file: File | null;
  label: string;
  onFileChange: (file: File | null) => void;
}

export const ProfileFileField = ({
  disabled,
  file,
  label,
  onFileChange
}: ProfileFileFieldProps) => {
  const { t } = useLingui();
  const [inputKey, setInputKey] = useState(0);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className='grid gap-2'>
      <p className='text-sm font-medium'>{label}</p>
      <label
        className={cn(
          'border-border bg-muted/30 hover:bg-muted/50 flex min-h-28 cursor-pointer items-center gap-3 rounded-lg border border-dashed p-3 transition-colors',
          disabled && 'pointer-events-none opacity-60'
        )}
      >
        <div className='bg-background grid size-16 shrink-0 place-items-center overflow-hidden rounded-md border'>
          {previewUrl ? (
            <img alt='' className='size-full object-cover' src={previewUrl} />
          ) : (
            <ImageIcon className='text-muted-foreground size-6' />
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium'>{file?.name ?? t`Choose image`}</p>
          <p className='text-muted-foreground mt-1 text-xs'>{t`PNG, JPG or WEBP image`}</p>
        </div>
        <input
          key={inputKey}
          accept='image/png,image/jpeg,image/webp'
          className='sr-only'
          disabled={disabled}
          type='file'
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        />
      </label>
      {file && (
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
