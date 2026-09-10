import { createFileRoute, Link } from '@tanstack/react-router';
import {
  AwardIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  MapPinIcon,
  PlayCircleIcon,
  UserRoundIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, learnerCourses } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

const StudentCoursesRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-24 sm:px-6'>
      <AgroPageIntro
        title='Mening kurslarim'
        actions={
          <Button asChild className='rounded-full' variant='outline'>
            <Link to='/student/course-catalog'>Yangi kurs topish</Link>
          </Button>
        }
        description='Faol, rejalashtirilgan va tugallangan kurslaringiz. Keyingi dars faqat oldingi video va test bajarilganda ochiladi.'
        eyebrow='Shaxsiy ta’lim yo‘li'
      />

      <section className='grid gap-5 xl:grid-cols-3'>
        {learnerCourses.map((course) => (
          <Card
            key={course.id}
            className='border-border/80 overflow-hidden py-0 shadow-[0_18px_50px_rgba(23,33,27,0.07)]'
          >
            <div className='public-water-lines relative min-h-40 bg-[#153f38] p-5 text-white'>
              <div className='absolute -right-10 -bottom-14 size-40 rounded-full bg-[#65b9ce]/25 blur-xl' />
              <div className='relative flex h-full flex-col justify-between gap-7'>
                <div className='flex items-start justify-between gap-3'>
                  <DemoStatus tone={course.progress === 100 ? 'green' : course.tone}>
                    {course.progress === 100 ? 'Yakunlangan' : 'Jarayonda'}
                  </DemoStatus>
                  <span className='text-sm font-semibold text-white/75'>{course.format}</span>
                </div>
                <h2 className='font-[Georgia,serif] text-2xl leading-tight font-semibold'>
                  {course.title}
                </h2>
              </div>
            </div>
            <CardContent className='space-y-5 p-5'>
              <div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Kurs progressi</span>
                  <span className='font-semibold'>{course.progress}%</span>
                </div>
                <Progress className='mt-2' value={course.progress} />
                <p className='text-muted-foreground mt-2 text-xs'>
                  {course.completedLessons}/{course.totalLessons} dars yakunlangan
                </p>
              </div>
              <div className='space-y-2.5 border-t pt-4 text-sm'>
                <p className='text-muted-foreground flex items-center gap-2'>
                  <UserRoundIcon className='text-primary size-4' /> {course.instructor}
                </p>
                <p className='text-muted-foreground flex items-center gap-2'>
                  <CalendarClockIcon className='text-primary size-4' /> {course.nextDate}
                </p>
                {course.format === 'Oflayn' && (
                  <p className='text-muted-foreground flex items-center gap-2'>
                    <MapPinIcon className='text-primary size-4' /> Sirdaryo o‘quv markazi
                  </p>
                )}
              </div>
              {course.progress === 100 ? (
                <Button asChild className='w-full rounded-full' variant='outline'>
                  <Link to='/student/gradebook'>
                    <AwardIcon /> Sertifikatni ko‘rish
                  </Link>
                </Button>
              ) : (
                <Button asChild className='w-full rounded-full'>
                  <Link to='/student/online-courses'>
                    <PlayCircleIcon /> Darsni davom ettirish
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      <div className='flex items-start gap-3 rounded-2xl border bg-white p-4 text-sm'>
        <CheckCircle2Icon className='text-success mt-0.5 size-5 shrink-0' />
        <p className='text-muted-foreground leading-6'>
          Video to‘liq ko‘rilgach dars testi ochiladi. Testdan muvaffaqiyatli o‘tilganda keyingi
          dars avtomatik faollashadi.
        </p>
      </div>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/courses/')({
  component: StudentCoursesRoutePage
});
