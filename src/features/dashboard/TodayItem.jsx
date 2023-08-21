import classes from './TodayItem.module.css';
import CheckoutButton from '../check-in-out/CheckoutButton';
import Flag from '../../ui/Flag';
import Tag from '../../ui/Tag';
import { Link } from 'react-router-dom';

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className={classes.today__item}>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <div className={classes.guest}>{guests.fullName}</div>
      <div>{numNights} nights</div>

      {status === 'unconfirmed' && (
        <Link className={classes.link} to={`/checkin/${id}`}>
          Check in
        </Link>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </li>
  );
}

export default TodayItem;
