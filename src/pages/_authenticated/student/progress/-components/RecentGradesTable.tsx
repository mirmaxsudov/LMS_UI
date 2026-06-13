import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import type { GradeType } from './types';

import { recentGrades } from './mock-data';

const typeLabel: Record<GradeType, string> = {
  exam: 'Exam',
  homework: 'Homework',
  project: 'Project',
  quiz: 'Quiz'
};

const typeVariant: Record<GradeType, 'default' | 'outline' | 'secondary'> = {
  exam: 'default',
  homework: 'secondary',
  project: 'outline',
  quiz: 'secondary'
};

const scoreVariant = (percentage: number) => {
  if (percentage >= 90) return 'success';
  if (percentage >= 75) return 'default';
  return 'destructive';
};

export const RecentGradesTable = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent grades</CardTitle>
        <CardDescription>Latest exams, quizzes, homework and projects</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Assessment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className='text-right'>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentGrades.map((grade) => {
              const percentage = Math.round((grade.score / grade.maxScore) * 100);

              return (
                <TableRow key={grade.id}>
                  <TableCell className='text-muted-foreground whitespace-nowrap'>
                    {new Date(grade.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className='font-medium whitespace-nowrap'>{grade.subject}</TableCell>
                  <TableCell className='text-muted-foreground'>{grade.title}</TableCell>
                  <TableCell>
                    <Badge variant={typeVariant[grade.type]}>{typeLabel[grade.type]}</Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Badge variant={scoreVariant(percentage)}>
                      {grade.score}/{grade.maxScore} · {percentage}%
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
