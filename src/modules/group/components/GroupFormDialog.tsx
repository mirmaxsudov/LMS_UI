import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';

import { GroupForm } from '@/modules/group/components/GroupForm';
import { GROUP_QUERY_KEYS } from '@/modules/group/options';
import { postGroup, putGroup } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface GroupFormDialogProps {
  editValues: Group | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GroupFormDialog = ({ open, onOpenChange, editValues }: GroupFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const formId = useId();

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit group` : t`Create group`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected group details.`
              : t`Fill out the form to create a new group.`}
          </DialogDescription>
        </DialogHeader>
        <div className='scrollbar-hide h-full max-h-[calc(100vh-200px)] overflow-y-auto'>
          <GroupForm
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
