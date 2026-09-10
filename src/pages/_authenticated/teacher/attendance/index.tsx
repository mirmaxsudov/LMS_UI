import { createFileRoute } from '@tanstack/react-router';
import {
  CalendarCheck2Icon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Clock3Icon,
  GraduationCapIcon,
  SearchIcon,
  UserCheckIcon,
  UserMinusIcon,
  UsersRoundIcon,
  UserXIcon
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { AgroPageIntro, DemoStatus } from '@/modules/agro-demo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

type AttendanceStatus = 'absent' | 'excused' | 'late' | 'present';

interface Student {
  course: string;
  group: string;
  id: number;
  initials: string;
  name: string;
  status: AttendanceStatus;
  time?: string;
}

interface Lesson {
  duration: string;
  group: string;
  id: number;
  present: number;
  room: string;
  status: 'completed' | 'current' | 'upcoming';
  students: number;
  time: string;
  title: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Suvdan samarali foydalanish',
    group: 'Suvchilar-101',
    time: '09:00',
    duration: '1 soat 30 daqiqa',
    room: '2-xona',
    status: 'completed',
    students: 18,
    present: 17
  },
  {
    id: 2,
    title: 'Tomchilatib sug‘orish asoslari',
    group: 'Agro-202',
    time: '11:00',
    duration: '1 soat 30 daqiqa',
    room: '3-xona',
    status: 'current',
    students: 24,
    present: 22
  },
  {
    id: 3,
    title: 'Sug‘orish tizimlarini boshqarish',
    group: 'Suvchilar-101',
    time: '14:00',
    duration: '1 soat 30 daqiqa',
    room: '2-xona',
    status: 'upcoming',
    students: 18,
    present: 0
  }
];

const students: Student[] = [
  {
    id: 1,
    name: 'Abdulloh Karimov',
    initials: 'AK',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'present',
    time: '08:54'
  },
  {
    id: 2,
    name: 'Madina Rasulova',
    initials: 'MR',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'present',
    time: '08:57'
  },
  {
    id: 3,
    name: 'Jasur Tursunov',
    initials: 'JT',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'late',
    time: '09:12'
  },
  {
    id: 4,
    name: 'Dilnoza Aliyeva',
    initials: 'DA',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'present',
    time: '08:51'
  },
  {
    id: 5,
    name: 'Bekzod Abduqodirov',
    initials: 'BA',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'absent'
  },
  {
    id: 6,
    name: 'Shahnoza Ergasheva',
    initials: 'SE',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'present',
    time: '08:58'
  },
  {
    id: 7,
    name: 'Azizbek Sobirov',
    initials: 'AS',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'present',
    time: '08:55'
  },
  {
    id: 8,
    name: 'Mohira Ismoilova',
    initials: 'MI',
    group: 'Suvchilar-101',
    course: 'Suvdan samarali foydalanish',
    status: 'excused'
  },
  {
    id: 9,
    name: 'Sardor Rahimov',
    initials: 'SR',
    group: 'Agro-202',
    course: 'Tomchilatib sug‘orish asoslari',
    status: 'present',
    time: '10:54'
  },
  {
    id: 10,
    name: 'Nodira Yusupova',
    initials: 'NY',
    group: 'Agro-202',
    course: 'Tomchilatib sug‘orish asoslari',
    status: 'present',
    time: '10:57'
  },
  {
    id: 11,
    name: 'Umidjon Qodirov',
    initials: 'UQ',
    group: 'Agro-202',
    course: 'Tomchilatib sug‘orish asoslari',
    status: 'late',
    time: '11:08'
  },
  {
    id: 12,
    name: 'Zarina Mamatova',
    initials: 'ZM',
    group: 'Agro-202',
    course: 'Tomchilatib sug‘orish asoslari',
    status: 'present',
    time: '10:59'
  }
];

const attendanceMeta: Record<
  AttendanceStatus,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  present: {
    label: 'Keldi',
    className: 'bg-[#e8f4eb] text-[#277348] border-[#d3ead9]',
    dotClassName: 'bg-[#31915a]'
  },
  late: {
    label: 'Kechikdi',
    className: 'bg-[#fff5df] text-[#a56a05] border-[#f2dfb3]',
    dotClassName: 'bg-[#d99a27]'
  },
  absent: {
    label: 'Kelmagan',
    className: 'bg-[#fceceb] text-[#b54845] border-[#f0d1cf]',
    dotClassName: 'bg-[#d85c57]'
  },
  excused: {
    label: 'Sababli',
    className: 'bg-[#eaf1f7] text-[#47718f] border-[#d4e2ed]',
    dotClassName: 'bg-[#628ba9]'
  }
};

const lessonStatusMeta = {
  completed: {
    label: 'Yakunlangan',
    tone: 'green' as const
  },
  current: {
    label: 'Hozirgi dars',
    tone: 'teal' as const
  },
  upcoming: {
    label: 'Keyingi dars',
    tone: 'green' as const
  }
};

const AttendanceStat = ({
  icon,
  value,
  label,
  className
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  className?: string;
}) => (
  <div className={`bg-secondary rounded-2xl p-4 ${className ?? ''}`}>
    {icon}
    <p className='mt-2 text-xl font-semibold'>{value}</p>
    <p className='text-muted-foreground text-xs'>{label}</p>
  </div>
);

const AttendanceStatusBadge = ({ status }: { status: AttendanceStatus }) => {
  const meta = attendanceMeta[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${meta.className}`}
    >
      <span className={`size-1.5 rounded-full ${meta.dotClassName}`} />
      {meta.label}
    </span>
  );
};

const LessonCard = ({
  lesson,
  selected,
  onClick
}: {
  lesson: Lesson;
  selected: boolean;
  onClick: () => void;
}) => {
  const status = lessonStatusMeta[lesson.status];

  const progress = lesson.students > 0 ? (lesson.present / lesson.students) * 100 : 0;

  return (
    <button
      className={`w-full rounded-2xl border bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
        selected ? 'border-[#137f76] ring-2 ring-[#137f76]/10' : 'border-border/70'
      }`}
      type='button'
      onClick={onClick}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <DemoStatus tone={status.tone}>{status.label}</DemoStatus>

          <h3 className='mt-3 line-clamp-2 font-[Georgia,serif] text-lg font-semibold'>
            {lesson.title}
          </h3>
        </div>

        <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4f0] text-[#137f76]'>
          <GraduationCapIcon className='size-5' />
        </div>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-2 text-xs'>
        <div className='text-muted-foreground flex items-center gap-2'>
          <Clock3Icon className='size-3.5 text-[#137f76]' />
          {lesson.time}
        </div>

        <div className='text-muted-foreground flex items-center gap-2'>
          <UsersRoundIcon className='size-3.5 text-[#137f76]' />
          {lesson.group}
        </div>
      </div>

      <div className='mt-4'>
        <div className='mb-2 flex justify-between text-xs'>
          <span className='text-muted-foreground'>Davomat</span>

          <span className='font-semibold'>
            {lesson.status === 'upcoming' ? '—' : `${lesson.present}/${lesson.students}`}
          </span>
        </div>

        <Progress value={progress} />
      </div>
    </button>
  );
};

const TeacherAttendanceRoutePage = () => {
  const [selectedLessonId, setSelectedLessonId] = useState(2);

  const [selectedGroup, setSelectedGroup] = useState('all');

  const [search, setSearch] = useState('');

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId);

  const visibleStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesGroup = selectedGroup === 'all' || student.group === selectedGroup;

      const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());

      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, search]);

  const stats = useMemo(() => {
    const data = students.filter((student) => {
      if (selectedGroup === 'all') return true;

      return student.group === selectedGroup;
    });

    return {
      total: data.length,
      present: data.filter((student) => student.status === 'present').length,
      late: data.filter((student) => student.status === 'late').length,
      absent: data.filter((student) => student.status === 'absent').length,
      excused: data.filter((student) => student.status === 'excused').length
    };
  }, [selectedGroup]);

  const attendancePercentage =
    stats.total > 0 ? Math.round(((stats.present + stats.late) / stats.total) * 100) : 0;

  return (
    <>
      <PageHeader />

      <main className='space-y-7 px-4 pb-10 sm:px-6'>
        <AgroPageIntro
          title='Davomat'
          description='Guruhlaringiz bo‘yicha o‘quvchilar davomatini kuzating va darslar kesimida holatlarni boshqaring.'
          eyebrow='O‘qituvchi kabineti'
        />

        {/* Date / filters */}
        <Card className='border-border/80 shadow-[0_18px_50px_rgba(23,33,27,0.05)]'>
          <CardContent className='flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-2'>
              <Button className='rounded-full' size='icon' variant='outline'>
                <ChevronLeftIcon className='size-4' />
              </Button>

              <div className='bg-secondary flex min-w-[190px] items-center justify-center gap-2 rounded-full px-4 py-2.5'>
                <CalendarDaysIcon className='text-primary size-4' />

                <span className='text-sm font-medium'>10-sentabr, 2026</span>
              </div>

              <Button className='rounded-full' size='icon' variant='outline'>
                <ChevronRightIcon className='size-4' />
              </Button>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row'>
              <select
                className='border-border bg-background h-10 rounded-full border px-4 text-sm transition-colors outline-none focus:border-[#137f76]'
                value={selectedGroup}
                onChange={(event) => setSelectedGroup(event.target.value)}
              >
                <option value='all'>Barcha guruhlar</option>
                <option value='Suvchilar-101'>Suvchilar-101</option>
                <option value='Agro-202'>Agro-202</option>
              </select>

              <Button
                className='rounded-full'
                variant='outline'
                onClick={() => {
                  setSelectedGroup('all');
                  setSearch('');
                }}
              >
                Bugun
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <section className='grid grid-cols-2 gap-3 md:grid-cols-5'>
          <AttendanceStat
            label='Jami o‘quvchi'
            value={stats.total}
            icon={<UsersRoundIcon className='text-primary size-4' />}
          />

          <AttendanceStat
            label='Keldi'
            value={stats.present}
            icon={<UserCheckIcon className='size-4 text-[#31915a]' />}
          />

          <AttendanceStat
            label='Kechikdi'
            value={stats.late}
            icon={<Clock3Icon className='size-4 text-[#d99a27]' />}
          />

          <AttendanceStat
            label='Kelmagan'
            value={stats.absent}
            icon={<UserXIcon className='size-4 text-[#d85c57]' />}
          />

          <AttendanceStat
            label='Sababli'
            value={stats.excused}
            icon={<UserMinusIcon className='size-4 text-[#628ba9]' />}
          />
        </section>

        {/* Main attendance overview */}
        <section className='grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]'>
          {/* Lessons */}
          <Card className='border-border/80 py-0 shadow-[0_18px_50px_rgba(23,33,27,0.05)]'>
            <div className='border-b p-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='font-[Georgia,serif] text-xl font-semibold'>Bugungi darslar</h2>

                  <p className='text-muted-foreground mt-1 text-xs'>3 ta dars rejalashtirilgan</p>
                </div>

                <div className='flex size-9 items-center justify-center rounded-xl bg-[#eaf4f0] text-[#137f76]'>
                  <CalendarCheck2Icon className='size-5' />
                </div>
              </div>
            </div>

            <CardContent className='space-y-3 p-4'>
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  selected={lesson.id === selectedLessonId}
                  lesson={lesson}
                  onClick={() => setSelectedLessonId(lesson.id)}
                />
              ))}
            </CardContent>
          </Card>

          {/* Students */}
          <Card className='border-border/80 py-0 shadow-[0_18px_50px_rgba(23,33,27,0.05)]'>
            <div className='border-b p-5'>
              <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                <div>
                  <div className='flex items-center gap-2'>
                    <h2 className='font-[Georgia,serif] text-xl font-semibold'>
                      O‘quvchilar davomatlari
                    </h2>

                    <span className='bg-secondary rounded-full px-2.5 py-1 text-xs font-medium'>
                      {visibleStudents.length}
                    </span>
                  </div>

                  <p className='text-muted-foreground mt-1 text-xs'>
                    {selectedLesson?.group} · {selectedLesson?.time}
                  </p>
                </div>

                <div className='relative w-full lg:w-60'>
                  <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />

                  <input
                    className='border-border bg-background placeholder:text-muted-foreground h-10 w-full rounded-full border pr-4 pl-9 text-sm transition-colors outline-none focus:border-[#137f76]'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder='O‘quvchini qidirish...'
                  />
                </div>
              </div>
            </div>

            <CardContent className='p-0'>
              {/* Attendance progress */}
              <div className='border-b bg-[#f8faf8] px-5 py-4'>
                <div className='flex items-center justify-between text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Umumiy davomat</span>

                    <span className='ml-2 font-semibold'>{attendancePercentage}%</span>
                  </div>

                  <span className='text-muted-foreground text-xs'>
                    {stats.present + stats.late} / {stats.total} ishtirok etdi
                  </span>
                </div>

                <Progress className='mt-2' value={attendancePercentage} />
              </div>

              {/* Desktop table */}
              <div className='hidden overflow-x-auto md:block'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b text-left'>
                      <th className='text-muted-foreground px-5 py-3 text-xs font-medium'>
                        O‘quvchi
                      </th>

                      <th className='text-muted-foreground px-5 py-3 text-xs font-medium'>Guruh</th>

                      <th className='text-muted-foreground px-5 py-3 text-xs font-medium'>
                        Kelish vaqti
                      </th>

                      <th className='text-muted-foreground px-5 py-3 text-xs font-medium'>Holat</th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleStudents.map((student) => (
                      <tr key={student.id} className='hover:bg-secondary/40 border-b last:border-0'>
                        <td className='px-5 py-3.5'>
                          <div className='flex items-center gap-3'>
                            <div className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e4f0eb] text-xs font-semibold text-[#176c5f]'>
                              {student.initials}
                            </div>

                            <span className='text-sm font-medium'>{student.name}</span>
                          </div>
                        </td>

                        <td className='text-muted-foreground px-5 py-3.5 text-sm'>
                          {student.group}
                        </td>

                        <td className='text-muted-foreground px-5 py-3.5 text-sm'>
                          {student.time ?? '—'}
                        </td>

                        <td className='px-5 py-3.5'>
                          <AttendanceStatusBadge status={student.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className='space-y-2 p-3 md:hidden'>
                {visibleStudents.map((student) => (
                  <div key={student.id} className='rounded-2xl border p-3'>
                    <div className='flex items-center justify-between gap-3'>
                      <div className='flex min-w-0 items-center gap-3'>
                        <div className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e4f0eb] text-xs font-semibold text-[#176c5f]'>
                          {student.initials}
                        </div>

                        <div className='min-w-0'>
                          <p className='truncate text-sm font-medium'>{student.name}</p>

                          <p className='text-muted-foreground mt-0.5 text-xs'>{student.group}</p>
                        </div>
                      </div>

                      <AttendanceStatusBadge status={student.status} />
                    </div>

                    {student.time && (
                      <div className='text-muted-foreground mt-3 flex items-center gap-2 border-t pt-2 text-xs'>
                        <Clock3Icon className='size-3.5' />
                        Kelgan vaqti: {student.time}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {visibleStudents.length === 0 && (
                <div className='flex flex-col items-center justify-center px-5 py-12 text-center'>
                  <div className='bg-secondary flex size-12 items-center justify-center rounded-full'>
                    <SearchIcon className='text-muted-foreground size-5' />
                  </div>

                  <p className='mt-3 text-sm font-medium'>O‘quvchi topilmadi</p>

                  <p className='text-muted-foreground mt-1 text-xs'>
                    Qidiruv so‘rovini o‘zgartirib ko‘ring.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Bottom summary */}
        <section className='grid gap-5 lg:grid-cols-2'>
          <Card className='border-border/80 overflow-hidden py-0 shadow-[0_18px_50px_rgba(23,33,27,0.05)]'>
            <div className='public-water-lines bg-[#153f38] p-5 text-white'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-xs text-white/60'>Bugungi natija</p>

                  <h2 className='mt-1 font-[Georgia,serif] text-2xl font-semibold'>
                    {attendancePercentage}% davomat
                  </h2>
                </div>

                <CalendarCheck2Icon className='size-8 text-[#c9e16f]' />
              </div>
            </div>

            <CardContent className='p-5'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='bg-secondary rounded-2xl p-3'>
                  <p className='text-xl font-semibold'>{lessons.length}</p>
                  <p className='text-muted-foreground mt-1 text-xs'>Dars</p>
                </div>

                <div className='bg-secondary rounded-2xl p-3'>
                  <p className='text-xl font-semibold'>
                    {lessons.reduce((sum, lesson) => sum + lesson.students, 0)}
                  </p>
                  <p className='text-muted-foreground mt-1 text-xs'>Tinglovchi</p>
                </div>

                <div className='bg-secondary rounded-2xl p-3'>
                  <p className='text-xl font-semibold'>
                    {lessons.reduce((sum, lesson) => sum + lesson.present, 0)}
                  </p>
                  <p className='text-muted-foreground mt-1 text-xs'>Ishtirok</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-border/80 shadow-[0_18px_50px_rgba(23,33,27,0.05)]'>
            <CardContent className='p-5'>
              <div className='flex items-start gap-3'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5e5] text-[#5f8125]'>
                  <UserCheckIcon className='size-5' />
                </div>

                <div>
                  <h3 className='font-semibold'>Davomat bo‘yicha eslatma</h3>

                  <p className='text-muted-foreground mt-1 text-sm leading-6'>
                    Dars boshlangandan keyin o‘quvchilar davomatini belgilang. Kechikkan
                    tinglovchilar uchun kelish vaqtini ham saqlash tavsiya etiladi.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export const Route = createFileRoute('/_authenticated/teacher/attendance/')({
  component: TeacherAttendanceRoutePage
});
