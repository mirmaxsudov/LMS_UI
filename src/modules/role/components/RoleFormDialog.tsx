import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RoleForm } from '@/modules/role/components/RoleForm';
import { ROLE_QUERY_KEYS } from '@/modules/role/options';
import { postRole, putRole } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface RoleFormDialogProps {
  editValues: Role | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoleFormDialog = ({ editValues, open, onOpenChange }: RoleFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit role` : t`Create role`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected role and replace its assigned permissions.`
              : t`Create a role and assign permissions to it.`}
          </DialogDescription>
        </DialogHeader>
        <RoleForm
          key={editValues?.id ?? 'create'}
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
