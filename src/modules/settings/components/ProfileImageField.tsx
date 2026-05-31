import { useLingui } from '@lingui/react/macro';
import { ImageIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface ProfileImageFieldProps {
  currentImageUrl?: string | null;
  disabled?: boolean;
  file: File | null;
  label: string;
  onFileChange: (file: File | null) => void;
}

export const ProfileImageField = ({
  currentImageUrl,
  disabled,
  file,
  label,
  onFileChange
}: ProfileImageFieldProps) => {
  const { t } = useLingui();
  const [inputKey, setInputKey] = useState(0);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  const imageUrl = previewUrl ?? currentImageUrl;

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
          'border-border bg-muted/30 hover:bg-muted/50 flex min-h-32 cursor-pointer items-center gap-4 rounded-lg border border-dashed p-4 transition-colors',
          disabled && 'pointer-events-none opacity-60'
        )}
      >
        <div className='bg-background grid size-20 shrink-0 place-items-center overflow-hidden rounded-lg border'>
          {imageUrl ? (
            <img alt='' className='size-full object-cover' src={imageUrl} />
          ) : (
            <ImageIcon className='text-muted-foreground size-7' />
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium'>
            {file?.name ?? (currentImageUrl ? t`Replace image` : t`Choose image`)}
          </p>
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
