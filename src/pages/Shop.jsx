/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useCallback, useEffect, useRef, useState } from 'react'
import Layout from '../componets/layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import ItemsDisplay from '../componets/items/ItemsDisplay'
import Image from '../componets/Image'
import Header from '../componets/layout/Header'
import { list } from '../api/shop/list'
import { filters } from '../api/shop/filters'
import { AiOutlineMenu } from 'react-icons/ai'
import Dropdown from '../componets/Dropdown'
import { LuArrowUpDown } from 'react-icons/lu'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { GrPowerReset } from 'react-icons/gr'
import Tabs from "../componets/Tabs"
import Button from "../componets/form/Button"

export default function PageShop() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [paddingTop, setPaddingTop] = useState(0)
    const [sort, setSort] = useState('')
    const [filter, setFilters] = useState(null)
    const filterRef = useRef(null)
    const [fixed, setFixed] = useState(0)
    const navigate = useNavigate()
    const getData = useCallback(async () => {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
            return list
        })
        setData(request)
        let trending = []
        for(let i = 0; i < filters.trending.length;i = i + 10) {
            trending.push(filters.trending.slice(i, i + 10))
        }
        setFilters({
            ...filters,
            trending
        })
        setSort(request.sort)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[])
    const fixedFilter = useCallback(() => {
        if(!filterRef.current)return;
        const overflow = window.scrollY + paddingTop - filterRef.current.clientHeight > filterRef.current.offsetTop
        if((overflow && fixed > 0) || (!overflow && fixed === 0)) return;
        setFixed(window.scrollY + paddingTop - filterRef.current.clientHeight >= filterRef.current.offsetTop && fixed === 0 ? paddingTop - filterRef.current.clientHeight:0 )
    },[fixed, paddingTop])
    useEffect(() => {
        getData()
    }, [getData])
    useEffect(() => {
        window.addEventListener('scroll', fixedFilter)
        return () => window.removeEventListener('scroll', fixedFilter)
    },[fixedFilter])
  return (
    <Layout loading={loading}>
        {data && <Header tabs={data.tabs} search={true} setPaddingTop={setPaddingTop} menu={<button className='pl-4' onClick={() => navigate('/category')}><AiOutlineMenu size={24} /></button>} />}
        {data && <div  style={{paddingTop: paddingTop}}>
            {filter && filter.trending && filter.trending.length > 0 && <Swiper modules={Pagination} pagination={{
                clickable: true, 
                type: 'bullets'
            }} css={css`
                .swiper-pagination {display:flex;justify-content:center;align-items:center;padding-top:0.5rem;}
                .swiper-pagination-bullet {width: 4px;height: 4px;border-radius: 2px;background: #000;opacity: 0.1;}
                .swiper-pagination-bullet-active {opacity: 1;background: #000;}
            `}>
                {filter.trending.map((trend,index) => <SwiperSlide key={index}>
                    <div className='grid grid-cols-5 gap-x-2 gap-y-4 py-1'>
                        {trend.map((item,idx) => <Link to={item.web_destination_url} key={idx} className='flex flex-col items-center text-[11px]'>
                            <Image src={item.image_url} alt={item.name} className='aspect-square object-cover mb-1 w-full' />
                            {item.name}
                        </Link>)}
                    </div>
                </SwiperSlide>)}
            </Swiper>}
            {filter?.filters && <Filter data={data} filters={filter.filters} count={filter.result_count}/>}
            {data?.sorting?.choices && data?.sorting?.choices.length > 0 && <Dropdown className='flex justify-end pt-4 px-4' header={<span className='flex items-center text-[13px] gap-1'>
                {data.sorting.choices.find(type => type.sort === sort || data.sort).display}
                <LuArrowUpDown size={12} />
            </span>}>
                {data.sorting.choices.map((type, idx) => <button key={idx} className={`text-left py-3 text-[14px] relative px-5
                    ${idx > 0 ? '':'pt-4'}
                    ${type.sort === sort ? 'text-black font-bold':'text-gray-800 font-light'}
                `} onClick={() => setSort(type.sort)}>{idx > 0 && <span className="absolute top-0 left-5 right-5 h-px bg-gray-200"></span>}{type.display}</button>)}
            </Dropdown>}
            <div className='grid grid-cols-2 gap-2 p-4'>
                {data?.items.map((item,index)  => <ItemsDisplay item={item} key={index} view_type={item.display_type}/>)}
            </div>
        </div>}
    </Layout>
  )
}

function Filter({filters, data, count}) {
    const [currentTab, setCurrentTab] = useState(filters.tabs[0])
    const [selected, setSelected] = useState(data.filters)
    return (<>
        <div className="flex gap-2 overflow-auto p-4 pb-0 border-t border-gray-100">
        {filters.tabs.reduce((a,b) => a + b.selected_count,0) > 0 && <button 
        className='rounded-full w-7 h-7 aspect-square flex items-center justify-center border border-gray-200 bg-gray-50 text-gray-700'><GrPowerReset size={15} /></button>}
        <button className={`text-[13px] whitespace-nowrap px-3 py-1 border rounded-s-full rounded-e-full 
            ${selected.quick_delivery 
                ? 'border-black text-white bg-black'
                : 'border-gray-200 text-gray-700'
            }
        `}>빠른배송</button>
        {filters.tabs.map((filter,index) => <Dropdown key={index} header={<button className={`text-[13px] whitespace-nowrap px-3 py-1 border rounded-s-full rounded-e-full 
            ${filter.selected_count > 0 
                ? 'border-black text-white bg-black'
                : 'border-gray-200 text-gray-700'
            }
        `}>
            {filter.title}
            {filter.selected_count > 0 && <>{" "}{filter.selected_count}</>}
        </button>}>
            <h3 className="text-center pt-4 pb-2 font-bold">{filters.title}</h3>
            <Tabs tabs={filters.tabs.map(tab => ({
                id: tab.key,
                name: tab.title
            }))} value={['id']} onClick={(id) => setCurrentTab(filters.tabs.find(t => t.id === id))} />
            <div className="max-h-[50vh] overflow-auto text-[13px]">
                {currentTab.sections.map((section, index) => <div key={index} className={`p-4 ${index>0? 'border-t border-gray-200':''}`}>
                    <div className="flex justify-between pb-1">
                        <h4 className="font-bold">{section.title}</h4>
                        <button className="text-gray-600">모두 선택</button>
                    </div>
                    {section.choices.map((choice, idx) => <button key={idx} onClick={() => {
                        const includeYn = selected[choice.key] ? selected[choice.key].split(',').includes(choice.value) :''
                        let newSelected = includeYn 
                            ? selected[choice.key].split(',').filter(v => v !== choice.value).join(',')
                            : (selected[choice.key] ? selected[choice.key] + ',':'') + choice.value
                        setSelected({
                            ...selected,
                            [choice.key]: newSelected
                        })
                    }} className={`text-[13px] mt-2 ${idx === section.choices.length -1 ? '' :'mr-2'} whitespace-nowrap px-3 py-1 border rounded-s-full rounded-e-full 
                        ${selected[choice.key] && selected[choice.key].split(',').includes(choice.value)
                            ? 'border-black text-white bg-black'
                            : 'border-gray-200 text-gray-700'
                        }
                    `}>{choice.name}
                    </button>)}
                </div>)}
            </div>
            <div className="flex gap-4 p-4 border-t border-gray-200 text-[14px]">
                <button className="flex gap-2 text-gray-600 items-center"><GrPowerReset size={18} className="opacity-50" /> 초기화</button>
                {/* eslint-disable-next-line react/style-prop-object*/}
                <Button style="primary" className="w-full text-[16px] font-bold" size="large" onClick={() => {

                }}>{count}개 상품 더 보기</Button>
            </div>
        </Dropdown>)}
        </div>
    </>)
}