import { useEffect } from "react";
import { useLocation } from "react-router";

// finnes duplicate scroll funksjon?
export default function Scroll(children) {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    return <>{children}</>
}
