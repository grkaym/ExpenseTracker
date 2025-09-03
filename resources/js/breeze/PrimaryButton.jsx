export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full border border-transparent bg-amber-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-800 transition duration-150 ease-in-out hover:bg-amber-300 focus:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:bg-amber-400 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
