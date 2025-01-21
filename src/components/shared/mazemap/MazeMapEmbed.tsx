'use client'

import './MazeMapEmbed.css'
import { useEffect, useState } from 'react'
import '@/vendor/mazemap/mazemap.min.css'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import Pin from '@components/svg/symbols/Pin'

// eslint-disable-next-line
export default function MazeMapEmbed({ poi, ...props }: any) {

    const defualtHeight = 320
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => setHasMounted(true), [])
    //import Mazemap dynamically to prevent ssr issues
    // eslint-disable-next-line
    const [Mazemap, setMazemap] = useState<any[] | null>(null)
    // eslint-disable-next-line
    const [map, setMap] = useState<any>(null)
    const [room, setRoom] = useState(null)

    //initialize map only once, poi will probably not change
    useEffect(() => {
        import('@/vendor/mazemap/mazemap.min.js').then((mazemap) => setMazemap(mazemap))
        if (!Mazemap || !hasMounted) return

        // @ts-ignore
        const embeddedMazemap = new Mazemap.Map({
            container: 'mazemap',
            campuses: 1,
            center: {
                lng: 10.683431,
                lat: 60.790439,
            },
            zLevel: 1,
            zoom: 17,
            minZoom: 10,
            maxZoom: 20,
            zLevelControl: false,
            scrollZoom: false,
            doubleClickZoom: false,
            dragRotate: false,
            dragPan: true,
            touchZoomRotate: false,
            touchPitch: false,
            pitchWithRotate: false,
        })

        embeddedMazemap.dragPan._mousePan.enable()

        embeddedMazemap.on('load', () => {
            // Initialize a Highlighter for POIs
            // Storing the object on the map just makes it easy to access for other things
            // @ts-ignore
            embeddedMazemap.highlighter = new Mazemap.Highlighter(embeddedMazemap, {
                showOutline: true,
                showFill: true,
                outlineColor: '#fd8738',
                fillColor: '#d95d0a',
            })

            // Fetching via Data API
            // @ts-ignore
            // eslint-disable-next-line
            Mazemap.Data.getPoi(poi).then((poi: any) => {
                // @ts-ignore
                const lngLat = Mazemap.Util.getPoiLngLat(poi)
                embeddedMazemap.highlighter.highlight(poi)

                embeddedMazemap.jumpTo({
                    center: lngLat,
                    zoom: 17,
                })
                // zoom animation on loading, by increesing the zoom
                embeddedMazemap.flyTo({
                    zoom: 18,
                    speed: 0.5
                })

                // if poi is the lounge, set custom name
                setRoom(poi.properties.title === 'A155.1' ? 'Login Lounge' : poi.properties.title)
            })
        })

        setMap(embeddedMazemap)
    }, [Mazemap, hasMounted, poi])

    //Allocate height for map before map is loaded
    if (!hasMounted) {
        return (
            <>
                <div
                    style={{
                        height: props.height || defualtHeight,
                    }}
                />
            </>
        )
    }

    function zoomIn() {
        map?.zoomIn()
    }

    function zoomOut() {
        map?.zoomOut()
    }

    return (
        <>
            <div className='mazemap-container'
                style={{
                    height: props.height || defualtHeight,
                }}
            >
                <div id='mazemap' className='mazemap'>
                    <a
                        href={'https://use.mazemap.com/#v=1&sharepoitype=poi&campusid=1&sharepoi=' + poi}
                        rel="noreferrer noopener"
                        target="_blank"
                        className='mazemap_link mazemap_overlay-item'
                    >
                        <ArrowOutward size="1.5rem" fill="white" className=""/>
                    </a>
                    {room &&
					<div className='flex flex-row items-center mazemap_location-name mazemap_overlay-item'>
					    <Pin size="1.5rem" fill="white" className="mazemap_location-name-icon" />
					    {room}
					</div>
                    }
                    <div className='mazemap_controls mazemap_overlay-item'>
                        <button onClick={zoomIn} className='mazemap_zoom-btn mazemap_zoom-btn--top material-symbols-sharp'>add</button>
                        <button onClick={zoomOut} className='mazemap_zoom-btn mazemap_zoom-btn--bottom material-symbols-sharp'>remove</button>
                    </div>
                </div>
            </div>
        </>
    )
}
