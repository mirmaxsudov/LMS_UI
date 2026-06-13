import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import { courseProgress } from './mock-data';

export const CourseProgressList = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>My courses</CardTitle>
        <CardDescription>Progress and next lesson for each enrolled course</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        {courseProgress.map((course) => (
          <div key={course.id} className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <span className='size-2.5 rounded-full' style={{ backgroundColor: course.color }} />
                <div>
                  <p className='text-sm font-medium'>{course.name}</p>
                  <p className='text-muted-foreground text-xs'>{course.teacher}</p>
                </div>
              </div>
              <span className='text-sm font-semibold'>{course.progress}%</span>
            </div>
            <Progress value={course.progress} />
            <div className='text-muted-foreground flex flex-wrap justify-between gap-1 text-xs'>
              <span>
                {course.completedLessons}/{course.totalLessons} lessons completed
              </span>
              <span>
                Next: {course.nextLesson} ·{' '}
                {new Date(course.nextLessonDate).toLocaleDateString('en-US', {
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
