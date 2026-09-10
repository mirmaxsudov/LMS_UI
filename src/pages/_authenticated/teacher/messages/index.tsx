import { createFileRoute } from '@tanstack/react-router';
import {
  CheckCircle2Icon,
  Clock3Icon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  SearchIcon,
  SendIcon
} from 'lucide-react';

import { AgroPageIntro, consultations, DemoStatus } from '@/modules/agro-demo';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';
import { Textarea } from '@/shared/ui/textarea';

const ExpertMessagesRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Murojaatlar'
        description='Foydalanuvchi tavsifi, ekin turi, maydon hajmi va media fayllarini ko‘rib, tushunarli javob yuboring.'
        eyebrow='Ekspert ish joyi'
      />
      <section className='grid min-h-[42rem] overflow-hidden rounded-[1.75rem] border bg-white shadow-[0_20px_60px_rgba(23,33,27,0.07)] lg:grid-cols-[21rem_1fr]'>
        <aside className='border-b bg-[#f7faf8] lg:border-r lg:border-b-0'>
          <div className='border-b p-4'>
            <label className='relative block'>
              <span className='sr-only'>Murojaat qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input className='rounded-xl bg-white pl-9' placeholder='Murojaatni qidiring…' />
            </label>
            <div className='mt-3 flex gap-2'>
              <Button className='rounded-full' size='sm'>
                Faol 7
              </Button>
              <Button className='rounded-full' size='sm' variant='outline'>
                Tarix
              </Button>
            </div>
          </div>
          <div className='divide-y'>
            {consultations.map((item, index) => (
              <button
                key={item.id}
                className={
                  index === 0
                    ? 'bg-primary/[0.055] w-full p-4 text-left'
                    : 'hover:bg-muted/70 w-full p-4 text-left'
                }
                type='button'
              >
                <div className='flex gap-3'>
                  <Avatar className='size-10'>
                    <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 flex-1'>
                    <div className='flex justify-between gap-2'>
                      <p className='truncate text-sm font-semibold'>{item.subject}</p>
                      <span className='text-muted-foreground shrink-0 text-[10px]'>
                        {item.time}
                      </span>
                    </div>
                    <p className='text-muted-foreground mt-1 line-clamp-2 text-xs leading-5'>
                      {item.preview}
                    </p>
                    <div className='mt-2'>
                      <DemoStatus tone={item.tone}>{item.status}</DemoStatus>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>
        <div className='flex min-h-[40rem] flex-col'>
          <header className='flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4'>
            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-semibold'>Sherzod Mamatqulov</p>
                <DemoStatus tone='blue'>MQ-8821</DemoStatus>
              </div>
              <p className='text-muted-foreground mt-1 text-xs'>
                Qashqadaryo · Paxta · 12 ga · Tomchilatib sug‘orish
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-warning flex items-center gap-1 text-xs font-semibold'>
                <Clock3Icon className='size-4' /> 22 daqiqa qoldi
              </span>
              <Button size='icon' variant='ghost'>
                <MoreHorizontalIcon />
              </Button>
            </div>
          </header>
          <div className='grid flex-1 xl:grid-cols-[1fr_17rem]'>
            <div className='flex min-h-[34rem] flex-col'>
              <div className='flex-1 space-y-4 bg-[#fbfdfb] p-5'>
                <div className='max-w-xl rounded-[1.25rem] rounded-bl-sm border bg-white p-4 shadow-sm'>
                  <p className='text-sm leading-6'>
                    Assalomu alaykum. Filtrni tozaladik, lekin oxirgi qatordagi tomizgichlar sust
                    ishlayapti. Magistralda 2.4 bar, oxirida 0.7 bar ko‘rsatmoqda.
                  </p>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    <span className='bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-xs'>
                      <ImageIcon className='size-4' /> filtr.jpg
                    </span>
                    <span className='bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-xs'>
                      <ImageIcon className='size-4' /> manometr.jpg
                    </span>
                  </div>
                  <p className='text-muted-foreground mt-2 text-right text-[11px]'>09:18</p>
                </div>
                <div className='bg-primary text-primary-foreground ml-auto max-w-xl rounded-[1.25rem] rounded-br-sm p-4'>
                  <p className='text-sm leading-6'>
                    Va alaykum assalom. Lateral quvur diametri, uzunligi va bitta qatordagi
                    tomizgichlar sonini yozib yuboring. Hisoblab ko‘raman.
                  </p>
                  <p className='mt-2 text-right text-[11px] text-white/65'>09:24 · Yetkazildi</p>
                </div>
              </div>
              <footer className='border-t bg-white p-4'>
                <Textarea
                  className='min-h-20 resize-none rounded-xl'
                  placeholder='Ekspert javobini yozing…'
                />
                <div className='mt-3 flex items-center justify-between'>
                  <div className='flex gap-1'>
                    <Button aria-label='Rasm' size='icon' variant='ghost'>
                      <ImageIcon />
                    </Button>
                    <Button aria-label='Fayl' size='icon' variant='ghost'>
                      <PaperclipIcon />
                    </Button>
                    <Button aria-label='PDF' size='icon' variant='ghost'>
                      <FileTextIcon />
                    </Button>
                  </div>
                  <Button className='rounded-full'>
                    Javob yuborish <SendIcon />
                  </Button>
                </div>
              </footer>
            </div>
            <aside className='hidden border-l bg-white p-4 xl:block'>
              <p className='text-muted-foreground text-xs font-bold tracking-[0.12em] uppercase'>
                Murojaat ma’lumotlari
              </p>
              <dl className='mt-4 space-y-4 text-sm'>
                <div>
                  <dt className='text-muted-foreground text-xs'>Yo‘nalish</dt>
                  <dd className='mt-1 font-medium'>Tomchilatib sug‘orish</dd>
                </div>
                <div>
                  <dt className='text-muted-foreground text-xs'>Ekin turi</dt>
                  <dd className='mt-1 font-medium'>Paxta</dd>
                </div>
                <div>
                  <dt className='text-muted-foreground text-xs'>Maydon</dt>
                  <dd className='mt-1 font-medium'>12 gektar</dd>
                </div>
                <div>
                  <dt className='text-muted-foreground text-xs'>Hudud</dt>
                  <dd className='mt-1 font-medium'>Qashqadaryo</dd>
                </div>
              </dl>
              <Button className='mt-6 w-full rounded-full' variant='outline'>
                <CheckCircle2Icon /> Javob berildi
              </Button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/teacher/messages/')({
  component: ExpertMessagesRoutePage
});
