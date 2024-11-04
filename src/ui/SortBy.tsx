import { useSearchParams } from 'react-router-dom';
import Select from './Select';
import { ChangeEvent } from 'react';
import { SearchParamsEnum } from '@/types';

function SortBy<T extends string>({
  options,
}: {
  options: { value: T; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(SearchParamsEnum.sortBy) || '';

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set(SearchParamsEnum.sortBy, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
