import SignupForm from '@/features/authentication/SignupForm';
import Heading from '../ui/Heading';
import Logo from '@/ui/Logo';
import LoginLayout from '@/ui/LoginLayout';
import TextLink from '@/ui/TextLink';

function NewUsers() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Create a new user</Heading>
      <SignupForm />
      <p>
        Already have an account? <TextLink href="/login" text="Log in" />
      </p>
    </LoginLayout>
  );
}

export default NewUsers;
