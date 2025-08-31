export default function TextArea({
  id,
  value = '',
  onChange,
  rows = 4,
  className = '',
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      rows={rows}
      className={
        `block rounded-lg border border-gray-300 bg-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 ` +
        className
      }
    />
  );
}
