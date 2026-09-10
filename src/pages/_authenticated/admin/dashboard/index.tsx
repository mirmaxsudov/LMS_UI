import { createFileRoute } from '@tanstack/react-router';
import {
  ActivityIcon,
  AwardIcon,
  BookOpenCheckIcon,
  CalendarClockIcon,
  ChevronRightIcon,
  CircleAlertIcon,
  FileCheck2Icon,
  HeadphonesIcon,
  MapPinnedIcon,
  RefreshCwIcon,
  UserRoundCheckIcon,
  UsersRoundIcon
} from 'lucide-react';

import {
  adminApplications,
  AgroPageIntro,
  DemoModeNote,
  DemoStatus,
  MetricCard,
  SectionHeading
} from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const regions = [
  { name: 'Toshkent', learners: 1240, completion: 78 },
  { name: 'Samarqand', learners: 986, completion: 71 },
  { name: 'Farg‘ona', learners: 842, completion: 68 },
  { name: 'Qashqadaryo', learners: 704, completion: 62 },
  { name: 'Buxoro', learners: 590, completion: 66 }
];

const AdminDashboardRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Boshqaruv paneli'
        actions={
          <Button className='rounded-full' variant='outline'>
            <RefreshCwIcon /> Yangilash
          </Button>
        }
        description='Arizalar, hujjatlar, kurslar va murojaatlar bo‘yicha operatsion holat. Ko‘rsatkichlar administratorning hududiy ruxsatlariga moslashadi.'
        eyebrow='10-sentabr 2026 · Respublika bo‘yicha'
      />

      <DemoModeNote />

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <MetricCard
          detail='+126 so‘nggi 30 kunda'
          label='Faol foydalanuvchilar'
          value='8 462'
          icon={UsersRoundIcon}
        />
        <MetricCard
          detail='24 ta yangi ariza'
          label='Tekshiruvdagi arizalar'
          value='187'
          icon={FileCheck2Icon}
          tone='orange'
        />
        <MetricCard
          detail='18 tasi davom etmoqda'
          label='Faol kurslar'
          value='34'
          icon={BookOpenCheckIcon}
          tone='green'
        />
        <MetricCard
          detail='7 tasi tasdiq kutmoqda'
          label='Berilgan sertifikatlar'
          value='1 284'
          icon={AwardIcon}
          tone='blue'
        />
      </section>

      <section className='grid gap-5 2xl:grid-cols-[1.35fr_0.65fr]'>
        <Card className='border-border/80 shadow-[0_16px_45px_rgba(23,33,27,0.05)]'>
          <CardContent className='p-5 sm:p-6'>
            <SectionHeading
              title='Ustuvor arizalar'
              action={
                <Button className='rounded-full' size='sm' variant='outline'>
                  Barcha arizalar <ChevronRightIcon />
                </Button>
              }
              description='Kutish muddati va talab etilgan qaror bo‘yicha tartiblangan'
            />
            <Table className='mt-5'>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <TableHead>Foydalanuvchi</TableHead>
                  <TableHead>Kurs</TableHead>
                  <TableHead>Hudud</TableHead>
                  <TableHead>Kutish</TableHead>
                  <TableHead>Holat</TableHead>
                  <TableHead>
                    <span className='sr-only'>Amal</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className='py-4'>
                      <p className='font-medium'>{application.learner}</p>
                      <p className='text-muted-foreground mt-0.5 text-xs'>
                        {application.id} · {application.pinfl}
                      </p>
                    </TableCell>
                    <TableCell className='max-w-56 whitespace-normal'>
                      {application.course}
                    </TableCell>
                    <TableCell>{application.region}</TableCell>
                    <TableCell>{application.wait}</TableCell>
                    <TableCell>
                      <DemoStatus tone={application.tone}>{application.status}</DemoStatus>
                    </TableCell>
                    <TableCell>
                      <Button
                        aria-label={`${application.id} arizasini ochish`}
                        size='icon'
                        variant='ghost'
                      >
                        <ChevronRightIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className='space-y-5'>
          <Card className='border-destructive/20 bg-destructive/[0.035]'>
            <CardContent className='p-5'>
              <div className='flex items-start gap-3'>
                <span className='bg-destructive/10 text-destructive grid size-10 shrink-0 place-items-center rounded-2xl'>
                  <CircleAlertIcon className='size-5' />
                </span>
                <div>
                  <p className='font-semibold'>9 ta murojaat muddati yaqin</p>
                  <p className='text-muted-foreground mt-1 text-sm leading-6'>
                    Operator biriktirilmagan yoki javob vaqti 30 daqiqadan oshgan murojaatlar.
                  </p>
                </div>
              </div>
              <Button className='mt-4 w-full rounded-full' size='sm' variant='outline'>
                <HeadphonesIcon /> Navbatni ochish
              </Button>
            </CardContent>
          </Card>
          <Card className='border-border/80'>
            <CardContent className='space-y-4 p-5'>
              <SectionHeading title='Bugungi operatsiyalar' />
              {[
                {
                  icon: FileCheck2Icon,
                  value: '38',
                  label: 'Hujjat tekshirildi',
                  tone: 'text-primary bg-primary/10'
                },
                {
                  icon: UserRoundCheckIcon,
                  value: '12',
                  label: 'Ariza tasdiqlandi',
                  tone: 'text-success bg-success/10'
                },
                {
                  icon: CalendarClockIcon,
                  value: '6',
                  label: 'Oflayn mashg‘ulot',
                  tone: 'text-water bg-water/10'
                },
                {
                  icon: ActivityIcon,
                  value: '99.8%',
                  label: 'Tizim mavjudligi',
                  tone: 'text-agriculture bg-agriculture/10'
                }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className='flex items-center gap-3'>
                    <span className={`grid size-9 place-items-center rounded-xl ${item.tone}`}>
                      <Icon className='size-4' />
                    </span>
                    <p className='min-w-0 flex-1 text-sm'>{item.label}</p>
                    <span className='font-semibold'>{item.value}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='grid gap-5 xl:grid-cols-[1fr_0.72fr]'>
        <Card className='border-border/80'>
          <CardContent className='p-5 sm:p-6'>
            <SectionHeading
              title='Hududlar kesimida'
              description='Faol tinglovchilar va kursni yakunlash ko‘rsatkichi'
            />
            <div className='mt-6 space-y-5'>
              {regions.map((region) => (
                <div key={region.name}>
                  <div className='mb-2 flex items-center justify-between text-sm'>
                    <span className='flex items-center gap-2 font-medium'>
                      <MapPinnedIcon className='text-primary size-4' /> {region.name}
                    </span>
                    <span className='text-muted-foreground'>
                      {region.learners.toLocaleString()} tinglovchi ·{' '}
                      <strong className='text-foreground'>{region.completion}%</strong>
                    </span>
                  </div>
                  <Progress value={region.completion} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className='public-water-lines overflow-hidden border-0 bg-[#153f38] text-white'>
          <CardContent className='relative p-6'>
            <MapPinnedIcon className='size-10 text-[#c9e16f]' />
            <p className='mt-8 text-xs font-bold tracking-[0.14em] text-white/55 uppercase'>
              Oflayn ta’lim
            </p>
            <h2 className='mt-2 font-[Georgia,serif] text-3xl font-semibold'>
              18 ta markazda 27 ta mashg‘ulot
            </h2>
            <p className='mt-3 text-sm leading-6 text-white/65'>
              Keyingi yetti kun ichida 642 nafar tinglovchi oflayn mashg‘ulotga taklif qilingan.
            </p>
            <Button className='mt-6 rounded-full bg-white text-[#153f38] hover:bg-white/90'>
              Jadvalni ko‘rish
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/admin/dashboard/')({
  component: AdminDashboardRoutePage
});
