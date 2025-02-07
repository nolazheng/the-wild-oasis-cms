import styled from 'styled-components';

const Layout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

export default LoginLayout;
