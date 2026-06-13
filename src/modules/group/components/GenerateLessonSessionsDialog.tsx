import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { toast } from 'sonner';

import { GenerateLessonSessionsForm } from '@/modules/group/components/GenerateLessonSessionsForm';
import { GROUP_QUERY_KEYS } from '@/modules/group/options';
import { LESSON_SESSION_QUERY_KEYS } from '@/modules/lesson-session';
import { postGenerateLessonSessions } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface Props {
  groupId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GenerateLessonSessionsDialog = ({ groupId, open, onOpenChange }: Props) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const formId = useId();

  const generateMutation = useMutation({
    mutationFn: postGenerateLessonSessions,
    onSuccess: async () => {
      toast.success(t`Lesson sessions generated successfully`);
      onOpenChange(false);
      await queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.base() });
      await queryClient.invalidateQueries({ queryKey: LESSON_SESSION_QUERY_KEYS.base() });
    },
    onError: () => {
      toast.error(t`Lesson sessions generated errorfully`);
    }
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t`Generate lesson sessions`}</DialogTitle>
          <DialogDescription>
            {t`Select a date range to generate lesson sessions for this group.`}
          </DialogDescription>
        </DialogHeader>
        <GenerateLessonSessionsForm
          formId={formId}
          onSubmit={(data) => generateMutation.mutate({ id: groupId, data })}
        />
        <Button type='submit' form={formId} loading={generateMutation.isPending}>
          {t`Generate`}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
