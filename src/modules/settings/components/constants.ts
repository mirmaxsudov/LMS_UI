import type { MessageDescriptor } from '@lingui/core';

import { msg, t } from '@lingui/core/macro';
import { z } from 'zod';

const phoneRegex = /^[+0-9()\-\s]{7,30}$/;

export const profileSettingsFormSchema = () =>
  z.object({
    birthDate: z.string(),
    email: z
      .string()
      .min(1, t`This field is required.`)
      .email(t`Enter a valid email.`)
      .max(255),
    firstName: z
      .string()
      .min(1, t`This field is required.`)
      .max(100),
    gender: z.enum(['FEMALE', 'MALE']),
    lastName: z
      .string()
      .min(1, t`This field is required.`)
      .max(100),
    middleName: z.string().max(100),
    phoneNumber: z
      .string()
      .min(1, t`This field is required.`)
      .max(30)
      .regex(phoneRegex, t`Enter a valid phone number.`),
    profileBackgroundImage: z.instanceof(File).nullable(),
    profileImage: z.instanceof(File).nullable()
  });

export type ProfileSettingsFormSchema = z.infer<ReturnType<typeof profileSettingsFormSchema>>;

export const genderOptions = [
  { label: msg`Male`, value: 'MALE' },
  { label: msg`Female`, value: 'FEMALE' }
] satisfies Array<{ label: MessageDescriptor; value: Gender }>;
