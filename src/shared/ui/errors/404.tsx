import { useNavigate, useRouter } from '@tanstack/react-router';

import { Button } from '@/shared/ui/button.tsx';

export const NotFoundError = () => {
  const navigate = useNavigate();
  const { history } = useRouter();

  return (
    <div className='relative isolate grid min-h-svh place-items-center overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute -left-28 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-foreground/15 blur-3xl' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(110,110,140,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,110,140,0.09)_1px,transparent_1px)] bg-[size:40px_40px]' />
      </div>

      <section className='relative w-full max-w-3xl rounded-[2rem] border border-border/65 bg-card/75 p-7 shadow-[0_28px_72px_-34px_rgba(21,18,38,0.6)] backdrop-blur-xl sm:p-10'>
        <div className='flex items-start justify-between gap-4'>
          <span className='rounded-full border border-border/70 bg-background/85 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase'>
            Route Lost
          </span>
          <span className='rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-primary uppercase'>
            Code 404
          </span>
        </div>

        <h1 className="mt-6 bg-gradient-to-b from-primary to-primary/30 bg-clip-text text-[clamp(5.5rem,22vw,12rem)] leading-[0.85] font-black tracking-[-0.06em] text-transparent font-['Bebas_Neue']">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl font-['IBM_Plex_Sans']">
          We couldn&apos;t locate this page
        </h2>

        <p className='mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base'>
          The address may be outdated, mistyped, or moved during an update. Use one of the options
          below to continue from a safe route.
        </p>

        <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
          <Button className='h-11 rounded-full px-6' variant='outline' onClick={() => history.go(-1)}>
            Go Back
          </Button>
          <Button className='h-11 rounded-full px-6' onClick={() => navigate({ to: '/' })}>
            Back to Home
          </Button>
        </div>
      </section>
    </div>
  );
};
