import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const generateLessonSessionsFormSchema = () =>
  z
    .object({
      range: z
        .object({
          from: z.string(),
          to: z.string()
        })
        .optional()
    })
    .refine((value) => Boolean(value.range?.from), {
      message: t`This field is required.`,
      path: ['range', 'from']
    })
    .refine((value) => Boolean(value.range?.to), {
      message: t`This field is required.`,
      path: ['range', 'to']
    })
    .refine(
      (value) =>
        !value.range?.from ||
        !value.range?.to ||
        new Date(value.range.from) <= new Date(value.range.to),
      {
        message: t`To date must be after from date.`,
        path: ['range', 'to']
      }
    );

export type GenerateLessonSessionsFormSchema = z.infer<
  ReturnType<typeof generateLessonSessionsFormSchema>
>;
