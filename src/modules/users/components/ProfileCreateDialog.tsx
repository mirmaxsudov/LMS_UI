import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { PARENTS_QUERY_KEYS } from '@/modules/users/parent/options';
import { STUDENTS_QUERY_KEYS } from '@/modules/users/student/options';
import { TEACHER_QUERY_KEYS } from '@/modules/users/teacher/options';
import { postParent, postStudent, postTeacher } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

import type { ProfileCreateFormRole } from './ProfileCreateForm';

import { ProfileCreateForm } from './ProfileCreateForm';

interface ProfileCreateDialogProps {
  open: boolean;
  role: ProfileCreateFormRole;
  onOpenChange: (open: boolean) => void;
}

const useDialogCopy = (role: ProfileCreateFormRole) => {
  const { t } = useLingui();

  if (role === 'teacher') {
    return {
      title: t`Create teacher`,
      description: t`Fill out the teacher profile details.`
    };
  }

  if (role === 'student') {
    return {
      title: t`Create student`,
      description: t`Fill out the student profile details.`
    };
  }

  return {
    title: t`Create parent`,
    description: t`Fill out the parent profile details.`
  };
};

export const ProfileCreateDialog = ({ open, role, onOpenChange }: ProfileCreateDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const copy = useDialogCopy(role);

  const teacherMutation = useMutation({
    mutationFn: postTeacher,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: TEACHER_QUERY_KEYS.all() });
      toast.success(response.data.message || t`Teacher profile created successfully.`);
      onOpenChange(false);
    }
  });

  const studentMutation = useMutation({
    mutationFn: postStudent,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEYS.all() });
      toast.success(response.data.message || t`Student profile created successfully.`);
      onOpenChange(false);
    }
  });

  const parentMutation = useMutation({
    mutationFn: postParent,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: PARENTS_QUERY_KEYS.all() });
      toast.success(response.data.message || t`Parent profile created successfully.`);
      onOpenChange(false);
    }
  });

  const isSubmitting =
    teacherMutation.isPending || studentMutation.isPending || parentMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>
        <ProfileCreateForm
          isSubmitting={isSubmitting}
          submitLabel={t`Create`}
          onSubmit={(data) => {
            if (role === 'teacher') {
              teacherMutation.mutate({ data: data as PostTeacherDto });
              return;
            }

            if (role === 'student') {
              studentMutation.mutate({ data: data as PostStudentDto });
              return;
            }

            parentMutation.mutate({ data: data as PostParentDto });
          }}
          role={role}
        />
      </DialogContent>
    </Dialog>
  );
};
