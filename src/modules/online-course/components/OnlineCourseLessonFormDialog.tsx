import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OnlineCourseLessonForm } from '@/modules/online-course/components/OnlineCourseLessonForm';
import {
  ONLINE_COURSE_LESSON_QUERY_KEYS,
  ONLINE_COURSE_QUERY_KEYS
} from '@/modules/online-course/options';
import { postOnlineCourseLesson, putOnlineCourseLesson } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

type OnlineCourseLesson = OnlineCourseModule['lessons'][number];

interface OnlineCourseLessonFormDialogProps {
  courseId: string;
  editValues: OnlineCourseLesson | null;
  moduleId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OnlineCourseLessonFormDialog = ({
  courseId,
  editValues,
  moduleId,
  open,
  onOpenChange
}: OnlineCourseLessonFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.byId(courseId) });
    await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_LESSON_QUERY_KEYS.all() });
    onOpenChange(false);
  };

  const createMutation = useMutation({
    mutationFn: postOnlineCourseLesson,
    onSuccess
  });

  const updateMutation = useMutation({
    mutationFn: putOnlineCourseLesson,
    onSuccess
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='max-h-[92svh] overflow-y-auto sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit lesson` : t`Create lesson`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update lesson video, content, order, and publishing status.`
              : t`Add a video lesson to this module.`}
          </DialogDescription>
        </DialogHeader>
        <OnlineCourseLessonForm
          defaultValues={editValues ?? undefined}
          isSubmitting={isSubmitting}
          submitLabel={isEditMode ? t`Update` : t`Create`}
          onSubmit={(data) => {
            if (editValues) {
              updateMutation.mutate({ lessonId: editValues.id, data });
              return;
            }

            createMutation.mutate({ moduleId, data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
