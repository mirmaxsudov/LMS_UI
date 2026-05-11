import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';

import type { OnlineCourseFormSchema } from '@/modules/online-course/components/OnlineCourseForm/constants';

import { courseLevelOptions } from '@/modules/course';
import { onlineCourseFormSchema } from '@/modules/online-course/components/OnlineCourseForm/constants';
import {
  onlineCourseStatusOptions,
  onlineCourseUnlockStrategyOptions
} from '@/modules/online-course/constants';
import { useOnlineCourseAttachmentUpload } from '@/modules/online-course/hooks/useOnlineCourseAttachmentUpload';
import { Button } from '@/shared/ui/button';
import { useAppForm } from '@/shared/ui/form/hooks';
import { SelectItem } from '@/shared/ui/select';

import { UploadField } from '../UploadField';

interface OnlineCourseFormProps {
  defaultValues?: OnlineCourse | OnlineCoursePreview;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (value: PostOnlineCourseDto | PutOnlineCourseDto) => void;
}

const toSlug = (title: string) =>
  title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const OnlineCourseForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel
}: OnlineCourseFormProps) => {
  const { t } = useLingui();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const attachmentUpload = useOnlineCourseAttachmentUpload();

  const form = useAppForm({
    validators: { onChange: onlineCourseFormSchema() },
    defaultValues: {
      description:
        defaultValues && 'description' in defaultValues ? defaultValues.description : '',
      estimatedDurationInMinutes: defaultValues?.estimatedDurationInMinutes?.toString() ?? '',
      level: defaultValues?.level ?? 'BEGINNER',
      shortDescription: defaultValues?.shortDescription ?? '',
      slug: defaultValues?.slug ?? '',
      status: defaultValues?.status ?? 'DRAFT',
      title: defaultValues?.title ?? '',
      unlockStrategy: defaultValues?.unlockStrategy ?? 'MODULE_BY_MODULE'
    } satisfies OnlineCourseFormSchema as OnlineCourseFormSchema,
    onSubmit: async ({ value }) => {
      setUploadError('');

      try {
        const thumbnailId = thumbnailFile
          ? await attachmentUpload.uploadAttachment(thumbnailFile)
          : defaultValues?.thumbnailId;

        if (!thumbnailId) {
          setUploadError(t`Thumbnail is required.`);
          return;
        }

        onSubmit({
          description: value.description,
          estimatedDurationInMinutes: Number(value.estimatedDurationInMinutes),
          level: value.level,
          shortDescription: value.shortDescription,
          slug: value.slug,
          status: value.status,
          thumbnailId,
          title: value.title,
          unlockStrategy: value.unlockStrategy
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
        className='grid gap-4'
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <UploadField
          accept='image/*'
          currentUrl={defaultValues?.thumbnailUrl}
          disabled={disabled}
          file={thumbnailFile}
          label={t`Thumbnail`}
          onFileChange={setThumbnailFile}
        />
        {uploadError && <p className='text-destructive text-sm'>{uploadError}</p>}
        <div className='grid gap-3 md:grid-cols-2'>
          <form.AppField name='title'>
            {(field) => (
              <field.Input
                isRequired
                label={t`Title`}
                onBlur={() => {
                  field.handleBlur();
                  if (!form.getFieldValue('slug')) {
                    form.setFieldValue('slug', toSlug(field.state.value));
                  }
                }}
                placeholder={t`Online course title`}
              />
            )}
          </form.AppField>
          <form.AppField name='slug'>
            {(field) => <field.Input isRequired label={t`Slug`} placeholder='react-basics' />}
          </form.AppField>
        </div>
        <form.AppField name='shortDescription'>
          {(field) => (
            <field.Input
              isRequired
              label={t`Short description`}
              placeholder={t`A concise promise for learners`}
            />
          )}
        </form.AppField>
        <form.AppField name='description'>
          {(field) => (
            <field.Textarea
              isRequired
              label={t`Description`}
              placeholder={t`Describe what learners will build and understand.`}
              rows={5}
            />
          )}
        </form.AppField>
        <div className='grid gap-3 md:grid-cols-2'>
          <form.AppField name='level'>
            {(field) => (
              <field.Select isRequired label={t`Level`} placeholder={t`Select level`}>
                {courseLevelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name='estimatedDurationInMinutes'>
            {(field) => (
              <field.Input
                isRequired
                label={t`Duration (minutes)`}
                type='number'
                placeholder='120'
              />
            )}
          </form.AppField>
          <form.AppField name='status'>
            {(field) => (
              <field.Select isRequired label={t`Status`} placeholder={t`Select status`}>
                {onlineCourseStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name='unlockStrategy'>
            {(field) => (
              <field.Select
                isRequired
                label={t`Unlock strategy`}
                placeholder={t`Select unlock strategy`}
              >
                {onlineCourseUnlockStrategyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          </form.AppField>
        </div>
        <Button type='submit' loading={disabled}>
          {submitLabel ?? t`Save`}
        </Button>
      </form>
    </form.AppForm>
  );
};
