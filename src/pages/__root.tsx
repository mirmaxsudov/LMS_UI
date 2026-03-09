import type { QueryClient } from '@tanstack/react-query';

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

import { ThemeProvider } from '@/shared/context';
import { NotFoundError } from '@/shared/ui/errors/404.tsx';
import { GeneralError } from '@/shared/ui/errors/500.tsx';
import { Toaster } from '@/shared/ui/sonner.tsx';
import { TooltipProvider } from '@/shared/ui/tooltip';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
  component: () => (
    <I18nProvider i18n={i18n}>
      <NuqsAdapter>
        <ThemeProvider>
          <TooltipProvider>
            <Outlet />
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </NuqsAdapter>
    </I18nProvider>
  )
});
