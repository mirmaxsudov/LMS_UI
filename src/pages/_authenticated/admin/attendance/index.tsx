import { createFileRoute } from '@tanstack/react-router';
import {
  CameraIcon,
  CheckCircle2Icon,
  Clock3Icon,
  MapPinIcon,
  QrCodeIcon,
  SearchIcon,
  UserCheckIcon,
  UserXIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, MetricCard } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const attendees = [
  {
    name: 'Aziza Abdullayeva',
    pinfl: '••••7216',
    arrival: '09:18',
    entry: 'Face ID',
    exit: 'Kutilmoqda',
    status: 'Qatnashmoqda',
    tone: 'green' as const
  },
  {
    name: 'Mansur Ergashev',
    pinfl: '••••3842',
    arrival: '09:27',
    entry: 'QR + pasport',
    exit: 'Kutilmoqda',
    status: 'Kechikdi',
    tone: 'orange' as const
  },
  {
    name: 'Kamoliddin Yusupov',
    pinfl: '••••1059',
    arrival: '—',
    entry: '—',
    exit: '—',
    status: 'Kelmagan',
    tone: 'red' as const
  },
  {
    name: 'Mahliyo To‘rayeva',
    pinfl: '••••4471',
    arrival: '09:11',
    entry: 'Face ID',
    exit: 'Kutilmoqda',
    status: 'Qatnashmoqda',
    tone: 'green' as const
  }
];

const AdminAttendanceRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Qatnashuv va Face ID'
        actions={
          <>
            <Button className='rounded-full' variant='outline'>
              <QrCodeIcon /> QR orqali topish
            </Button>
            <Button className='rounded-full'>
              <CameraIcon /> Face ID tekshiruvi
            </Button>
          </>
        }
        description='Mashg‘ulot boshlanishi va yakunida shaxsni tasdiqlang, kechikish va qo‘lda kiritilgan holatlarni sabab bilan qayd eting.'
        eyebrow='Oflayn mashg‘ulot'
      />
      <section className='public-water-lines relative overflow-hidden rounded-[1.75rem] bg-[#153f38] p-6 text-white'>
        <div className='relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <DemoStatus tone='green'>Mashg‘ulot davom etmoqda</DemoStatus>
            <h2 className='mt-4 font-[Georgia,serif] text-3xl font-semibold'>
              Tomchilatib sug‘orish tizimini montaj qilish
            </h2>
            <div className='mt-3 flex flex-wrap gap-4 text-sm text-white/65'>
              <span className='flex items-center gap-2'>
                <Clock3Icon className='size-4' /> 09:30 – 13:00
              </span>
              <span className='flex items-center gap-2'>
                <MapPinIcon className='size-4' /> Toshkent viloyati o‘quv markazi
              </span>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[30rem]'>
            <div className='rounded-2xl bg-white/10 p-4'>
              <p className='text-xs text-white/55'>Ro‘yxatda</p>
              <p className='mt-1 text-2xl font-semibold'>24</p>
            </div>
            <div className='rounded-2xl bg-white/10 p-4'>
              <p className='text-xs text-white/55'>Keldi</p>
              <p className='mt-1 text-2xl font-semibold'>21</p>
            </div>
            <div className='rounded-2xl bg-white/10 p-4'>
              <p className='text-xs text-white/55'>Kechikdi</p>
              <p className='mt-1 text-2xl font-semibold'>2</p>
            </div>
            <div className='rounded-2xl bg-white/10 p-4'>
              <p className='text-xs text-white/55'>Kelmagan</p>
              <p className='mt-1 text-2xl font-semibold'>1</p>
            </div>
          </div>
        </div>
      </section>
      <section className='grid gap-4 sm:grid-cols-3'>
        <MetricCard
          detail='87.5% qatnashuv'
          label='Tasdiqlangan'
          value='21'
          icon={UserCheckIcon}
          tone='green'
        />
        <MetricCard
          detail='Qo‘lda izoh talab etiladi'
          label='Kechikkan'
          value='2'
          icon={Clock3Icon}
          tone='orange'
        />
        <MetricCard
          detail='Bildirishnoma yuboriladi'
          label='Kelmagan'
          value='1'
          icon={UserXIcon}
          tone='red'
        />
      </section>
      <Card className='border-border/80'>
        <CardContent className='p-5 sm:p-6'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <label className='relative flex-1'>
              <span className='sr-only'>Qatnashuvchi qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input className='pl-9' placeholder='F.I.Sh., pasport yoki JSHSHIR…' />
            </label>
            <Button variant='outline'>Faqat kelmaganlar</Button>
          </div>
          <Table className='mt-5'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Foydalanuvchi</TableHead>
                <TableHead>Kelgan vaqt</TableHead>
                <TableHead>Kirish tasdig‘i</TableHead>
                <TableHead>Chiqish tasdig‘i</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Amal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.map((attendee) => (
                <TableRow key={attendee.name}>
                  <TableCell className='py-4'>
                    <p className='font-medium'>{attendee.name}</p>
                    <p className='text-muted-foreground mt-0.5 text-xs'>JSHSHIR {attendee.pinfl}</p>
                  </TableCell>
                  <TableCell>{attendee.arrival}</TableCell>
                  <TableCell>{attendee.entry}</TableCell>
                  <TableCell>{attendee.exit}</TableCell>
                  <TableCell>
                    <DemoStatus tone={attendee.tone}>{attendee.status}</DemoStatus>
                  </TableCell>
                  <TableCell>
                    <Button size='sm' variant='outline'>
                      <CheckCircle2Icon /> Tasdiqlash
                    </Button>
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

export const Route = createFileRoute('/_authenticated/admin/attendance/')({
  component: AdminAttendanceRoutePage
});
