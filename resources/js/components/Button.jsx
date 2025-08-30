export default function Button({text}) {
    return (
        <button
            className='px-4 py-1 text-base transition duration-150 ease-in-out border rounded-full bg-amber-200 text-amber-800 border-amber-200 hover:bg-amber-300'
        >
            {text}
        </button>
    );
}