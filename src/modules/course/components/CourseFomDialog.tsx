import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COURSE_QUERY_KEYS } from '@/modules/course';
import { CourseForm } from '@/modules/course/components/CourseForm';
import { postCourse, putCourse } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface CourseFomDialogProps {
  editValues: Course | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CourseFomDialog = ({ open, onOpenChange, editValues }: CourseFomDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });
  const updateMutation = useMutation({
    mutationFn: putCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit course` : t`Create course`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected course details.`
              : t`Fill out the form to create a new course.`}
          </DialogDescription>
        </DialogHeader>
        <CourseForm
          defaultValues={editValues ?? undefined}
          isSubmitting={isSubmitting}
          submitLabel={isEditMode ? t`Update` : t`Create`}
          onSubmit={(data) => {
            if (editValues) {
              updateMutation.mutate({ id: editValues.id, data });
              return;
            }
            createMutation.mutate({ data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
