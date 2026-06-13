import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LessonSessionForm } from '@/modules/lesson-session/components/LessonSessionForm';
import { LESSON_SESSION_QUERY_KEYS } from '@/modules/lesson-session/options';
import { postLessonSession, putLessonSession } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface LessonSessionFormDialogProps {
  editValues: LessonSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LessonSessionFormDialog = ({
  editValues,
  open,
  onOpenChange
}: LessonSessionFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postLessonSession,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: LESSON_SESSION_QUERY_KEYS.base() });
      onOpenChange(false);
    }
  });
  const updateMutation = useMutation({
    mutationFn: putLessonSession,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: LESSON_SESSION_QUERY_KEYS.base() });
      onOpenChange(false);
    }
  });
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t`Edit lesson session` : t`Create lesson session`}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected lesson session details.`
              : t`Fill out the form to create a lesson session.`}
          </DialogDescription>
        </DialogHeader>
        <LessonSessionForm
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
