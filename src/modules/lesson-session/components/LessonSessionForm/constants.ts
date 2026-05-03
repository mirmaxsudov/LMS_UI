import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const lessonSessionFormSchema = () =>
  z
    .object({
      endTime: z.string().min(1, t`This field is required.`),
      group: z.object({
        label: z.string().min(1, t`This field is required.`),
        value: z.string().min(1, t`This field is required.`)
      }),
      lesson: z.object({
        label: z.string().min(1, t`This field is required.`),
        value: z.string().min(1, t`This field is required.`)
      }),
      startTime: z.string().min(1, t`This field is required.`),
      status: z.enum(['CANCELLED', 'COMPLETED', 'PLANNED'])
    })
    .refine((value) => new Date(value.startTime) < new Date(value.endTime), {
      message: t`End time must be after start time.`,
      path: ['endTime']
    });

export type LessonSessionFormSchema = z.infer<ReturnType<typeof lessonSessionFormSchema>>;
