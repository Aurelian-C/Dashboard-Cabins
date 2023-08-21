import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: data => {
      // onSucces receive as parameter the data that is returned by mutationFn (updateBooking)
      toast.success(`Booking #${data.id} succesfully checked out!`);
      queryClient.invalidateQueries({ active: true }); // {active: true} will invalidate all the queries that are currently active on the page
    },

    onError: () => {
      toast.error('There was an error while checking out!');
    },
  });

  return { checkout, isCheckingOut };
}
