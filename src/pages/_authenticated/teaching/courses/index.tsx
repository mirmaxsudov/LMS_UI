import { createFileRoute } from '@tanstack/react-router';
import { GraduationCapIcon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={GraduationCapIcon} title='Course Management' />
);

export const Route = createFileRoute('/_authenticated/teaching/courses/')({
  component: ModulePage
});
