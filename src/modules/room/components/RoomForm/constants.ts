import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const roomFormSchema = () =>
  z.object({
    building: z.string().min(1, t`This field is required.`),
    capacity: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Capacity must be a number`)
      .refine((value) => Number(value) > 0, t`Capacity must be greater than 0`),
    description: z.string(),
    floor: z
      .string()
      .min(1, t`This field is required.`)
      .regex(/^\d+$/, t`Floor must be a number`),
    hasComputers: z.boolean(),
    hasProjector: z.boolean(),
    name: z.string().min(1, t`This field is required.`),
    roomType: z.enum(['CLASS_ROOM', 'COMPUTER_LAB', 'LECTURE_HALL']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE'])
  });

export type RoomFormSchema = z.infer<ReturnType<typeof roomFormSchema>>;
