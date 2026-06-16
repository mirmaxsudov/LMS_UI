import { EyeIcon, MoreVerticalIcon, PencilIcon, PinIcon, PinOffIcon, Trash2Icon } from 'lucide-react';

import {
  ANNOUNCEMENT_AUDIENCE_CONFIG,
  ANNOUNCEMENT_PRIORITY_CONFIG,
  ANNOUNCEMENT_STATUS_CONFIG
} from '@/modules/announcement/constants';
import { formatDate } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

interface AnnouncementCardProps {
  announcement: Announcement;
  onDelete: (id: string) => void;
  onEdit: (announcement: Announcement) => void;
  onTogglePin: (id: string) => void;
}

export const AnnouncementCard = ({
  announcement,
  onEdit,
  onDelete,
  onTogglePin
}: AnnouncementCardProps) => {
  const priority = ANNOUNCEMENT_PRIORITY_CONFIG[announcement.priority];
  const status = ANNOUNCEMENT_STATUS_CONFIG[announcement.status];

  return (
    <Card className='relative overflow-hidden py-0'>
      <span className={cn('absolute inset-y-0 left-0 w-1', priority.indicatorClassName)} />
      <CardContent className='flex flex-col gap-4 p-5 pl-6'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex flex-wrap items-center gap-2'>
            {announcement.pinned && (
              <Badge className='gap-1' variant='outline'>
                <PinIcon className='size-3' />
                Pinned
              </Badge>
            )}
            <Badge className={priority.badgeClassName}>{priority.label}</Badge>
            <Badge variant={status.badgeVariant}>{status.label}</Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='-mt-1 -mr-1 size-8 shrink-0' size='icon' variant='ghost'>
                <MoreVerticalIcon className='size-4' />
                <span className='sr-only'>Open actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => onEdit(announcement)}>
                <PencilIcon />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTogglePin(announcement.id)}>
                {announcement.pinned ? <PinOffIcon /> : <PinIcon />}
                {announcement.pinned ? 'Unpin' : 'Pin'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant='destructive' onClick={() => onDelete(announcement.id)}>
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='space-y-1.5'>
          <h3 className='leading-snug font-semibold'>{announcement.title}</h3>
          <p className='text-muted-foreground line-clamp-2 text-sm'>{announcement.content}</p>
        </div>

        <div className='flex flex-wrap items-center gap-1.5'>
          {announcement.audiences.map((audience) => {
            const config = ANNOUNCEMENT_AUDIENCE_CONFIG[audience];
            const Icon = config.icon;

            return (
              <Badge key={audience} className='text-muted-foreground gap-1' variant='outline'>
                <Icon className='size-3' />
                {config.label}
              </Badge>
            );
          })}
        </div>

        <div className='flex items-center justify-between gap-3 border-t pt-4'>
          <div className='flex min-w-0 items-center gap-2'>
            <Avatar className='size-8'>
              {announcement.author.avatarUrl && (
                <AvatarImage src={announcement.author.avatarUrl} />
              )}
              <AvatarFallback className='text-xs'>
                {getInitials(announcement.author.name)}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0'>
              <p className='truncate text-sm font-medium'>{announcement.author.name}</p>
              <p className='text-muted-foreground truncate text-xs'>{announcement.author.role}</p>
            </div>
          </div>

          <div className='text-muted-foreground flex shrink-0 flex-col items-end gap-0.5 text-xs'>
            <span>
              {announcement.status === 'scheduled' && announcement.scheduledAt
                ? `Scheduled ${formatDate(announcement.scheduledAt, { month: 'short' })}`
                : formatDate(announcement.publishedAt, { month: 'short' })}
            </span>
            {announcement.status === 'published' && (
              <span className='flex items-center gap-1'>
                <EyeIcon className='size-3' />
                {announcement.viewsCount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
