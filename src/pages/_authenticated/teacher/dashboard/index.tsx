import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRightIcon,
  BookOpenCheckIcon,
  Clock3Icon,
  HeadphonesIcon,
  MessageCircleMoreIcon,
  StarIcon,
  UserRoundCheckIcon
} from 'lucide-react';

import {
  AgroPageIntro,
  consultations,
  DemoModeNote,
  DemoStatus,
  MetricCard,
  SectionHeading
} from '@/modules/agro-demo';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

const ExpertDashboardRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Xush kelibsiz, Dilorom'
        actions={<DemoStatus tone='green'>Murojaatlar uchun ochiq</DemoStatus>}
        description='Sizga yo‘nalish bo‘yicha biriktirilgan savollar, javob muddati va foydalanuvchi baholarini kuzating.'
        eyebrow='Tasdiqlangan ekspert'
      />
      <DemoModeNote />
      <section className='public-water-lines relative overflow-hidden rounded-[2rem] bg-[#153f38] p-6 text-white sm:p-8'>
        <div className='relative grid gap-8 lg:grid-cols-[1fr_21rem] lg:items-center'>
          <div>
            <p className='text-xs font-bold tracking-[0.14em] text-[#c9e16f] uppercase'>
              Navbatdagi murojaat
            </p>
            <h2 className='mt-3 max-w-2xl font-[Georgia,serif] text-3xl font-semibold sm:text-4xl'>
              {consultations[0].subject}
            </h2>
            <p className='mt-3 text-sm text-white/65'>
              {consultations[0].user} · {consultations[0].region} · {consultations[0].crop},{' '}
              {consultations[0].area}
            </p>
            <Button asChild className='mt-6 rounded-full bg-white text-[#153f38] hover:bg-white/90'>
              <Link to='/teacher/messages'>
                Murojaatni ochish <ArrowRightIcon />
              </Link>
            </Button>
          </div>
          <div className='rounded-[1.5rem] border border-white/15 bg-white/10 p-5'>
            <div className='flex items-center gap-3'>
              <Clock3Icon className='size-6 text-[#c9e16f]' />
              <div>
                <p className='text-xs text-white/55'>Javob uchun qolgan vaqt</p>
                <p className='mt-1 text-2xl font-semibold'>22 daqiqa</p>
              </div>
            </div>
            <Progress className='mt-5 bg-white/15 [&>div]:bg-[#c9e16f]' value={58} />
            <p className='mt-3 text-xs text-white/55'>SLA: 45 daqiqa</p>
          </div>
        </div>
      </section>
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <MetricCard
          detail='3 tasi yangi'
          label='Faol murojaatlar'
          value='7'
          icon={HeadphonesIcon}
        />
        <MetricCard
          detail='So‘nggi 30 kunda'
          label='Javoblar'
          value='186'
          icon={MessageCircleMoreIcon}
          tone='blue'
        />
        <MetricCard
          detail='O‘rtacha 14 daqiqa'
          label='Javob tezligi'
          value='14m'
          icon={Clock3Icon}
          tone='green'
        />
        <MetricCard
          detail='126 ta baho asosida'
          label='Ekspert bahosi'
          value='4.9'
          icon={StarIcon}
          tone='orange'
        />
      </section>
      <section className='grid gap-5 xl:grid-cols-[1.15fr_0.85fr]'>
        <Card className='border-border/80'>
          <CardContent className='p-5 sm:p-6'>
            <SectionHeading
              title='Murojaatlar navbati'
              action={
                <Button asChild className='rounded-full' size='sm' variant='outline'>
                  <Link to='/teacher/messages'>Barchasi</Link>
                </Button>
              }
              description='Eng yaqin javob muddati bo‘yicha'
            />
            <div className='mt-5 space-y-3'>
              {consultations.map((item) => (
                <article
                  key={item.id}
                  className='flex flex-col gap-4 rounded-2xl border bg-[#fbfdfb] p-4 sm:flex-row sm:items-center'
                >
                  <Avatar className='size-10'>
                    <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 flex-1'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='font-semibold'>{item.subject}</p>
                      <DemoStatus tone={item.tone}>{item.status}</DemoStatus>
                    </div>
                    <p className='text-muted-foreground mt-1 text-sm'>
                      {item.user} · {item.category}
                    </p>
                  </div>
                  <span className='text-muted-foreground text-xs'>{item.time}</span>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className='space-y-5'>
          <Card className='border-agriculture/20 bg-agriculture/[0.04]'>
            <CardContent className='p-5'>
              <UserRoundCheckIcon className='text-agriculture size-8' />
              <h2 className='mt-5 font-[Georgia,serif] text-2xl font-semibold text-[#173f37]'>
                Ekspert profilingiz to‘liq
              </h2>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                Yo‘nalish: tomchilatib sug‘orish · Toshkent va Sirdaryo hududlari.
              </p>
              <Button className='mt-5 w-full rounded-full' variant='outline'>
                Profilni ko‘rish
              </Button>
            </CardContent>
          </Card>
          <Card className='border-border/80'>
            <CardContent className='p-5'>
              <div className='flex items-start gap-3'>
                <BookOpenCheckIcon className='text-primary mt-0.5 size-5' />
                <div>
                  <p className='font-semibold'>Biriktirilgan kurslar</p>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    2 ta faol kursda o‘qituvchi sifatida qatnashyapsiz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/teacher/dashboard/')({
  component: ExpertDashboardRoutePage
});
