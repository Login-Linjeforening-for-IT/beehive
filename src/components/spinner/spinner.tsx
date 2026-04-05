'use client'

import { useEffect, useState } from 'react'
import clsx from '@utils/clsx'

export default function Spinner({width, height}: {width: number, height: number}) {
    const [displaySpinner, setDisplaySpinner] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplaySpinner(true)
        }, 200)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='relative z-999 h-full w-full'>
            { displaySpinner &&
                <>
                    <svg
                        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                        width={width}
                        height={height}
                        viewBox='0 0 50 50'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            className={clsx(
                                'animate-[cornersDash_1.5s_ease_infinite] fill-none',
                                'stroke-(--color-primary) stroke-8',
                                '[stroke-dasharray:25] [stroke-dashoffset:50]'
                            )}
                            d='m 0 12.5 l 0 -12.5 l 50 0 l 0 50 l -50 0 l 0 -37.5'
                        />
                        <path
                            className={clsx(
                                'animate-[L-dash_1.5s_ease_infinite] fill-none',
                                'stroke-white stroke-5 [stroke-dasharray:50]',
                                'in-[.light]:stroke-black'
                            )}
                            d='m 18 9 l 0 30 l 16 0'
                        />
                    </svg>
                </>
            }
        </div>
    )
}
