import { useNavigate } from 'react-router-dom';
import classes from './BookingDetail.module.css';

import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckout } from '../../features/check-in-out/useCheckout';
import ButtonText from '../../ui/ButtonText';
import Empty from '../../ui/Empty';
import { HiArrowUpOnSquare } from 'react-icons/hi2';

function BookingDetail() {
  const { booking = {}, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { id: bookingId, status } = booking;

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <div className={classes.heading__group}>
          <Heading type="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        {status === 'checked-out' && (
          <Button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
            icon={<HiArrowUpOnSquare />}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              // We can also add, for example, onSuccess or onError handlers, not only into the useMutation hook, but only right into the individual mutate function. So again, we do not need to specify these handlers for all of the mutations by passing them directly into the useMutation hook, but we can also do it for individual mutations, which is what we want to do now.
              // So in the <BookingDetail> component we want deleteBooking() to have a different behavior that it has normally in the useMutation hook.
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
