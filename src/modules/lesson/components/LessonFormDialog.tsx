import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LessonForm } from '@/modules/lesson/components/LessonForm';
import { LESSON_QUERY_KEYS } from '@/modules/lesson/options';
import { postLesson, putLesson } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface LessonFormDialogProps {
  editValues: Lesson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LessonFormDialog = ({ editValues, open, onOpenChange }: LessonFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postLesson,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: LESSON_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });
  const updateMutation = useMutation({
    mutationFn: putLesson,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: LESSON_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit lesson` : t`Create lesson`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected lesson details.`
              : t`Fill out the form to create a lesson.`}
          </DialogDescription>
        </DialogHeader>
        <LessonForm
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
