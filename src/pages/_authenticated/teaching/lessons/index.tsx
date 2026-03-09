import { createFileRoute } from '@tanstack/react-router';
import { BookOpenIcon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={BookOpenIcon} title='Lesson Manager' />
);

export const Route = createFileRoute('/_authenticated/teaching/lessons/')({
  component: ModulePage
});
