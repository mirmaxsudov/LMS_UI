import { createFileRoute } from '@tanstack/react-router';
import { MessageSquareIcon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={MessageSquareIcon} title='Discussion Moderation' />
);

export const Route = createFileRoute('/_authenticated/teaching/discussions/moderation/')({
  component: ModulePage
});
