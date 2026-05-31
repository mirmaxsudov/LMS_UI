import { t } from '@lingui/core/macro';
import { z } from 'zod';

export const permissionFormSchema = () =>
  z.object({
    action: z.string(),
    category: z.enum(['SYSTEM', 'USER', 'COURSE', 'GROUP', 'LESSON', 'ATTENDANCE', 'ENROLLMENT']),
    code: z.string().min(1, t`This field is required.`).max(150, t`Maximum 150 characters.`),
    description: z.string().max(1000, t`Maximum 1000 characters.`),
    isSystem: z.boolean(),
    module: z.string().max(100, t`Maximum 100 characters.`)
  });

export type PermissionFormSchema = z.infer<ReturnType<typeof permissionFormSchema>>;
