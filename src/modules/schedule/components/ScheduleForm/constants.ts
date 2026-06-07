import { t } from '@lingui/core/macro';
import { z } from 'zod';

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export const scheduleFormSchema = () =>
  z
    .object({
      dayOfWeek: z.enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY'
      ]),
      endTime: z.string().regex(timePattern, t`Enter a valid end time.`),
      group: z.object({
        label: z.string().min(1, t`This field is required.`),
        value: z.string().min(1, t`This field is required.`)
      }),
      startTime: z.string().regex(timePattern, t`Enter a valid start time.`)
    })
    .refine((value) => value.startTime < value.endTime, {
      message: t`End time must be later than start time.`,
      path: ['endTime']
    });

export type ScheduleFormSchema = z.infer<ReturnType<typeof scheduleFormSchema>>;
