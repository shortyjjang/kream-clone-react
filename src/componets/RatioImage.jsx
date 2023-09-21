import { useState } from "react"
import Image from "./Image"

const RatioImage = ({background_url, title, background_color, background_wide_url, className = '', contain = false}) => {
    const [loading, setLoading] = useState(true)
    return (
        <div style={{backgroundColor: background_color}} className={`relative w-full ${className}`}>
            <picture className={`absolute top-0 left-0 w-full h-full ${loading ? 'opacity-0': 'opacity-100'} ${contain ? 'object-contain':'object-cover'}`}>
                <source src={background_wide_url} media="(min-width: 768px)" />
                <Image src={background_url} alt={title} onLoad={() => setLoading(false)} className={`absolute top-0 left-0 w-full h-full ${contain ? 'object-contain':'object-cover'}`} />
            </picture>
        </div>
    )
}

export default RatioImage