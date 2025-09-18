export default function Card({ text, children }: { text: string, children: React.ReactNode }) {
    return (
        <div className='bg-neutral-800/70 rounded-lg w-fit p-2'>
            <h1 className='font-semibold text-lg'>{text}</h1>
            <div className='grid place-items-center'>
                {children}
            </div>
        </div>
    )
}
