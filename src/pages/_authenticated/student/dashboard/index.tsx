import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRightIcon,
  AwardIcon,
  BellRingIcon,
  BookOpenCheckIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  FileCheck2Icon,
  MapPinIcon,
  PlayCircleIcon,
  SparklesIcon
} from 'lucide-react';

import {
  AgroPageIntro,
  DemoModeNote,
  DemoStatus,
  learnerApplications,
  learnerCourses,
  MetricCard,
  SectionHeading
} from '@/modules/agro-demo';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageHeader, PageLoading } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

const StudentDashboardRoutePage = () => {
  const activeCourse = learnerCourses[0];

  return (
    <>
      <PageHeader />
      <main className='space-y-7 px-4 pb-24 sm:px-6'>
        <AgroPageIntro
          title='Xush kelibsiz, Aziza'
          actions={
            <Button asChild className='rounded-full'>
              <Link to='/student/course-catalog'>
                Kursga yozilish
                <ArrowRightIcon />
              </Link>
            </Button>
          }
          description='Kurslaringiz, arizalaringiz va yaqin o‘quv sanalarini bir joydan boshqaring.'
          eyebrow='Tinglovchi kabineti'
        />

        <DemoModeNote />

        <section className='public-water-lines relative overflow-hidden rounded-[2rem] bg-[#153f38] p-6 text-white shadow-[0_24px_65px_rgba(21,63,56,0.2)] sm:p-8'>
          <div className='absolute -right-24 -bottom-28 size-80 rounded-full bg-[#65b9ce]/25 blur-2xl' />
          <div className='relative grid gap-8 lg:grid-cols-[1fr_23rem] lg:items-center'>
            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge className='bg-[#c9e16f] text-[#23431e] hover:bg-[#c9e16f]'>
                  Davom ettirish
                </Badge>
                <span className='text-sm text-white/60'>7/10 dars yakunlangan</span>
              </div>
              <h2 className='mt-5 max-w-2xl font-[Georgia,serif] text-3xl leading-tight font-semibold sm:text-4xl'>
                {activeCourse.nextLesson}
              </h2>
              <p className='mt-3 text-sm text-white/65'>
                {activeCourse.title} · {activeCourse.instructor}
              </p>
              <div className='mt-7 flex flex-wrap gap-3'>
                <Button asChild className='rounded-full bg-white text-[#153f38] hover:bg-white/90'>
                  <Link to='/student/online-courses'>
                    <PlayCircleIcon />
                    Darsni ochish
                  </Link>
                </Button>
                <Button
                  asChild
                  className='rounded-full border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white'
                  variant='outline'
                >
                  <Link to='/student/courses'>Kurs tafsilotlari</Link>
                </Button>
              </div>
            </div>
            <div className='rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur'>
              <div className='flex items-end justify-between'>
                <div>
                  <p className='text-xs font-bold tracking-[0.13em] text-white/55 uppercase'>
                    Umumiy progress
                  </p>
                  <p className='mt-2 text-4xl font-semibold'>{activeCourse.progress}%</p>
                </div>
                <SparklesIcon className='size-7 text-[#c9e16f]' />
              </div>
              <Progress
                className='mt-5 h-2.5 bg-white/15 [&>div]:bg-[#c9e16f]'
                value={activeCourse.progress}
              />
              <p className='mt-4 flex items-center gap-2 text-sm text-white/65'>
                <Clock3Icon className='size-4' />
                Keyingi dars: {activeCourse.nextDate}
              </p>
            </div>
          </div>
        </section>

        <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <MetricCard
            detail='2 tasi faol'
            label='Mening kurslarim'
            value='3'
            icon={BookOpenCheckIcon}
          />
          <MetricCard
            detail='1 ta hujjatni yangilash kerak'
            label='Faol arizalar'
            value='2'
            icon={FileCheck2Icon}
            tone='orange'
          />
          <MetricCard
            detail='Keyingi sana 12-sentabr'
            label='Yaqin tadbirlar'
            value='4'
            icon={CalendarDaysIcon}
            tone='blue'
          />
          <MetricCard
            detail='QR orqali tekshiriladi'
            label='Sertifikatlar'
            value='2'
            icon={AwardIcon}
            tone='green'
          />
        </section>

        <section className='grid gap-5 xl:grid-cols-[1.25fr_0.75fr]'>
          <Card className='border-border/80 shadow-[0_16px_45px_rgba(23,33,27,0.05)]'>
            <CardContent className='space-y-5 p-5 sm:p-6'>
              <SectionHeading
                title='Kurslarim'
                action={
                  <Button asChild className='rounded-full' size='sm' variant='ghost'>
                    <Link to='/student/courses'>Barchasi</Link>
                  </Button>
                }
                description='O‘qish jarayoni va keyingi ochiladigan darslar'
              />
              <div className='space-y-3'>
                {learnerCourses.map((course) => (
                  <article
                    key={course.id}
                    className='group hover:border-primary/30 hover:bg-primary/[0.025] rounded-2xl border bg-[#fbfdfb] p-4 transition-colors'
                  >
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                      <span className='bg-primary/10 text-primary grid size-12 shrink-0 place-items-center rounded-2xl'>
                        {course.progress === 100 ? (
                          <CheckCircle2Icon className='size-5' />
                        ) : (
                          <PlayCircleIcon className='size-5' />
                        )}
                      </span>
                      <div className='min-w-0 flex-1'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <h3 className='font-semibold'>{course.title}</h3>
                          <DemoStatus tone={course.progress === 100 ? 'green' : course.tone}>
                            {course.progress === 100 ? 'Yakunlangan' : 'Jarayonda'}
                          </DemoStatus>
                        </div>
                        <p className='text-muted-foreground mt-1 text-sm'>
                          {course.category} · {course.format} · {course.instructor}
                        </p>
                        <div className='mt-3 flex items-center gap-3'>
                          <Progress className='h-1.5 flex-1' value={course.progress} />
                          <span className='text-sm font-semibold'>{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className='space-y-5'>
            <Card className='border-border/80 shadow-[0_16px_45px_rgba(23,33,27,0.05)]'>
              <CardContent className='p-5 sm:p-6'>
                <SectionHeading title='Yaqin o‘quv sanasi' />
                <div className='mt-5 rounded-[1.5rem] bg-[#e8f3ed] p-5'>
                  <div className='flex items-center gap-4'>
                    <div className='bg-primary text-primary-foreground grid size-15 shrink-0 place-items-center rounded-2xl text-center'>
                      <span className='text-[10px] font-bold uppercase'>Sent</span>
                      <span className='text-xl leading-none font-semibold'>12</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Amaliy mashg‘ulot</p>
                      <p className='text-muted-foreground mt-1 text-sm'>09:30 – 13:00</p>
                    </div>
                  </div>
                  <p className='text-muted-foreground mt-4 flex items-start gap-2 text-sm leading-5'>
                    <MapPinIcon className='text-primary mt-0.5 size-4 shrink-0' />
                    Toshkent viloyati Suv xo‘jaligi o‘quv markazi
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-warning/25 bg-warning/[0.045]'>
              <CardContent className='p-5 sm:p-6'>
                <div className='flex items-start gap-3'>
                  <span className='bg-warning/10 text-warning grid size-10 shrink-0 place-items-center rounded-2xl'>
                    <BellRingIcon className='size-5' />
                  </span>
                  <div>
                    <p className='font-semibold'>Hujjatni yangilang</p>
                    <p className='text-muted-foreground mt-1 text-sm leading-6'>
                      {learnerApplications[0].detail}
                    </p>
                    <Button asChild className='mt-3 rounded-full' size='sm' variant='outline'>
                      <Link to='/student/assignments'>Arizani ko‘rish</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/student/dashboard/')({
  component: StudentDashboardRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
