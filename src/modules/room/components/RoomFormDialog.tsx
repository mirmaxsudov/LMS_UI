import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';

import { RoomForm } from '@/modules/room/components/RoomForm';
import { ROOM_QUERY_KEYS } from '@/modules/room/options';
import { postRoom, putRoom } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface RoomFormDialogProps {
  editValues: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoomFormDialog = ({ open, onOpenChange, editValues }: RoomFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);
  const formId = useId();

  const createMutation = useMutation({
    mutationFn: postRoom,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEYS.base() });
      onOpenChange(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putRoom,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEYS.base() });
      onOpenChange(false);
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit room` : t`Create room`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected room details.`
              : t`Fill out the form to create a new room.`}
          </DialogDescription>
        </DialogHeader>
        <div className='scrollbar-hide h-full max-h-[calc(100vh-200px)] overflow-y-auto'>
          <RoomForm
            defaultValues={editValues ?? undefined}
            formId={formId}
            onSubmit={(data) => {
              if (editValues) {
                updateMutation.mutate({ id: editValues.id, data });
                return;
              }
              createMutation.mutate({ data });
            }}
          />
        </div>
        <Button type='submit' form={formId} loading={isSubmitting}>
          {isEditMode ? t`Update` : t`Create`}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
