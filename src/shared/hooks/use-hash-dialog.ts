import { useCallback, useEffect, useState } from 'react';

const getIsOpen = (hash: string) =>
  typeof window !== 'undefined' && window.location.hash === `#${hash}`;

export const useHashDialog = (hash: string) => {
  const [open, setOpen] = useState(() => getIsOpen(hash));

  useEffect(() => {
    const handleHashChange = () => setOpen(getIsOpen(hash));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [hash]);

  const onOpenChange = useCallback(
    (next: boolean) => {
      if (next) window.location.hash = hash;
      else if (getIsOpen(hash))
        window.history.replaceState(null, '', window.location.pathname + window.location.search);

      setOpen(next);
    },
    [hash]
  );

  return [open, onOpenChange] as const;
};
