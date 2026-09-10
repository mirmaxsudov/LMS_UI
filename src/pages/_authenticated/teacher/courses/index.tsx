import { createFileRoute } from '@tanstack/react-router';
import {
  BookOpenCheckIcon,
  CalendarClockIcon,
  FileQuestionIcon,
  PlayCircleIcon,
  UsersRoundIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

const courses = [
  {
    name: 'Suvdan samarali foydalanish',
    role: 'Asosiy o‘qituvchi',
    learners: 186,
    lessons: 10,
    completed: 8,
    next: '12-sentabr, 10:00',
    format: 'Onlayn',
    tone: 'teal' as const
  },
  {
    name: 'Tomchilatib sug‘orish asoslari',
    role: 'Kurs eksperti',
    learners: 94,
    lessons: 8,
    completed: 5,
    next: '15-sentabr, 14:00',
    format: 'Aralash',
    tone: 'green' as const
  }
];

const ExpertCoursesRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Biriktirilgan kurslar'
        description='Siz o‘qituvchi yoki ekspert sifatida qatnashayotgan kurslar, dars jadvali va tinglovchilar faolligi.'
        eyebrow='O‘qituvchi kabineti'
      />
      <section className='grid gap-5 xl:grid-cols-2'>
        {courses.map((course) => (
          <Card
            key={course.name}
            className='border-border/80 overflow-hidden py-0 shadow-[0_18px_50px_rgba(23,33,27,0.06)]'
          >
            <div className='public-water-lines bg-[#153f38] p-6 text-white'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <DemoStatus tone={course.tone}>{course.format}</DemoStatus>
                  <h2 className='mt-4 font-[Georgia,serif] text-3xl font-semibold'>
                    {course.name}
                  </h2>
                  <p className='mt-2 text-sm text-white/60'>{course.role}</p>
                </div>
                <BookOpenCheckIcon className='size-8 text-[#c9e16f]' />
              </div>
            </div>
            <CardContent className='space-y-5 p-5 sm:p-6'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='bg-secondary rounded-2xl p-4'>
                  <UsersRoundIcon className='text-primary size-4' />
                  <p className='mt-2 text-xl font-semibold'>{course.learners}</p>
                  <p className='text-muted-foreground text-xs'>Tinglovchi</p>
                </div>
                <div className='bg-secondary rounded-2xl p-4'>
                  <PlayCircleIcon className='text-primary size-4' />
                  <p className='mt-2 text-xl font-semibold'>{course.lessons}</p>
                  <p className='text-muted-foreground text-xs'>Dars</p>
                </div>
                <div className='bg-secondary rounded-2xl p-4'>
                  <FileQuestionIcon className='text-primary size-4' />
                  <p className='mt-2 text-xl font-semibold'>8</p>
                  <p className='text-muted-foreground text-xs'>Test</p>
                </div>
              </div>
              <div>
                <div className='mb-2 flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Kurs dasturi</span>
                  <span className='font-semibold'>
                    {course.completed}/{course.lessons}
                  </span>
                </div>
                <Progress value={(course.completed / course.lessons) * 100} />
              </div>
              <p className='text-muted-foreground flex items-center gap-2 text-sm'>
                <CalendarClockIcon className='text-primary size-4' /> Keyingi dars: {course.next}
              </p>
              <div className='flex gap-2 border-t pt-4'>
                <Button className='flex-1 rounded-full' variant='outline'>
                  Tinglovchilar
                </Button>
                <Button className='flex-1 rounded-full'>Kursni ochish</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/teacher/courses/')({
  component: ExpertCoursesRoutePage
});
