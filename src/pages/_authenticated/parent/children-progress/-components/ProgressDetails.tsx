import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  CircleIcon,
  MessageSquareQuoteIcon,
  TrendingDownIcon,
  TrendingUpIcon
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import { goals, recentAssessments, subjectMastery } from './mock-data';

const getResult = (score: number) => {
  if (score >= 88) return 'Excellent';
  if (score >= 80) return 'Very good';
  return 'Good';
};

export const ProgressDetails = () => (
  <>
    <div className='grid gap-4 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.5fr)]'>
      <Card>
        <CardHeader>
          <CardTitle>Subject mastery</CardTitle>
          <CardDescription>Skill-level performance for the current term</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-5'>
          {subjectMastery.map((item) => (
            <div key={item.subject} className='grid grid-cols-[90px_1fr_auto] items-center gap-3'>
              <span className='text-sm font-medium'>{item.subject}</span>
              <Progress aria-label={`${item.subject} mastery`} value={item.score} />
              <div className='flex w-20 items-center justify-end gap-1'>
                <span className='text-sm font-semibold'>{item.score}%</span>
                {item.change >= 0 ? (
                  <TrendingUpIcon aria-label='Improving' className='text-success size-3.5' />
                ) : (
                  <TrendingDownIcon aria-label='Declining' className='text-destructive size-3.5' />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent assessments</CardTitle>
          <CardDescription>Latest quizzes, tests and submitted work</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className='font-medium'>{assessment.title}</TableCell>
                  <TableCell className='text-muted-foreground'>{assessment.subject}</TableCell>
                  <TableCell className='text-muted-foreground'>{assessment.date}</TableCell>
                  <TableCell className='font-semibold'>{assessment.score}%</TableCell>
                  <TableCell>
                    <Badge variant={assessment.score >= 80 ? 'success' : 'secondary'}>
                      {getResult(assessment.score)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

    <div className='grid gap-4 xl:grid-cols-2'>
      <Card className='border-primary/25 bg-primary/5'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <MessageSquareQuoteIcon className='text-primary size-5' />
            <CardTitle>Teacher insight</CardTitle>
          </div>
        </CardHeader>
        <CardContent className='flex items-start gap-4'>
          <Avatar className='size-11'>
            <AvatarFallback className='bg-primary/10 text-primary font-semibold'>SJ</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-3'>
            <blockquote className='text-sm leading-6'>
              “Amina participates actively and has made strong progress in grammar accuracy and
              speaking fluency. The next focus is expanding vocabulary and writing organization.”
            </blockquote>
            <div className='text-sm'>
              <strong>Sarah Johnson</strong>
              <span className='text-muted-foreground'> · 12 Jun 2026</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming goals</CardTitle>
          <CardDescription>Priorities agreed with the teacher</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-1'>
          {goals.map((goal) => (
            <div
              key={goal.id}
              className='hover:bg-muted/50 flex items-center gap-3 rounded-lg px-2 py-3 transition-colors'
            >
              {goal.completed ? (
                <CheckCircle2Icon className='text-success size-5 shrink-0' />
              ) : (
                <CircleIcon className='text-primary size-5 shrink-0' />
              )}
              <span
                className={
                  goal.completed
                    ? 'text-muted-foreground flex-1 text-sm line-through'
                    : 'flex-1 text-sm font-medium'
                }
              >
                {goal.title}
              </span>
              <span className='text-muted-foreground flex items-center gap-1.5 text-xs'>
                <CalendarDaysIcon className='size-3.5' />
                {goal.due}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </>
);
