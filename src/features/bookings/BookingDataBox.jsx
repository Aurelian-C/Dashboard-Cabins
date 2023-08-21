import classes from './BookingDataBox.module.css';
import { format } from 'date-fns';

import { formatDistanceFromNow } from '../../utils/helpers';
import { isToday } from 'date-fns/esm';
import { formatCurrency } from '../../utils/helpers';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import DataItem from '../../ui/DataItem';
import Flag from '../../ui/Flag';

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className={classes.section__box}>
      <header className={classes.header}>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </header>

      <section className={classes.section__secondary}>
        <div className={classes.guest}>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <div
          className={classes.price}
          style={{
            backgroundColor: isPaid
              ? 'var(--color-green-100)'
              : 'var(--color-yellow-100)',
            color: isPaid
              ? 'var(--color-green-700)'
              : 'var(--color-yellow-700)',
          }}
        >
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </div>
      </section>

      <footer className={classes.footer}>
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
