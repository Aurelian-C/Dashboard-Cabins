import classes from './TodayActivity.module.css';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import TodayItem from '../dashboard/TodayItem';
import { useTodayActivity } from './useTodayActivity';

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();

  return (
    <div className={classes.today}>
      <Row type="horizontal">
        <Heading type="h2">Today</Heading>
        {/* Through the 'as' props, we make the button Polymorphic! Built-in into styled components. The polymorphic component pattern comes in handy when we need flexibility on the rendered HTML element. */}
        {/* id of -1 means there is no ID, which means a new booking will be made for a new guest */}
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className={classes.today__list}>
            {activities.map(activity => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p className={classes.no_activity}>No activity today...</p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;

/*
const OLDdata = [
  {
    id: 1,
    status: 'unconfirmed',
    guests: { fullName: 'Jonas Schmedtmann' },
    numNights: 6,
  },
  {
    id: 2,
    status: 'unconfirmed',
    guests: { fullName: 'Steven Miller' },
    numNights: 1,
  },
  {
    id: 3,
    status: 'checked-in',
    guests: { fullName: 'John Smith' },
    numNights: 3,
  },
  {
    id: 4,
    status: 'unconfirmed',
    guests: { fullName: 'Marta Schmedtmann' },
    numNights: 14,
  },
  {
    id: 5,
    status: 'checked-in',
    guests: { fullName: 'Miguel Silva' },
    numNights: 5,
  },
  {
    id: 6,
    status: 'checked-in',
    guests: { fullName: 'Mary Williams' },
    numNights: 4,
  },
];
*/
