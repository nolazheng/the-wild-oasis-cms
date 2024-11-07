import { SearchParamsEnum } from '@/types';
import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type Props<T> = {
  filterField: SearchParamsEnum;
  options: { type: T; label: string }[];
};
const Filter = <T extends string>({ filterField, options }: Props<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilteredType = searchParams.get(filterField) || options[0].type;

  const handleClick = (type: string) => {
    searchParams.set(filterField, type);
    setSearchParams(searchParams);
  };
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.type}
          $active={option.type === currentFilteredType}
          disabled={option.type === currentFilteredType}
          onClick={() => handleClick(option.type)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
