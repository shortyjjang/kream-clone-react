import React from 'react'
import { PiHeartLight } from 'react-icons/pi'
import Image from '../Image'
import CreatedTime from '../CreatedTime'
import { BiCheck } from 'react-icons/bi'

export default function Comment({comment_count, date_created, date_flagged, id, is_flagged, is_liked, like_count, likers, lookup, reply_id, social_user, text, items}) {
  return (
    <div className='flex justify-between gap-1 items-start'>
        <Image src={social_user.profile_image_url} alt={social_user.username} className='w-12 rounded-full aspect-square'/>
        <div className='text-[13px]' style={{width: 'calc(100% - 3.5rem)'}}>
            <div className='flex justify-between items-start'>
                <div>
                    <b className='mr-2'>{social_user.username.replace('@','')}
                        {social_user.verified_type && 
                        <span className='bg-black rounded-full aspect-square w-2 ml-1 text-white inline-block align-middle -mt-px'><BiCheck /></span>}
                    </b>
                    {text.at(0) === '@' ? <span><span className='text-blue-500'>{text.substring(0,text.indexOf(' '))}</span> {text.substring(text.indexOf(' ')+1)}</span>: <span>{text}</span>}
                    <div className='text-gray-500 mt-1 text-[11px] flex gap-1'>
                        <CreatedTime created={date_created} />
                        •
                        {like_count > 0 && <button>
                            좋아요{" "}
                            <b>{like_count}</b>개
                        </button>}
                        <button className='font-bold ml-1'>답글쓰기</button>
                    </div>
                </div>
                <button>
                    <PiHeartLight size={30} />
                </button>
            </div>
            {items && items.length > 0 && <div className="flex flex-col gap-2">{items.map(item => <Comment key={item.id} {...item} />)}</div>}
        </div>
    </div>
  )
}
