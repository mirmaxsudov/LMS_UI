import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const courseFormSchema = () =>
  z.object({
    title: z.string().min(1, t`This field is required.`),
    description: z.string().min(1, t`This field is required.`),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
    durationInMinutes: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Duration must be a number`)
  });

export type CourseFormSchema = z.infer<ReturnType<typeof courseFormSchema>>;
