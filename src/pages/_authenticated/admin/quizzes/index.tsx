import { createFileRoute } from '@tanstack/react-router';
import {
  AlarmClockIcon,
  CameraIcon,
  CopyIcon,
  FileQuestionIcon,
  PlusIcon,
  ShuffleIcon,
  SlidersHorizontalIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, MetricCard } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';

const tests = [
  {
    name: 'Tomchilatish tizimini hisoblash',
    course: 'Suvdan samarali foydalanish',
    type: 'Dars testi',
    questions: 20,
    time: '25 daq',
    pass: '70%',
    attempts: 142,
    status: 'Faol',
    tone: 'green' as const
  },
  {
    name: 'Loyihachi yakuniy attestatsiyasi',
    course: 'Suv xo‘jaligi loyihachisi',
    type: 'Yakuniy test',
    questions: 40,
    time: '60 daq',
    pass: '70%',
    attempts: 38,
    status: 'Rejalashtirilgan',
    tone: 'blue' as const
  },
  {
    name: 'Nasos va filtr diagnostikasi',
    course: 'Nasos va filtrlar servisi',
    type: 'Dars testi',
    questions: 15,
    time: '20 daq',
    pass: '65%',
    attempts: 86,
    status: 'Qoralama',
    tone: 'orange' as const
  }
];

const AdminTestsRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Testlarni boshqarish'
        actions={
          <Button className='rounded-full'>
            <PlusIcon /> Yangi test
          </Button>
        }
        description='Dars va yakuniy testlarning savollari, vaqt chegarasi, o‘tish bali, urinishlar soni va nazorat qoidalarini sozlang.'
        eyebrow='Bilim nazorati'
      />
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <MetricCard
          detail='7 ta yakuniy test'
          label='Faol testlar'
          value='26'
          icon={FileQuestionIcon}
        />
        <MetricCard
          detail='Bugungi natijalar'
          label='Urinishlar'
          value='184'
          icon={AlarmClockIcon}
          tone='blue'
        />
        <MetricCard
          detail='Savol va variantlar'
          label='Randomlashtirilgan'
          value='19'
          icon={ShuffleIcon}
          tone='green'
        />
        <MetricCard
          detail='Face ID yoki kamera'
          label='Nazoratli testlar'
          value='6'
          icon={CameraIcon}
          tone='orange'
        />
      </section>
      <section className='grid gap-5 lg:grid-cols-2 2xl:grid-cols-3'>
        {tests.map((test) => (
          <Card
            key={test.name}
            className='border-border/80 shadow-[0_16px_45px_rgba(23,33,27,0.05)]'
          >
            <CardContent className='space-y-5 p-5'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='text-muted-foreground text-xs font-bold tracking-[0.1em] uppercase'>
                    {test.type}
                  </p>
                  <h2 className='mt-2 text-lg leading-6 font-semibold'>{test.name}</h2>
                  <p className='text-muted-foreground mt-1 text-sm'>{test.course}</p>
                </div>
                <DemoStatus tone={test.tone}>{test.status}</DemoStatus>
              </div>
              <div className='grid grid-cols-3 gap-2'>
                <div className='bg-secondary rounded-xl p-3 text-center'>
                  <p className='text-muted-foreground text-[10px] uppercase'>Savol</p>
                  <p className='mt-1 font-semibold'>{test.questions}</p>
                </div>
                <div className='bg-secondary rounded-xl p-3 text-center'>
                  <p className='text-muted-foreground text-[10px] uppercase'>Vaqt</p>
                  <p className='mt-1 font-semibold'>{test.time}</p>
                </div>
                <div className='bg-secondary rounded-xl p-3 text-center'>
                  <p className='text-muted-foreground text-[10px] uppercase'>O‘tish</p>
                  <p className='mt-1 font-semibold'>{test.pass}</p>
                </div>
              </div>
              <p className='text-muted-foreground text-sm'>
                {test.attempts} ta urinish qayd etilgan
              </p>
              <div className='flex gap-2 border-t pt-4'>
                <Button className='flex-1 rounded-full' size='sm' variant='outline'>
                  <CopyIcon /> Nusxalash
                </Button>
                <Button className='flex-1 rounded-full' size='sm'>
                  <SlidersHorizontalIcon /> Sozlash
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/admin/quizzes/')({
  component: AdminTestsRoutePage
});
