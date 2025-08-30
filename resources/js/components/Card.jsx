export default function Card({ className = '', children, ...props }) {
  return (
    <div
      {...props}
      className={
        'border-slate-30 rounded border bg-white p-4 text-slate-800 shadow-sm ' +
        className
      }
    >
      {children}
    </div>
  );
}
