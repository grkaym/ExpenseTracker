export default function TextInput({ id, value = '', onChange, className }) {
  return (
    <input
      type="text"
      className={
        `block w-full rounded-lg border border-gray-300 bg-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 ` +
        className
      }
      id={id}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}
