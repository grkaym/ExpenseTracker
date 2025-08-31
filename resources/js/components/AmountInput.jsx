export default function AmountInput({
  id,
  value = '',
  onChange,
  className = '',
}) {
  const handleChange = (e) => {
    let raw = e.target.value;

    // Keep only digits and a single decimal point
    raw = raw.replace(/[^0-9.]/g, '');

    // Allow only one decimal point.
    const parts = raw.split('.');
    if (parts.length > 2) {
      raw = parts[0] + '.' + parts.slice(1).join('');
    }

    // Preserve whether user just typed a trailing dot (e.g. "12.")
    const trailingDot = raw.endsWith('.');

    // Limit integer part to 10 digits
    const [intPart, decPart = ''] = raw.split('.');
    let limitedInt = intPart.slice(0, 10);

    // Limit decimal part to digits
    let limitedDec = decPart.slice(0, 2);

    // Rebuild while preserving a trailing dot if any
    if (trailingDot) {
      raw = `${limitedInt}.`;
    } else {
      raw = limitedDec ? `${limitedInt}.${limitedDec}` : limitedInt;
    }

    onChange(raw);
  };

  const handleBlur = () => {
    if (value === '' || value === '.') return;
    // Convert the value to a 2-decimal number when the input loses focus
    const n = Number(value);
    if (Number.isFinite(n)) {
      onChange(n.toFixed(2));
    }
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={
        `block w-full rounded-lg border border-gray-300 bg-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 ` +
        className
      }
      placeholder="0.00"
    />
  );
}
