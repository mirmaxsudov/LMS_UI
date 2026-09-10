import { createFileRoute } from '@tanstack/react-router';
import {
  CheckCircle2Icon,
  CircleAlertIcon,
  FileCheck2Icon,
  FileTextIcon,
  PlusIcon,
  UploadCloudIcon
} from 'lucide-react';

import { AgroPageIntro, DemoStatus, learnerApplications } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

const requirements = [
  { name: 'Pasport nusxasi', detail: 'PDF · 1.8 MB', status: 'Tasdiqlangan' },
  { name: 'Diplom va ilovasi', detail: 'PDF · 4.2 MB', status: 'Qayta yuklash kerak' },
  { name: 'MyMehnat ma’lumotnomasi', detail: 'MyGov orqali olindi', status: 'Tasdiqlangan' },
  { name: 'Tashkilot ma’lumotlari', detail: 'STIR 309••••••', status: 'Tekshiruvda' }
];

const StudentApplicationsRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-24 sm:px-6'>
      <AgroPageIntro
        title='Arizalar va hujjatlar'
        actions={
          <Button className='rounded-full'>
            <PlusIcon /> Yangi ariza
          </Button>
        }
        description='Kurs arizalarining holatini kuzating, tekshiruvchi izohlarini ko‘ring va so‘ralgan hujjatlarni xavfsiz qayta yuboring.'
        eyebrow='Ariza markazi'
      />

      <section className='grid gap-5 xl:grid-cols-[0.9fr_1.1fr]'>
        <div className='space-y-4'>
          {learnerApplications.map((application, index) => (
            <Card
              key={application.id}
              className={
                index === 0
                  ? 'border-warning/35 bg-warning/[0.035] shadow-[0_16px_45px_rgba(217,119,6,0.08)]'
                  : 'border-border/80'
              }
            >
              <CardContent className='space-y-4 p-5'>
                <div className='flex flex-wrap items-start justify-between gap-3'>
                  <div>
                    <p className='text-muted-foreground text-xs font-bold tracking-[0.12em] uppercase'>
                      {application.id}
                    </p>
                    <h2 className='mt-1 font-semibold'>{application.course}</h2>
                  </div>
                  <DemoStatus tone={application.tone}>{application.status}</DemoStatus>
                </div>
                <p className='text-muted-foreground text-sm leading-6'>{application.detail}</p>
                <div>
                  <div className='mb-2 flex justify-between text-xs'>
                    <span className='text-muted-foreground'>Ariza tayyorligi</span>
                    <span className='font-semibold'>{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} />
                </div>
                <div className='flex items-center justify-between border-t pt-4'>
                  <span className='text-muted-foreground text-xs'>{application.submittedAt}</span>
                  <Button
                    className='rounded-full'
                    size='sm'
                    variant={index === 0 ? 'default' : 'outline'}
                  >
                    {index === 0 ? 'Hujjatlarni yangilash' : 'Batafsil'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className='border-border/80 h-fit shadow-[0_18px_50px_rgba(23,33,27,0.06)]'>
          <CardContent className='p-5 sm:p-6'>
            <div className='flex items-start gap-3'>
              <span className='bg-warning/10 text-warning grid size-11 shrink-0 place-items-center rounded-2xl'>
                <CircleAlertIcon className='size-5' />
              </span>
              <div>
                <p className='text-muted-foreground text-xs font-bold tracking-[0.12em] uppercase'>
                  AR-2048 · tuzatish so‘raldi
                </p>
                <h2 className='mt-1 text-lg font-semibold'>Diplom ilovasini qayta yuboring</h2>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>
                  Tekshiruvchi izohi: faylda faqat birinchi sahifa mavjud. Diplom ilovasining barcha
                  sahifalarini bitta PDF sifatida yuklang.
                </p>
              </div>
            </div>

            <div className='mt-6 space-y-3'>
              {requirements.map((item) => {
                const needsUpload = item.status === 'Qayta yuklash kerak';
                return (
                  <div
                    key={item.name}
                    className='flex flex-col gap-3 rounded-2xl border bg-[#fbfdfb] p-4 sm:flex-row sm:items-center'
                  >
                    <span
                      className={
                        needsUpload
                          ? 'bg-warning/10 text-warning grid size-10 shrink-0 place-items-center rounded-xl'
                          : 'bg-success/10 text-success grid size-10 shrink-0 place-items-center rounded-xl'
                      }
                    >
                      {needsUpload ? (
                        <FileTextIcon className='size-5' />
                      ) : (
                        <CheckCircle2Icon className='size-5' />
                      )}
                    </span>
                    <div className='min-w-0 flex-1'>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-muted-foreground mt-0.5 text-xs'>{item.detail}</p>
                    </div>
                    {needsUpload ? (
                      <Button className='rounded-full' size='sm'>
                        <UploadCloudIcon /> Qayta yuklash
                      </Button>
                    ) : (
                      <DemoStatus tone={item.status === 'Tekshiruvda' ? 'blue' : 'green'}>
                        {item.status}
                      </DemoStatus>
                    )}
                  </div>
                );
              })}
            </div>

            <div className='bg-secondary mt-5 flex items-start gap-3 rounded-2xl p-4'>
              <FileCheck2Icon className='text-agriculture mt-0.5 size-5 shrink-0' />
              <p className='text-secondary-foreground text-sm leading-6'>
                PDF yoki rasm yuklash mumkin. Har bir fayl 10 MB dan oshmasligi kerak. Shaxsiy
                hujjatlar faqat maxsus ruxsatga ega tekshiruvchiga ko‘rinadi.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/assignments/')({
  component: StudentApplicationsRoutePage
});
