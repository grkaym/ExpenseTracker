export default function Button({ text }) {
  return (
    <button className="rounded-full border border-amber-200 bg-amber-200 px-4 py-1 text-base text-amber-800 transition duration-150 ease-in-out hover:bg-amber-300">
      {text}
    </button>
  );
}
