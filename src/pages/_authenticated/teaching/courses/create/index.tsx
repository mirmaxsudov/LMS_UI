import { createFileRoute } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={PlusCircleIcon} title='Create Course' />
);

export const Route = createFileRoute('/_authenticated/teaching/courses/create/')({
  component: ModulePage
});
