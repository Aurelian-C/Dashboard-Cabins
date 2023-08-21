import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinAPI,
    // With onSuccess function we tell React Query what to do as soon as the mutation was successful
    onSuccess: () => {
      toast.success('Cabin succesfully deleted!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { deleteCabin, isDeleting };
}
