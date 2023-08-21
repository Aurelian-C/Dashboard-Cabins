import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    // mutationFn can only receive ONE PARAMETER, so that's why we pass an object with multiple properties as parameter
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { isEditing, editCabin };
}
