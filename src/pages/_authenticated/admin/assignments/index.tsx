import { createFileRoute } from '@tanstack/react-router';
import {
  CheckIcon,
  ChevronRightIcon,
  Clock3Icon,
  DownloadIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react';

import { adminApplications, AgroPageIntro, DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PageHeader } from '@/shared/ui/page';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const AdminApplicationsRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Kurs arizalari'
        actions={
          <>
            <Button className='rounded-full' variant='outline'>
              <DownloadIcon /> Eksport
            </Button>
            <Button className='rounded-full'>
              <CheckIcon /> Tanlanganlarni biriktirish
            </Button>
          </>
        }
        description='Yangi arizalarni ko‘rib chiqing, hujjat tekshiruviga yuboring va tinglovchiga qaror sababini tushunarli tarzda yetkazing.'
        eyebrow='O‘quv jarayoni'
      />

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {[
          ['Yangi', '24', 'blue'],
          ['Tekshiruvda', '63', 'orange'],
          ['Qo‘shimcha ma’lumot', '11', 'red'],
          ['Bugun tasdiqlandi', '18', 'green']
        ].map(([label, value, tone]) => (
          <Card key={label} className='border-border/80'>
            <CardContent className='flex items-center justify-between p-5'>
              <div>
                <p className='text-muted-foreground text-sm'>{label}</p>
                <p className='mt-2 text-3xl font-semibold'>{value}</p>
              </div>
              <DemoStatus tone={tone as 'blue' | 'green' | 'orange' | 'red'}>{label}</DemoStatus>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className='border-border/80'>
        <CardContent className='p-5 sm:p-6'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <label className='relative flex-1'>
              <span className='sr-only'>Ariza qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input className='pl-9' placeholder='F.I.Sh., JSHSHIR yoki ariza raqami…' />
            </label>
            <Button variant='outline'>
              <FilterIcon /> Filtrlar
            </Button>
          </div>
          <Table className='mt-5'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Ariza</TableHead>
                <TableHead>Tinglovchi</TableHead>
                <TableHead>Kurs</TableHead>
                <TableHead>Hudud</TableHead>
                <TableHead>Yuborilgan</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className='py-4 font-semibold'>{application.id}</TableCell>
                  <TableCell>
                    <p className='font-medium'>{application.learner}</p>
                    <p className='text-muted-foreground text-xs'>{application.pinfl}</p>
                  </TableCell>
                  <TableCell className='max-w-64 whitespace-normal'>{application.course}</TableCell>
                  <TableCell>{application.region}</TableCell>
                  <TableCell>
                    <p>{application.submittedAt}</p>
                    <p className='text-muted-foreground mt-0.5 flex items-center gap-1 text-xs'>
                      <Clock3Icon className='size-3' /> {application.wait}
                    </p>
                  </TableCell>
                  <TableCell>
                    <DemoStatus tone={application.tone}>{application.status}</DemoStatus>
                  </TableCell>
                  <TableCell>
                    <Button size='icon' variant='ghost'>
                      <ChevronRightIcon />
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

export const Route = createFileRoute('/_authenticated/admin/assignments/')({
  component: AdminApplicationsRoutePage
});
