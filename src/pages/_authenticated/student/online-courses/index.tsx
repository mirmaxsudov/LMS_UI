import { createFileRoute } from '@tanstack/react-router';
import {
  CheckCircle2Icon,
  ChevronLeftIcon,
  CircleIcon,
  FileTextIcon,
  LockKeyholeIcon,
  Maximize2Icon,
  PauseIcon,
  PlayCircleIcon,
  Volume2Icon
} from 'lucide-react';

import { DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

const lessons = [
  { title: 'Suv sarfini aniqlash', duration: '12:40', status: 'done' },
  { title: 'Magistral quvur diametri', duration: '16:15', status: 'done' },
  { title: 'Filtr va nasos tanlash', duration: '18:20', status: 'done' },
  { title: 'Tomchilatish tizimini hisoblash', duration: '21:08', status: 'active' },
  { title: 'Dala sharoitida montaj', duration: '14:55', status: 'locked' },
  { title: 'Tizimni ishga tushirish', duration: '13:30', status: 'locked' }
];

const StudentOnlineCourseRoutePage = () => (
  <>
    <PageHeader />
    <main className='px-4 pb-24 sm:px-6'>
      <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
        <Button className='rounded-full' size='sm' variant='ghost'>
          <ChevronLeftIcon /> Mening kurslarim
        </Button>
        <DemoStatus tone='teal'>7/10 dars yakunlangan</DemoStatus>
      </div>

      <section className='grid overflow-hidden rounded-[1.75rem] border bg-white shadow-[0_20px_60px_rgba(23,33,27,0.08)] xl:grid-cols-[1fr_22rem]'>
        <div className='min-w-0'>
          <div className='relative grid aspect-video place-items-center overflow-hidden bg-[#0d2d28] text-white'>
            <div className='public-water-lines absolute inset-0 opacity-45' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(101,185,206,0.18),transparent_55%)]' />
            <button
              className='relative grid size-20 place-items-center rounded-full border border-white/25 bg-white/15 backdrop-blur transition-transform hover:scale-105'
              type='button'
            >
              <PauseIcon className='size-8 fill-current' />
              <span className='sr-only'>Videoni to‘xtatish</span>
            </button>
            <div className='absolute inset-x-5 bottom-5'>
              <div className='h-1.5 overflow-hidden rounded-full bg-white/20'>
                <div className='h-full w-[72%] rounded-full bg-[#c9e16f]' />
              </div>
              <div className='mt-3 flex items-center justify-between text-xs text-white/75'>
                <div className='flex items-center gap-3'>
                  <PlayCircleIcon className='size-4' />
                  <Volume2Icon className='size-4' />
                  <span>15:12 / 21:08</span>
                </div>
                <Maximize2Icon className='size-4' />
              </div>
            </div>
          </div>

          <div className='p-5 sm:p-7'>
            <p className='text-agriculture text-xs font-bold tracking-[0.14em] uppercase'>
              8-dars · Irrigatsiya
            </p>
            <h1 className='mt-2 font-[Georgia,serif] text-3xl font-semibold tracking-tight text-[#173f37]'>
              Tomchilatish tizimini hisoblash
            </h1>
            <p className='text-muted-foreground mt-3 text-sm leading-6'>
              Ushbu darsda maydon hajmi, ekin turi va mavjud bosimdan kelib chiqib quvur diametri
              hamda tomizgich sarfini hisoblaysiz.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <Button className='rounded-full' variant='outline'>
                <FileTextIcon /> Hisoblash jadvali.pdf
              </Button>
              <Button className='rounded-full' variant='outline'>
                <FileTextIcon /> Amaliy qo‘llanma.pdf
              </Button>
            </div>
            <Card className='border-water/20 bg-water/[0.04] mt-6'>
              <CardContent className='flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <p className='font-semibold'>Dars testini ochish sharti</p>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    Videoni to‘liq ko‘ring. Hozir 72% ko‘rildi.
                  </p>
                </div>
                <div className='w-full sm:w-52'>
                  <Progress value={72} />
                  <p className='text-muted-foreground mt-1 text-right text-xs'>Yana 5:56</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <aside className='border-t bg-[#f7faf8] xl:border-t-0 xl:border-l'>
          <div className='border-b p-5'>
            <p className='font-semibold'>Kurs dasturi</p>
            <p className='text-muted-foreground mt-1 text-xs'>Suvdan samarali foydalanish</p>
          </div>
          <div className='divide-y'>
            {lessons.map((lesson, index) => (
              <button
                key={lesson.title}
                className={
                  lesson.status === 'active'
                    ? 'bg-primary/[0.06] flex w-full gap-3 p-4 text-left'
                    : 'hover:bg-muted/60 flex w-full gap-3 p-4 text-left'
                }
                type='button'
              >
                <span
                  className={
                    lesson.status === 'done'
                      ? 'text-success'
                      : lesson.status === 'active'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                  }
                >
                  {lesson.status === 'done' ? (
                    <CheckCircle2Icon className='size-5' />
                  ) : lesson.status === 'active' ? (
                    <CircleIcon className='fill-primary/20 size-5' />
                  ) : (
                    <LockKeyholeIcon className='size-5' />
                  )}
                </span>
                <span className='min-w-0 flex-1'>
                  <span className='text-muted-foreground block text-xs'>
                    {index + 1}-dars · {lesson.duration}
                  </span>
                  <span className='mt-1 block text-sm leading-5 font-medium'>{lesson.title}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/online-courses/')({
  component: StudentOnlineCourseRoutePage
});
