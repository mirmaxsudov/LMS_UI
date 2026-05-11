import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';

import type { OnlineCourseLessonFormSchema } from '@/modules/online-course/components/OnlineCourseLessonForm/constants';

import { onlineCourseLessonFormSchema } from '@/modules/online-course/components/OnlineCourseLessonForm/constants';
import { onlineCourseContentStatusOptions } from '@/modules/online-course/constants';
import { useOnlineCourseAttachmentUpload } from '@/modules/online-course/hooks/useOnlineCourseAttachmentUpload';
import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

import { UploadField } from '../UploadField';

type OnlineCourseLesson = OnlineCourseModule['lessons'][number];

interface OnlineCourseLessonFormProps {
  defaultValues?: OnlineCourseLesson;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostOnlineCourseLessonDto | PutOnlineCourseLessonDto) => void;
}

const toDateInputValue = (value?: string) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  return value.slice(0, 10);
};

export const OnlineCourseLessonForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: OnlineCourseLessonFormProps) => {
  const { t } = useLingui();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const attachmentUpload = useOnlineCourseAttachmentUpload();

  const form = useAppForm({
    validators: { onChange: onlineCourseLessonFormSchema() },
    defaultValues: {
      availableFrom: toDateInputValue(defaultValues?.availableFrom),
      content: defaultValues?.content ?? '',
      description: defaultValues?.description ?? '',
      durationInMinutes: defaultValues?.durationInMinutes?.toString() ?? '',
      freePreview: defaultValues?.freePreview ?? false,
      orderIndex: defaultValues?.orderIndex?.toString() ?? '',
      status: defaultValues?.status ?? 'DRAFT',
      title: defaultValues?.title ?? ''
    } satisfies OnlineCourseLessonFormSchema as OnlineCourseLessonFormSchema,
    onSubmit: async ({ value }) => {
      setUploadError('');

      try {
        const videoAttachmentId = videoFile
          ? await attachmentUpload.uploadAttachment(videoFile)
          : defaultValues?.videoAttachmentId;

        if (!videoAttachmentId) {
          setUploadError(t`Video is required.`);
          return;
        }

        onSubmit({
          availableFrom: new Date(value.availableFrom).toISOString(),
          content: value.content,
          description: value.description,
          durationInMinutes: Number(value.durationInMinutes),
          freePreview: value.freePreview,
          orderIndex: Number(value.orderIndex),
          status: value.status,
          title: value.title,
          videoAttachmentId
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
          accept='video/*'
          currentUrl={defaultValues?.videoUrl}
          disabled={disabled}
          file={videoFile}
          label={t`Lesson video`}
          onFileChange={setVideoFile}
        />
        {uploadError && <p className='text-destructive text-sm'>{uploadError}</p>}
        <form.AppField name='title'>
          {(field) => <field.Input isRequired label={t`Title`} placeholder={t`Lesson title`} />}
        </form.AppField>
        <form.AppField name='description'>
          {(field) => (
            <field.Textarea
              isRequired
              label={t`Description`}
              placeholder={t`Lesson description`}
              rows={3}
            />
          )}
        </form.AppField>
        <form.AppField name='content'>
          {(field) => (
            <field.Textarea isRequired label={t`Content`} placeholder={t`Lesson notes`} rows={4} />
          )}
        </form.AppField>
        <div className='grid gap-3 md:grid-cols-2'>
          <form.AppField name='orderIndex'>
            {(field) => (
              <field.Input isRequired label={t`Order index`} type='number' placeholder='0' />
            )}
          </form.AppField>
          <form.AppField name='durationInMinutes'>
            {(field) => (
              <field.Input isRequired label={t`Duration (minutes)`} type='number' placeholder='30' />
            )}
          </form.AppField>
          <form.AppField name='availableFrom'>
            {(field) => <field.Input isRequired label={t`Available from`} type='date' />}
          </form.AppField>
          <form.AppField name='status'>
            {(field) => (
              <field.Select isRequired label={t`Status`} placeholder={t`Select status`}>
                {onlineCourseContentStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
        </div>
        <form.AppField name='freePreview'>
          {(field) => <field.Checkbox label={t`Free preview`} />}
        </form.AppField>
        <Button type='submit' loading={disabled}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
