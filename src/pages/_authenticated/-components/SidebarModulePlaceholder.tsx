import { type LucideIcon, LayoutGridIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { PageContent } from '@/shared/ui/page';

type SidebarModulePlaceholderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
};

export const SidebarModulePlaceholder = ({
  title,
  description = 'Example UI placeholder for this module.',
  icon: Icon = LayoutGridIcon
}: SidebarModulePlaceholderProps) => {
  return (
    <PageContent className='bg-background px-4 py-5 md:px-8 md:py-6'>
      <div className='mx-auto max-w-5xl'>
        <Card>
          <CardHeader>
            <div className='bg-primary/10 text-primary mb-2 inline-flex size-11 items-center justify-center rounded-lg'>
              <Icon className='size-5' />
            </div>
            <CardTitle className='text-3xl'>{title}</CardTitle>
            <CardDescription className='text-base'>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-muted-foreground rounded-lg border border-dashed p-8 text-sm'>
              Build module-specific widgets, tables, and forms here.
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
};
