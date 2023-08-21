import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // just logging out, we'll of course remove the user from local storage and also from the server, but it will stay inside the React Query cache, because we stored it there. And so if, for some reason, some malicious actor gets access to that, that would be very bad. And so with queryClient.removeQueries() we can remove all queries that have been accumulated in the cache.
      navigate('/login', { replace: true });
    },
  });

  return { logout, isLoading };
}
