import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const roleFormSchema = () =>
  z.object({
    description: z.string().max(1000, t`Maximum 1000 characters.`),
    name: z.string().min(1, t`This field is required.`).max(100, t`Maximum 100 characters.`)
  });

export type RoleFormSchema = z.infer<ReturnType<typeof roleFormSchema>>;
