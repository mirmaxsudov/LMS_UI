import { createFileRoute } from '@tanstack/react-router';
import {
  AwardIcon,
  CheckCircle2Icon,
  DownloadIcon,
  ExternalLinkIcon,
  QrCodeIcon,
  Share2Icon,
  ShieldCheckIcon
} from 'lucide-react';

import { AgroPageIntro, certificates, DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';

const StudentCertificatesRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-24 sm:px-6'>
      <AgroPageIntro
        title='Mening sertifikatlarim'
        description='Berilgan sertifikatlarni ko‘ring, PDF nusxasini yuklab oling yoki QR-kod orqali haqiqiyligini ulashing.'
        eyebrow='Natijalar'
      />

      <section className='grid gap-5 xl:grid-cols-[1.15fr_0.85fr]'>
        <div className='space-y-4'>
          {certificates.map((certificate) => (
            <Card key={certificate.number} className='border-border/80 overflow-hidden py-0'>
              <CardContent className='p-0'>
                <div className='flex flex-col sm:flex-row'>
                  <div className='public-water-lines relative flex min-h-44 w-full flex-col justify-between overflow-hidden bg-[#153f38] p-5 text-white sm:w-48'>
                    <div className='absolute -right-12 -bottom-12 size-36 rounded-full bg-[#65b9ce]/25 blur-xl' />
                    <AwardIcon className='relative size-9 text-[#c9e16f]' />
                    <div className='relative'>
                      <p className='text-xs text-white/60'>Sertifikat raqami</p>
                      <p className='mt-1 text-sm font-semibold'>{certificate.number}</p>
                    </div>
                  </div>
                  <div className='flex min-w-0 flex-1 flex-col p-5'>
                    <div className='flex flex-wrap items-start justify-between gap-3'>
                      <div>
                        <DemoStatus tone='green'>{certificate.status}</DemoStatus>
                        <h2 className='mt-3 text-lg font-semibold'>{certificate.course}</h2>
                      </div>
                      <ShieldCheckIcon className='text-success size-6' />
                    </div>
                    <div className='text-muted-foreground mt-4 grid gap-2 text-sm sm:grid-cols-2'>
                      <p>Berilgan sana: {certificate.issuedAt}</p>
                      <p>Amal qilish muddati: {certificate.validUntil}</p>
                    </div>
                    <div className='mt-5 flex flex-wrap gap-2 border-t pt-4'>
                      <Button className='rounded-full' size='sm'>
                        <DownloadIcon /> PDF yuklab olish
                      </Button>
                      <Button className='rounded-full' size='sm' variant='outline'>
                        <QrCodeIcon /> QR-kod
                      </Button>
                      <Button className='rounded-full' size='sm' variant='ghost'>
                        <Share2Icon /> Ulashish
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className='border-primary/20 bg-[#fbfdfb] shadow-[0_18px_55px_rgba(23,33,27,0.07)]'>
          <CardContent className='p-6'>
            <div className='mx-auto max-w-sm border-[10px] border-double border-[#173f37] bg-white p-6 text-center shadow-lg'>
              <AwardIcon className='text-agriculture mx-auto size-10' />
              <p className='mt-4 font-[Georgia,serif] text-xs tracking-[0.18em] uppercase'>
                Suvchilar maktabi
              </p>
              <h2 className='mt-6 font-[Georgia,serif] text-2xl font-semibold text-[#173f37]'>
                Sertifikat
              </h2>
              <p className='text-muted-foreground mt-3 text-xs leading-5'>Ushbu sertifikat</p>
              <p className='mt-1 font-[Georgia,serif] text-xl font-semibold'>Aziza Abdullayeva</p>
              <p className='text-muted-foreground mt-3 text-xs leading-5'>
                “Tuproq namligi va sug‘orish rejimi” kursini muvaffaqiyatli yakunlagani uchun
                berildi.
              </p>
              <div className='mt-6 flex items-end justify-between gap-4 border-t pt-4 text-left'>
                <div>
                  <p className='text-muted-foreground text-[9px]'>SM-2026-008741</p>
                  <p className='text-success mt-1 flex items-center gap-1 text-[10px] font-semibold'>
                    <CheckCircle2Icon className='size-3' /> Tasdiqlangan
                  </p>
                </div>
                <div className='grid size-14 place-items-center border-2 border-[#173f37]'>
                  <QrCodeIcon className='size-10' />
                </div>
              </div>
            </div>
            <Button className='mt-5 w-full rounded-full' variant='outline'>
              Ochiq tekshiruv sahifasi <ExternalLinkIcon />
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/gradebook/')({
  component: StudentCertificatesRoutePage
});
