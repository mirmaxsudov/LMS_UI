import {
  BookOpenIcon,
  EyeIcon,
  MailIcon,
  MoreHorizontalIcon,
  SearchIcon,
  UserRoundCheckIcon,
  UsersIcon
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { PageContent } from '@/shared/ui/page';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import type { StudentStatus, TeacherStudent } from './types';

import { teacherStudents } from './mock-data';

const statusLabel: Record<StudentStatus, string> = {
  active: 'Active',
  'at-risk': 'At risk',
  inactive: 'Inactive'
};

const statusVariant: Record<StudentStatus, 'destructive' | 'outline' | 'success'> = {
  active: 'success',
  'at-risk': 'destructive',
  inactive: 'outline'
};

const groups = [...new Set(teacherStudents.map((student) => student.group))];

const getScoreVariant = (score: number) => {
  if (score >= 85) return 'success';
  if (score >= 70) return 'default';
  return 'destructive';
};

interface StudentActionsProps {
  student: TeacherStudent;
}

const StudentActions = ({ student }: StudentActionsProps) => {
  const showActionToast = (action: string) => {
    toast.info(`${action}: ${student.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label={`Open actions for ${student.name}`} size='icon-sm' variant='ghost'>
          <MoreHorizontalIcon data-icon='inline-start' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-44'>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => showActionToast('View profile')}>
            <EyeIcon />
            View profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => showActionToast('Message student')}>
            <MailIcon />
            Send message
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => showActionToast('Open courses')}>
            <BookOpenIcon />
            View courses
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const StudentsTable = () => {
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return teacherStudents.filter((student) => {
      const matchesGroup = group === 'all' || student.group === group;
      const matchesSearch =
        !normalizedSearch ||
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.email.toLowerCase().includes(normalizedSearch);

      return matchesGroup && matchesSearch;
    });
  }, [group, search]);

  const activeStudentsCount = teacherStudents.filter(
    (student) => student.status === 'active'
  ).length;
  const averageAttendance = Math.round(
    teacherStudents.reduce((total, student) => total + student.attendanceRate, 0) /
      teacherStudents.length
  );

  return (
    <PageContent className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight'>Students</h1>
          <p className='text-muted-foreground text-sm'>
            View student performance and manage your class roster.
          </p>
        </div>
        <Button onClick={() => toast.info('Preparing a message for all students')}>
          <MailIcon data-icon='inline-start' />
          Message all
        </Button>
      </div>

      <div className='grid gap-4 sm:grid-cols-3'>
        <Card className='gap-3 py-4 shadow-none'>
          <CardHeader className='gap-1 px-4'>
            <CardDescription>Total students</CardDescription>
            <CardTitle className='flex items-center justify-between text-2xl'>
              {teacherStudents.length}
              <UsersIcon className='text-muted-foreground size-5' />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className='gap-3 py-4 shadow-none'>
          <CardHeader className='gap-1 px-4'>
            <CardDescription>Active students</CardDescription>
            <CardTitle className='flex items-center justify-between text-2xl'>
              {activeStudentsCount}
              <UserRoundCheckIcon className='text-muted-foreground size-5' />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className='gap-3 py-4 shadow-none'>
          <CardHeader className='gap-1 px-4'>
            <CardDescription>Average attendance</CardDescription>
            <CardTitle className='flex items-center justify-between text-2xl'>
              {averageAttendance}%
              <BookOpenIcon className='text-muted-foreground size-5' />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className='gap-0 overflow-hidden py-0'>
        <CardHeader className='border-b py-5'>
          <CardTitle>Student roster</CardTitle>
          <CardDescription>
            {filteredStudents.length} of {teacherStudents.length} students
          </CardDescription>
        </CardHeader>

        <CardContent className='p-0'>
          <div className='flex flex-col gap-2 border-b px-6 py-4 sm:flex-row'>
            <div className='relative'>
              <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input
                aria-label='Search students'
                className='w-full pl-9 sm:w-64'
                size='sm'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder='Search students...'
              />
            </div>
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger aria-label='Filter by group' className='w-full sm:w-48' size='sm'>
                <SelectValue placeholder='All groups' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All groups</SelectItem>
                  {groups.map((groupName) => (
                    <SelectItem key={groupName} value={groupName}>
                      {groupName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='pl-6'>Student</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Avg. score</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='pr-6 text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className='pl-6'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='size-9'>
                          <AvatarFallback className='text-xs font-medium'>
                            {student.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex min-w-0 flex-col'>
                          <span className='font-medium'>{student.name}</span>
                          <span className='text-muted-foreground text-xs'>{student.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.group}</TableCell>
                    <TableCell>{student.enrolledCourses}</TableCell>
                    <TableCell>{student.attendanceRate}%</TableCell>
                    <TableCell>
                      <Badge variant={getScoreVariant(student.averageScore)}>
                        {student.averageScore}%
                      </Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>{student.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[student.status]}>
                        {statusLabel[student.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className='pr-6 text-right'>
                      <StudentActions student={student} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className='text-muted-foreground h-28 text-center' colSpan={8}>
                    No students match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageContent>
  );
};
