import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const onlineCourseMaterialFormSchema = () =>
  z.object({
    orderIndex: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Order index must be a number`),
    title: z.string().min(1, t`This field is required.`)
  });

export type OnlineCourseMaterialFormSchema = z.infer<
  ReturnType<typeof onlineCourseMaterialFormSchema>
>;
