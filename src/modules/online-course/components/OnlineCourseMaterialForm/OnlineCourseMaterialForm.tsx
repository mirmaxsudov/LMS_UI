import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';

import type { OnlineCourseMaterialFormSchema } from '@/modules/online-course/components/OnlineCourseMaterialForm/constants';

import { onlineCourseMaterialFormSchema } from '@/modules/online-course/components/OnlineCourseMaterialForm/constants';
import { useOnlineCourseAttachmentUpload } from '@/modules/online-course/hooks/useOnlineCourseAttachmentUpload';
import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';

import { UploadField } from '../UploadField';

interface OnlineCourseMaterialFormProps {
  defaultValues?: OnlineCourseMaterial;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostOnlineCourseMaterialDto | PutOnlineCourseMaterialDto) => void;
}

export const OnlineCourseMaterialForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: OnlineCourseMaterialFormProps) => {
  const { t } = useLingui();
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const attachmentUpload = useOnlineCourseAttachmentUpload();

  const form = useAppForm({
    validators: { onChange: onlineCourseMaterialFormSchema() },
    defaultValues: {
      orderIndex: defaultValues?.orderIndex?.toString() ?? '',
      title: defaultValues?.title ?? ''
    } satisfies OnlineCourseMaterialFormSchema as OnlineCourseMaterialFormSchema,
    onSubmit: async ({ value }) => {
      setUploadError('');

      try {
        const attachmentId = file
          ? await attachmentUpload.uploadAttachment(file)
          : defaultValues?.attachmentId;

        if (!attachmentId) {
          setUploadError(t`File is required.`);
          return;
        }

        onSubmit({
          attachmentId,
          orderIndex: Number(value.orderIndex),
          title: value.title
        });
      } catch {
        setUploadError(t`Upload failed.`);
      }
    }
  });

  const disabled = isSubmitting || attachmentUpload.isUploading;

  return (
    <form.AppForm>
      <form
        className='grid gap-3'
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <UploadField
          currentUrl={defaultValues?.attachmentUrl}
          disabled={disabled}
          file={file}
          label={t`Material file`}
          onFileChange={setFile}
        />
        {uploadError && <p className='text-destructive text-sm'>{uploadError}</p>}
        <form.AppField name='title'>
          {(field) => <field.Input isRequired label={t`Title`} placeholder={t`Material title`} />}
        </form.AppField>
        <form.AppField name='orderIndex'>
          {(field) => (
            <field.Input isRequired label={t`Order index`} type='number' placeholder='0' />
          )}
        </form.AppField>
        <Button type='submit' loading={disabled}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
