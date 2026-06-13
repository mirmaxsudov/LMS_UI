import type { LucideIcon } from 'lucide-react';

import {
  AtomIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  ClockIcon,
  Code2Icon,
  FolderIcon,
  GlobeIcon,
  MapPinIcon,
  MessageSquareIcon,
  UsersIcon
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import type { StudyGroup } from './types';

const subjectIcon: Record<string, LucideIcon> = {
  Mathematics: CalculatorIcon,
  'English Language': GlobeIcon,
  Physics: AtomIcon,
  'Computer Science': Code2Icon,
  'World History': GlobeIcon
};

interface StudyGroupCardProps {
  group: StudyGroup;
}

export const StudyGroupCard = ({ group }: StudyGroupCardProps) => {
  const Icon = subjectIcon[group.subject] ?? CalculatorIcon;
  const extraMembers = group.totalMembers - group.members.length;

  return (
    <Card className='h-full'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div
            className='flex size-10 shrink-0 items-center justify-center rounded-lg'
            style={{ backgroundColor: `color-mix(in srgb, ${group.color} 15%, transparent)`, color: group.color }}
          >
            <Icon className='size-5' />
          </div>
          <div className='min-w-0'>
            <CardTitle className='truncate'>{group.name}</CardTitle>
            <CardDescription>{group.subject}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-muted-foreground line-clamp-2 text-sm'>{group.description}</p>

        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarFallback>{group.teacherInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>{group.teacher}</p>
            <p className='text-muted-foreground text-xs'>Group teacher</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-y-2 text-sm'>
          <div className='text-muted-foreground flex items-center gap-2'>
            <CalendarDaysIcon className='size-4 shrink-0' />
            <span>{group.schedule.days.join(', ')}</span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2'>
            <ClockIcon className='size-4 shrink-0' />
            <span>
              {group.schedule.startTime} - {group.schedule.endTime}
            </span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2'>
            <MapPinIcon className='size-4 shrink-0' />
            <span>{group.schedule.room}</span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2'>
            <UsersIcon className='size-4 shrink-0' />
            <span>{group.totalMembers} classmates</span>
          </div>
        </div>

        <div className='space-y-1.5'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Syllabus progress</span>
            <span className='font-semibold'>{group.progress}%</span>
          </div>
          <Progress value={group.progress} />
          <p className='text-muted-foreground text-xs'>
            {group.completedLessons}/{group.totalLessons} lessons completed
          </p>
        </div>

        <div className='bg-muted/40 rounded-lg border p-3'>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-muted-foreground text-xs'>Next lesson</p>
            <Badge variant='outline'>
              {new Date(group.nextLesson.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </Badge>
          </div>
          <p className='text-sm font-medium'>{group.nextLesson.topic}</p>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center'>
            {group.members.slice(0, 4).map((member) => (
              <Avatar key={member.id} className='border-background -ml-2 size-7 border-2 first:ml-0'>
                <AvatarFallback className='text-[10px]'>{member.initials}</AvatarFallback>
              </Avatar>
            ))}
            {extraMembers > 0 && (
              <span className='text-muted-foreground ml-2 text-xs'>+{extraMembers} more</span>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <Button size='sm' variant='outline'>
              <FolderIcon />
              Materials
            </Button>
            <Button size='sm'>
              <MessageSquareIcon />
              Group chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
