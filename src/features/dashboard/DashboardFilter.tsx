import { SearchParamsEnum } from '@/types';
import Filter from '@/ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterField={SearchParamsEnum.last}
      options={[
        { type: '7', label: 'Last 7 days' },
        { type: '30', label: 'Last 30 days' },
        { type: '90', label: 'Last 90 days' },
      ]}
    />
  );
}

export default DashboardFilter;
