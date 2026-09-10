import { createFileRoute } from '@tanstack/react-router';
import { BadgeCheckIcon, CalendarClockIcon, SaveIcon, UserRoundCheckIcon } from 'lucide-react';
import { toast } from 'sonner';

import { AgroPageIntro, DemoModeNote, DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { PageHeader } from '@/shared/ui/page';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';

const specialties = ['Tomchilatib sug‘orish', 'Suv hisobini yuritish', 'Nasos stansiyalari'];

const TeacherSettingsRoutePage = () => (
  <>
    <PageHeader />
    <main className='space-y-7 px-4 pb-10 sm:px-6'>
      <AgroPageIntro
        title='Profil va qabul vaqti'
        description='Tinglovchilar ko‘radigan tajriba, mutaxassisliklar va maslahat uchun mavjud vaqtlarni yangilang.'
        eyebrow='Ekspert profili'
      />
      <DemoModeNote />
      <section className='grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]'>
        <Card className='border-border/80'>
          <CardContent className='p-5 sm:p-6'>
            <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center'>
              <div className='bg-primary text-primary-foreground grid size-20 place-items-center rounded-3xl text-xl font-bold shadow-lg'>
                DK
              </div>
              <div className='flex-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <h2 className='font-[Georgia,serif] text-xl font-semibold'>Dilorom Karimova</h2>
                  <DemoStatus tone='green'>Tasdiqlangan ekspert</DemoStatus>
                </div>
                <p className='text-muted-foreground mt-1 text-sm'>
                  Suv resurslari bo‘yicha yetakchi mutaxassis • 12 yil tajriba
                </p>
              </div>
              <Button className='rounded-xl' variant='outline'>
                Rasmni yangilash
              </Button>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='expertFirstName'>Ism</Label>
                <Input defaultValue='Dilorom' id='expertFirstName' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='expertLastName'>Familiya</Label>
                <Input defaultValue='Karimova' id='expertLastName' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='expertPhone'>Telefon</Label>
                <Input defaultValue='+998 93 640 20 18' id='expertPhone' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='expertEmail'>Elektron pochta</Label>
                <Input defaultValue='d.karimova@suvchi.uz' id='expertEmail' />
              </div>
              <div className='space-y-2 sm:col-span-2'>
                <Label htmlFor='expertPosition'>Lavozim va tashkilot</Label>
                <Input
                  defaultValue='Yetakchi ekspert, Suv xo‘jaligi vazirligi malaka markazi'
                  id='expertPosition'
                />
              </div>
              <div className='space-y-2 sm:col-span-2'>
                <Label htmlFor='expertBio'>Qisqa ma’lumot</Label>
                <Textarea
                  defaultValue='Tomchilatib sug‘orish tizimlari, suv sarfini rejalashtirish va nasos stansiyalaridan samarali foydalanish bo‘yicha amaliy maslahatlar beraman.'
                  id='expertBio'
                  rows={4}
                />
              </div>
            </div>
            <div className='mt-5'>
              <Label>Mutaxassisliklar</Label>
              <div className='mt-2 flex flex-wrap gap-2'>
                {specialties.map((item) => (
                  <span
                    key={item}
                    className='bg-primary/8 text-primary rounded-full px-3 py-1.5 text-sm font-medium'
                  >
                    {item}
                  </span>
                ))}
                <Button className='rounded-full' size='sm' variant='outline'>
                  + Qo‘shish
                </Button>
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <Button
                className='rounded-xl'
                onClick={() => toast.success('Ekspert profili yangilandi')}
              >
                <SaveIcon /> O‘zgarishlarni saqlash
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className='space-y-5'>
          <Card className='border-primary/20 bg-primary/[0.035]'>
            <CardContent className='p-5 sm:p-6'>
              <div className='flex items-center gap-3'>
                <span className='bg-primary/10 text-primary grid size-10 place-items-center rounded-xl'>
                  <BadgeCheckIcon className='size-5' />
                </span>
                <div>
                  <h2 className='font-semibold'>Ekspert verifikatsiyasi</h2>
                  <p className='text-muted-foreground text-sm'>
                    Hujjatlar 2-sentabrda tasdiqlangan
                  </p>
                </div>
              </div>
              <div className='mt-5 space-y-3 text-sm'>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Sertifikat</span>
                  <span className='font-medium'>EX-2026-0082</span>
                </p>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Maslahat reytingi</span>
                  <span className='font-medium'>4.9 / 5.0</span>
                </p>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Javoblar</span>
                  <span className='font-medium'>186 ta</span>
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-border/80'>
            <CardContent className='p-5 sm:p-6'>
              <div className='mb-5 flex items-center gap-3'>
                <span className='bg-water/10 text-water grid size-10 place-items-center rounded-xl'>
                  <CalendarClockIcon className='size-5' />
                </span>
                <div>
                  <h2 className='font-semibold'>Qabul vaqti</h2>
                  <p className='text-muted-foreground text-sm'>Yangi murojaatlar uchun holat</p>
                </div>
              </div>
              <div className='flex items-center justify-between rounded-xl border p-3'>
                <div>
                  <p className='text-sm font-medium'>Maslahatlar uchun ochiq</p>
                  <p className='text-muted-foreground text-xs'>Navbatga yangi savol qabul qilish</p>
                </div>
                <Switch defaultChecked aria-label='Maslahatlar uchun ochiq' />
              </div>
              <div className='mt-4 grid grid-cols-2 gap-3'>
                <div className='rounded-xl border p-3'>
                  <p className='text-muted-foreground text-xs'>Ish kunlari</p>
                  <p className='mt-1 text-sm font-semibold'>Du–Ju</p>
                </div>
                <div className='rounded-xl border p-3'>
                  <p className='text-muted-foreground text-xs'>Vaqt</p>
                  <p className='mt-1 text-sm font-semibold'>09:00–17:00</p>
                </div>
              </div>
              <Button className='mt-4 w-full rounded-xl' variant='outline'>
                <UserRoundCheckIcon /> Jadvalni sozlash
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  </>
);

export const Route = createFileRoute('/_authenticated/teacher/settings/')({
  component: TeacherSettingsRoutePage
});
