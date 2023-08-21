import classes from './BookingRow.module.css';
import { useNavigate } from 'react-router-dom';
import {
  HiPencil,
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from 'react-icons/hi2';

import Tag from '../../ui/Tag';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

import { useDeleteBooking } from './useDeleteBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { format, isToday } from 'date-fns';

function Cabin({ children }) {
  return <div className={classes.cabin}>{children}</div>;
}

function Stacked({ children }) {
  return <div className={classes.stacked}>{children}</div>;
}

function Amount({ children }) {
  return <div className={classes.amount}>{children}</div>;
}

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      {/* We could export this into own component... */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}

            <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>
            {/* <Menus.Button>Delete</Menus.Button> */}

            {/* Now it gets a bit confusing... */}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        {/* This needs to be OUTSIDE of the menu, which in no problem. The compound component gives us this flexibility */}
        <Modal.Window name="delete">
          <ConfirmDelete
            resource="booking"
            // These options will be passed wherever the function gets called, and they determine what happens next
            onConfirm={options => deleteBooking(bookingId, options)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>

      {/* <div>
        <ButtonWithConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/bookings/${bookingId}`}>Details &rarr;</Link>
      </div> */}
    </Table.Row>
  );
}

export default BookingRow;
