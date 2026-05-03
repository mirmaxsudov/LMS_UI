import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const groupFormSchema = () =>
  z.object({
    active: z.boolean(),
    capacity: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Capacity must be a number`)
      .refine((value) => Number(value) > 0, t`Capacity must be greater than 0`),
    course: z.object({
      label: z.string().min(1, t`This field is required.`),
      value: z.string().min(1, t`This field is required.`)
    }),
    name: z.string().min(1, t`This field is required.`),
    scheduleDays: z.array(z.enum([
      'FRIDAY',
      'MONDAY',
      'SATURDAY',
      'SUNDAY',
      'THURSDAY',
      'TUESDAY',
      'WEDNESDAY'
    ])),
    scheduleType: z.enum(['EVEN_DAYS', 'EXACT_DAYS', 'ODD_DAYS']),
    status: z.enum(['ACTIVE', 'CANCELLED', 'FINISHED', 'FORMING']),
    teacher: z.object({
      label: z.string().min(1, t`This field is required.`),
      value: z.string().min(1, t`This field is required.`)
    })
  });

export type GroupFormSchema = z.infer<ReturnType<typeof groupFormSchema>>;
