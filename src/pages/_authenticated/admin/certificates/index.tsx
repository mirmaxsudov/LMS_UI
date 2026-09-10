import { createFileRoute } from '@tanstack/react-router';
import {
  AwardIcon,
  CheckIcon,
  DownloadIcon,
  QrCodeIcon,
  SearchIcon,
  ShieldAlertIcon,
  XIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, MetricCard } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const rows = [
  {
    number: 'SM-2026-009102',
    learner: 'Aziza Abdullayeva',
    course: 'Suv xo‘jaligi loyihachisi',
    region: 'Toshkent',
    date: '10-sentabr',
    status: 'Tasdiqlash kutilmoqda',
    tone: 'orange' as const
  },
  {
    number: 'SM-2026-009098',
    learner: 'Mansur Ergashev',
    course: 'Tomchilatib sug‘orish asoslari',
    region: 'Farg‘ona',
    date: '10-sentabr',
    status: 'Tayyorlanmoqda',
    tone: 'blue' as const
  },
  {
    number: 'SM-2026-009061',
    learner: 'Mahliyo To‘rayeva',
    course: 'Tuproq namligi va sug‘orish rejimi',
    region: 'Buxoro',
    date: '9-sentabr',
    status: 'Berilgan',
    tone: 'green' as const
  },
  {
    number: 'SM-2026-008944',
    learner: 'Sardor Qosimov',
    course: 'Nasos va filtrlar servisi',
    region: 'Samarqand',
    date: '6-sentabr',
    status: 'Bekor qilingan',
    tone: 'red' as const
  }
];

const AdminCertificatesRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Sertifikatlar'
        actions={
          <Button className='rounded-full'>
            <AwardIcon /> Sertifikat yaratish
          </Button>
        }
        description='Kurs natijalari asosida sertifikatlarni tayyorlang, tasdiqlang, bekor qiling va QR orqali tekshirish sahifasini oching.'
        eyebrow='Sertifikat nazorati'
      />
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <MetricCard detail='Bugun 18 ta' label='Jami berilgan' value='1 284' icon={AwardIcon} />
        <MetricCard
          detail='Qaror talab qilinadi'
          label='Tasdiq kutilmoqda'
          value='7'
          icon={CheckIcon}
          tone='orange'
        />
        <MetricCard
          detail='Generator navbatida'
          label='Tayyorlanmoqda'
          value='4'
          icon={DownloadIcon}
          tone='blue'
        />
        <MetricCard
          detail='So‘nggi 30 kunda'
          label='Bekor qilingan'
          value='3'
          icon={ShieldAlertIcon}
          tone='red'
        />
      </section>
      <Card className='border-border/80'>
        <CardContent className='p-5 sm:p-6'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <label className='relative flex-1'>
              <span className='sr-only'>Sertifikat qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input className='pl-9' placeholder='Sertifikat raqami, foydalanuvchi yoki kurs…' />
            </label>
            <Button variant='outline'>Hudud</Button>
            <Button variant='outline'>Holat</Button>
            <Button variant='outline'>
              <DownloadIcon /> Eksport
            </Button>
          </div>
          <Table className='mt-5'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Raqam</TableHead>
                <TableHead>Foydalanuvchi</TableHead>
                <TableHead>Kurs</TableHead>
                <TableHead>Hudud</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.number}>
                  <TableCell className='py-4 font-mono text-xs'>{row.number}</TableCell>
                  <TableCell className='font-medium'>{row.learner}</TableCell>
                  <TableCell className='max-w-60 whitespace-normal'>{row.course}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <DemoStatus tone={row.tone}>{row.status}</DemoStatus>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1'>
                      <Button aria-label='QR tekshiruv' size='icon' variant='ghost'>
                        <QrCodeIcon />
                      </Button>
                      <Button aria-label='PDF yuklash' size='icon' variant='ghost'>
                        <DownloadIcon />
                      </Button>
                      {row.tone === 'orange' && (
                        <Button aria-label='Tasdiqlash' size='icon' variant='ghost'>
                          <CheckIcon className='text-success' />
                        </Button>
                      )}
                      {row.tone !== 'red' && (
                        <Button aria-label='Bekor qilish' size='icon' variant='ghost'>
                          <XIcon className='text-destructive' />
                        </Button>
                      )}
                    </div>
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

export const Route = createFileRoute('/_authenticated/admin/certificates/')({
  component: AdminCertificatesRoutePage
});
