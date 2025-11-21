import { useState, useEffect } from "react"

function Img({ light, dark, theme }){
    
    const [imageIsVisible, setImageIsVisible] = useState([])
    const targetTheme = theme ? "light" : "dark"

    useEffect(() => {

        setImageIsVisible(false)
        const timer = setTimeout(() => setImageIsVisible(true), 50)
        return () => clearTimeout(timer)

    }, [theme])

    return (
        <img
            id="logo"
            className={`
                h-full
                sm:w-full
                w-[90%]
                object-contain
                transition-opacity
                ease-in-out
                duration-700
                ${imageIsVisible ? "opacity-100" : "opacity-0"}
            `}
            src={theme ? light : dark}
            alt="Essecial Dev Logo"
        />
    )
}

export default Img