
import { Link } from 'react-router-dom'
import Image from '../Image'
import LikeButton from '../form/LikeButton'

export default function SocailCard({post}) {
  return (<div className='bg-white'>
            <Link to={`/user/${post.social_user.username.replace('@','')}`} className='block w-full rounded-lg bg-gray-50'>
                <Image src={post.images[0].url} alt={post.social_user.username} className='w-full rounded-lg block' style={{aspectRatio: post.images[0].aspect_ratio}} />
            </Link>
            <div className='relative p-1'>
                <span className='flex justify-between text-[12px] text-gray-500 py-1'>
                    <span className='flex items-center gap-2'>
                        <Image src={post.social_user.profile_image_url} alt={post.social_user.username} className='aspect-square w-5 border border-gray-200 rounded-full object-cover' />
                        <span>{post.social_user.username.replace('@','')}</span>
                    </span>
                    <LikeButton  size={12} count={post.like_count} />
                </span>
                <span className='line-clamp-2 text-[13px]'>{post.text.replaceAll('\n','')}</span>
            </div>
    </div>
  )
}