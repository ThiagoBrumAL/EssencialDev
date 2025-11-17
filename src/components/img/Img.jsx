import { useEffect, useState } from "react"
import { cloudinary } from "../../cloud/cloudinary"

function Img({ path, theme }){

    const [imageIsVisible, setImageIsVisible] = useState(false)
    const targetTheme = theme ? "light" : "dark"

    useEffect(() => {

        setImageIsVisible(false)
        const timer = setTimeout(() => setImageIsVisible(true), 50)
        return () => clearTimeout(timer)

    }, [theme, path])

    return (
        <img
            id="logo"
            className={`
                h-full
                w-full
                object-contain
                max-h-[450px]
                max-w-[450px]
                transition-opacity
                ease-in-out
                duration-700
                ${imageIsVisible ? "opacity-100" : "opacity-0"}
            `}
            src={cloudinary[path][targetTheme]}
            alt="Essecial Dev Logo"
        />
    )
}

export default Img