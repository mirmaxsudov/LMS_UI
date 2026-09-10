import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';
import {
  ArrowUpRightIcon,
  CheckCheckIcon,
  FileIcon,
  HeadphonesIcon,
  ImageIcon,
  MessageCircleMoreIcon,
  PaperclipIcon,
  SendIcon,
  ShieldCheckIcon,
  SparklesIcon
} from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/ui/sheet';
import { Textarea } from '@/shared/ui/textarea';

import type { DemoTone } from './data';

const toneClasses: Record<DemoTone, string> = {
  teal: 'border-primary/20 bg-primary/10 text-primary',
  green: 'border-agriculture/20 bg-agriculture/10 text-agriculture',
  blue: 'border-water/20 bg-water/10 text-water',
  orange: 'border-warning/20 bg-warning/10 text-warning',
  red: 'border-destructive/20 bg-destructive/10 text-destructive'
};

interface DemoStatusProps {
  children: ReactNode;
  tone?: DemoTone;
}

export const DemoStatus = ({ children, tone = 'teal' }: DemoStatusProps) => (
  <span
    className={cn(
      'inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
      toneClasses[tone]
    )}
  >
    <span className='size-1.5 rounded-full bg-current' />
    {children}
  </span>
);

interface AgroPageIntroProps {
  actions?: ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
}

export const AgroPageIntro = ({ actions, description, eyebrow, title }: AgroPageIntroProps) => (
  <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
    <div className='max-w-3xl'>
      {eyebrow && (
        <p className='text-agriculture text-xs font-bold tracking-[0.15em] uppercase'>{eyebrow}</p>
      )}
      <h1 className='mt-2 font-[Georgia,serif] text-3xl leading-tight font-semibold tracking-[-0.025em] text-[#173f37] sm:text-4xl'>
        {title}
      </h1>
      <p className='text-muted-foreground mt-3 max-w-2xl text-sm leading-6 sm:text-base'>
        {description}
      </p>
    </div>
    {actions && <div className='flex flex-wrap gap-2'>{actions}</div>}
  </div>
);

interface MetricCardProps {
  detail: string;
  icon: LucideIcon;
  label: string;
  tone?: DemoTone;
  value: string;
}

export const MetricCard = ({
  detail,
  icon: Icon,
  label,
  tone = 'teal',
  value
}: MetricCardProps) => (
  <Card className='group border-border/80 bg-card overflow-hidden shadow-[0_12px_35px_rgba(23,33,27,0.045)] transition-transform duration-300 hover:-translate-y-0.5'>
    <CardContent className='p-5'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-muted-foreground text-sm font-medium'>{label}</p>
          <p className='mt-3 text-3xl font-semibold tracking-[-0.03em]'>{value}</p>
          <p className='text-muted-foreground mt-1 text-xs'>{detail}</p>
        </div>
        <span
          className={cn('grid size-11 place-items-center rounded-2xl border', toneClasses[tone])}
        >
          <Icon className='size-5' />
        </span>
      </div>
    </CardContent>
  </Card>
);

interface SectionHeadingProps {
  action?: ReactNode;
  description?: string;
  title: string;
}

export const SectionHeading = ({ action, description, title }: SectionHeadingProps) => (
  <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
    <div>
      <h2 className='text-lg font-semibold tracking-tight'>{title}</h2>
      {description && <p className='text-muted-foreground mt-1 text-sm'>{description}</p>}
    </div>
    {action}
  </div>
);

export const ExpertChatButton = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button className='fixed right-5 bottom-5 z-40 h-13 rounded-full px-5 shadow-[0_18px_45px_rgba(15,118,110,0.32)] sm:right-7 sm:bottom-7'>
        <MessageCircleMoreIcon className='size-5' />
        Mutaxassisga yozish
        <span className='bg-success absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-white' />
      </Button>
    </SheetTrigger>
    <SheetContent className='w-full gap-0 p-0 sm:max-w-[28rem]'>
      <SheetHeader className='border-b bg-[#f4f8f5] px-5 py-5 text-left'>
        <div className='flex items-center gap-3'>
          <span className='bg-primary/10 text-primary grid size-11 place-items-center rounded-2xl'>
            <HeadphonesIcon className='size-5' />
          </span>
          <div>
            <SheetTitle>Jonli mutaxassis</SheetTitle>
            <SheetDescription className='mt-0.5 flex items-center gap-1.5'>
              <span className='bg-success size-2 rounded-full' />
              O‘rtacha javob vaqti 12 daqiqa
            </SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <div className='flex-1 space-y-5 overflow-y-auto bg-[#fbfdfb] p-5'>
        <div className='flex justify-center'>
          <span className='text-muted-foreground bg-muted rounded-full px-3 py-1 text-xs'>
            Bugun
          </span>
        </div>
        <div className='max-w-[86%] rounded-[1.25rem] rounded-bl-sm border bg-white p-4 shadow-sm'>
          <p className='text-sm leading-6'>
            Assalomu alaykum. Muammoingizni yozing, kerak bo‘lsa rasm yoki PDF biriktiring.
          </p>
          <p className='text-muted-foreground mt-2 text-right text-[11px]'>09:24</p>
        </div>
        <div className='bg-primary text-primary-foreground ml-auto max-w-[86%] rounded-[1.25rem] rounded-br-sm p-4 shadow-sm'>
          <p className='text-sm leading-6'>
            Tomchilatish quvurining oxirida bosim pasaymoqda. Filtr rasmini yuborsam bo‘ladimi?
          </p>
          <p className='mt-2 flex items-center justify-end gap-1 text-[11px] text-white/70'>
            09:26 <CheckCheckIcon className='size-3.5' />
          </p>
        </div>
        <div className='max-w-[86%] rounded-[1.25rem] rounded-bl-sm border bg-white p-4 shadow-sm'>
          <p className='text-sm leading-6'>
            Albatta. Filtr va manometr ko‘rsatkichini ham yuboring. Tizimni ko‘rib chiqamiz.
          </p>
          <p className='text-muted-foreground mt-2 text-right text-[11px]'>09:28</p>
        </div>
      </div>

      <div className='border-t bg-white p-4'>
        <Textarea className='min-h-24 resize-none' placeholder='Xabaringizni yozing…' />
        <div className='mt-3 flex items-center justify-between'>
          <div className='flex gap-1'>
            <Button aria-label='Rasm biriktirish' size='icon' variant='ghost'>
              <ImageIcon />
            </Button>
            <Button aria-label='Fayl biriktirish' size='icon' variant='ghost'>
              <PaperclipIcon />
            </Button>
            <Button aria-label='PDF biriktirish' size='icon' variant='ghost'>
              <FileIcon />
            </Button>
          </div>
          <Button>
            Yuborish
            <SendIcon />
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

export const DemoModeNote = () => (
  <div className='border-water/20 bg-water/8 text-water flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm'>
    <SparklesIcon className='mt-0.5 size-4 shrink-0' />
    <p>
      Taqdimot rejimi: ekrandagi ma’lumotlar platforma jarayonini ko‘rsatish uchun tayyorlangan.
    </p>
  </div>
);

export const InlineLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Button asChild className='rounded-full' size='sm' variant='outline'>
    <Link to={to as never}>
      {children}
      <ArrowUpRightIcon />
    </Link>
  </Button>
);

export const VerifiedMark = () => (
  <span className='text-primary inline-flex items-center gap-1 text-xs font-semibold'>
    <ShieldCheckIcon className='size-4' /> Tasdiqlangan
  </span>
);
