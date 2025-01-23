import { signup as signupAPI } from '@/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useSignup = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the account from the user's email address!"
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isLoading,
    signup,
  };
};
