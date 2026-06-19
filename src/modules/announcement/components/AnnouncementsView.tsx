import { useInfiniteQuery } from '@tanstack/react-query';
import { MegaphoneIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { AnnouncementCard } from '@/modules/announcement/components/AnnouncementCard';
import {
  ANNOUNCEMENT_PRIORITY_CONFIG,
  ANNOUNCEMENT_PRIORITY_ORDER
} from '@/modules/announcement/constants';
import { getAnnouncementsInfiniteQueryOptions } from '@/modules/announcement/options';
import { useDebouncedValue } from '@/shared/hooks/useDeboucedValue';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';
import { Spinner } from '@/shared/ui/spinner';

const sortAnnouncements = (announcements: Announcement[]) =>
  [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();
  });

export const AnnouncementsView = () => {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<'all' | AnnouncementPriority>('all');

  const debouncedSearch = useDebouncedValue(search);

  const filters = useMemo(
    () => ({
      search: debouncedSearch.trim() || undefined,
      priority: priority === 'all' ? undefined : priority,
      status: 'PUBLISHED' as AnnouncementStatus
    }),
    [debouncedSearch, priority]
  );

  const announcementsQuery = useInfiniteQuery(
    getAnnouncementsInfiniteQueryOptions({ filters })
  );

  const announcements = useMemo(
    () =>
      sortAnnouncements(
        announcementsQuery.data?.pages.flatMap((page) => page.data.results) ?? []
      ),
    [announcementsQuery.data]
  );

  const { ref } = useInView({
    onChange: async (inView) => {
      if (
        inView &&
        announcementsQuery.hasNextPage &&
        !announcementsQuery.isFetchingNextPage
      ) {
        await announcementsQuery.fetchNextPage();
      }
    }
  });

  const isInitialLoading = announcementsQuery.isLoading;
  const isEmpty = !isInitialLoading && announcements.length === 0;

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-2xl font-semibold'>Announcements</h1>
        <p className='text-muted-foreground text-sm'>
          Stay up to date with the latest news from your learning center.
        </p>
      </div>

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <InputGroup className='sm:max-w-xs'>
          <InputGroupInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search announcements'
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Select value={priority} onValueChange={(value) => setPriority(value as typeof priority)}>
          <SelectTrigger className='w-full sm:w-44'>
            <SelectValue placeholder='Priority' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All priorities</SelectItem>
            {ANNOUNCEMENT_PRIORITY_ORDER.map((item) => (
              <SelectItem key={item} value={item}>
                {ANNOUNCEMENT_PRIORITY_CONFIG[item].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isInitialLoading ? (
        <div className='flex items-center justify-center py-16'>
          <Spinner />
        </div>
      ) : isEmpty ? (
        <Empty className='border'>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <MegaphoneIcon />
            </EmptyMedia>
            <EmptyTitle>No announcements yet</EmptyTitle>
            <EmptyDescription>
              There are no announcements to show right now. Check back later.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>

          <div ref={ref} className='flex items-center justify-center py-2'>
            {announcementsQuery.isFetchingNextPage && <Spinner />}
          </div>
        </>
      )}
    </div>
  );
};
