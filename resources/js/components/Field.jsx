export default function Field({ label, htmlFor, error, help, children }) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
      </label>
      {children}
      {/* Show error message in red if present, otherwise show help text in gray */}
      {(error || help) && (
        <p
          id={`${htmlFor}-desc`}
          className={`text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}
        >
          {error ?? help}
        </p>
      )}
    </div>
  );
}
