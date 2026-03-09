import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { HardDriveIcon, PaletteIcon, UserIcon } from 'lucide-react';

import { GeneralError, NotFoundError } from '@/shared/ui/errors';
import { PageContent, PageLoading } from '@/shared/ui/page';

const menuItems = [
  { id: 'profile', label: 'Profile & Account', icon: UserIcon },
  { id: 'storage', label: 'Storage', icon: HardDriveIcon },
  { id: 'appearance', label: 'Appearance', icon: PaletteIcon }
];

const SettingsPage = () => {
  const { t } = useLingui();
  return (
    <PageContent className='flex p-0'>
      <aside className='w-80 px-10 py-20'>
        <nav className='space-y-1'>
          <p className='text-muted-foreground mb-3 px-3 text-xs font-semibold tracking-wider uppercase'>
            {t`Settings`}
          </p>
          {menuItems.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all'
            >
              <item.icon />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className='flex-1 overflow-y-scroll px-10 py-20'>
        <div className='max-w-3xl space-y-6'></div>
      </main>
    </PageContent>
  );
};
export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
  pendingComponent: PageLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
});
