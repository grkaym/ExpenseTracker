import { useEffect, useState, memo } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerImpl({
  id,
  value = '',
  onChange,
  className = '',
  portalId = '',
}) {
  // Get state of the Date value
  const [selectedDate, setSelectedDate] = useState(value ?? null);

  // Reflect changing date value by the parent
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  return (
    <Datepicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onChange && onChange(date);
      }}
      dateFormat="yyyy-MM-dd"
      className={
        `block rounded-lg border border-gray-300 bg-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 ` +
        className
      }
      id={id}
      wrapperClassName="w-full"
      portalId={portalId}
    />
  );
}

// Re-render only when props change
const DatePicker = memo(DatePickerImpl);
export default DatePicker;
