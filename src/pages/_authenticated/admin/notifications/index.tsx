import { createFileRoute } from '@tanstack/react-router';
import {
  ArrowRightLeftIcon,
  ChevronRightIcon,
  Clock3Icon,
  HeadphonesIcon,
  SearchIcon,
  ShieldAlertIcon,
  UserRoundCheckIcon
} from 'lucide-react';

import { AgroPageIntro, consultations, DemoStatus, MetricCard } from '@/modules/agro-demo';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';

const AdminSupportRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Murojaatlar navbati'
        description='Yangi savollarni yo‘nalish bo‘yicha tasdiqlangan ekspertga biriktiring, javob vaqtini va qayta ochilgan murojaatlarni kuzating.'
        eyebrow='Yagona murojaatlar markazi'
      />
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <MetricCard
          detail='9 tasi ustuvor'
          label='Yangi murojaatlar'
          value='32'
          icon={HeadphonesIcon}
        />
        <MetricCard
          detail='Ekspert tanlanmagan'
          label='Biriktirilmagan'
          value='7'
          icon={UserRoundCheckIcon}
          tone='orange'
        />
        <MetricCard
          detail='30 daqiqadan oshgan'
          label='SLA buzilishi'
          value='9'
          icon={Clock3Icon}
          tone='red'
        />
        <MetricCard
          detail='Bugun yopilgan'
          label='Javob berilgan'
          value='48'
          icon={ShieldAlertIcon}
          tone='green'
        />
      </section>
      <Card className='border-border/80'>
        <CardContent className='p-5 sm:p-6'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <label className='relative flex-1'>
              <span className='sr-only'>Murojaat qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input className='pl-9' placeholder='Murojaat ID, foydalanuvchi yoki mavzu…' />
            </label>
            <Button variant='outline'>Yo‘nalish</Button>
            <Button variant='outline'>Ustuvorlik</Button>
          </div>
          <div className='mt-5 space-y-3'>
            {consultations.map((item, index) => (
              <article
                key={item.id}
                className={
                  index === 0
                    ? 'border-water/30 bg-water/[0.035] rounded-2xl border p-4'
                    : 'rounded-2xl border bg-[#fbfdfb] p-4'
                }
              >
                <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
                  <Avatar className='size-11'>
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
                      {item.user} · {item.region} · {item.crop}, {item.area}
                    </p>
                    <p className='text-muted-foreground mt-2 line-clamp-1 text-xs'>
                      {item.preview}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground text-xs'>{item.time}</span>
                    <Button className='rounded-full' size='sm' variant='outline'>
                      <ArrowRightLeftIcon /> Ekspertga biriktirish
                    </Button>
                    <Button aria-label='Murojaatni ochish' size='icon' variant='ghost'>
                      <ChevronRightIcon />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/admin/notifications/')({
  component: AdminSupportRoutePage
});
