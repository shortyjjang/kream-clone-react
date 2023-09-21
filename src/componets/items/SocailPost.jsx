import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreatedTime from '../CreatedTime'
import Image from '../Image'
import Dropdown from '../Dropdown'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import MiniProduct from './MiniProduct'
import { PiHeartLight, PiBookmarkSimpleLight } from 'react-icons/pi'
import { TfiComment} from 'react-icons/tfi'
import Comment from './Comment'
import LikeButton from '../form/LikeButton'

export default function SocailPost({post}) {
    const [showContents, setShowContents] = useState(false)
  return (<div className='bg-white'>
        <div className='flex justify-between items-center px-4'>
            <Link to={`/user/${post.social_user.username.replace('@','')}`} className='flex items-center gap-1 py-2'>
                <Image src={post.social_user.profile_image_url} alt={post.social_user.username.replace('@','')} className='aspect-square w-8 rounded-full object-cover' />
                <span className='flex flex-col'>
                    <b className='text-[12px]'>{post.social_user.username.replace('@','')}</b>
                    <CreatedTime created={post.date_created} className='text-gray-500 text-[11px]' />
                </span>
            </Link>
            <Dropdown />
        </div>
        <Swiper modules={Pagination} pagination={{
            clickable: true
        }}>
            {post.images.map(image => <SwiperSlide key={image.image_id}>
                <div className='relative bg-gray-50' style={{aspectRatio: image.aspect_ratio}}>
                    <Image src={image.url} alt={post.social_user.username.replace('@','')} className='absolute top-0 left-0 w-full h-full object-contain' />
                </div>
                <Swiper slidesPerView={1.2} className='border-b border-gray-100'>
                    {image.product_tags.map(item => <SwiperSlide key={item.product_id}>
                        <MiniProduct {...item.product} />
                    </SwiperSlide>)}
                </Swiper>
            </SwiperSlide>)}
        </Swiper>
        <div className='p-4 flex justify-between items-center'>
            <div className='flex gap-2'>
                <button>
                    <PiHeartLight size={30} />
                </button>
                <button>
                    <TfiComment size={24} className='-mb-px' />
                </button>
            </div>
            <button>
                <PiBookmarkSimpleLight size={30} />
            </button>
        </div>
        {post.text && post.text.replaceAll('\n#',' #').replaceAll('\n','').split(' ').filter(text => !text.startsWith('#')).join('').replaceAll(' ','').length > 0 && <div className='flex p-4 pt-0 text-[13px] gap-2' onClick={() => setShowContents(true)}>
            <div className={`${showContents ?'':'max-w-1/3 line-clamp-1'}`} dangerouslySetInnerHTML={{__html: post.text.replaceAll('\n#','\n #').replaceAll('\n','<br />').split(' ').filter(text => !text.startsWith('#')).join(' ')}}/>
            {!showContents && <div className='text-gray-500'>더보기</div>}
        </div>}
        {post.text && <div className='p-4 pt-0 text-[13px]'>
            {post.text.replaceAll('\n',' ').split(' ').filter(text => text.startsWith('#')).map((tag) => <Link to={`/social/tags/${tag}`} className={`text-blue-500 whitespace-nowrap mr-1`}>{tag}</Link>)}
        </div>}
        {(post.comment_count || 0) + (post.like_count || 0) > 0 && <div className='flex justify-between p-4 pt-0 text-[13px]'>
            {(post.like_count || 0) > 0 && <LikeButton count={post.like_count} withText={true} />}
            {(post.comment_count || 0) > 0 && <button>댓글 {post.comment_count > 1 && <><b>{post.comment_count}</b>개</>}</button>}
        </div>}
        {post.comments.items.length > 0 && <div className='px-4 flex flex-col gap-2'>{post.comments.items.map(item => <Comment key={item.id} {...item} />)}</div>}
        {post.comments.items.length > 0 && <Link to={`user/${post.social_user.username.replace('@','')}/${post.id}/comment`} className='p-4 pl-[4.5rem] text-[13px] text-gray-400'>댓글 더 보기...</Link>}
    </div>
  )
}