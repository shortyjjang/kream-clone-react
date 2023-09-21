import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../componets/layout/Layout'
import { discovery } from '../api/style/discovery'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { following } from '../api/style/following'
import { ranking } from '../api/style/ranking'
import { collectable } from '../api/style/collectable'
import ItemsDisplay from '../componets/items/ItemsDisplay'
import dayjs from 'dayjs'
import Image from '../componets/Image'
import Header from '../componets/layout/Header'

export default function PageStyle() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const current = useLocation().state?.tab || 1
    const currentGroup = useLocation().state?.sg || -1
    const [paddingTop, setPaddingTop] = useState(0)
    const [sort, setSort] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const getData = useCallback(async () => {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
            switch(current) {
                case 1: return following
                case 2: return discovery
                case 10: return ranking
                default:
                    return collectable
            }
        })
        setData(request)
        if(request?.sorting?.sort) setSort(request.sorting.sort)
        if(request.header.sub_group_list && request.header.sub_group_list.length > 0 && request.header.sub_group_list.findIndex(list => list.id === currentGroup) < 0) {
            navigate(location.pathname , {state: {
                tab: current,
                sg: request.header.sub_group_list[0].id
            }})
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[current, currentGroup, location.pathname, navigate])
    useEffect(() => {
        getData()
    }, [getData])
  return (
    <Layout loading={loading}>
        {data && <Header tabs={data.tabs} search={true} setPaddingTop={setPaddingTop} sub_group_list={data.header.sub_group_list} />}
        {data && <div  style={{paddingTop: paddingTop}}>
            {data.header?.additional_info?.update_info && <div className='flex gap-2 text-[13px] p-4 pb-0'>
                <b>{data?.header?.additional_info?.update_info.title}</b>
                <span className='flex gap-1 items-center text-gray-500'>
                    {dayjs(data?.header?.additional_info?.update_info.date_updated).format('MM.DD HH:mm:ss')}기준
                    {data?.header?.additional_info?.update_info.url && <Link to={data?.header?.additional_info?.update_info.url} className='border border-gray-200 rounded-full w-4 aspect-square'></Link>}
                </span>
            </div>}
            {data.header?.hashtags && data.header.hashtags.length > 0 && <div className='whitespace-nowrap flex px-4 overflow-auto pt-2 pb-6'>
                {data.header.hashtags.map((tag, index) => <Link to={`/social/tags/${tag.name}`} className={`text-[13px] line-height-120 text-center break-all whitespace-normal ${index > 0 ? 'ml-2':''}`}>
                    <span className='w-16 aspect-square rounded-full overflow-hidden block relative mb-2'>
                    <Image src={tag.background_url} alt={tag.name} className='absolute top-0 left-0 w-full h-full object-cover' />
                    </span>
                    #{tag.name}
                </Link>)}
            </div>}
            {data.tab.key !== 'style_following' && data?.sorting?.choices && data?.sorting?.choices.length > 0 && <div className="col-span-2 flex justify-end gap-4 text-[13px] p-4 pb-0" >
                {(data?.sorting?.choices || []).length > 0 && data.sorting.choices.map(type => <button onClick={() => setSort(type.sort)} className={sort === type.sort ? 'font-bold':'font-light'}>{type.display}</button>)}
            </div>}
            {data.tab.type === 'style_groups' ? <div className='grid grid-cols-2 p-4 gap-x-2'>
                <div className='flex flex-col gap-4'>{data.items.filter((_,idx) => idx % 4 === 0).map(item  => <ItemsDisplay item={item} view_type={item.item_type} list_display_type={data.tab.type}/>)}</div>
                <div className='flex flex-col gap-4'>{data.items.filter((_,idx) => idx % 4 === 1).map(item  => <ItemsDisplay item={item} view_type={item.item_type} list_display_type={data.tab.type}/>)}</div>
            </div>
            : <div className='flex flex-col gap-4 pb-4'>
                {data?.items.map((item)  => <ItemsDisplay item={item} view_type={item.item_type}/>)}
            </div>}
        </div>}
    </Layout>
  )
}
