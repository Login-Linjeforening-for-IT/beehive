'use client'

import './mazeMapEmbed.css'
import { useEffect, useState } from 'react'
import './mazemap.min.css'
import ArrowOutward from '@components/svg/symbols/arrowOutward'
import Pin from '@components/svg/symbols/pin'
import Add from '@components/svg/symbols/add'
import Remove from '@components/svg/symbols/remove'
import { useDarkMode } from 'uibee/hooks'
import Script from 'next/script'

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
    const isDarkMode = useDarkMode()

    const [scriptLoaded, setScriptLoaded] = useState(false)

    const handleScriptLoad = () => {
        // @ts-ignore
        setMazemap(window.Mazemap)
        setScriptLoaded(true)
    }

    useEffect(() => {
        // @ts-ignore
        if (window.Mazemap && !Mazemap) {
            // @ts-ignore
            setMazemap(window.Mazemap)
            setScriptLoaded(true)
        }
    }, [Mazemap])

    // initialize map only once, poi will probably not change
    useEffect(() => {
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
            style: isDarkMode === true ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
        })

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
                embeddedMazemap.setZLevel(poi.properties.zLevel)

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
            {!scriptLoaded && (
                <Script
                    src='/vendor/mazemap.min.js'
                    strategy='afterInteractive'
                    onLoad={handleScriptLoad}
                    onError={(error) => console.error('Failed to load Mazemap script:', error)}
                />
            )}
            <div
                className='mazemap-container'
                style={{ height: props.height || defualtHeight }}
            >
                <div id='mazemap' className='mazemap'>
                    <a
                        href={'https://use.mazemap.com/#v=1&sharepoitype=poi&campusid=1&sharepoi=' + poi}
                        rel='noreferrer noopener'
                        target='_blank'
                        className='mazemap_link mazemap_overlay-item'
                    >
                        <ArrowOutward className='w-6 h-6 fill-white'/>
                    </a>
                    {room &&
                        <div className='flex flex-row items-center mazemap_location-name mazemap_overlay-item'>
                            <Pin className='w-6 h-6 fill-white mazemap_location-name-icon' />
                            {room}
                        </div>
                    }
                    <div className='mazemap_controls mazemap_overlay-item'>
                        <button onClick={zoomIn} className='mazemap_zoom-btn mazemap_zoom-btn--top'>
                            <Add className='w-6 h-6 fill-white'/>
                        </button>
                        <button onClick={zoomOut} className='mazemap_zoom-btn mazemap_zoom-btn--bottom'>
                            <Remove className='w-6 h-6 fill-white' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
