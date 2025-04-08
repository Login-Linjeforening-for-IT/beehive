'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import config from '@config'

type Interval = NodeJS.Timeout | number

type PageClientProps = {
    pwnedNumber: number
}

export default function PageClient({pwnedNumber}: PageClientProps){
    const [time, setTime] = useState<number>(1)

    useEffect(() => {
        let interval: Interval = 0
        interval = setInterval(() => {
            setTime((prevtime)=>prevtime+1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const memes = [
        {
            text: 'It stinks that you didn\'t lock your screen.',
            image: 'skunk.jpg'
        },
        {
            text: 'One does not simply leave your screen unlocked.',
            image: 'one-does-not-simply.jpg'
        },
        {
            text: 'Y U NO LOCK YOUR SCREEN',
            image: 'y-u-no.jpg'
        },
        {
            text: 'Baby Polar Bear is disappointed that you didn\'t lock your screen.',
            image: 'sad-polar-bear.jpg'
        },
        {
            text: 'How dare you leave your screen unlocked.',
            image: 'greta.jpg'
        },
        {
            text: 'Charlize Theron is disappointed that you didn\'t lock your screen.',
            image: 'charlize-theron.jpg'
        },
        {
            text: 'If you forget to lock your screen, you\'re gonna have a bad time!',
            image: 'southpark-ski-instructor.jpg'
        },
        {
            text: 'Elon Musk is disappointed that you didn\'t lock your screen.',
            image: 'elon-musk.jpg'
        },
        {
            text: 'Lock your screen before you get tangled up',
            image: 'orbweaver.jpg'
        },
        {
            text: 'You aren\'t chopped liver, lock your screen',
            image: 'upsetcat.jpg'
        },
        {
            text: 'Cain is disappointed you forgot to lock your screen.',
            image: 'cain-statue.jpg'
        },
        {
            text: 'Cupid is not impressed with your unlocked screen.',
            image: 'disappointed-cupid.jpg'
        },
        {
            text: 'Muhammad Sarim Akhtar is disappointed that you didn\'t lock your screen.',
            image: 'muhammad-sarim-akhtar.jpg'
        },
        {
            text: 'Gollum is disappointed that you forgot to put your precious lock on the screen, my precious!',
            image: 'golum.jpg'
        },
        {
            text: 'McKayla is not impressed with your unlocked computer.',
            image: 'mckayla.jpg'
        },
        {
            text: 'Yeah, if you could go ahead and lock your screen next time, that\'d be great.',
            image: 'lumbergh.jpg'
        },
        {
            text: 'Obama is disappointed that you didn\'t lock your screen.',
            image: 'obama.jpg'
        },
        {
            text: 'Grumpy Cat is disappointed that you didn\'t lock your screen.',
            image: 'grumpy-cat.jpg'
        },
        {
            text: 'Doggo is sad that you forgot to lock your screen.',
            image: 'disappointed_dog.jpg'
        },
        {
            text: 'Captain Holt is disappointed that you didn\'t lock your screen.',
            image: 'captain-holt.jpg'
        },
        {
            text: 'Lock your screen you must.',
            image: 'yoda.jpg'
        },
        {
            text: 'Uncle Sam wants you to lock your screen.',
            image: 'uncle-sam.jpg'
        },
        {
            text: 'Gordon Ramsay is disappointed that you didn\'t lock your screen.',
            image: 'gordon.jpg'
        },
        {
            text: 'Bernie Sanders is disappointed that you didn\'t lock your screen.',
            image: 'bernie-sanders.jpg'
        },
        {
            text: 'Lisa Simpson is disappointed that you didn\'t lock your screen.',
            image: 'lisa-simpson.jpg'
        },
        {
            text: 'Human, you must lock your screen. There will be no further warnings.',
            image: 'scary-robot.jpg'
        },
        {
            text: 'You no lock screen? Son I am disappoint.',
            image: 'son-i-am-disappoint.jpg'
        },
        {
            text: 'Who else but Zoidberg would forget to lock their screen?',
            image: 'zoidberg.png'
        },
        {
            text: 'The Captain is disappointed that you didn\'t lock your screen.',
            image: 'the-captain.jpg'
        },
        {
            text: 'You forgot to lock your screen, and you made Dawson cry.',
            image: 'dawson-crying.jpg'
        },
        {
            text: 'Disappointed cat is disappointed you left your screen unlocked.',
            image: 'disappointed-cat.png.jpeg'
        },
        {
            text: 'Lock your screen, fool.',
            image: 'mister-t.jpg'
        }
        ,
        {
            text: 'Disappointed turtle is disappointed you left your screen unlocked.',
            image: 'disappointed-turtle.jpg'
        }
    ]

    return (
        <div className='h-[calc(100vh-var(--h-topbar))] w-full flex flex-col justify-center items-center'>

            {pwnedNumber &&
                <>
                    <h1>{memes[pwnedNumber].text}</h1>
                    <div className='relative max-h-[25rem] m-[2rem]'>
                        <Image
                            src={config.url.CDN_URL+'/img/pwned/'+ memes[pwnedNumber].image} 
                            className='object-contain w-auto h-[25rem]'
                            alt='meme'
                            width={400} // Set explicit width
                            height={400} // Set explicit height
                        />
                    </div>
                </>
            }
            <p> It has been {time} seconds since you've been pwned 🙈 </p>

        </div>
    )
}