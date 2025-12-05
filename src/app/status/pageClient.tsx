
export default async function PageClient({ status }: { status: Status }) {
    // refresh every 60s

    return (
        <div className='page-container min-h-[calc(100vh-var(--h-topbar))]'>
            <div className='page-section--normal flex flex-col'>
                <h1 className='heading-1 heading-1--top-left-corner'>
                    Status
                </h1>
                <pre>{JSON.stringify(status, null, 4)}</pre>
            </div>
        </div>
    )
}
