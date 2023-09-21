import Loader from "../Loader"
import { AiOutlineHome } from "react-icons/ai"
import { PiNewspaperClippingBold } from "react-icons/pi"
import { TbShoppingBagSearch } from "react-icons/tb"
import { BiBookmark } from "react-icons/bi"
import { LuUserCircle } from "react-icons/lu"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Layout({children, className = '', loading = false}) {
  const homebar = useRef(null)
  const [homebarHeight, setHomebarHeight] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    if(!homebar?.current)return;
    setHomebarHeight(homebar?.current.clientHeight)
  }, [children])
  return (
    loading ? <Loader color="#000" />
    : <div className={`min-h-screen ${className}`} style={{paddingBottom:homebarHeight}}>
      {children}
      <div className="fixed bottom-0 left-0 w-full bg-zinc-100 border-t border-zinc-300 flex items-center text-[10px] z-10" ref={homebar}>
        <button className="w-full flex flex-col justify-center items-center py-3" onClick={() => navigate('/',{state: {tab:1}})}>
          <AiOutlineHome size={24} />
          HOME
        </button>
        <button className="w-full flex flex-col justify-center items-center" onClick={() => navigate('/style',{state: {tab:1}})}>
          <PiNewspaperClippingBold size={24} />
          STYLE
        </button>
        <button className="w-full flex flex-col justify-center items-center" onClick={() => navigate('/shop',{state: {tab:1}})}>
          <TbShoppingBagSearch size={24} />
          SHOP
        </button>
        <button className="w-full flex flex-col justify-center items-center">
          <BiBookmark size={24} />
          SAVED
        </button>
        <button className="w-full flex flex-col justify-center items-center">
          <LuUserCircle size={24} />
          MY
        </button>
      </div>
    </div>
  )
}
