import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '@/modules/auth';

const LoginPage = () => {
  return <LoginForm />;
};

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage
});
