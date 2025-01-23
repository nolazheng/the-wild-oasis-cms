import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutAPI } from '@/services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logout, isLoading };
};
