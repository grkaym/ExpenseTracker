export default function Card({ className = '', children, ...props }) {
    return (
        <div
            {...props}
            className={
                'rounded bg-white text-grey-800 shadow-sm p-4 border border-gray-30 ' +
                className
            }
        >
            {children}
        </div>
    );
}
