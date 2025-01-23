import { useState } from 'react';
import Button from '@/ui/Button';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { useLogin } from './hooks/useLogin';
import SpinnerMini from '@/ui/SpinnerMini';

const defaultEmail = import.meta.env.VITE_LOGIN_EMAIL || '';
const defaultPassword = import.meta.env.VITE_LOGIN_PASSWORD || '';

function LoginForm() {
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
