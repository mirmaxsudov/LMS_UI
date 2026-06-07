import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SCHEDULE_QUERY_KEYS } from '@/modules/schedule/options';
import { postSchedule, putSchedule } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

import { ScheduleForm } from './ScheduleForm';

interface ScheduleFormDialogProps {
  editValues: Schedule | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScheduleFormDialog = ({ open, onOpenChange, editValues }: ScheduleFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SCHEDULE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit schedule` : t`Create schedule`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected schedule details.`
              : t`Assign a group to a weekday and time range.`}
          </DialogDescription>
        </DialogHeader>
        <ScheduleForm
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
