import { StarIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';

import { feedbackRatings, progressOverview } from './mock-data';

export const FeedbackSummaryCard = () => {
  const total = feedbackRatings.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Student feedback</CardTitle>
        <CardDescription>{total} responses collected this term</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <div className='flex items-center gap-4'>
          <div className='text-center'>
            <p className='text-3xl font-semibold'>{progressOverview.feedbackRating.toFixed(1)}</p>
            <div className='flex items-center justify-center gap-0.5'>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={
                    index < Math.round(progressOverview.feedbackRating)
                      ? 'size-3.5 fill-chart-3 text-chart-3'
                      : 'text-muted-foreground size-3.5'
                  }
                />
              ))}
            </div>
            <p className='text-muted-foreground mt-1 text-xs'>out of 5</p>
          </div>
          <div className='flex-1 space-y-2'>
            {feedbackRatings.map((item) => (
              <div key={item.rating} className='flex items-center gap-2'>
                <span className='text-muted-foreground w-3 shrink-0 text-xs'>{item.stars}</span>
                <Progress className='h-1.5' value={(item.count / total) * 100} />
                <span className='text-muted-foreground w-8 shrink-0 text-right text-xs'>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
