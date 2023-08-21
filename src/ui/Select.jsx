import classes from './Select.module.css';

function Select({ type, value, options, onChange }) {
  return (
    <select
      className={`${classes.select} ${
        type === 'white' ? classes['select--white'] : classes['select--grey']
      }`}
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
