import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // by default, React Query will try to fetch data three times in case that it fails in the beginning, but sometimes that might not make so much sense. In this case, setting to 'retry: false' will not try to re-fetch if the first fetch fails.
  });

  return { isLoading, booking, error };
}
