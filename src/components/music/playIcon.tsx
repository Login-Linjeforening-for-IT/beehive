export default function PlayIcon({noColor}: {noColor?: boolean}) {
    const color = noColor ? 'bg-neutral-400' : 'bg-[var(--color-primary-500)]'
    return (
        <div className='flex items-end gap-1 h-5'>
            <div className={`w-1 ${color} animate-bar1`} />
            <div className={`w-1 ${color} animate-bar2`} />
            <div className={`w-1 ${color} animate-bar3`} />

            <style jsx>{`
                /* Bar 1: goes half height every other step */
                @keyframes bounce1 {
                    0%, 50%, 100% { height: 1.2rem; }
                    25%, 75% { height: 0.6rem; }
                }

                /* Bar 2: alternates between 35% and 75%, and full height at 10% intervals */
                @keyframes bounce2 {
                    0%, 10%, 100% { height: 1.2rem; }
                    20%, 60% { height: 0.35rem; }
                    40%, 80% { height: 0.75rem; }
                }

                /* Bar 3: goes 33%, 66%, 100% every third step */
                @keyframes bounce3 {
                    0%, 33%, 66%, 100% { height: 0.33rem; }
                    11%, 77% { height: 0.66rem; }
                    44% { height: 1.2rem; }
                    22%, 55%, 88% { height: 1rem; }
                }

                .animate-bar1 {
                    animation: bounce1 1.5s infinite ease-in-out;
                }
                .animate-bar2 {
                    animation: bounce2 1.6s infinite ease-in-out;
                }
                .animate-bar3 {
                    animation: bounce3 1.7s infinite ease-in-out;
                }
            `}</style>
        </div>
    )
}
