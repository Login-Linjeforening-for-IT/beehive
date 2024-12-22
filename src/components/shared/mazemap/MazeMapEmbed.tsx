'use client'

import "./MazeMapEmbed.css"
import { useEffect, useState } from "react"
import "@/vendor/mazemap/mazemap.min.css"

/* credz to the guys over at Abakus, this mazemap-implementation is inspired by their solution */

export default function MazeMapEmbed({ poi, ...props }: any) {

    const defualtHeight = 320
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => setHasMounted(true), [])
    //import Mazemap dynamically to prevent ssr issues
    const [Mazemap, setMazemap] = useState<any[] | null>(null)
    const [map, setMap] = useState<any>(null)
    const [room, setRoom] = useState(null)

    //initialize map only once, poi will probably not change
    useEffect(() => {
        import("@/vendor/mazemap/mazemap.min").then((mazemap) => setMazemap(mazemap))
        if (!Mazemap || !hasMounted) return

        // @ts-ignore
        const embeddedMazemap = new Mazemap.Map({
            container: "mazemap",
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
            //this is a horrible feature
            pitchWithRotate: false,
        })

        embeddedMazemap.dragPan._mousePan.enable()

        embeddedMazemap.on("load", () => {
            // Initialize a Highlighter for POIs
            // Storing the object on the map just makes it easy to access for other things
            // @ts-ignore
            embeddedMazemap.highlighter = new Mazemap.Highlighter(embeddedMazemap, {
                showOutline: true,
                showFill: true,
                outlineColor: "#fd8738",
                fillColor: "#d95d0a",
            })

            // Fetching via Data API
            // @ts-ignore
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
                setRoom(poi.properties.title === "A155.1" ? "Login Lounge" : poi.properties.title)
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
                        href={"https://use.mazemap.com/#v=1&sharepoitype=poi&campusid=1&sharepoi=" + poi}
                        rel="noreferrer noopener"
                        target="_blank"
                        className='mazemap__link mazemap__overlay-item'
                    >
                        <i className='mazemap__link-icon material-symbols-sharp'>arrow_outward</i>
                    </a>
                    {room &&
					<div className='mazemap__location-name mazemap__overlay-item'>
					    <i className='mazemap__location-name-icon material-symbols-sharp'>location_on</i>
					    {room}
					</div>
                    }
                    <div className='mazemap__controls mazemap__overlay-item'>
                        <button onClick={zoomIn} className='mazemap__zoom-btn mazemap__zoom-btn--top material-symbols-sharp'>add</button>
                        <button onClick={zoomOut} className='mazemap__zoom-btn mazemap__zoom-btn--bottom material-symbols-sharp'>remove</button>
                    </div>
                </div>
            </div>
        </>
    )
}
