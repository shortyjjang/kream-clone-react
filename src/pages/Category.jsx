import { useCallback, useEffect, useState } from 'react'
import { category } from "../api/shop/category"
import Back from "../componets/layout/Back"
import { Link } from 'react-router-dom'
import Image from '../componets/Image'

export default function PageCategory() {
    const [data, setData] = useState(null)
    const getData = useCallback(async () => {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
            return category
        })
        setData(request)
    },[])
    useEffect(() => {
        getData()
    }, [getData])
    return (<>
        <Back title='카테고리' />
        {data && <div className="flex">
            <div className="w-[30%] h-screen overflow-auto pt-[57px]">
                {data.tabs.map((tab, index) => <button className={`w-full text-left px-4 py-3 text-[14px]
                    ${tab.id === data.tab.id 
                        ? 'font-bold'
                        : 'font-light'
                    }
                `} style={tab.id === data.tab.id 
                    ? {boxShadow: 'inset 3px 0 0 #000'}
                    : {}
                }>
                    {tab.name}
                </button>)}
            </div>
            <div className="w-[70%] h-screen overflow-auto pt-[57px] pr-4">
                <h2 className='font-bold text-[16px] pt-4'>{data.items[0].title}</h2>
                {data.items[0].items.map((section,index) => <div key={index} className='text-[13px]'>
                    <h3 className='text-gray-500 font-bold py-3'>{section.title}</h3>
                    <div className='grid grid-cols-3 gap-x-1 gap-y-3 pb-3'>
                        {section.items.map((item,idx) => <Link to={`/product/${item.id}`} key={idx} className='block text-center line-height-120 text-gray-700'>
                            <span className='bg-gray-50 aspect-square w-full rounded-lg mb-1 block overflow-hidden' style={item.background_color ? {backgroundColor:item.background_color}:{}}>
                                <Image src={item.background_url} alt={item.name} className='aspect-square object-cover w-full h-full bg-blend-darken' />
                            </span>
                            {item.title}
                        </Link>)}
                    </div>
                </div>)}
            </div>
        </div>}
    </>)
}