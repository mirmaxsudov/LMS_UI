import { createFileRoute } from '@tanstack/react-router';
import { BarChart3Icon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={BarChart3Icon} title='Child Progress' />
);

export const Route = createFileRoute('/_authenticated/children/progress/')({
  component: ModulePage
});
