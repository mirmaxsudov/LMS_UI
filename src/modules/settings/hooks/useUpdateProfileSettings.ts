import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AUTH_QUERY_KEYS } from '@/modules/auth';
import { patchAuthMe } from '@/shared/api';

export const useUpdateProfileSettings = () => {
  const { t } = useLingui();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAuthMe,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me() });
      toast.success(response.data.message || t`Profile updated successfully.`);
    }
  });
};
