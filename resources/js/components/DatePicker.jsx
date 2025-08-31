import { useEffect, useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({
  id,
  value = '',
  onChange,
  className = '',
}) {
  // Get value props convered to the type of Date
  const toDate = (v) => {
    if (!v) return null;
    if (v instanceof Date) return v;
    return new Date(v);
  };

  // Get state of the Date value
  const [selectedDate, setSelectedDate] = useState(toDate(value));

  // Reflect changing date value by the parent
  useEffect(() => {
    setSelectedDate(toDate(value));
  }, [value]);

  return (
    <Datepicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        if (onChange) onChange(date);
      }}
      className={
        `block rounded-lg border border-gray-300 bg-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 ` +
        className
      }
      id={id}
      name={name}
      value={value}
      wrapperClassName="w-full"
    />
  );
}
