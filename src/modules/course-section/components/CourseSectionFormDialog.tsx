import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CourseSectionForm } from '@/modules/course-section/components/CourseSectionForm';
import { COURSE_SECTION_QUERY_KEYS } from '@/modules/course-section/options';
import { postCourseSection, putCourseSection } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface CourseSectionFormDialogProps {
  editValues: CourseSection | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CourseSectionFormDialog = ({
  open,
  onOpenChange,
  editValues
}: CourseSectionFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postCourseSection,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: COURSE_SECTION_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putCourseSection,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: COURSE_SECTION_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t`Edit course section` : t`Create course section`}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected course section details.`
              : t`Fill out the form to create a new course section.`}
          </DialogDescription>
        </DialogHeader>
        <CourseSectionForm
          defaultValues={editValues ?? undefined}
          isCourseReadonly={isEditMode}
          isSubmitting={isSubmitting}
          submitLabel={isEditMode ? t`Update` : t`Create`}
          onSubmit={(data) => {
            if (editValues) {
              updateMutation.mutate({
                id: editValues.id,
                data: {
                  orderIndex: data.orderIndex,
                  title: data.title
                }
              });
              return;
            }

            createMutation.mutate({ data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
