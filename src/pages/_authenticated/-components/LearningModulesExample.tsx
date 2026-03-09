import { useLingui } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, CheckCircle2Icon, CircleIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { PageContent } from '@/shared/ui/page';
import { Progress } from '@/shared/ui/progress';

import { useSidebarData } from './AppSidebar/useSidebarData';

type LearningModulesExampleProps = {
  activeUrl: string;
};

const moduleCompletion: Record<string, number> = {
  '/dashboard': 80,
  '/courses': 65,
  '/courses/player': 42,
  '/assignments': 56,
  '/assignments/submission': 38,
  '/discussions': 74,
  '/discussions/thread': 51,
  '/progress': 90,
  '/notifications': 33,
  '/calendar': 47,
  '/certificates': 22,
  '/profile': 61,
  '/settings/account': 70,
  '/settings/security': 49
};

const recentActivity = [
  'Completed lesson recap in Course Player',
  'Submitted assignment draft for review',
  'Replied to 3 discussion thread comments',
  'Updated study calendar for this week'
] as const;

export const LearningModulesExample = ({ activeUrl }: LearningModulesExampleProps) => {
  const { t } = useLingui();
  const { navGroups } = useSidebarData();
  const learningGroup = navGroups.find((group) => String(group.title) === 'Learning');
  const learningItems = (learningGroup?.items ?? []).filter((item) => Boolean(item.url));
  const activeModule = learningItems.find((item) => item.url === activeUrl) ?? learningItems[0];
  const activeModuleUrl = activeModule?.url ?? '/dashboard';

  return (
    <PageContent className='bg-background px-4 py-5 md:px-8 md:py-6'>
      <div className='mx-auto max-w-7xl space-y-6'>
        <Card className='border-primary/20 bg-gradient-to-r from-primary/10 to-transparent'>
          <CardHeader>
            <div className='flex flex-wrap items-center gap-3'>
              <Badge className='rounded-full px-3 py-1 text-sm'>Learning Module</Badge>
              <CardTitle className='text-3xl'>{t(activeModule?.title ?? 'Learning')} Example UI</CardTitle>
            </div>
            <CardDescription className='text-base'>
              This is a sample page layout for learning-related navigation modules.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-sm font-medium'>Completion</p>
              <p className='text-muted-foreground text-sm'>{moduleCompletion[activeModuleUrl] ?? 0}%</p>
            </div>
            <Progress value={moduleCompletion[activeModuleUrl] ?? 0} />
          </CardContent>
        </Card>

        <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {learningItems.map((item) => {
            const itemUrl = item.url ?? '/dashboard';
            const isActive = itemUrl === activeUrl;
            const Icon = item.icon;

            return (
              <Card
                className={isActive ? 'border-primary ring-primary/20 ring-2' : ''}
                key={`${String(item.title)}-${itemUrl}`}
              >
                <CardHeader>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg'>
                      {Icon && <Icon className='size-5' />}
                    </div>
                    {isActive ? (
                      <Badge className='rounded-full'>Current</Badge>
                    ) : (
                      <Badge className='rounded-full' variant='outline'>
                        Module
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{t(item.title)}</CardTitle>
                  <CardDescription>Progress {moduleCompletion[itemUrl] ?? 0}% in this module.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className='w-full justify-between'
                    variant={isActive ? 'default' : 'outline'}
                  >
                    <Link to={itemUrl}>
                      Open Module
                      <ArrowRightIcon className='size-4' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Recent Learning Activity</CardTitle>
            <CardDescription>Example timeline shown for LMS learning pages.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {recentActivity.map((activity, index) => (
              <div className='flex items-start gap-3' key={activity}>
                {index < 2 ? (
                  <CheckCircle2Icon className='mt-0.5 size-5 text-emerald-600' />
                ) : (
                  <CircleIcon className='text-muted-foreground mt-0.5 size-5' />
                )}
                <p className='text-sm'>{activity}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
};
