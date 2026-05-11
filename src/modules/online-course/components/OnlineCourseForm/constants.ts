import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const onlineCourseFormSchema = () =>
  z.object({
    description: z.string().min(1, t`This field is required.`),
    estimatedDurationInMinutes: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Duration must be a number`)
      .refine((value) => Number(value) > 0, t`Duration must be greater than 0`),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
    shortDescription: z.string().min(1, t`This field is required.`).max(220),
    slug: z.string().min(1, t`This field is required.`),
    status: z.enum(['ARCHIVED', 'DRAFT', 'PUBLIC']),
    title: z.string().min(1, t`This field is required.`),
    unlockStrategy: z.enum(['ALL_AT_ONCE', 'LESSON_BY_LESSON', 'MODULE_BY_MODULE'])
  });

export type OnlineCourseFormSchema = z.infer<ReturnType<typeof onlineCourseFormSchema>>;
