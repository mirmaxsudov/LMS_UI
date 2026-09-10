import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react';

import { getAdminSidebarData } from '@/pages/_authenticated/admin/-components/AppSidebar/useAdminSidebarData';
import { useSearch } from '@/shared/context/search-context';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/ui/command';

import { ScrollArea } from './scroll-area';

export const CommandMenu = () => {
  const { t } = useLingui();
  const navigate = useNavigate();
  const { open, setOpen } = useSearch();
  const sidebarData = getAdminSidebarData();

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <CommandDialog modal onOpenChange={setOpen} open={open}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <ScrollArea className='h-72 pr-1' type='hover'>
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navGroups.map((group, index) => {
            const filteredItems = group.items;

            if (!filteredItems.length) return null;

            return (
              <CommandGroup key={index} heading={group.title && t(group.title)}>
                {filteredItems.map((navItem, i) => {
                  if (navItem.url)
                    return (
                      <CommandItem
                        key={`${navItem.url}-${i}`}
                        value={t(navItem.title)}
                        onSelect={() => {
                          runCommand(() => navigate({ to: navItem.url }));
                        }}
                      >
                        <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                          <ArrowRightIcon className='text-muted-foreground/80 size-2' />
                        </div>
                        {t(navItem.title)}
                      </CommandItem>
                    );

                  return navItem.items?.map((subItem, i) => (
                    <CommandItem
                      key={`${subItem.url}-${i}`}
                      value={t(subItem.title)}
                      onSelect={() => {
                        runCommand(() => navigate({ to: subItem.url }));
                      }}
                    >
                      <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                        <ArrowRightIcon className='text-muted-foreground/80 size-2' />
                      </div>
                      {t(subItem.title)}
                    </CommandItem>
                  ));
                })}
              </CommandGroup>
            );
          })}
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
};
