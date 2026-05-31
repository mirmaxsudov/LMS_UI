import { useLingui } from '@lingui/react/macro';
import { CalendarDaysIcon, MailIcon, PhoneIcon, ShieldCheckIcon } from 'lucide-react';

import { formatDate, formatPhoneNumber } from '@/shared/lib/format';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

interface ProfileSummaryProps {
  user: User & { role: UserRole };
}

const getInitials = (user: User) =>
  [user.firstName, user.lastName]
    .filter(Boolean)
    .map((part) => part.slice(0, 1))
    .join('')
    .toUpperCase();

const formatRole = (role: UserRole) =>
  role
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const SummaryItem = ({
  icon: Icon,
  label,
  value
}: {
  icon: typeof MailIcon;
  label: string;
  value: string;
}) => (
  <div className='flex items-start gap-3'>
    <div className='bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-md'>
      <Icon className='size-4' />
    </div>
    <div className='min-w-0'>
      <p className='text-muted-foreground text-xs font-medium'>{label}</p>
      <p className='truncate text-sm font-medium'>{value}</p>
    </div>
  </div>
);

export const ProfileSummary = ({ user }: ProfileSummaryProps) => {
  const { t } = useLingui();
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');

  return (
    <Card className='overflow-hidden rounded-lg'>
      <div className='bg-muted h-28 overflow-hidden'>
        {user.profileBackgroundUrl ? (
          <img alt='' className='size-full object-cover' src={user.profileBackgroundUrl} />
        ) : null}
      </div>
      <CardHeader className='-mt-12 gap-3'>
        <Avatar className='border-background bg-background size-24 border-4 shadow-sm'>
          {user.profileImageUrl ? <AvatarImage alt={fullName} src={user.profileImageUrl} /> : null}
          <AvatarFallback className='text-xl font-semibold'>
            {getInitials(user) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className='space-y-2'>
          <div>
            <CardTitle className='text-2xl leading-tight'>{fullName || t`User profile`}</CardTitle>
            <p className='text-muted-foreground mt-1 text-sm'>{formatRole(user.role)}</p>
          </div>
          <span className='bg-success/10 text-success inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium'>
            <span className='bg-success size-1.5 rounded-full' />
            {user.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <SummaryItem label={t`Email`} value={user.email || '-'} icon={MailIcon} />
        <SummaryItem
          label={t`Phone number`}
          value={user.phoneNumber ? formatPhoneNumber(user.phoneNumber) : '-'}
          icon={PhoneIcon}
        />
        <SummaryItem
          label={t`Birth date`}
          value={user.birthDate ? formatDate(user.birthDate) : '-'}
          icon={CalendarDaysIcon}
        />
        <SummaryItem label={t`Primary role`} value={formatRole(user.role)} icon={ShieldCheckIcon} />
      </CardContent>
    </Card>
  );
};
