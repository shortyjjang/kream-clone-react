import React from 'react'
import { Link } from 'react-router-dom'
import RatioImage from '../RatioImage'
import Tag from '../tag'
import { GoBookmark, GoBookmarkFill } from 'react-icons/go'
import dayjs from 'dayjs'

export default function Product({ destination_url, image_url, product, release = false, ranking = false, tag}) {
  return (
    <Link to={destination_url} className='block px-1'>
        <span className='block relative'>
            <RatioImage background_url={image_url} title={product.release.name} background_color={product.release.bgcolor} background_wide_url={product.release.image_urls[0]} contain={true}  className="aspect-square" />
            <button className='absolute bottom-2 right-2'>{product.me?.wish ? <GoBookmarkFill size={24} />:<GoBookmark size={24} />}</button>
            {release && <span className='absolute top-4 left-4 flex flex-col text-[20px] items-center'>
                <span>{dayjs(product.release.date_released).format('M월')}</span>
                <span className='border-t-2 border-black px-2 font-bold'>{dayjs(product.release.date_released).format('DD')}</span>
            </span>}
            {ranking && tag && <Tag className={`rounded-sm absolute top-2 left-2 aspect-square bg-black text-white font-medium text-[13px] w-6 flex justify-center items-center`} {...tag}/>}
        </span>
        <span className='flex flex-col text-[13px] pt-2'>
            <span className='font-medium'>{product.brand.name} {product.sale_info && <span className='inline-block align-middle aspect-square w-4 bg-violet-600 text-white rounded-full -mt-1'></span>}</span>
            <span className='font-light'>{product.release.name}</span>
            {product?.badge?.tags && product.badge.tags.length > 0 && <span>
                {product.badge.tags.map((tag,idx) => <Tag key={idx} className={`rounded-sm px-1 text-[9px] border whitespace-nowrap ${idx > 0 ?'ml-1':''}`} {...tag}/>)}
            </span>}
            {product.sale_info ? <span className='font-semibold text-[14px] pt-2'>
                {product.sale_info.default?.discount_rate && product.sale_info.default?.discount_rate > 0 && <span className='text-rose-500'>{(product.sale_info.default?.discount_rate * 100) || 0}%</span>}
                <span>{(product.sale_info.default?.price || 0).toLocaleString()}원</span>
            </span>: <span className='font-semibold text-[14px] pt-2'>{((product.market?.lowest_ask ? product.market?.lowest_ask : product.release.original_price) || 0).toLocaleString()}원</span>}
            <span className='text-gray-500 text-[10px]'>구매가</span>
        </span>
    </Link>
  )
}
