import { login as loginAPI } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAPI({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoading };
};
