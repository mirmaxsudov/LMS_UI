import { createFileRoute } from '@tanstack/react-router';
import { FileTextIcon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={FileTextIcon} title='Assignment Manager' />
);

export const Route = createFileRoute('/_authenticated/teaching/assignments/')({
  component: ModulePage
});
