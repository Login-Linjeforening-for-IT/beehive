'use client'

import { useEffect, useState } from 'react'
import './spinner.css'

export default function Spinner({width, height}: {width: number, height: number}) {
    const [displaySpinner, setDisplaySpinner] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplaySpinner(true)
        }, 200)
    
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="spinner">
            { displaySpinner && 
                <>
                    <svg className='spinner_svg' width={width} height={height} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <path className="spinner_corners" d="m 0 12.5 l 0 -12.5 l 50 0 l 0 50 l -50 0 l 0 -37.5" />
                        <path className="spinner_l" d="m 18 9 l 0 30 l 16 0" />
                    </svg>
                </>
            }
        </div>
    )
}
