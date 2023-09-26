import { useCallback, useEffect, useState } from "react"
import Back from "../componets/layout/Back"
import {product}  from "../api/product/detail"
import {style_social_post} from "../api/product/style"
import {view_together} from '../api/product/together'
import { FiShare } from 'react-icons/fi'
import { Swiper, SwiperSlide } from "swiper/react"
import Dropdown from "../componets/Dropdown"
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai'
import { IoIosArrowDropdown, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import { VscVerified } from "react-icons/vsc"
import { MdOutlineLocationSearching } from "react-icons/md"
import { BsBoxSeam } from "react-icons/bs"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import Product from "../componets/items/Product"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2"
import { GoBookmark } from "react-icons/go"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function PageProduct() {
    const [data, setData] = useState(null)
    const [currentChart, setCurrentChart] = useState(null)
    const getData = useCallback(async () => {
        const request = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
            return {
                product,
                style_social_post,
                view_together
            }
        })
        if(request.product.sales_summary.charts.length > 0) setCurrentChart(request.product.sales_summary.charts[0])
        setData(request)
    },[])
    useEffect(() => {
        getData()
    }, [getData])
    return (<>
        <Back extra={<div className="float-right gap-3 h-full flex items-center">
            <button><AiOutlineHome size={24} /></button>
            <button><FiShare size={24} /></button>
        </div>}/>
        <div className="pt-[57px]">
            <Swiper className="aspect-square w-full bg-gray-50">
            {data &&data.product?.release.image_urls && data.product?.release.image_urls.length > 0 && 
                data.product?.release.image_urls.map((image, index) => <SwiperSlide key={index}>
                    <div className="aspect-square w-full bg-gray-50" style={{backgroundColor: data.product.release.bgcolor}}>
                        <img src={image} alt={data.product?.release.title} className="absolute top-0 left-0 w-full h-full object-contain" />
                    </div>
                </SwiperSlide>)}
            </Swiper>
            {data && <>
            <div className="p-4">
                <h2 className="font-bold inline-block mb-2 border-b-2 border-black">{data.product.brand.name}</h2>
                <h1 className="line-height-130 pb-1">{data.product.release.name}</h1>
                <p className="text-[13px] text-gray-600 line-height-130">{data.product.release.translated_name}</p>
                <Dropdown className="w-full mt-4" header={<span className="w-full px-4 py-3 text-[14px] font-bold flex justify-between border border-gray-200 rounded-md items-center">모든 {data.product.additional_info.option_title} <IoIosArrowDropdown size={20} /></span>}>
                    <h3 className="text-[18px] p-4 font-bold text-center">{data.product.additional_info.option_title}</h3>
                    <div className="h-[90vh] overflow-auto bg-gray-50">
                        <div className="grid grid-cols-3 p-4 gap-1">
                            <button className="w-full p-4 text-left border bg-white rounded-lg border-gray-200 flex flex-col justify-center items-center">
                                <b className="text-[14px] font-bold">모든 {data.product.additional_info.option_title}</b>
                                <span className="text-[12px] text-red-500">{(data.product.market.market_price).toLocaleString()}원</span>
                            </button>
                        {data.product.sales_options.map((option, index) => 
                            <button key={index} className="w-full p-4 text-left border bg-white rounded-lg border-gray-200 flex flex-col justify-center items-center">
                                <b className="text-[14px] font-bold">{option.option}</b>
                                <span className="text-[12px] text-red-500">{(option.lowest_ask).toLocaleString()}원</span>
                            </button>
                        )}
                        </div>
                    </div>
                </Dropdown>
                <div className="flex justify-between py-4 border-b border-gray-200">
                    <label className="text-[12px] text-gray-500">최근 거래가</label>
                    <div className="flex flex-col justify-end text-right">
                        <b>{(data.product.market.last_sale_price).toLocaleString()}원</b>
                        <span className={`text-[12px] ${data.product.market.change_value > 0 ? ' text-red-500': data.product.market.change_value < 0 && ' text-green-600'}`}>
                            {data.product.market.change_value > 0 ? <IoMdArrowDropup className="inline-block align-middle" size={14} /> : data.product.market.change_value < 0 && <IoMdArrowDropdown className="inline-block align-middle" size={14} />}
                            {(data.product.market.change_value).toLocaleString()}원{" "}
                            ({data.product.market.change_value > 0 ? '+': data.product.market.change_value < 0 && '-'}{(Math.round(data.product.market.change_percentage * 10)/10).toFixed(2)}%)
                        </span>
                    </div>
                </div>
            </div>
            <h4 className="text-[13px] px-4 pb-2">상품 정보</h4>
            <ul className="px-4 overflow-auto flex gap-2">
                <li className="flex flex-col min-h-[80px] min-w-[150px] p-4 border border-gray-100 rounded-lg">
                    <label className="text-gray-500 text-[12px]">모델번호</label>
                    <span className="text-[13px] font-bold">{data.product.release.style_code ? data.product.release.style_code: '-'}</span>
                </li>
                <li className="flex flex-col min-h-[80px] min-w-[150px] p-4 border border-gray-100 rounded-lg">
                    <label className="text-gray-500 text-[12px]">발매가</label>
                    {data.product.release.original_price 
                        ? <span className="text-[13px]">{(data.product.release.original_price ||0).toLocaleString()}원</span>
                        : <span className="text-[13px]">-</span>
                    }
                </li>
                <li className="flex flex-col min-h-[80px] min-w-[150px] p-4 border border-gray-100 rounded-lg">
                    <label className="text-gray-500 text-[12px]">출시일</label>
                    <span className="text-[13px]">{data.product.release.date_released ? dayjs(data.product.release.date_released).format('YY/MM/DD') : '-'}</span>
                </li>
                <li className="flex flex-col min-h-[80px] min-w-[150px] p-4 border border-gray-100 rounded-lg">
                    <label className="text-gray-500 text-[12px]">컬러</label>
                    <span className="text-[13px]">{data.product.release.colorway ? data.product.release.colorway : '-'}</span>
                </li>
            </ul>
            {data.product.detail_items.map((info, index) => info.key === 'banners' ? (<div key={index}>
                {info.images.map((item, idx) => <Link key={idx} to={item.destination_url} style={{background:info.bgcolor}}>
                    <img src={item.url} alt={item.title} className="w-full" />
                </Link>)}
            </div>):
            info.item_type ==='legacy' ?(
                info.key === 'charts' ? ( 
                    data.product.sales_summary && data.product.sales_summary.charts && data.product.sales_summary.charts.length > 0 && <div key={index} className="px-4">
                        <div className="flex gap-2 bg-gray-100 rounded-md text-[13px] p-1" >
                            {data.product.sales_summary.charts.map(((type,idx) => (<button className={`w-full py-2 rounded-md
                                ${currentChart === type ? 'bg-white text-black font-bold':'text-gray-500'}
                            `} key={idx} onClick={() => setCurrentChart(type)}>
                                {type.span === 'all' ? '전체'
                                : type.span === '1y' ? '1년'
                                : type.span === '6m' ? '6개월'
                                : type.span === '3m' ? '3개월'
                                : type.span === '1m' ? '1개월'
                                : type.span}
                            </button>)))}
                        </div>
                        {currentChart && <div className="flex py-4">
                            <div style={{width:'calc(100% - 70px)'}}><Line options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display:false
                                    },
                                    title: {
                                        display: false,
                                    },
                                    tooltip: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        display: false,
                                    },
                            }
                            }} data={{
                                labels :currentChart.data.map(() => ''),
                                datasets: [
                                {
                                    label: '',
                                    data: currentChart.data.map((chart) => chart.value),
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderWidth:1
                                },
                                ],
                            }} /></div>
                            <div className="text-[11px] flex flex-col justify-around items-end min-w-[70px] text-gray-500">
                                {currentChart.data.map((chart,idx) => !String(idx/Math.round(currentChart.data.length/5)).includes('.') &&<div key={idx}>{(chart.value).toLocaleString()}원</div>)}
                            </div>
                        </div>}
                        {data.product.sales_summary.sales && data.product.sales_summary.sales.length > 0 && <table className="w-full text-[13px]">
                            <thead>
                                <tr>
                                    <th className="font-normal py-1 text-[12px] text-gray-500 border-b border-gray-100">{data.product.additional_info.option_title}</th>
                                    <th className="w-1/4 font-normal py-1 text-right text-[12px] text-gray-500 border-b border-gray-100">거래가</th>
                                    <th className="w-1/4 font-normal py-1 text-right text-[12px] text-gray-500 border-b border-gray-100">거래일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.product.sales_summary.sales.map((sale,idx) => <tr key={idx}>
                                    <td className={`relative py-1 ${idx === 0 ? 'pt-2': ''} ${idx === data.product.sales_summary.sales.length - 1 ? 'pb-2': ''}`}>{sale.option}</td>
                                    <td className={`relative py-1 text-right ${idx === 0 ? 'pt-2': ''} ${idx === data.product.sales_summary.sales.length - 1 ? 'pb-2': ''}`}>
                                        {(sale.price || 0).toLocaleString()}
                                        {sale.is_immediate_delivery_item && <span className="absolute top-1/2 left-full -translate-y-1/2 ml-1 text-[10px]">빠른</span>}
                                    </td>
                                    <td className={`relative py-1 text-right ${idx === 0 ? 'pt-2': ''} ${idx === data.product.sales_summary.sales.length - 1 ? 'pb-2': ''}`}>{dayjs(sale.date_created).format('YY/MM/DD')}</td>
                                </tr>)}
                            </tbody>
                        </table>}
                    </div>
                ) : info.key === 'viewed_together' ?(
                    data.view_together && data.view_together.items.length > 0 && <div className="grid grid-cols-2 gap-2 px-4" key={index}>
                        { data.view_together.items.map((item, idx) => 
                        item.item_type === 'product' ? <div key={idx}>
                            <Product product={item.product} view_type={item.item_type} release={false} ranking={false} />
                        </div>
                        :item.item_type === 'header' ? 
                        <div className="flex justify-between pb-1 text-[13px] pt-4 border-t border-gray-200 col-span-2" key={idx}>
                            <h4 className="text-[16px] font-medium">{item.header.title}</h4>
                            {item.header.url && <Link href={item.header.url} className="text-gray-500">더보기</Link>}
                        </div>: <></>)}
                    </div>)
                : info.key === 'recommended_95_products' ? (
                    <div key={index} className="p-4 pt-0">
                        <div className="flex justify-between pb-1 text-[13px] pt-4 border-t border-gray-200">
                            <h4 className="text-[16px] font-medium">95점 추천 상품</h4>
                        </div>
                        {data.product.inventory_95_products && data.product.inventory_95_products.items && data.product.inventory_95_products.items.length > 0 &&
                        <Swiper slidesPerView={2.3} spaceBetween={10} style={{overflow: 'visible'}}>
                            {data.product.inventory_95_products.items.map((item, idx) => <SwiperSlide key={idx}>
                                <Product product={{
                                    release: {
                                        ...item,
                                        bgcolor:'#f5f5f5',
                                        original_price: item.reference_price
                                    },
                                    brand: {
                                        name: item.option
                                    }
                                }} release={false} ranking={false} point={95} />
                            </SwiperSlide>)}
                        </Swiper>}
                    </div>
                ):
                <div key={index}></div> 
            ):(info.title || info.description) &&<div key={index} className="p-4 pt-0 overflow-hidden">
                {info.title && info.item_type !== 'legacy' && <div className="flex justify-between pb-1 text-[13px] pt-4 border-t border-gray-200">
                    <h4 className="text-[16px] font-medium">{info.title}</h4>
                    {info.destination_url && info.item_type !== 'reviews' && <Link href={info.destination_url} className="text-gray-500">더보기</Link>}
                </div>}
                {info.item_type === 'display_section' && info.items.map((item, idx) => <div key={idx} className="flex items-start text-[13px] pt-1">
                    <h5 className="w-1/4 text-gray-500">{item.title.text}</h5>
                    <div className="w-3/4">
                        {(item.description.text || '').includes(';tl_0;') ?
                            item.description.text.replace(';tl_0;',item.description.lookups.find(lookup => lookup.key === ';tl_0;').text)
                        : item.description.text}
                        {item.accessory_title && item.accessory_title.text && <span className="text-gray-500">{item.accessory_title.text}</span>}
                    </div>
                </div>)}
                {info.item_type === 'delivery_methods' && info.delivery_methods.map((item, idx) => <div key={idx} className={`flex text-[14px] ${idx > 0 ? '': 'pt-1'} gap-2 items-center`}>
                    <div className="w-1/6 aspect-square">
                        <img src={item.badge_url} alt={item.badge_title} className="w-full h-full object-contain" />
                    </div>
                    <div className={`w-5/6  py-3 ${idx > 0 ?'border-t border-gray-200':''}`}>
                        <h5 className="flex gap-1 items-center"><b className="font-bold">{item.badge_title}</b> {item.title}
                        <Link to={item.info_url}>
                            <AiOutlineInfoCircle size={16} />
                        </Link></h5>
                        <p className="text-gray-500">
                            {(item.description || '').includes(';tl_0;') ?
                                item.description.replace(';tl_0;',item.description_lookups.find(lookup => lookup.key === ';tl_0;').text)
                            : item.description}
                            {item.accessory_title && item.accessory_title.text && <span className="text-gray-500">{item.accessory_title.text}</span>}
                        </p>
                    </div>
                </div>)}
                {info.item_type === 'reviews' && <div className="grid grid-cols-3 gap-1 mt-1 pb-4">
                    {info.reviews.items.map((item, idx) => idx < 9 && <Link key={idx} className={`aspect-square ${idx === 0 ?'col-span-2 row-span-2' :''}`} to={item.destination_url}>
                        <img src={item.image_url} alt={item.image_id} className="w-full h-full object-cover aspect-square"/>
                    </Link>)}
                    <Link to={info.destination_url} className="col-span-3 border border-gray-200 px-4 py-3 rounded-lg text-[13px] text-center text-gray-600">스타일 더보기</Link>
                </div>}
                {info.item_type === 'related_products' && <Swiper slidesPerView={2.3} spaceBetween={10} style={{overflow: 'visible'}}>
                    {info.products.map((item, idx) => <SwiperSlide key={idx}>
                        <Product product={item} release={false} ranking={false} />
                    </SwiperSlide>)}
                </Swiper>}
                {info.item_type === 'footer' && <>
                <ul className="text-[13px]">
                    <li className="flex py-2 items-center">
                        <VscVerified size={30} className="w-1/6" />
                        <div className="w-5/6">
                            <strong className="font-bold pb-1">100% 정품 보증</strong>
                            <p className="text-gray-500 line-height-120">KREAM에서 검수한 상품이 정품이 아닐 경우, 구매가의 3배를 보상합니다.</p>
                        </div>
                    </li>
                    <li className="flex py-2 items-center">
                        <MdOutlineLocationSearching size={30} className="w-1/6" />
                        <div className="w-5/6">
                            <strong className="font-bold pb-1">엄격한 다중 검수</strong>
                            <p className="text-gray-500 line-height-120">모든 상품은 검수센터에 도착한 후, 상품별 전문가 그룹의 체계적인 시스템을 거쳐 검수를 진행합니다.</p>
                        </div>
                    </li>
                    <li className="flex py-2 items-center">
                        <BsBoxSeam size={30} className="w-1/6" />
                        <div className="w-5/6">
                            <strong className="font-bold pb-1">정품 인증 패키지</strong>
                            <p className="text-gray-500 line-height-120">검수에 합격한 경우에 한하여 KREAM의 정품 인증 패키지가 포함된 상품이 배송됩니다.</p>
                        </div>
                    </li>
                </ul>
                <p className="text-gray-500 line-height-120 pt-2 text-[13px]">{info.description}</p>
                        
                </>}
            </div>)}
            </>}
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex items-center p-3 z-10 gap-1">
            <button className="w-[50px] flex flex-col justify-center items-center text-[12px] font-medium">
                <GoBookmark size={24} />
                {(data?.product?.counter?.wish_count || 0).toLocaleString()}
            </button>
            <div style={{width:'calc(100% - 50px)'}} className="flex gap-1">
                <button className="py-2 bg-red-500 bg-opacity-[95] text-white flex items-center relative w-full rounded-md">
                    <span className="absolute top-0 left-[44px] w-px h-full bg-black opacity-10"></span>
                    <span className="w-[44px] text-[14px] font-bold">구매</span>
                    <span className="text-[11px] pl-2 text-left line-height-130">
                        <b className="font-bold block">{(data?.product?.market?.lowest_ask || 0).toLocaleString()}원</b>
                        즉시 구매가
                    </span>
                </button>
                <button className="py-2 bg-green-500 bg-opacity-[95] text-white flex items-center relative w-full rounded-md">
                    <span className="absolute top-0 left-[44px] w-px h-full bg-black opacity-10"></span>
                    <span className="w-[44px] text-[14px] font-bold">판매</span>
                    <span className="text-[11px] pl-2 text-left line-height-130">
                        <b className="font-bold block">{(data?.product?.market?.highest_bid || 0).toLocaleString()}원</b>
                        즉시 판매가
                    </span>
                </button>
            </div>
        </div>
    </>)
}
