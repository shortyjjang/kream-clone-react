import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../Image'
import Button from '../form/Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import PostCard from './PostCard'

export default function SocialUser({social_rank, username, profile_image_url, bio, follower_count, relationship, latest_posts, display_name}) {
  return (<div className='p-4 overflow-hidden'>
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        {social_rank &&<span className='font-bold pr-4'>{social_rank}</span>}
        <Link to={`/user/${username.replace('@','')}`} className='flex items-center gap-1 py-2'>
            <Image src={profile_image_url} alt={username.replace('@','')} className='aspect-square w-8 rounded-full object-cover' />
            <span className='flex flex-col'>
                <b className='text-[12px]'>{username.replace('@','')}</b>
                <span className='text-gray-500 text-[11px] flex  gap-1'>
                  {bio ? <span >{String(bio).substring(0,20)}{String(bio).length > 20 && '...'}</span>
                  : <span>{display_name}</span>}
                  •
                  <span>팔로워 {follower_count.toLocaleString()}</span>
                </span>
            </span>
        </Link>
      </div>
      <Button style={relationship.following === "accepted" ? "default":'primary'} size="small">{relationship.following === "accepted"? "팔로잉":'팔로우'}</Button>
    </div>
    {latest_posts && latest_posts.length > 0 && <Swiper slidesPerView={2.5} spaceBetween={10} style={{overflow: 'visible'}}>
      {latest_posts.map(post => <SwiperSlide key={post.id}>
        <PostCard {...post} post_url={`/user/${username}/${post.id}`}/>
      </SwiperSlide>)}
    </Swiper>}
  </div>
  )
}
