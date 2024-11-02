import { getSettings } from '@/services/apiSettings';
import { SettingsType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetSettings = () => {
  const { isLoading, data: settings } = useQuery<SettingsType>({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return {
    isLoading,
    settings,
  };
};
