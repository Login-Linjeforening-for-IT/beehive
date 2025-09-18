export default function Card({ text, children }: { text: string, children: React.ReactNode }) {
    return (
        <div className='bg-black rounded-lg border-1 border-gray-500 w-fit p-2'>
            <h1 className='font-semibold text-lg'>{text}</h1>
            <div className='grid place-items-center'>
                {children}
            </div>
        </div>
    )
}
