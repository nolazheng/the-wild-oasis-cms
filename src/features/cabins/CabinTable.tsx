import Spinner from '@/ui/Spinner';
import CabinRow from './CabinRow';

import { useGetCabins } from './hooks/useGetCabins';
import Table from '@/ui/Table';
import {
  SearchParamsEnum,
  CabinFilterType,
  CabinType,
  CabinSortType,
} from '@/types';
import Menus from '@/ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '@/ui/Empty';

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins = [] } = useGetCabins();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  let filteredCabins: CabinType[] = [];
  const filteredType: CabinFilterType =
    (searchParams.get(SearchParamsEnum.discount) as CabinFilterType) || 'all';

  if (filteredType === 'all') filteredCabins = cabins;
  if (filteredType === 'with-discount')
    filteredCabins = cabins.filter((c) => c.discount > 0);
  if (filteredType === 'no-discount')
    filteredCabins = cabins.filter((c) => c.discount === 0);

  const sortBy =
    (searchParams.get(SearchParamsEnum.sortBy) as CabinSortType) ||
    'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    const fieldA = a[field as keyof CabinType] as any;
    const fieldB = b[field as keyof CabinType] as any;
    return (fieldA - fieldB) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin: CabinType) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
