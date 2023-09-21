import React from 'react'
import ItemsDisplay from '../items/ItemsDisplay'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Scrollbar, Autoplay} from 'swiper/modules'
import { Link } from 'react-router-dom'

export default function ListDisplay({view_type, list, }) {
    if(view_type === 'banner') return (<>
        {list.title && <div className='border-t border-gray-100 p-4 pt-6'>
            <h2 className='text-[16px]'>{list.title}</h2>
            {list.description && <div className='text-gray-500 flex justify-between text-[13px]'>
                <p>{list.description}</p>
                {list.destination_url && <Link to={list.destination_url}>더보기</Link>}
            </div>}
        </div>}
        <Swiper modules={[Scrollbar, Autoplay]} scrollbar={{
            hide: false
        }} autoplay={{
            delay: 3000
        }}>
            {list.items.map(item => <SwiperSlide key={item.id}><ItemsDisplay list_display_type={list.list_display_type} item={item} view_type={item.view_type} /></SwiperSlide>)}
        </Swiper>
    </>)
    if(view_type === 'shortcut_collection') return (<>
        {list.title && <div className='border-t border-gray-100 p-4 pt-6'>
            <h2 className='text-[16px]'>{list.title}</h2>
            {list.description && <div className='text-gray-500 flex justify-between text-[13px]'>
                <p>{list.description}</p>
                {list.destination_url && <Link to={list.destination_url}>더보기</Link>}
            </div>}
        </div>}
        <div className={`grid grid-cols-5-fr gap-x-3 gap-y-6 px-4 py-6 ${list.title ? 'pt-4' :''} `}>
            {list.items.map(item => <ItemsDisplay list_display_type={list.list_display_type} item={item} view_type={item.view_type} />)}
        </div>
    </>)
    if(view_type === 'shortcut_collection') return(<>
        {list.title && <div className='border-t border-gray-100 p-4 pt-6'>
            <h2 className='text-[16px]'>{list.title}</h2>
            {list.description && <div className='text-gray-500 flex justify-between text-[13px]'>
                <p>{list.description}</p>
                {list.destination_url && <Link to={list.destination_url}>더보기</Link>}
            </div>}
        </div>}
        <div className='px-3 pb-6 overflow-hidden'><Swiper slidesPerView={2.5} className='px-3' style={{overflow: 'visible'}}>
            {list.items.map(item => <SwiperSlide key={item.id}><ItemsDisplay list_display_type={list.list_display_type} item={item} view_type={item.view_type} /></SwiperSlide>)}
        </Swiper></div>
    </>)
    if(view_type === 'horizontal_product_collection' || list.view_type === 'horizontal_product_collection_medium' ) return(<>
        {list.title && <div className='border-t border-gray-100 p-4 pt-6'>
            <h2 className='text-[16px]'>{list.title}</h2>
            {list.description && <div className='text-gray-500 flex justify-between text-[13px]'>
                <p>{list.description}</p>
                {list.destination_url && <Link to={list.destination_url}>더보기</Link>}
            </div>}
        </div>}
        <div className='px-3 pb-6 overflow-hidden'><Swiper slidesPerView={2.2} style={{overflow: 'visible'}}>
        {list.items.map(item => <SwiperSlide key={item.id}><ItemsDisplay list_display_type={list.list_display_type} item={item} view_type={item.view_type} /></SwiperSlide>)}
        </Swiper></div>
    </>)
  return (<></>)
}
