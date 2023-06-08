import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"


export function useShouldShow(pathName) {
    const location = useLocation()
    const [isHomeShown, setIsHomeShown] = useState(location.pathname === pathName)

    console.log(location)

    useEffect(() => {
        setIsHomeShown(location.pathname === pathName)
    }, [location.pathname])

    return isHomeShown
}