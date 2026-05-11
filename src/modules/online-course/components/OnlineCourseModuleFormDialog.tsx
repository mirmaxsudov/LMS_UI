import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OnlineCourseModuleForm } from '@/modules/online-course/components/OnlineCourseModuleForm';
import {
  ONLINE_COURSE_MODULE_QUERY_KEYS,
  ONLINE_COURSE_QUERY_KEYS
} from '@/modules/online-course/options';
import { postOnlineCourseModule, putOnlineCourseModule } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface OnlineCourseModuleFormDialogProps {
  courseId: string;
  editValues: OnlineCourseModule | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OnlineCourseModuleFormDialog = ({
  courseId,
  editValues,
  open,
  onOpenChange
}: OnlineCourseModuleFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.byId(courseId) });
    await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_MODULE_QUERY_KEYS.all() });
    onOpenChange(false);
  };

  const createMutation = useMutation({
    mutationFn: postOnlineCourseModule,
    onSuccess
  });

  const updateMutation = useMutation({
    mutationFn: putOnlineCourseModule,
    onSuccess
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit module` : t`Create module`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update module order, visibility, and release date.`
              : t`Add a structured module to this online course.`}
          </DialogDescription>
        </DialogHeader>
        <OnlineCourseModuleForm
          defaultValues={editValues ?? undefined}
          isSubmitting={isSubmitting}
          submitLabel={isEditMode ? t`Update` : t`Create`}
          onSubmit={(data) => {
            if (editValues) {
              updateMutation.mutate({ moduleId: editValues.id, data });
              return;
            }

            createMutation.mutate({ courseId, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
