import React from 'react'
import { Link } from 'react-router-dom'
import RatioImage from '../RatioImage'

export default function Banner({ banner}) {
  return (
    <Link to={banner.destination_url} className='block aspect-square'>
        <RatioImage {...banner} className="aspect-square" />
    </Link>
  )
}
