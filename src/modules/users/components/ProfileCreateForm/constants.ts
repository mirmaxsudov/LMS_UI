import type { MessageDescriptor } from '@lingui/core';

import { msg, t } from '@lingui/core/macro';
import { z } from 'zod';

const phoneRegex = /^[+0-9()\-\s]{7,30}$/;

const optionalUuidSchema = z
  .string()
  .trim()
  .refine((value) => !value || z.string().uuid().safeParse(value).success, t`Invalid UUID.`);

const sharedProfileSchema = {
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
  password: z
    .string()
    .min(8, t`Password must be at least 8 characters.`)
    .max(255),
  phoneNumber: z
    .string()
    .min(1, t`This field is required.`)
    .max(30)
    .regex(phoneRegex, t`Enter a valid phone number.`),
  profileBackgroundAttachment: z.instanceof(File).nullable(),
  profileImage: z.instanceof(File).nullable(),
  status: z.enum(['ACTIVE', 'BLOCKED', 'INACTIVE'])
};

export const teacherProfileFormSchema = () =>
  z.object({
    ...sharedProfileSchema,
    position: z.enum(['ASSISTANT', 'LECTURER', 'PROFESSOR'])
  });

export const studentProfileFormSchema = () =>
  z.object({
    ...sharedProfileSchema,
    studentId: optionalUuidSchema,
    studentStatus: z.enum(['ACTIVE', 'GRADUATED', 'SUSPENDED'])
  });

export const parentProfileFormSchema = () =>
  z.object({
    ...sharedProfileSchema,
    studentIdsText: z.string()
  });

export type TeacherProfileFormSchema = z.infer<ReturnType<typeof teacherProfileFormSchema>>;
export type StudentProfileFormSchema = z.infer<ReturnType<typeof studentProfileFormSchema>>;
export type ParentProfileFormSchema = z.infer<ReturnType<typeof parentProfileFormSchema>>;
export type ProfileCreateFormRole = 'parent' | 'student' | 'teacher';
export type ProfileCreateFormValues =
  | ParentProfileFormSchema
  | StudentProfileFormSchema
  | TeacherProfileFormSchema;

export const genderOptions = [
  { label: msg`Male`, value: 'MALE' },
  { label: msg`Female`, value: 'FEMALE' }
] satisfies Array<{ label: MessageDescriptor; value: Gender }>;

export const userStatusOptions = [
  { label: msg`Active`, value: 'ACTIVE' },
  { label: msg`Inactive`, value: 'INACTIVE' },
  { label: msg`Blocked`, value: 'BLOCKED' }
] satisfies Array<{ label: MessageDescriptor; value: UserStatus }>;

export const teacherPositionOptions = [
  { label: msg`Assistant`, value: 'ASSISTANT' },
  { label: msg`Lecturer`, value: 'LECTURER' },
  { label: msg`Professor`, value: 'PROFESSOR' }
] satisfies Array<{ label: MessageDescriptor; value: TeacherPositon }>;

export const studentStatusOptions = [
  { label: msg`Active`, value: 'ACTIVE' },
  { label: msg`Graduated`, value: 'GRADUATED' },
  { label: msg`Suspended`, value: 'SUSPENDED' }
] satisfies Array<{ label: MessageDescriptor; value: StudentStatus }>;
