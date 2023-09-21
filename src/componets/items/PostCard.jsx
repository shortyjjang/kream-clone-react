import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../Image'
import LikeButton from '../form/LikeButton'

export default function PostCard({post_url, images, like_count}) {
  return (
    <Link to={`/user/${post_url}`} className='aspect-[0.75/1] block relative bg-gray-50 rounded-md'>
        <Image src={images[0].url} alt={images[0].image_id} className='object-cover absolute top-0 left-0 w-full h-full rounded-md' />
        <LikeButton size={12} count={like_count} className='absolute text-white bottom-2 left-2 text-[12px]' />
    </Link>
  )
}
