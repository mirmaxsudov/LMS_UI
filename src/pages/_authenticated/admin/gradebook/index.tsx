import { createFileRoute } from '@tanstack/react-router';
import {
  CheckIcon,
  ChevronRightIcon,
  Clock3Icon,
  FileSearchIcon,
  FileTextIcon,
  RotateCcwIcon,
  SearchIcon,
  XIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, MetricCard } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const documents = [
  {
    learner: 'Aziza Abdullayeva',
    initials: 'AA',
    course: 'Suv xo‘jaligi loyihachisi',
    type: 'Diplom va ilovasi',
    submitted: 'Bugun, 09:14',
    wait: '2 soat',
    reviewer: 'Siz',
    status: 'Tekshiruvda',
    tone: 'blue' as const
  },
  {
    learner: 'Mansur Ergashev',
    initials: 'ME',
    course: 'Suv xo‘jaligi loyihachisi',
    type: 'MyMehnat ma’lumotnomasi',
    submitted: 'Kecha, 16:22',
    wait: '19 soat',
    reviewer: 'Biriktirilmagan',
    status: 'Yangi',
    tone: 'orange' as const
  },
  {
    learner: 'Mahliyo To‘rayeva',
    initials: 'MT',
    course: 'Tomchilatib sug‘orish asoslari',
    type: 'Pasport nusxasi',
    submitted: '8-sentabr, 11:40',
    wait: '2 kun',
    reviewer: 'D. Karimov',
    status: 'Tuzatish kutilmoqda',
    tone: 'red' as const
  },
  {
    learner: 'Sardor Qosimov',
    initials: 'SQ',
    course: 'Nasos va filtrlar servisi',
    type: 'Tashkilot ma’lumotlari',
    submitted: '8-sentabr, 08:05',
    wait: '2 kun',
    reviewer: 'M. Tursunova',
    status: 'Tasdiqlangan',
    tone: 'green' as const
  }
];

const AdminDocumentReviewRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Hujjatlar tekshiruvi'
        description='Pasport, diplom, mehnat faoliyati va tashkilot ma’lumotlarini ruxsat doirasida tekshiring. Har bir qaror sababi bilan saqlanadi.'
        eyebrow='Maxfiy ma’lumotlar nazorati'
      />

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <MetricCard
          detail='Bugun kelib tushgan'
          label='Yangi hujjatlar'
          value='11'
          icon={FileSearchIcon}
          tone='blue'
        />
        <MetricCard detail='Sizga biriktirilgan' label='Tekshiruvda' value='18' icon={Clock3Icon} />
        <MetricCard
          detail='Foydalanuvchi javobi kutilmoqda'
          label='Tuzatishga qaytarilgan'
          value='7'
          icon={RotateCcwIcon}
          tone='orange'
        />
        <MetricCard
          detail='So‘nggi 7 kunda'
          label='Tasdiqlangan'
          value='96'
          icon={CheckIcon}
          tone='green'
        />
      </section>

      <Card className='border-border/80'>
        <CardContent className='p-5 sm:p-6'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <label className='relative flex-1'>
              <span className='sr-only'>Hujjat qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input className='pl-9' placeholder='F.I.Sh., JSHSHIR yoki hujjat turi…' />
            </label>
            <Button className='rounded-xl' variant='outline'>
              Menga biriktirilgan
            </Button>
            <Button className='rounded-xl' variant='outline'>
              Eng ko‘p kutilgan
            </Button>
          </div>
          <Table className='mt-5'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Foydalanuvchi</TableHead>
                <TableHead>Kurs</TableHead>
                <TableHead>Hujjat</TableHead>
                <TableHead>Yuborilgan</TableHead>
                <TableHead>Tekshiruvchi</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={`${document.learner}-${document.type}`}>
                  <TableCell className='py-4'>
                    <div className='flex items-center gap-3'>
                      <span className='bg-primary/10 text-primary grid size-9 place-items-center rounded-xl text-xs font-bold'>
                        {document.initials}
                      </span>
                      <span className='font-medium'>{document.learner}</span>
                    </div>
                  </TableCell>
                  <TableCell className='max-w-52 whitespace-normal'>{document.course}</TableCell>
                  <TableCell>
                    <span className='flex items-center gap-2'>
                      <FileTextIcon className='text-primary size-4' />
                      {document.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p>{document.submitted}</p>
                    <p className='text-muted-foreground mt-0.5 text-xs'>{document.wait}</p>
                  </TableCell>
                  <TableCell>{document.reviewer}</TableCell>
                  <TableCell>
                    <DemoStatus tone={document.tone}>{document.status}</DemoStatus>
                  </TableCell>
                  <TableCell>
                    <Button aria-label='Hujjatni ko‘rish' size='icon' variant='ghost'>
                      <ChevronRightIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className='border-primary/20 bg-primary/[0.035]'>
        <CardContent className='flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='font-semibold'>Tanlangan hujjat bo‘yicha qaror</p>
            <p className='text-muted-foreground mt-1 text-sm'>
              Qaror sababini yozing; natija foydalanuvchiga bildirishnoma sifatida yuboriladi.
            </p>
          </div>
          <div className='flex flex-wrap gap-2'>
            <Button className='rounded-full' variant='outline'>
              <XIcon /> Rad etish
            </Button>
            <Button className='rounded-full' variant='outline'>
              <RotateCcwIcon /> Tuzatishga qaytarish
            </Button>
            <Button className='rounded-full'>
              <CheckIcon /> Tasdiqlash
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/admin/gradebook/')({
  component: AdminDocumentReviewRoutePage
});
