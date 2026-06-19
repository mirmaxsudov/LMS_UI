import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MegaphoneIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

import { AnnouncementCard } from '@/modules/announcement/components/AnnouncementCard';
import { AnnouncementFormDialog } from '@/modules/announcement/components/AnnouncementFormDialog';
import { AnnouncementsOverview } from '@/modules/announcement/components/AnnouncementsOverview';
import {
  ANNOUNCEMENT_AUDIENCE_CONFIG,
  ANNOUNCEMENT_AUDIENCE_ORDER,
  ANNOUNCEMENT_PRIORITY_CONFIG,
  ANNOUNCEMENT_PRIORITY_ORDER
} from '@/modules/announcement/constants';
import {
  ANNOUNCEMENT_QUERY_KEYS,
  getAnnouncementsInfiniteQueryOptions
} from '@/modules/announcement/options';
import {
  deleteAnnouncement,
  patchAnnouncementPinned,
  postAnnouncement,
  putAnnouncement
} from '@/shared/api';
import { useDebouncedValue } from '@/shared/hooks/useDeboucedValue';
import { Button } from '@/shared/ui/button';
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
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const STATUS_TABS: { label: string; value: 'all' | AnnouncementStatus }[] = [
  { value: 'all', label: 'All' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'DRAFT', label: 'Drafts' }
];

const sortAnnouncements = (announcements: Announcement[]) =>
  [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();
  });

export const AnnouncementsPage = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | AnnouncementStatus>('all');
  const [priority, setPriority] = useState<'all' | AnnouncementPriority>('all');
  const [audience, setAudience] = useState<'all' | AnnouncementAudience>('all');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editValues, setEditValues] = useState<Announcement | null>(null);

  const debouncedSearch = useDebouncedValue(search);

  const filters = useMemo(
    () => ({
      search: debouncedSearch.trim() || undefined,
      status: status === 'all' ? undefined : status,
      priority: priority === 'all' ? undefined : priority,
      audience: audience === 'all' ? undefined : audience
    }),
    [debouncedSearch, status, priority, audience]
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

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ANNOUNCEMENT_QUERY_KEYS.base() });

  const createMutation = useMutation({
    mutationFn: postAnnouncement,
    onSuccess: async () => {
      toast.success('Announcement created');
      await invalidate();
    },
    onError: () => toast.error('Failed to create announcement')
  });

  const updateMutation = useMutation({
    mutationFn: putAnnouncement,
    onSuccess: async () => {
      toast.success('Announcement updated');
      await invalidate();
    },
    onError: () => toast.error('Failed to update announcement')
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: async () => {
      toast.success('Announcement deleted');
      await invalidate();
    },
    onError: () => toast.error('Failed to delete announcement')
  });

  const pinMutation = useMutation({
    mutationFn: patchAnnouncementPinned,
    onSuccess: async () => {
      await invalidate();
    },
    onError: () => toast.error('Failed to update announcement')
  });

  const openCreate = () => {
    setEditValues(null);
    setIsFormOpen(true);
  };

  const openEdit = (announcement: Announcement) => {
    setEditValues(announcement);
    setIsFormOpen(true);
  };

  const handleSubmit = (draft: AnnouncementDto) => {
    if (editValues) {
      updateMutation.mutate({ id: editValues.id, data: draft });
      return;
    }

    createMutation.mutate({ data: draft });
  };

  const handleDelete = (id: string) => deleteMutation.mutate({ id });

  const handleTogglePin = (id: string) => {
    const target = announcements.find((item) => item.id === id);
    if (!target) return;

    pinMutation.mutate({ id, data: { pinned: !target.pinned } });
  };

  const isInitialLoading = announcementsQuery.isLoading;
  const isEmpty = !isInitialLoading && announcements.length === 0;

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Announcements</h1>
          <p className='text-muted-foreground text-sm'>
            Create and manage updates for students, teachers, and parents.
          </p>
        </div>
        <Button onClick={openCreate}>
          <PlusIcon />
          New announcement
        </Button>
      </div>

      <AnnouncementsOverview />

      <div className='flex flex-col gap-4'>
        <Tabs value={status} onValueChange={(value) => setStatus(value as typeof status)}>
          <TabsList>
            {STATUS_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
          <InputGroup className='lg:max-w-xs'>
            <InputGroupInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Search announcements'
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <Select
              value={audience}
              onValueChange={(value) => setAudience(value as typeof audience)}
            >
              <SelectTrigger className='w-full sm:w-44'>
                <SelectValue placeholder='Audience' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All audiences</SelectItem>
                {ANNOUNCEMENT_AUDIENCE_ORDER.map((item) => (
                  <SelectItem key={item} value={item}>
                    {ANNOUNCEMENT_AUDIENCE_CONFIG[item].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as typeof priority)}
            >
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
        </div>
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
            <EmptyTitle>No announcements found</EmptyTitle>
            <EmptyDescription>
              Try adjusting your filters, or create a new announcement to get started.
            </EmptyDescription>
          </EmptyHeader>
          <Button onClick={openCreate}>
            <PlusIcon />
            New announcement
          </Button>
        </Empty>
      ) : (
        <>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onDelete={handleDelete}
                onEdit={openEdit}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>

          <div ref={ref} className='flex items-center justify-center py-2'>
            {announcementsQuery.isFetchingNextPage && <Spinner />}
          </div>
        </>
      )}

      <AnnouncementFormDialog
        editValues={editValues}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmit}
        open={isFormOpen}
      />
    </div>
  );
};
