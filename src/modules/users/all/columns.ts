import type { ColumnDef } from '@tanstack/react-table';

import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';

import { roleLabelMap, statusLabelMap } from '@/modules/users';

const getFullName = (user: UserPreview) =>
  [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ');

export const useAllUsersColumns = (): ColumnDef<UserPreview>[] => {
  const { t } = useLingui();

  return useMemo(
    () => [
      {
        id: 'name',
        header: t`Name`,
        accessorFn: (row) => getFullName(row)
      },
      {
        id: 'email',
        header: t`Email`,
        accessorKey: 'email'
      },
      {
        id: 'phone',
        header: t`Phone`,
        accessorFn: (row) => row.phoneNumber || '-'
      },
      {
        id: 'role',
        header: t`Role`,
        accessorFn: (row) =>
          row.roles.length
            ? row.roles
                .map((role) => {
                  const label = roleLabelMap[role as UserRole];
                  return label ? t(label) : role;
                })
                .join(', ')
            : '-'
      },
      {
        id: 'status',
        header: t`Status`,
        accessorFn: (row) => {
          const label = statusLabelMap[row.status];
          return label ? t(label) : row.status;
        }
      }
    ],
    [t]
  );
};
