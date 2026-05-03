import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const lessonFormSchema = () =>
  z.object({
    content: z.string().min(1, t`This field is required.`),
    durationInMinutes: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Duration must be a number`)
      .refine((value) => Number(value) > 0, t`Duration must be greater than 0`),
    section: z.object({
      label: z.string().min(1, t`This field is required.`),
      value: z.string().min(1, t`This field is required.`)
    }),
    title: z.string().min(1, t`This field is required.`)
  });

export type LessonFormSchema = z.infer<ReturnType<typeof lessonFormSchema>>;
