import { createFileRoute } from '@tanstack/react-router';
import {
  AlarmClockIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  FileQuestionIcon,
  LockKeyholeIcon,
  RotateCcwIcon,
  ShieldCheckIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, MetricCard } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

const testHistory = [
  {
    name: 'Suv sarfini hisoblash',
    score: '86%',
    status: 'O‘tdi',
    date: '8-sentabr',
    tone: 'green' as const
  },
  {
    name: 'Filtrlash tizimlari',
    score: '62%',
    status: 'Qayta urinish',
    date: '5-sentabr',
    tone: 'orange' as const
  },
  {
    name: 'Tuproq namligini aniqlash',
    score: '91%',
    status: 'O‘tdi',
    date: '29-avgust',
    tone: 'green' as const
  }
];

const StudentTestsRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-24 sm:px-6'>
      <AgroPageIntro
        title='Testlar'
        description='Ochilgan dars va yakuniy testlarni topshiring, natijalarni va mavjud qayta urinishlarni kuzating.'
        eyebrow='Bilim nazorati'
      />

      <section className='grid gap-4 sm:grid-cols-3'>
        <MetricCard
          detail='Bugun ochiq'
          label='Topshiriladigan'
          value='2'
          icon={FileQuestionIcon}
        />
        <MetricCard
          detail='O‘rtacha natija'
          label='Muvaffaqiyatli'
          value='8'
          icon={CheckCircle2Icon}
          tone='green'
        />
        <MetricCard
          detail='1 ta urinish qoldi'
          label='Qayta urinish'
          value='1'
          icon={RotateCcwIcon}
          tone='orange'
        />
      </section>

      <section className='grid gap-5 xl:grid-cols-[1.1fr_0.9fr]'>
        <Card className='border-primary/25 overflow-hidden py-0 shadow-[0_20px_60px_rgba(15,118,110,0.1)]'>
          <CardContent className='p-0'>
            <div className='public-water-lines bg-[#153f38] p-6 text-white sm:p-7'>
              <div className='flex flex-wrap items-start justify-between gap-4'>
                <div>
                  <DemoStatus tone='blue'>Test ochiq</DemoStatus>
                  <h2 className='mt-4 font-[Georgia,serif] text-3xl font-semibold'>
                    Tomchilatish tizimini loyihalash
                  </h2>
                  <p className='mt-2 text-sm text-white/65'>Suvdan samarali foydalanish · 8-dars</p>
                </div>
                <ShieldCheckIcon className='size-8 text-[#c9e16f]' />
              </div>
            </div>
            <div className='space-y-5 p-6'>
              <div className='grid gap-3 sm:grid-cols-3'>
                <div className='bg-secondary rounded-2xl p-4'>
                  <p className='text-muted-foreground text-xs'>Savollar</p>
                  <p className='mt-1 text-xl font-semibold'>20 ta</p>
                </div>
                <div className='bg-secondary rounded-2xl p-4'>
                  <p className='text-muted-foreground text-xs'>Vaqt</p>
                  <p className='mt-1 text-xl font-semibold'>25 daqiqa</p>
                </div>
                <div className='bg-secondary rounded-2xl p-4'>
                  <p className='text-muted-foreground text-xs'>O‘tish bali</p>
                  <p className='mt-1 text-xl font-semibold'>70%</p>
                </div>
              </div>
              <div className='border-warning/20 bg-warning/[0.045] flex items-start gap-3 rounded-2xl border p-4'>
                <CircleAlertIcon className='text-warning mt-0.5 size-5 shrink-0' />
                <p className='text-sm leading-6'>
                  Test vaqtida sahifadan chiqish natijani avtomatik yuborishi mumkin. Boshlashdan
                  oldin internet aloqasini tekshiring.
                </p>
              </div>
              <Button className='h-11 w-full rounded-full'>
                <AlarmClockIcon /> Testni boshlash
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className='border-border/80'>
          <CardContent className='p-6'>
            <div className='flex items-start gap-3'>
              <span className='bg-muted text-muted-foreground grid size-11 place-items-center rounded-2xl'>
                <LockKeyholeIcon className='size-5' />
              </span>
              <div>
                <DemoStatus tone='orange'>Qulflangan</DemoStatus>
                <h2 className='mt-3 text-lg font-semibold'>Kurs yakuniy testi</h2>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>
                  Yakuniy test 10-dars videosi va dars testlari tugagandan so‘ng avtomatik ochiladi.
                </p>
              </div>
            </div>
            <div className='mt-6'>
              <div className='mb-2 flex justify-between text-xs'>
                <span className='text-muted-foreground'>Ochish shartlari</span>
                <span className='font-semibold'>7/10 dars</span>
              </div>
              <Progress value={70} />
            </div>
            <ul className='mt-5 space-y-3 text-sm'>
              <li className='flex items-center gap-2'>
                <CheckCircle2Icon className='text-success size-4' /> 7 ta video to‘liq ko‘rilgan
              </li>
              <li className='flex items-center gap-2'>
                <CheckCircle2Icon className='text-success size-4' /> 7 ta dars testi topshirilgan
              </li>
              <li className='text-muted-foreground flex items-center gap-2'>
                <LockKeyholeIcon className='size-4' /> Yana 3 ta darsni yakunlang
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Card className='border-border/80'>
        <CardContent className='p-5 sm:p-6'>
          <h2 className='text-lg font-semibold'>Testlar tarixi</h2>
          <div className='mt-4 divide-y'>
            {testHistory.map((test) => (
              <div
                key={test.name}
                className='flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center'
              >
                <span className='bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl'>
                  <FileQuestionIcon className='size-4' />
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='font-medium'>{test.name}</p>
                  <p className='text-muted-foreground mt-0.5 text-xs'>{test.date}</p>
                </div>
                <p className='text-2xl font-semibold'>{test.score}</p>
                <DemoStatus tone={test.tone}>{test.status}</DemoStatus>
                <Button className='rounded-full' size='sm' variant='outline'>
                  Natijani ko‘rish
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/quizzes/')({
  component: StudentTestsRoutePage
});
