import { useId, useState } from 'react';

import {
  ANNOUNCEMENT_AUDIENCE_CONFIG,
  ANNOUNCEMENT_AUDIENCE_ORDER,
  ANNOUNCEMENT_PRIORITY_CONFIG,
  ANNOUNCEMENT_PRIORITY_ORDER,
  ANNOUNCEMENT_STATUS_CONFIG,
  ANNOUNCEMENT_STATUS_ORDER
} from '@/modules/announcement/constants';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';

const EMPTY_DRAFT: AnnouncementDto = {
  title: '',
  content: '',
  priority: 'NORMAL',
  audiences: ['ALL'],
  pinned: false,
  status: 'PUBLISHED',
  publishedAt: ''
};

const toDraft = (announcement: Announcement): AnnouncementDto => ({
  title: announcement.title,
  content: announcement.content,
  priority: announcement.priority,
  audiences: announcement.audiences,
  pinned: announcement.pinned,
  status: announcement.status,
  publishedAt: announcement.publishedAt ?? ''
});

// `datetime-local` inputs expect `YYYY-MM-DDTHH:mm` in local time, while the
// draft stores an ISO string. These helpers convert between the two.
const toDateTimeLocal = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const fromDateTimeLocal = (value: string) =>
  value ? new Date(value).toISOString() : '';

interface AnnouncementFormProps {
  editValues: Announcement | null;
  onCancel: () => void;
  onSubmit: (draft: AnnouncementDto) => void;
}

const AnnouncementForm = ({ editValues, onCancel, onSubmit }: AnnouncementFormProps) => {
  const isEditMode = Boolean(editValues);
  const fieldId = useId();
  const [draft, setDraft] = useState<AnnouncementDto>(() =>
    editValues ? toDraft(editValues) : EMPTY_DRAFT
  );

  const isValid =
    draft.title.trim() !== '' && draft.content.trim() !== '' && draft.audiences.length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) return;

    onSubmit({ ...draft, title: draft.title.trim(), content: draft.content.trim() });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Edit announcement' : 'New announcement'}</DialogTitle>
        <DialogDescription>
          {isEditMode
            ? 'Update the details and save your changes.'
            : 'Share an update with the people who need to see it.'}
        </DialogDescription>
      </DialogHeader>

      <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label htmlFor={`${fieldId}-title`}>Title</Label>
            <Input
              id={`${fieldId}-title`}
              value={draft.title}
              autoFocus
              onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
              placeholder='e.g. Exam schedule released'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor={`${fieldId}-content`}>Message</Label>
            <Textarea
              className='min-h-28 resize-none'
              id={`${fieldId}-content`}
              value={draft.content}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, content: event.target.value }))
              }
              placeholder='Write the announcement details…'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor={`${fieldId}-priority`}>Priority</Label>
            <Select
              value={draft.priority}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, priority: value as AnnouncementPriority }))
              }
            >
              <SelectTrigger className='w-full' id={`${fieldId}-priority`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ANNOUNCEMENT_PRIORITY_ORDER.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {ANNOUNCEMENT_PRIORITY_CONFIG[priority].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor={`${fieldId}-status`}>Status</Label>
            <Select
              value={draft.status}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, status: value as AnnouncementStatus }))
              }
            >
              <SelectTrigger className='w-full' id={`${fieldId}-status`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ANNOUNCEMENT_STATUS_ORDER.map((status) => (
                  <SelectItem key={status} value={status}>
                    {ANNOUNCEMENT_STATUS_CONFIG[status].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor={`${fieldId}-publishedAt`}>Publish date</Label>
            <Input
              id={`${fieldId}-publishedAt`}
              type='datetime-local'
              value={toDateTimeLocal(draft.publishedAt)}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  publishedAt: fromDateTimeLocal(event.target.value)
                }))
              }
            />
          </div>

          <div className='space-y-2'>
            <Label>Audience</Label>
            <ToggleGroup
              className='flex flex-wrap'
              spacing={2}
              type='multiple'
              value={draft.audiences}
              variant='outline'
              onValueChange={(value) =>
                setDraft((prev) => ({
                  ...prev,
                  audiences: value as AnnouncementAudience[]
                }))
              }
            >
              {ANNOUNCEMENT_AUDIENCE_ORDER.map((audience) => {
                const config = ANNOUNCEMENT_AUDIENCE_CONFIG[audience];
                const Icon = config.icon;

                return (
                  <ToggleGroupItem key={audience} className='gap-1.5' value={audience}>
                    <Icon className='size-4' />
                    {config.label}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>

          <div className='flex items-center justify-between rounded-lg border p-3'>
            <div className='space-y-0.5'>
              <Label htmlFor={`${fieldId}-pinned`}>Pin to top</Label>
              <p className='text-muted-foreground text-xs'>
                Keep this announcement above the others.
              </p>
            </div>
            <Switch
              checked={draft.pinned}
              id={`${fieldId}-pinned`}
              onCheckedChange={(checked) => setDraft((prev) => ({ ...prev, pinned: checked }))}
            />
          </div>

        <DialogFooter>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={!isValid} type='submit'>
            {isEditMode ? 'Save changes' : 'Publish'}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

interface AnnouncementFormDialogProps {
  editValues: Announcement | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (draft: AnnouncementDto) => void;
}

export const AnnouncementFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  editValues
}: AnnouncementFormDialogProps) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogContent className='sm:max-w-lg'>
      {/* Remount per open/target so the form re-seeds from the latest values. */}
      <AnnouncementForm
        key={`${String(open)}-${editValues?.id ?? 'new'}`}
        editValues={editValues}
        onCancel={() => onOpenChange(false)}
        onSubmit={(draft) => {
          onSubmit(draft);
          onOpenChange(false);
        }}
      />
    </DialogContent>
  </Dialog>
);
