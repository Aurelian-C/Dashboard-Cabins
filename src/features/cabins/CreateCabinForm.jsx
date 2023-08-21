import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Textarea from '../../ui/Textarea';
import FileInput from '../../ui/FileInput';
import Button from '../../ui/Button';

import { useForm } from 'react-hook-form';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

export default function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId); // if exist an editId, it means that this function component is used for editing a cabin. If the editId don't exist, it means that this function component is used for create a cabin

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: data => {
            // onSuccess function gets access to the data that the mutation function returns
            reset();
            onCloseModal?.(); // call a onCloseModal conditionally, only if is NOT undefined
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: data => {
            // onSuccess function gets access to the data that the mutation function returns
            reset();
            onCloseModal?.(); // call a onCloseModal conditionally, only if is NOT undefined
          },
        }
      );
    }
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      {/* type={onCloseModal ? 'modal' : 'regular'} if the <CreateCabinForm> get onCloseModal function, it means that the <Form> get a modal CSS style  */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disable={isWorking.toString()}
          {...register('name', { required: 'This field is required!' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disable={isWorking.toString()}
          {...register('maxCapacity', {
            required: 'This field is required!',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disable={isWorking.toString()}
          {...register('regularPrice', { required: 'This field is required!' })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disable={isWorking.toString()}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required!', // validation rule
            validate: value => {
              // Custom validation method. If the first expression is false, return an error message. If the first expression is true, the input field will be validate
              return (
                +value < +getValues().regularPrice ||
                'Discount should be less than the regular price!'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          disable={isWorking.toString()}
          {...register('description', { required: 'This field is required!' })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required!', // if we use the component function to edit a cabin, the image file upload is not required because is not mandatory to add a new image
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disable={isWorking.toString()}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}
