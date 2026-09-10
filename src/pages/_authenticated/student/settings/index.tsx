import { createFileRoute } from '@tanstack/react-router';
import {
  BadgeCheckIcon,
  BellIcon,
  FileCheck2Icon,
  MapPinIcon,
  SaveIcon,
  ShieldCheckIcon,
  UserRoundIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { AgroPageIntro, DemoModeNote, DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { PageHeader } from '@/shared/ui/page';
import { Switch } from '@/shared/ui/switch';

const StudentSettingsRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Profil va sozlamalar'
        description='MyID orqali tasdiqlangan shaxsiy ma’lumotlar, aloqa kanallari va hududiy biriktirishni boshqaring.'
        eyebrow='Shaxsiy kabinet'
      />
      <DemoModeNote />
      <section className='grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]'>
        <Card className='border-primary/15 overflow-hidden'>
          <div className='from-primary/15 via-water/10 h-28 bg-linear-to-r to-transparent' />
          <CardContent className='relative -mt-12 p-6'>
            <div className='bg-primary text-primary-foreground grid size-24 place-items-center rounded-3xl border-4 border-white text-2xl font-bold shadow-lg'>
              AA
            </div>
            <div className='mt-4 flex items-start justify-between gap-3'>
              <div>
                <h2 className='font-[Georgia,serif] text-xl font-semibold'>Aziza Abdullayeva</h2>
                <p className='text-muted-foreground mt-1 text-sm'>ID: SM-2026-0148</p>
              </div>
              <DemoStatus tone='green'>Faol</DemoStatus>
            </div>
            <div className='mt-6 space-y-3 border-t pt-5 text-sm'>
              <div className='flex items-center gap-2'>
                <BadgeCheckIcon className='text-primary size-4' />
                <span>MyID orqali tasdiqlangan</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPinIcon className='text-primary size-4' />
                <span>Jizzax viloyati, Paxtakor</span>
              </div>
              <div className='flex items-center gap-2'>
                <FileCheck2Icon className='text-primary size-4' />
                <span>3 ta hujjat tasdiqlangan</span>
              </div>
            </div>
            <Button className='mt-6 w-full rounded-xl' variant='outline'>
              Profil rasmini yangilash
            </Button>
          </CardContent>
        </Card>
        <div className='space-y-5'>
          <Card className='border-border/80'>
            <CardContent className='p-5 sm:p-6'>
              <div className='mb-5 flex items-center gap-3'>
                <span className='bg-primary/10 text-primary grid size-10 place-items-center rounded-xl'>
                  <UserRoundIcon className='size-5' />
                </span>
                <div>
                  <h2 className='font-semibold'>Shaxsiy ma’lumotlar</h2>
                  <p className='text-muted-foreground text-sm'>
                    Tasdiqlangan maydonlarni faqat MyID orqali o‘zgartirish mumkin.
                  </p>
                </div>
              </div>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>Ism</Label>
                  <Input defaultValue='Aziza' id='firstName' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Familiya</Label>
                  <Input defaultValue='Abdullayeva' id='lastName' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='pinfl'>JSHSHIR</Label>
                  <Input disabled defaultValue='**********148' id='pinfl' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='birthDate'>Tug‘ilgan sana</Label>
                  <Input disabled defaultValue='14.03.1997' id='birthDate' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Telefon</Label>
                  <Input defaultValue='+998 90 123 45 67' id='phone' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Elektron pochta</Label>
                  <Input defaultValue='aziza.abdullayeva@example.uz' id='email' type='email' />
                </div>
                <div className='space-y-2 sm:col-span-2'>
                  <Label htmlFor='organization'>Tashkilot</Label>
                  <Input
                    defaultValue='Paxtakor tumani Suv yetkazib berish xizmati'
                    id='organization'
                  />
                </div>
              </div>
              <div className='mt-5 flex justify-end'>
                <Button
                  className='rounded-xl'
                  onClick={() => toast.success('Profil ma’lumotlari saqlandi')}
                >
                  <SaveIcon /> Saqlash
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className='grid gap-5 lg:grid-cols-2'>
            <Card className='border-border/80'>
              <CardContent className='p-5 sm:p-6'>
                <div className='mb-4 flex items-center gap-3'>
                  <span className='bg-water/10 text-water grid size-10 place-items-center rounded-xl'>
                    <BellIcon className='size-5' />
                  </span>
                  <h2 className='font-semibold'>Bildirishnomalar</h2>
                </div>
                <div className='space-y-4'>
                  {[
                    ['Dars va test eslatmalari', 'Boshlanishidan 24 soat va 1 soat oldin'],
                    ['Ariza holati', 'Qaror yoki izoh kelganda darhol'],
                    ['Ekspert javobi', 'Maslahatga yangi javob kelganda']
                  ].map(([title, detail]) => (
                    <div key={title} className='flex items-center justify-between gap-4'>
                      <div>
                        <p className='text-sm font-medium'>{title}</p>
                        <p className='text-muted-foreground text-xs'>{detail}</p>
                      </div>
                      <Switch defaultChecked aria-label={title} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className='border-border/80'>
              <CardContent className='p-5 sm:p-6'>
                <div className='mb-4 flex items-center gap-3'>
                  <span className='bg-primary/10 text-primary grid size-10 place-items-center rounded-xl'>
                    <ShieldCheckIcon className='size-5' />
                  </span>
                  <h2 className='font-semibold'>Xavfsizlik</h2>
                </div>
                <p className='text-muted-foreground text-sm leading-6'>
                  Oxirgi kirish: bugun, 08:42 • Chrome, Windows • Toshkent shahri
                </p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  <Button className='rounded-xl' variant='outline'>
                    Parolni yangilash
                  </Button>
                  <Button className='rounded-xl' variant='outline'>
                    Faol seanslar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/student/settings/')({
  component: StudentSettingsRoutePage
});
