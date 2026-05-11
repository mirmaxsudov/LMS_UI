import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OnlineCourseMaterialForm } from '@/modules/online-course/components/OnlineCourseMaterialForm';
import {
  ONLINE_COURSE_MATERIAL_QUERY_KEYS,
  ONLINE_COURSE_QUERY_KEYS
} from '@/modules/online-course/options';
import { postOnlineCourseMaterial, putOnlineCourseMaterial } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface OnlineCourseMaterialFormDialogProps {
  courseId: string;
  editValues: OnlineCourseMaterial | null;
  lessonId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OnlineCourseMaterialFormDialog = ({
  courseId,
  editValues,
  lessonId,
  open,
  onOpenChange
}: OnlineCourseMaterialFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.byId(courseId) });
    await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_MATERIAL_QUERY_KEYS.all() });
    onOpenChange(false);
  };

  const createMutation = useMutation({
    mutationFn: postOnlineCourseMaterial,
    onSuccess
  });

  const updateMutation = useMutation({
    mutationFn: putOnlineCourseMaterial,
    onSuccess
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit material` : t`Add material`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the material title, order, or file.`
              : t`Attach a learner resource to this online lesson.`}
          </DialogDescription>
        </DialogHeader>
        <OnlineCourseMaterialForm
          defaultValues={editValues ?? undefined}
          isSubmitting={isSubmitting}
          submitLabel={isEditMode ? t`Update` : t`Create`}
          onSubmit={(data) => {
            if (editValues) {
              updateMutation.mutate({ materialId: editValues.id, data });
              return;
            }

            createMutation.mutate({ lessonId, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
