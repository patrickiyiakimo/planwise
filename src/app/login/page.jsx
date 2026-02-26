import LoginContainer from '@/containers/login/LoginContainer';

export const metadata = {
  title: 'Log In - Planwise | Student Planning App',
  description: 'Sign in to your Planwise account to access your study plans, AI PDF summaries, and academic tools.',
};

export default function LoginPage() {
  return <LoginContainer />;
}