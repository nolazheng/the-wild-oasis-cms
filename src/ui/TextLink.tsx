import styled from 'styled-components';

const Link = styled.a`
  color: var(--color-brand-500);
  text-decoration: underline;
  &:hover {
    color: var(--color-brand-700);
  }
`;

function TextLink({ href, text }: { href: string; text: string }) {
  return <Link href={href}>{text}</Link>;
}

export default TextLink;
