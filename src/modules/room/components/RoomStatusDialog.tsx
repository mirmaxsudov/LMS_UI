import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';

import { RoomStatusForm } from '@/modules/room/components/RoomStatusForm';
import { ROOM_QUERY_KEYS } from '@/modules/room/options';
import { patchRoomStatus } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface RoomStatusDialogProps {
  open: boolean;
  room: Room;
  onOpenChange: (open: boolean) => void;
}

export const RoomStatusDialog = ({ room, open, onOpenChange }: RoomStatusDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const formId = useId();
  const roomName = room.name;

  const mutation = useMutation({
    mutationFn: patchRoomStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEYS.base() });
      onOpenChange(false);
    }
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t`Change room status`}</DialogTitle>
          <DialogDescription>{t`Update the status of ${roomName}.`}</DialogDescription>
        </DialogHeader>
        <RoomStatusForm
          defaultValues={room}
          formId={formId}
          onSubmit={(data) => mutation.mutate({ id: room.id, data })}
        />
        <Button type='submit' form={formId} loading={mutation.isPending}>
          {t`Save`}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
