import classes from './ConfirmDelete.module.css';
import Button from './Button';
import Heading from './Heading';

function ConfirmDelete({ resource, onConfirm, disabled, onCloseModal }) {
  return (
    <div className={classes.container}>
      <Heading type="h3">Delete {resource}</Heading>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
