import { z } from 'zod';

export const roomStatusFormSchema = () =>
  z.object({
    status: z.enum(['ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE'])
  });

export type RoomStatusFormSchema = z.infer<ReturnType<typeof roomStatusFormSchema>>;
