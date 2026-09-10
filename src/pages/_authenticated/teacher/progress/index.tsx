import { createFileRoute } from '@tanstack/react-router';
import {
  CheckCircle2Icon,
  Clock3Icon,
  DownloadIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  StarIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, MetricCard } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const history = [
  {
    id: 'MQ-8798',
    user: 'Ulug‘bek Salimov',
    topic: 'Nasosning energiya sarfi oshib ketdi',
    category: 'Nasos va filtr',
    closed: '9-sentabr, 16:44',
    duration: '18 daqiqa',
    rating: '5.0',
    status: 'Yopildi'
  },
  {
    id: 'MQ-8760',
    user: 'Zuhra Hakimova',
    topic: 'Sho‘rlanishga qarshi yuvish me’yori',
    category: 'Tuproq va o‘g‘it',
    closed: '8-sentabr, 13:20',
    duration: '26 daqiqa',
    rating: '4.0',
    status: 'Yopildi'
  },
  {
    id: 'MQ-8743',
    user: 'Javlon Xudoyberdiyev',
    topic: 'Filtrni qayta yuvish davriyligi',
    category: 'Tomchilatib sug‘orish',
    closed: '7-sentabr, 11:08',
    duration: '11 daqiqa',
    rating: '5.0',
    status: 'Yopildi'
  }
];

const ExpertHistoryRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Javoblar tarixi'
        actions={
          <Button className='rounded-full' variant='outline'>
            <DownloadIcon /> Eksport
          </Button>
        }
        description='Yakunlangan va qayta ochilgan murojaatlar, javob tezligi va foydalanuvchi baholarini ko‘ring.'
        eyebrow='Ekspert faoliyati'
      />
      <section className='grid gap-4 sm:grid-cols-3'>
        <MetricCard
          detail='So‘nggi 30 kunda'
          label='Javoblar'
          value='186'
          icon={MessageCircleMoreIcon}
        />
        <MetricCard
          detail='SLA 45 daqiqa'
          label='O‘rtacha vaqt'
          value='14m'
          icon={Clock3Icon}
          tone='green'
        />
        <MetricCard
          detail='126 ta baho'
          label='O‘rtacha baho'
          value='4.9'
          icon={StarIcon}
          tone='orange'
        />
      </section>
      <Card className='border-border/80'>
        <CardContent className='p-5 sm:p-6'>
          <label className='relative block max-w-lg'>
            <span className='sr-only'>Tarixni qidirish</span>
            <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input className='pl-9' placeholder='Mavzu, foydalanuvchi yoki murojaat ID…' />
          </label>
          <Table className='mt-5'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Murojaat</TableHead>
                <TableHead>Mavzu</TableHead>
                <TableHead>Yo‘nalish</TableHead>
                <TableHead>Yopilgan</TableHead>
                <TableHead>Javob vaqti</TableHead>
                <TableHead>Baho</TableHead>
                <TableHead>Holat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='py-4'>
                    <p className='font-mono text-xs'>{item.id}</p>
                    <p className='mt-1 font-medium'>{item.user}</p>
                  </TableCell>
                  <TableCell className='max-w-64 whitespace-normal'>{item.topic}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.closed}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>
                    <span className='flex items-center gap-1 font-semibold'>
                      <StarIcon className='fill-warning text-warning size-4' /> {item.rating}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DemoStatus tone='green'>
                      <CheckCircle2Icon className='size-3' />
                      {item.status}
                    </DemoStatus>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/teacher/progress/')({
  component: ExpertHistoryRoutePage
});
