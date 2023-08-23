import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: user => {
      toast.success(`You are successfully connected to your account!`);
      navigate('/dashboard', { replace: true }); // with { replace: true } we basically erase all the urls in the browsers that we were earlier
      queryClient.setQueryData(['user'], user.user); // manually set data into the React Query cache
    },
    onError: error => {
      console.log('ERROR', error);
      toast.error('Provided email or password are incorrect!');
    },
  });

  return { login, isLoading };
}
