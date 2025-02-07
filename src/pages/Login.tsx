import LoginForm from '@/features/authentication/LoginForm';
import Heading from '@/ui/Heading';
import Logo from '@/ui/Logo';
import LoginLayout from '@/ui/LoginLayout';
import TextLink from '@/ui/TextLink';

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
      <p>
        Don't have an account? <TextLink href="/signup" text="Sign up" />
      </p>
    </LoginLayout>
  );
}

export default Login;
