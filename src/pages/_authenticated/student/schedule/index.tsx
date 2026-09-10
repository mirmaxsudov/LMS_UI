import { createFileRoute } from '@tanstack/react-router';
import {
  BellRingIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  FileQuestionIcon,
  MapPinIcon,
  NavigationIcon,
  PlayCircleIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';

const events = [
  {
    day: '12',
    month: 'Sent',
    time: '09:30 – 13:00',
    title: 'Amaliy mashg‘ulot',
    course: 'Suvdan samarali foydalanish',
    place: 'Toshkent viloyati o‘quv markazi',
    tone: 'blue' as const,
    icon: MapPinIcon
  },
  {
    day: '14',
    month: 'Sent',
    time: '14:30',
    title: '8-dars ochiladi',
    course: 'Loyihachi mutaxassis tayyorlash',
    place: 'Onlayn platforma',
    tone: 'teal' as const,
    icon: PlayCircleIcon
  },
  {
    day: '16',
    month: 'Sent',
    time: '18:00 gacha',
    title: 'Dars testining oxirgi muddati',
    course: 'Suvdan samarali foydalanish',
    place: '20 savol · 25 daqiqa',
    tone: 'orange' as const,
    icon: FileQuestionIcon
  },
  {
    day: '25',
    month: 'Sent',
    time: '10:00',
    title: 'Yangi kurs boshlanishi',
    course: 'Suv xo‘jaligi loyihachisi',
    place: 'Toshkent shahri',
    tone: 'green' as const,
    icon: CalendarDaysIcon
  }
];

const StudentScheduleRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-24 sm:px-6'>
      <AgroPageIntro
        title='O‘quv taqvimi'
        actions={
          <Button className='rounded-full' variant='outline'>
            <BellRingIcon /> Eslatmalar yoqilgan
          </Button>
        }
        description='Kurs boshlanishlari, oflayn mashg‘ulotlar, test muddatlari va sertifikat bilan bog‘liq sanalar.'
        eyebrow='2026-yil sentabr'
      />

      <section className='grid gap-5 xl:grid-cols-[1fr_20rem]'>
        <Card className='border-border/80'>
          <CardContent className='p-5 sm:p-6'>
            <div className='space-y-3'>
              {events.map((event) => {
                const Icon = event.icon;
                return (
                  <article
                    key={`${event.day}-${event.title}`}
                    className='flex flex-col gap-4 rounded-2xl border bg-[#fbfdfb] p-4 sm:flex-row sm:items-center'
                  >
                    <div className='bg-primary text-primary-foreground grid size-16 shrink-0 place-items-center rounded-2xl text-center'>
                      <span>
                        <span className='block text-[10px] font-bold uppercase'>{event.month}</span>
                        <span className='block text-2xl leading-none font-semibold'>
                          {event.day}
                        </span>
                      </span>
                    </div>
                    <span className='bg-primary/10 text-primary hidden size-10 shrink-0 place-items-center rounded-xl md:grid'>
                      <Icon className='size-5' />
                    </span>
                    <div className='min-w-0 flex-1'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <h2 className='font-semibold'>{event.title}</h2>
                        <DemoStatus tone={event.tone}>{event.time}</DemoStatus>
                      </div>
                      <p className='text-muted-foreground mt-1 text-sm'>{event.course}</p>
                      <p className='text-muted-foreground mt-2 flex items-center gap-2 text-xs'>
                        <MapPinIcon className='size-3.5' /> {event.place}
                      </p>
                    </div>
                    <Button className='rounded-full' size='sm' variant='outline'>
                      Batafsil
                    </Button>
                  </article>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className='space-y-5'>
          <Card className='border-primary/20 bg-primary/[0.035]'>
            <CardContent className='p-5'>
              <p className='text-primary text-xs font-bold tracking-[0.12em] uppercase'>
                Eng yaqin tadbir
              </p>
              <h2 className='mt-3 font-[Georgia,serif] text-2xl font-semibold text-[#173f37]'>
                Amaliy mashg‘ulot
              </h2>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                Tizim montaji va suv sarfini dala sharoitida o‘lchash.
              </p>
              <div className='mt-5 space-y-3 text-sm'>
                <p className='flex items-center gap-2'>
                  <Clock3Icon className='text-primary size-4' /> 12-sentabr, 09:30
                </p>
                <p className='flex items-start gap-2'>
                  <MapPinIcon className='text-primary mt-0.5 size-4' /> Toshkent viloyati o‘quv
                  markazi
                </p>
              </div>
              <Button className='mt-5 w-full rounded-full'>
                <NavigationIcon /> Yo‘nalish olish
              </Button>
            </CardContent>
          </Card>
          <div className='flex items-start gap-3 rounded-2xl border bg-white p-4 text-sm'>
            <CheckCircle2Icon className='text-success mt-0.5 size-5 shrink-0' />
            <p className='text-muted-foreground leading-6'>
              Tadbir sanasi yoki manzili o‘zgarsa sizga ilova ichida bildirishnoma yuboriladi.
            </p>
          </div>
        </div>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/schedule/')({
  component: StudentScheduleRoutePage
});
