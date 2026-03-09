import { createFileRoute } from '@tanstack/react-router';
import { BarChart3Icon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={BarChart3Icon} title='Student Progress' />
);

export const Route = createFileRoute('/_authenticated/teaching/progress/')({
  component: ModulePage
});
