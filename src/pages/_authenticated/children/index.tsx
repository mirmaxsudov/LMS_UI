import { createFileRoute } from '@tanstack/react-router';
import { UsersIcon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={UsersIcon} title='Children' />
);

export const Route = createFileRoute('/_authenticated/children/')({
  component: ModulePage
});
