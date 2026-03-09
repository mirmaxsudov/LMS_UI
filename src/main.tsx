import type { QueryKey } from '@tanstack/react-query';

import { t } from '@lingui/core/macro';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { toast } from 'sonner';

import { initialI18nActivate } from '@/shared/i18n';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000 // 10 minutes
    }
  },
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      if (query.meta?.withoutToastOnError) return;
      toast.error(error.response.data.message || t`Something went wrong!`);
    }
  }),
  mutationCache: new MutationCache({
    onError: (error: any, _variables, _context, mutation) => {
      if (mutation.meta?.withoutToastOnError) return;
      toast.error(error.response.data.message || t`Something went wrong!`);
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.invalidatesQuery) {
        queryClient.invalidateQueries({
          queryKey: mutation.meta.invalidatesQuery
        });
      }
    }
  })
});

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPendingMs: 0,
  defaultPendingMinMs: 0
});

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      withoutToastOnError?: boolean;
    };
  }
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

initialI18nActivate();

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
