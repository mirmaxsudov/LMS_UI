import { Skeleton } from '@/shared/ui/skeleton.tsx';
import { Spinner } from '@/shared/ui/spinner.tsx';

export const PageLoading = () => {
  return (
    <div className='relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-accent-foreground/10 blur-3xl' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(110,110,135,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,110,135,0.1)_1px,transparent_1px)] bg-[size:36px_36px]' />
      </div>

      <header className='relative z-10 flex h-16 items-center justify-between border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl sm:px-6'>
        <div className='flex items-center gap-3'>
          <div className='relative grid size-6 place-items-center rounded-full border border-primary/40 bg-primary/15'>
            <span className='block size-2.5 rounded-full bg-primary animate-pulse' />
            <span className='absolute inset-0 rounded-full border border-primary/35 animate-ping' />
          </div>
          <Skeleton className='h-4 w-40 rounded-full sm:w-52' />
        </div>

        <div className='flex items-center gap-3'>
          <Skeleton className='h-9 w-20 rounded-full' />
          <Skeleton className='size-9 rounded-full' />
        </div>
      </header>

      <main className='relative z-10 grid flex-1 place-items-center px-4 py-12 sm:px-6'>
        <section className='w-full max-w-2xl rounded-3xl border border-border/70 bg-card/70 p-6 shadow-[0_26px_70px_-34px_rgba(22,20,38,0.65)] backdrop-blur-xl sm:p-8'>
          <div className='flex items-center gap-4'>
            <div className='relative grid size-14 shrink-0 place-items-center rounded-2xl border border-primary/35 bg-primary/10'>
              <Spinner className='size-7 text-primary' />
              <span className='absolute inset-0 rounded-2xl border border-primary/35 animate-ping' />
            </div>

            <div className='min-w-0'>
              <p className='text-[0.7rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase'>
                Boot Sequence
              </p>
              <h2 className="truncate text-xl font-semibold tracking-tight sm:text-2xl font-['IBM_Plex_Sans']">
                Preparing your workspace
              </h2>
            </div>
          </div>

          <div className='mt-7 space-y-4'>
            <Skeleton className='h-3 w-full rounded-full' />
            <Skeleton className='h-3 w-[84%] rounded-full' />
            <Skeleton className='h-3 w-[66%] rounded-full' />
          </div>

          <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {[0, 1, 2, 3].map((item) => (
              <Skeleton key={item} className='h-16 rounded-2xl' />
            ))}
          </div>
        </section>
      </main>

      <div className='relative z-10 px-4 pb-6 text-center text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase sm:px-6'>
        Synchronizing modules and permissions
      </div>
    </div>
  );
};
