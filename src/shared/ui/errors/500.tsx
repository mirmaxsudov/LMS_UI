import type { ErrorComponentProps, ErrorRouteComponent } from '@tanstack/react-router';

import { useNavigate, useRouter } from '@tanstack/react-router';

import { Button } from '@/shared/ui/button.tsx';

export const GeneralError: ErrorRouteComponent = ({ error }: ErrorComponentProps<any>) => {
  const navigate = useNavigate();
  const { history } = useRouter();
  const message = error?.response?.data?.message ?? error?.message ?? 'Unexpected server error.';
  const statusCode = error?.status ? String(error.status) : '500';

  return (
    <div className='bg-background text-foreground relative isolate grid min-h-svh place-items-center overflow-hidden px-4 py-12 sm:px-6'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='bg-destructive/20 absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl' />
        <div className='absolute bottom-4 -left-24 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl' />
        <div className='absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(190,70,70,0.08)_0,rgba(190,70,70,0.08)_8px,transparent_8px,transparent_24px)]' />
      </div>
      <section className='border-destructive/30 bg-card/80 relative w-full max-w-3xl rounded-4xl border p-7 shadow-[0_32px_82px_-35px_rgba(80,19,24,0.58)] backdrop-blur-xl sm:p-10'>
        <div className='flex items-start justify-between gap-4'>
          <span className='border-destructive/35 bg-destructive/10 text-destructive rounded-full border px-3 py-1 text-[0.68rem] font-semibold tracking-[0.17em] uppercase'>
            System Fault
          </span>
          <span className='border-border/70 bg-background/85 text-muted-foreground rounded-full border px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] uppercase'>
            Incident
          </span>
        </div>

        <h1 className="from-destructive to-destructive/35 mt-6 bg-linear-to-b bg-clip-text font-['Bebas_Neue'] text-[clamp(5.25rem,20vw,10.5rem)] leading-[0.85] font-black tracking-[-0.06em] text-transparent">
          {statusCode}
        </h1>

        <h2 className="mt-3 font-['IBM_Plex_Sans'] text-2xl font-semibold tracking-tight sm:text-3xl">
          Something broke on our side
        </h2>
        <p className='text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed sm:text-base'>
          We couldn&apos;t complete this request right now. You can retry from a previous page or
          return to the home screen.
        </p>

        <div className='border-destructive/25 bg-destructive/10 mt-6 rounded-2xl border p-4'>
          <p className='text-destructive text-[0.68rem] font-semibold tracking-[0.17em] uppercase'>
            Error Details
          </p>
          <p className='text-foreground/90 mt-2 text-sm leading-relaxed wrap-break-word'>
            {message}
          </p>
        </div>

        <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
          <Button
            className='h-11 rounded-full px-6'
            variant='outline'
            onClick={() => history.go(-1)}
          >
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
