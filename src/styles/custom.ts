import { css } from 'styled-components';

export type StyledFlexType = { direction?: 'row' | 'column' };
export const styledFlex = css<StyledFlexType>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
`;
