import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../Image'

export default function MiniProduct({product_id, release, sale_info, market}) {
  return (
    <Link to={`/product/${product_id}`} className='flex gap-2 p-4 text-[12px] w-full items-center'>
        <span className='relative rounded-sm aspect-square w-16' style={{backgroundColor: release.bgcolor}}><Image src={release.image_urls[0]} alt={release.name} className='absolute top-0 left-0 w-full h-full object-contain' /></span>
        <span className='flex flex-col line-height-120 gap-1' style={{maxWidth: 'calc(100% - 4.5rem)'}}>
            <span className='font-light'>{release.name}</span>
            {sale_info ? <span className='font-semibold'>
                {sale_info.default?.discount_rate && sale_info.default?.discount_rate > 0 && <span className='text-rose-500'>{(sale_info.default?.discount_rate * 100) || 0}%</span>}
                <span>{(sale_info.default?.price || 0).toLocaleString()}원</span>
            </span>: <span className='font-semibold'>{((market?.lowest_ask ? market?.lowest_ask : release.original_price) || 0).toLocaleString()}원</span>}
        </span>
    </Link>
  )
}
