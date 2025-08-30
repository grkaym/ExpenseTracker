export default function Card({ className = '', children, ...props }) {
    return (
        <div
            {...props}
            className={
                'rounded bg-white text-slate-800 shadow-sm p-4 border border-slate-30 ' +
                className
            }
        >
            {children}
        </div>
    );
}
