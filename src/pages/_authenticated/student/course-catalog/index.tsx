import { createFileRoute, Link } from '@tanstack/react-router';
import {
  AwardIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  Clock3Icon,
  MapPinIcon,
  SearchIcon,
  SlidersHorizontalIcon
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { AgroPageIntro, catalogCourses, DemoStatus } from '@/modules/agro-demo';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { Input } from '@/shared/ui/input';
import { PageHeader, PageLoading } from '@/shared/ui/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

const StudentCourseCatalogRoutePage = () => {
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState('all');

  const courses = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('uz');

    return catalogCourses.filter((course) => {
      const matchesQuery =
        !normalized ||
        `${course.title} ${course.category} ${course.description}`
          .toLocaleLowerCase('uz')
          .includes(normalized);
      const matchesFormat = format === 'all' || course.format === format;

      return matchesQuery && matchesFormat;
    });
  }, [format, query]);

  return (
    <>
      <PageHeader />
      <main className='space-y-7 px-4 pb-24 sm:px-6'>
        <AgroPageIntro
          title='Kurslar katalogi'
          description='Hudud, o‘qish formati va yo‘nalish bo‘yicha mos kursni toping. Har bir kurs kartasida talablar va sertifikat shartlari ko‘rsatiladi.'
          eyebrow='Ta’lim imkoniyatlari'
        />

        <section className='rounded-[1.5rem] border bg-white p-4 shadow-[0_12px_35px_rgba(23,33,27,0.04)]'>
          <div className='grid gap-3 md:grid-cols-[1fr_13rem_auto]'>
            <label className='relative'>
              <span className='sr-only'>Kurs qidirish</span>
              <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input
                className='h-11 rounded-xl pl-9'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Kurs yoki yo‘nalishni qidiring…'
              />
            </label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className='h-11! w-full rounded-xl'>
                <SelectValue placeholder='O‘qish formati' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Barcha formatlar</SelectItem>
                <SelectItem value='Onlayn'>Onlayn</SelectItem>
                <SelectItem value='Oflayn'>Oflayn</SelectItem>
                <SelectItem value='Aralash'>Aralash</SelectItem>
              </SelectContent>
            </Select>
            <Button className='h-11 rounded-xl' variant='outline'>
              <SlidersHorizontalIcon />
              Boshqa filtrlar
            </Button>
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            {['Barchasi', 'Irrigatsiya', 'Loyiha-smeta', 'Agronomiya', 'Servis'].map(
              (item, index) => (
                <button
                  key={item}
                  className={
                    index === 0
                      ? 'bg-primary text-primary-foreground rounded-full px-3.5 py-2 text-xs font-semibold'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/70 rounded-full px-3.5 py-2 text-xs font-semibold'
                  }
                  type='button'
                >
                  {item}
                </button>
              )
            )}
          </div>
        </section>

        <div className='flex items-center justify-between gap-3'>
          <p className='text-muted-foreground text-sm'>{courses.length} ta kurs topildi</p>
          <p className='text-muted-foreground hidden text-xs sm:block'>
            Ma’lumotlar 10-sentabrda yangilangan
          </p>
        </div>

        <section className='grid gap-5 md:grid-cols-2 2xl:grid-cols-3'>
          {courses.map((course) => (
            <Card
              key={course.id}
              className='group border-border/80 overflow-hidden py-0 shadow-[0_18px_50px_rgba(23,33,27,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(23,33,27,0.11)]'
            >
              <div className='public-water-lines relative min-h-42 overflow-hidden bg-[#153f38] p-5 text-white'>
                <div className='absolute -right-12 -bottom-16 size-48 rounded-full bg-[#65b9ce]/30 blur-xl' />
                <div className='relative flex h-full flex-col justify-between gap-8'>
                  <div className='flex items-start justify-between gap-3'>
                    <Badge className='bg-white/90 text-[#173f37] hover:bg-white'>
                      {course.category}
                    </Badge>
                    <DemoStatus tone={course.tone}>{course.format}</DemoStatus>
                  </div>
                  <h2 className='max-w-md font-[Georgia,serif] text-2xl leading-tight font-semibold'>
                    {course.title}
                  </h2>
                </div>
              </div>
              <CardContent className='space-y-5 p-5'>
                <p className='text-muted-foreground min-h-12 text-sm leading-6'>
                  {course.description}
                </p>
                <div className='grid grid-cols-2 gap-x-3 gap-y-3 text-sm'>
                  <p className='text-muted-foreground flex items-center gap-2'>
                    <Clock3Icon className='text-primary size-4' /> {course.duration}
                  </p>
                  <p className='text-muted-foreground flex items-center gap-2'>
                    <BookOpenIcon className='text-primary size-4' /> {course.lessons} dars
                  </p>
                  <p className='text-muted-foreground flex items-center gap-2'>
                    <CalendarDaysIcon className='text-primary size-4' /> {course.startDate}
                  </p>
                  <p className='text-muted-foreground flex items-center gap-2'>
                    <AwardIcon className='text-primary size-4' /> {course.passScore}% o‘tish bali
                  </p>
                </div>
                <p className='text-muted-foreground flex items-start gap-2 border-t pt-4 text-sm'>
                  <MapPinIcon className='text-primary mt-0.5 size-4 shrink-0' /> {course.region}
                </p>
                <div className='flex items-center justify-between gap-3'>
                  <span className='text-agriculture font-semibold'>{course.price}</span>
                  <Button asChild className='rounded-full' size='sm'>
                    <Link to='/student/assignments'>Talablarni ko‘rish</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/student/course-catalog/')({
  component: StudentCourseCatalogRoutePage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
