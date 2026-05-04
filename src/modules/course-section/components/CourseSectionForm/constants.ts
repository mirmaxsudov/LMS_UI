import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const courseSectionFormSchema = () =>
  z.object({
    course: z.object({
      label: z.string().min(1, t`This field is required.`),
      value: z.string().min(1, t`This field is required.`)
    }),
    orderIndex: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Order index must be a number`)
      .refine((value) => Number(value) >= 0, t`Order index must be 0 or greater`),
    title: z.string().min(1, t`This field is required.`)
  });

export type CourseSectionFormSchema = z.infer<ReturnType<typeof courseSectionFormSchema>>;
