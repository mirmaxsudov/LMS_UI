import { createFileRoute } from '@tanstack/react-router';
import {
  CirclePlusIcon,
  Clock3Icon,
  HeadphonesIcon,
  PaperclipIcon,
  SearchIcon,
  StarIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus } from '@/modules/agro-demo';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';
import { Textarea } from '@/shared/ui/textarea';

const threads = [
  {
    id: 'MQ-8751',
    expert: 'Shahzoda Karimova',
    initials: 'SK',
    speciality: 'Tomchilatib sug‘orish eksperti',
    subject: 'Quvur oxirida bosim pasayishi',
    preview: 'Filtr va manometr rasmini yuboring, sarfni birga tekshiramiz.',
    time: '09:28',
    status: 'Javob berilmoqda',
    tone: 'orange' as const
  },
  {
    id: 'MQ-8612',
    expert: 'Otabek Rasulov',
    initials: 'OR',
    speciality: 'Nasos va filtr mutaxassisi',
    subject: 'Nasos tanlash bo‘yicha maslahat',
    preview: 'Hisob-kitob faylini ko‘rib chiqdim. 18.5 kW model yetarli.',
    time: '8-sentabr',
    status: 'Javob berildi',
    tone: 'green' as const
  }
];

const StudentMessagesRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-24 sm:px-6'>
      <AgroPageIntro
        title='Mening murojaatlarim'
        actions={
          <Button className='rounded-full'>
            <CirclePlusIcon /> Yangi murojaat
          </Button>
        }
        description='Savollaringiz, biriktirilgan fayllar va tasdiqlangan ekspert javoblarini bir joyda kuzating.'
        eyebrow='Mutaxassis yordami'
      />

      <section className='grid min-h-[38rem] overflow-hidden rounded-[1.75rem] border bg-white shadow-[0_20px_60px_rgba(23,33,27,0.07)] lg:grid-cols-[22rem_1fr]'>
        <aside className='border-b bg-[#f7faf8] lg:border-r lg:border-b-0'>
          <div className='border-b p-4'>
            <label className='relative block'>
              <span className='sr-only'>Murojaat qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input className='rounded-xl bg-white pl-9' placeholder='Murojaatni qidiring…' />
            </label>
          </div>
          <div className='divide-y'>
            {threads.map((thread, index) => (
              <button
                key={thread.id}
                className={
                  index === 0
                    ? 'bg-primary/[0.055] w-full p-4 text-left'
                    : 'hover:bg-muted/70 w-full p-4 text-left transition-colors'
                }
                type='button'
              >
                <div className='flex items-start gap-3'>
                  <Avatar className='size-10'>
                    <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                      {thread.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center justify-between gap-2'>
                      <p className='truncate text-sm font-semibold'>{thread.subject}</p>
                      <span className='text-muted-foreground shrink-0 text-[10px]'>
                        {thread.time}
                      </span>
                    </div>
                    <p className='text-muted-foreground mt-1 line-clamp-2 text-xs leading-5'>
                      {thread.preview}
                    </p>
                    <div className='mt-2'>
                      <DemoStatus tone={thread.tone}>{thread.status}</DemoStatus>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className='flex min-h-[35rem] flex-col'>
          <header className='flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-11'>
                <AvatarFallback className='bg-primary text-primary-foreground font-semibold'>
                  SK
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='font-semibold'>Shahzoda Karimova</p>
                  <span className='bg-success size-2 rounded-full' />
                </div>
                <p className='text-muted-foreground text-xs'>Tomchilatib sug‘orish eksperti</p>
              </div>
            </div>
            <p className='text-muted-foreground flex items-center gap-1.5 text-xs'>
              <Clock3Icon className='size-3.5' /> O‘rtacha javob vaqti 12 daqiqa
            </p>
          </header>

          <div className='flex-1 space-y-4 overflow-y-auto bg-[#fbfdfb] p-5'>
            <div className='bg-muted text-muted-foreground mx-auto w-fit rounded-full px-3 py-1 text-xs'>
              Bugun
            </div>
            <div className='bg-primary text-primary-foreground ml-auto max-w-xl rounded-[1.25rem] rounded-br-sm p-4'>
              <p className='text-sm leading-6'>
                Tomchilatish quvurining oxirida bosim pasaymoqda. Filtrni tozaladik, lekin natija
                o‘zgarmadi.
              </p>
              <div className='mt-3 flex gap-2'>
                <span className='rounded-lg bg-white/12 px-3 py-2 text-xs'>
                  📎 filtr.jpg · 1.2 MB
                </span>
                <span className='rounded-lg bg-white/12 px-3 py-2 text-xs'>
                  📎 manometr.jpg · 860 KB
                </span>
              </div>
              <p className='mt-2 text-right text-[11px] text-white/65'>09:26 · O‘qildi</p>
            </div>
            <div className='max-w-xl rounded-[1.25rem] rounded-bl-sm border bg-white p-4 shadow-sm'>
              <p className='text-sm leading-6'>
                Assalomu alaykum. Manometr ko‘rsatkichiga ko‘ra magistral quvurda bosim yetarli.
                Oxirgi sektor klapanini va lateral diametrini tekshiring. Diametr va uzunlikni yozib
                yuboring.
              </p>
              <p className='text-muted-foreground mt-2 text-right text-[11px]'>09:28</p>
            </div>
          </div>

          <footer className='border-t bg-white p-4'>
            <Textarea className='min-h-20 resize-none rounded-xl' placeholder='Javob yozing…' />
            <div className='mt-3 flex items-center justify-between'>
              <Button size='sm' variant='ghost'>
                <PaperclipIcon /> Fayl biriktirish
              </Button>
              <Button className='rounded-full' size='sm'>
                Yuborish
              </Button>
            </div>
          </footer>
        </div>
      </section>

      <Card className='border-agriculture/20 bg-agriculture/[0.04]'>
        <CardContent className='flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-start gap-3'>
            <HeadphonesIcon className='text-agriculture mt-0.5 size-5' />
            <div>
              <p className='font-semibold'>Javob sizga foydali bo‘ldimi?</p>
              <p className='text-muted-foreground mt-1 text-sm'>
                Yopilgan murojaatni baholang yoki zarur bo‘lsa qayta oching.
              </p>
            </div>
          </div>
          <Button className='rounded-full' variant='outline'>
            <StarIcon /> Javobni baholash
          </Button>
        </CardContent>
      </Card>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/messages/')({
  component: StudentMessagesRoutePage
});
