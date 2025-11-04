'use client'

import { useEffect, useState } from 'react'
import { getAlerts } from '@utils/api'
import Alert from '@components/alert/Alert'
import { getCookie } from '@utils/cookies'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

export default function Alerts() {
    const [alert, setAlert] = useState<GetAlertProps | null>(null)
    const [showToast, setShowToast] = useState(false)
    const [progress, setProgress] = useState(0)
    const pathname = usePathname()

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const result = await getAlerts(pathname)
                if (typeof result !== 'string' && result) {
                    setAlert(result)
                    setShowToast(true)
                    setProgress(0)
                }
            } catch (error) {
                console.error('Error fetching alerts:', error)
            }
        }
        fetchAlert()
    }, [pathname])

    useEffect(() => {
        if (!showToast) return

        const duration = 5000
        const interval = 100
        const steps = duration / interval
        let currentStep = 0

        const timer = setInterval(() => {
            currentStep++
            const newProgress = (currentStep / steps) * 100
            setProgress(newProgress)

            if (currentStep >= steps) {
                setShowToast(false)
                clearInterval(timer)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [showToast])

    if (!showToast || !alert) return null

    const lang = (getCookie('lang') || 'no') as Lang
    const title = lang === 'en' ? alert.title_en : alert.title_no
    const description = lang === 'en' ? alert.description_en : alert.description_no


    return (
        <div className='fixed bottom-5 right-4 z-50 max-w-sm'>
            <Alert variant='info' className='shadow-lg'>
                <div>
                    <h4 className='font-bold'>{title}</h4>
                    <p>{description}</p>
                </div>
                <div className='mt-2 bg-gray-200 rounded-full h-2'>
                    <div
                        className='bg-(--color-alert-info-icon) h-2 rounded-full transition-all duration-100 ease-linear'
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </Alert>
            <button
                onClick={() => setShowToast(false)}
                className='absolute top-2 right-2 p-1 rounded-full transition-colors cursor-pointer'
                aria-label='Close alert'
            >
                <X size={16} />
            </button>
        </div>
    )
}
