import React from 'react'
import { Link } from 'react-router-dom'
import RatioImage from '../RatioImage'

export default function StyleCollection({ destination_url, image_url, title, logo_url, background_color}) {
  return (
    <Link to={destination_url} className='block px-1'>
        <span className='block relative'>
        <RatioImage background_url={image_url} title={title} background_color={'#f4f4f4'} background_wide_url={image_url} contain={true}  className="aspect-[132/176] rounded-md" />
        <span className='absolute bottom-2 left-2 text-white text-[11px]'>{title}</span>
        <span className='w-8 h-8 rounded-full overflow-hidden absolute top-2 left-2 border-2 border-white'>
        <RatioImage background_url={logo_url} title={title} background_color={background_color} background_wide_url={logo_url} contain={true}  className="aspect-[132/176]" />
        </span>
        
        </span>
    </Link>
  )
}
