import {useEffect} from "react"
import { useLocation } from "react-router"

export default function Scroll(props: any) {
    const location = useLocation()
    useEffect(() => {
      window.scrollTo(0,0)
    }, [location])

    return <>{props.children}</>
}
