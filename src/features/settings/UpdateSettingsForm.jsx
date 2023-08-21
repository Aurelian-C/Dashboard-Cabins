import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import useUpdateSetting from './useUpdateSetting';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  // return <Spinner />;
  if (isLoading) return <Spinner />;

  function handleBlur(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value }); // ex: { 'minBookingLength': 5 }
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={e => handleBlur(e, 'minBookingLength')} //as soon we leave the input field, the onBlur() function will run
          disabled={isUpdating}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          onBlur={e => handleBlur(e, 'maxBookingLength')} //as soon we leave the input field, the onBlur() function will run
          disabled={isUpdating}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handleBlur(e, 'maxGuestsPerBooking')} //as soon we leave the input field, the onBlur() function will run
          disabled={isUpdating}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={e => handleBlur(e, 'breakfastPrice')} //as soon we leave the input field, the onBlur() function will run
          disabled={isUpdating}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
