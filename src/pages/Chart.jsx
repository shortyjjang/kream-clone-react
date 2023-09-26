import React, { useCallback, useEffect, useState } from 'react'
import Back from '../componets/layout/Back'
import { liveChart } from '../api/home/chart'

export default function Chart() {
    const [data, setData] = useState(null)
    const getData = useCallback(async () => {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
            return liveChart
        })
        setData(request)
    },[])
    useEffect(() => {
        getData()
    }, [getData])
    data && console.log(data)
    const productName = (length) => `line-clamp-${length}`
    const Text = ({color, number_of_lines, text, className = '', type}) => <span 
        style={{color: color}} className={`whitespace-nowrap text-ellipsis ${number_of_lines === 1 ?'whitespace-nowrap block overflow-hidden' : productName(number_of_lines)} ${className}`}>
            {(type === 'fluctuation' && text !== '0') ? `
                ${text.at(0).replace('+','▲').replace('-','▼')}
                ${Number(text.substring(1)).toLocaleString()}
            `
            :text}
    </span>
  return (
    <>
        <Back className="py-2" title={ data ? <>
            {data?.header?.navigation_title || ''}
            <small className='block text-gray-500 font-normal'>{data?.header?.navigation_subtitle || ''}</small>
        </>:''} extra={
            <button className='absolute top-1/2 right-4 -translate-y-1/2 border-2 border-black aspect-square flex items-center justify-center font-bold rounded-full w-6 h-6'>
                ?
            </button>
        }/>
        <div className='pt-[60px] px-4'>
            {data?.items && data.items.length > 0 && data.items.map((item, index) => (<div key={index} className={`${index > 0 ? 'border-t border-gray-100':''} py-2 flex justify-between`} style={{gridTemplateColumns: 'auto auto'}}>
                <div className='flex items-center gap-2' style={{maxWidth:'calc(100% - 130px)'}}>
                    <span className='aspect-square w-12 rounded-sm overflow-hidden' style={{backgroundColor: item.image.bgcolor || ''}}>
                        <img src={item.image.url} alt={item.translated_name.text || item.name.text} className='aspect-square w-full object-cover' />
                    </span>
                    <span className='text-[11px]' style={{width:'calc(100% - 3rem - 10px)'}}>
                        {([item.translated_name ? 'translated_name':'name', 'style_code','option']).map((text,idx) => <Text key={idx} {...item[text]} className={`${idx > 0 ? '' :'text-[13px]'}`} />)}
                    </span>
                </div>
                <span className='flex justify-end items-center gap-2 w-[130px]'>
                    <span className='flex flex-col justify-end text-right'>
                        {(['price', 'price_diff']).map((text, idx) => <Text key={idx} {...item[text]} 
                            className={`${idx > 0 ? 'text-[11px]' :'text-[13px] font-bold'}`} 
                        />)}
                    </span>
                    <span className='py-2 text-center rounded-sm text-white w-16 text-[13px]' style={{backgroundColor: item.percentage_diff.background_color, color: item.percentage_diff.tag_color }}>{item.percentage_diff.tag}</span>
                </span>
            </div>))}
        </div>
    </>
  )
}
