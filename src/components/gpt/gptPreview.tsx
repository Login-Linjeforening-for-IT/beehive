import { Sparkles } from 'lucide-react'

export default function GPTPreview({ gpt }: { gpt: GPT }) {
    const model = 'Gjermund AI 1.0.0'
    const active = gpt.participants - gpt.clients.length - 1
    function averageLoad(values: number[]) {
        return values.length
            ? Math.ceil(values.reduce((sum, value) => sum + value, 0) / values.length)
            : 0
    }
    function averageValue(values: number[]) {
        return values.length
            ? values.reduce((sum, value) => sum + value, 0) / values.length
            : 0
    }

    const totalLoad = {
        ram: averageLoad(gpt.clients.map(client => averageLoad(client.ram.map(ram => ram.load * 100)))),
        cpu: averageLoad(gpt.clients.map(client => averageLoad(client.cpu.map(cpu => cpu.load * 100)))),
        gpu: averageLoad(gpt.clients.map(client => averageLoad(client.gpu.map(gpu => gpu.load * 100)))),
        tps: averageValue(gpt.clients.map(client => client.model.tps || 0)),
    }

    const ramColor = totalLoad.ram < 50 ? 'text-green-500' : totalLoad.ram > 20 ? 'text-yellow-500' : 'text-red-500'
    const cpuColor = totalLoad.cpu < 50 ? 'text-green-500' : totalLoad.cpu > 20 ? 'text-yellow-500' : 'text-red-500'
    const gpuColor = totalLoad.gpu < 50 ? 'text-green-500' : totalLoad.gpu > 20 ? 'text-yellow-500' : 'text-red-500'
    const tpsColor = totalLoad.tps > 20 ? 'text-green-500' : totalLoad.gpu > 10 ? 'text-yellow-500' : 'text-red-500'

    return (
        <div
            role='status'
            aria-live='polite'
            className='relative z-1 flex h-[calc(100%-10rem)] flex-col
                justify-center gap-5'
        >
            <div className='w-full justify-center items-center mt-12'>
                <h1 className='w-full text-center text-[1.35rem] mt-40'>Hvordan kan jeg hjelpe?</h1>
            </div>
            <div
                className='mx-auto w-full max-w-5xl rounded-full
                    border border-(--color-border-default)
                    bg-(--color-bg-surface) px-4 py-3 600px:px-8'
            >
                <div className='flex items-center gap-3'>
                    <Sparkles className='h-5 stroke-primary-500' />
                    <input
                        className='inline-block outline-none w-full'
                        placeholder='Spør om hva som helst'
                    />
                    {model && <span
                        className='rounded-full border border-(--color-border-default)
                            bg-(--color-bg-body) px-3 py-1 text-[0.75rem] font-semibold
                            uppercase tracking-widest text-(--color-text-discreet) shrink-0'
                    >
                        {model}
                    </span>}
                </div>
            </div>

            <div className='mx-auto flex items-center gap-2'>
                <span className={`
                    ${!gpt ? 'bg-(--color-primary)' : gpt.isConnected ? 'bg-green-500' : 'bg-red-500'} 
                    animate-pulse h-2 w-2 rounded-full
                    `} />
                <p className='text-center text-[1rem] font-semibold text-(--color-text-main)'>
                    {!gpt ? 'Loading' : gpt.isConnected ? 'Online' : 'Offline'}
                </p>
            </div>

            <div className='mx-auto grid w-full max-w-5xl gap-3 1000px:grid-cols-2'>
                <article
                    className='rounded-(--border-radius) border border-(--color-border-default)
                        bg-(--color-bg-surface) p-3'
                >
                    <div className='w-40 rounded-full'>
                        <h1 className='font-semibold'>Metrics</h1>
                    </div>
                    <div className='mt-0.5 w-full rounded-full opacity-85'>
                        <h1 className='text-sm'>{active} {active === 1 ? 'user' : 'users'} active</h1>
                    </div>
                    <div className='h-px w-[85%] my-2 bg-linear-to-r from-(--color-text-disabled) to-transparent' />
                    <div className='mt-0.5 w-full rounded-full opacity-85 grid grid-cols-4'>
                        <div>
                            <h1 className='text-xs text-(--color-text-discreet)'>RAM</h1>
                            <h1 className={ramColor}>{totalLoad.ram}%</h1>
                        </div>
                        <div>
                            <h1 className='text-xs text-(--color-text-discreet)'>CPU</h1>
                            <h1 className={cpuColor}>{totalLoad.cpu}%</h1>
                        </div>
                        <div>
                            <h1 className='text-xs text-(--color-text-discreet)'>GPU</h1>
                            <h1 className={gpuColor}>{totalLoad.gpu}%</h1>
                        </div>
                        <div>
                            <h1 className='text-xs text-(--color-text-discreet)'>TPS</h1>
                            <h1 className={tpsColor}>{totalLoad.tps.toFixed(0)}</h1>
                        </div>
                    </div>
                </article>
                <article
                    className='rounded-(--border-radius) border border-(--color-border-default)
                        bg-(--color-bg-surface) p-3'
                >
                    <div
                        className='w-56 rounded-full'
                    ><h1>Available Models</h1></div>
                    <div
                        className='mt-2 w-full rounded-full
                            opacity-85'
                    >{gpt.clients.map((client) => <h1 key={client.name}>{client.name}</h1>)}</div>
                </article>
            </div>
        </div>
    )
}
