import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const loginFormSchema = () =>
  z.object({
    username: z.string().min(1, t`This field is required.`),
    password: z
      .string()
      .min(1, t`This field is required.`)
      .min(4, t`Password must be at least 4 characters long`)
  });

export type LoginFormSchema = z.infer<ReturnType<typeof loginFormSchema>>;
