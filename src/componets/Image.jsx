import { useEffect, useRef } from 'react'

export default function Image({src = '', alt = '', onLoad, className = '', style = {}}) {
    const image = useRef(null)
    useEffect(() => {
        if(!image?.current) return;
        image.current.addEventListener('load', () => {
            console.log('loaded')
            if(onLoad) onLoad()
        })
    }, [onLoad])
    return (
        <img ref={image} alt={alt} src={src} className={className} style={style} />
    )
}
