import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PermissionForm } from '@/modules/permission/components/PermissionForm';
import { PERMISSION_QUERY_KEYS } from '@/modules/permission/options';
import { postPermission, putPermission } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface PermissionFormDialogProps {
  editValues: Permission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PermissionFormDialog = ({
  editValues,
  open,
  onOpenChange
}: PermissionFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postPermission,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PERMISSION_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putPermission,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PERMISSION_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit permission` : t`Create permission`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the selected permission details.`
              : t`Create an authority that can be assigned to roles.`}
          </DialogDescription>
        </DialogHeader>
        <PermissionForm
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
