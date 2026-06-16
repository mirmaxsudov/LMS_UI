import { MegaphoneIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { AnnouncementCard } from '@/modules/announcement/components/AnnouncementCard';
import { AnnouncementFormDialog } from '@/modules/announcement/components/AnnouncementFormDialog';
import { AnnouncementsOverview } from '@/modules/announcement/components/AnnouncementsOverview';
import {
  ANNOUNCEMENT_AUDIENCE_CONFIG,
  ANNOUNCEMENT_AUDIENCE_ORDER,
  ANNOUNCEMENT_PRIORITY_CONFIG,
  ANNOUNCEMENT_PRIORITY_ORDER
} from '@/modules/announcement/constants';
import { MOCK_ANNOUNCEMENTS } from '@/modules/announcement/data';
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
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const STATUS_TABS: { label: string; value: 'all' | AnnouncementStatus }[] = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'draft', label: 'Drafts' }
];

const sortAnnouncements = (announcements: Announcement[]) =>
  [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

export const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | AnnouncementStatus>('all');
  const [priority, setPriority] = useState<'all' | AnnouncementPriority>('all');
  const [audience, setAudience] = useState<'all' | AnnouncementAudience>('all');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editValues, setEditValues] = useState<Announcement | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = announcements.filter((item) => {
      const matchesStatus = status === 'all' || item.status === status;
      const matchesPriority = priority === 'all' || item.priority === priority;
      const matchesAudience = audience === 'all' || item.audiences.includes(audience);
      const matchesSearch =
        query === '' ||
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.author.name.toLowerCase().includes(query);

      return matchesStatus && matchesPriority && matchesAudience && matchesSearch;
    });

    return sortAnnouncements(result);
  }, [announcements, search, status, priority, audience]);

  const openCreate = () => {
    setEditValues(null);
    setIsFormOpen(true);
  };

  const openEdit = (announcement: Announcement) => {
    setEditValues(announcement);
    setIsFormOpen(true);
  };

  const handleSubmit = (draft: AnnouncementDraft) => {
    if (editValues) {
      setAnnouncements((prev) =>
        prev.map((item) => (item.id === editValues.id ? { ...item, ...draft } : item))
      );
      return;
    }

    const newAnnouncement: Announcement = {
      ...draft,
      id: crypto.randomUUID(),
      status: 'published',
      author: { id: 'me', name: 'You', role: 'Administrator', avatarUrl: null },
      publishedAt: new Date().toISOString(),
      scheduledAt: null,
      viewsCount: 0
    };

    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const handleDelete = (id: string) =>
    setAnnouncements((prev) => prev.filter((item) => item.id !== id));

  const handleTogglePin = (id: string) =>
    setAnnouncements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item))
    );

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

      <AnnouncementsOverview announcements={announcements} />

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

      {filtered.length > 0 ? (
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {filtered.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onDelete={handleDelete}
              onEdit={openEdit}
              onTogglePin={handleTogglePin}
            />
          ))}
        </div>
      ) : (
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
