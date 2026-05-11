import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const onlineCourseModuleFormSchema = () =>
  z.object({
    availableFrom: z.string().min(1, t`This field is required.`),
    description: z.string().min(1, t`This field is required.`),
    orderIndex: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Order index must be a number`),
    status: z.enum(['DRAFT', 'HIDDEN', 'PUBLISHED']),
    title: z.string().min(1, t`This field is required.`)
  });

export type OnlineCourseModuleFormSchema = z.infer<
  ReturnType<typeof onlineCourseModuleFormSchema>
>;
