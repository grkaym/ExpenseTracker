export default function Button({ text, ...props }) {
  return (
    <button
      className="rounded-full border border-amber-200 bg-amber-200 px-4 py-1 text-base font-semibold text-amber-800 transition duration-150 ease-in-out hover:bg-amber-300 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:bg-amber-400"
      {...props}
    >
      {text}
    </button>
  );
}
