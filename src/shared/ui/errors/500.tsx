import type { ErrorComponentProps, ErrorRouteComponent } from '@tanstack/react-router';

import { useNavigate, useRouter } from '@tanstack/react-router';

import { Button } from '@/shared/ui/button.tsx';

export const GeneralError: ErrorRouteComponent = ({ error }: ErrorComponentProps<any>) => {
  const navigate = useNavigate();
  const { history } = useRouter();

  return (
    <div className='h-svh w-full'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {error?.status && <h1 className='text-[7rem] leading-tight font-bold'>{error.status}</h1>}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-muted-foreground text-center'>
          {error?.response?.data?.message ?? error.message}
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
};
