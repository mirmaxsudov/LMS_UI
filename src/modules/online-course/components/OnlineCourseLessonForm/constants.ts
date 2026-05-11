import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const onlineCourseLessonFormSchema = () =>
  z.object({
    availableFrom: z.string().min(1, t`This field is required.`),
    content: z.string().min(1, t`This field is required.`),
    description: z.string().min(1, t`This field is required.`),
    durationInMinutes: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Duration must be a number`),
    freePreview: z.boolean(),
    orderIndex: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Order index must be a number`),
    status: z.enum(['DRAFT', 'HIDDEN', 'PUBLISHED']),
    title: z.string().min(1, t`This field is required.`)
  });

export type OnlineCourseLessonFormSchema = z.infer<
  ReturnType<typeof onlineCourseLessonFormSchema>
>;
