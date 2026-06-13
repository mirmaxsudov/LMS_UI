import { Award, Crown, Flame, Medal, Star, Target, Trophy, Zap } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import type { Achievement } from './types';

import { achievements } from './mock-data';

const icons: Record<Achievement['icon'], typeof Award> = {
  award: Award,
  crown: Crown,
  flame: Flame,
  medal: Medal,
  star: Star,
  target: Target,
  trophy: Trophy,
  zap: Zap
};

export const AchievementsGrid = () => {
  const earnedCount = achievements.filter((item) => item.earnedAt).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>
          {earnedCount} of {achievements.length} badges earned
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
          {achievements.map((achievement) => {
            const Icon = icons[achievement.icon];
            const earned = Boolean(achievement.earnedAt);

            return (
              <div
                key={achievement.id}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border p-4 text-center',
                  earned ? 'bg-card' : 'bg-muted/40 opacity-60'
                )}
              >
                <div
                  className={cn(
                    'flex size-12 items-center justify-center rounded-full',
                    earned ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  )}
                >
                  <Icon className='size-6' />
                </div>
                <div>
                  <p className='text-sm font-medium'>{achievement.title}</p>
                  <p className='text-muted-foreground mt-1 text-xs'>{achievement.description}</p>
                </div>
                {earned && achievement.earnedAt && (
                  <p className='text-success text-xs font-medium'>
                    Earned{' '}
                    {new Date(achievement.earnedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
