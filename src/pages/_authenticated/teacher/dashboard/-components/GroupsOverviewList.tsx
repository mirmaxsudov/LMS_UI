import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import { groupsOverview } from './mock-data';

export const GroupsOverviewList = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>My groups</CardTitle>
        <CardDescription>Syllabus progress and next lesson for each group</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        {groupsOverview.map((group) => (
          <div key={group.id} className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <span className='size-2.5 rounded-full' style={{ backgroundColor: group.color }} />
                <div>
                  <p className='text-sm font-medium'>{group.name}</p>
                  <p className='text-muted-foreground text-xs'>
                    {group.subject} · {group.studentsCount} students · avg {group.averageScore}%
                  </p>
                </div>
              </div>
              <span className='text-sm font-semibold'>{group.progress}%</span>
            </div>
            <Progress value={group.progress} />
            <div className='text-muted-foreground flex flex-wrap justify-between gap-1 text-xs'>
              <span>
                {group.completedLessons}/{group.totalLessons} lessons completed
              </span>
              <span>
                Next: {group.nextLesson} ·{' '}
                {new Date(group.nextLessonDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
