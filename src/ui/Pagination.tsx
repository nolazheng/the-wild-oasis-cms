import { BOOKING_PAGE_SIZE, SearchParamsEnum } from '@/types';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.$active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get(SearchParamsEnum.page)
    ? Number(searchParams.get(SearchParamsEnum.page))
    : 1;
  const pageCount = Math.ceil(count / BOOKING_PAGE_SIZE);
  const isFirstPage = currentPage <= 1;
  const isEndPage = currentPage >= pageCount;

  const prevPage = () => {
    const cur = isFirstPage ? currentPage : currentPage - 1;

    searchParams.set(SearchParamsEnum.page, cur.toString());
    setSearchParams(searchParams);
  };
  const nextPage = () => {
    const next = isEndPage ? currentPage : currentPage + 1;

    searchParams.set(SearchParamsEnum.page, next.toString());
    setSearchParams(searchParams);
  };

  if (count <= BOOKING_PAGE_SIZE) return <></>;
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * BOOKING_PAGE_SIZE + 1}</span> to{' '}
        <span>{isEndPage ? count : currentPage * BOOKING_PAGE_SIZE}</span> of{' '}
        <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton
          $active={false}
          onClick={prevPage}
          disabled={isFirstPage}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          $active={false}
          onClick={nextPage}
          disabled={isEndPage}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
