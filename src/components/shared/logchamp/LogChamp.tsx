'use client'
import { useState, useEffect } from 'react'
import DecoratedPicture from '@components/shared/images/decoratedpicture/DecoratedPicture'
import './LogChamp.css'
import Link from 'next/link'

type LogChampProps = {
    name: string
    position: string
    img: string
    discord: string
    discordLink: string
}

export default function LogChamp({name, position, img, discord, discordLink}: LogChampProps) {
    const [variant, setVariant] = useState<number | null>(null)

    useEffect(() => {
        setVariant(Math.ceil(Math.random() * 4))
    }, [])

    if (variant === null ) return <></>
      
    return (
        <div className='logchamp'>
            <DecoratedPicture
                imgUrl={img}
                variant={variant}
                cornerSize={36}
                width={100}
                height={100}
            />
            <div className='logchamp_info'>
                <p className='logchamp_title'>{position}</p>
                <p className='logchamp_name'>{name}</p>
                {discord &&
                    <p className='logchamp_discord'>
                        <i className='logfont-discord'> </i>
                        <Link href={discordLink} target='_blank'>{discord}</Link>
                    </p>
                }
            </div>
        </div>
    )
}
