import { createFileRoute } from '@tanstack/react-router';
import { MailIcon } from 'lucide-react';

import { SidebarModulePlaceholder } from '@/pages/_authenticated/-components/SidebarModulePlaceholder';

const ModulePage = () => (
  <SidebarModulePlaceholder icon={MailIcon} title='Teacher Messages' />
);

export const Route = createFileRoute('/_authenticated/teaching/messages/')({
  component: ModulePage
});
