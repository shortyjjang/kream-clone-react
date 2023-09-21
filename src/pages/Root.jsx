import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../componets/layout/Layout'
import { recommendData } from '../api/home/recommend'
import { rankingData } from '../api/home/ranking'
import { luxury } from '../api/home/luxury'
import { mens } from '../api/home/men'
import { women } from '../api/home/women'
import { discovery } from '../api/home/discovery'
import { useLocation } from 'react-router-dom'
import Header from '../componets/layout/Header'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Scrollbar, Autoplay} from 'swiper/modules'
import { Link } from 'react-router-dom'
import ItemsDisplay from '../componets/items/ItemsDisplay'
import { RiNotification2Line } from 'react-icons/ri'

export default function Root() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const current = useLocation().state?.tab || 1
    const [paddingTop, setPaddingTop] = useState(0)
    const getData = useCallback(async () => {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
            switch(current) {
                case 19: return rankingData
                case 40: return luxury
                case 3: return mens
                case 4: return women
                case 32: return discovery
                default:
                    return recommendData
            }
        })
        setData(request)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[current])
    useEffect(() => {
        getData()
    }, [getData])
  return (
    <Layout loading={loading}>
        {data && <Header tabs={data.tabs} setPaddingTop={setPaddingTop} menu={<Link to=""><RiNotification2Line size={24} /></Link> } />}
        <div style={{paddingTop: paddingTop}}>
            {data?.items && data.items.map(list => <ListDisplay list={list} view_type={list.view_type} />)}
        </div>
    </Layout>
  )
}

function ListDisplay({view_type, list, }) {
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
