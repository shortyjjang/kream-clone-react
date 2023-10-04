import { useLocation, useNavigate, useParams } from "react-router-dom"
import Input from "../form/Input"
import Tabs from "../Tabs"
import { useEffect, useRef } from "react"

export default function Header({tabs = null, search = false, setPaddingTop, sub_group_list = null, menu = null}) {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const header = useRef(null)
  const current = useLocation().state?.tab || 1
  const currentGroup = useLocation().state?.sg || -1
   const onSearch = (keyword) => {

   }
   useEffect(() => {
       if(header?.current) setPaddingTop(header?.current.clientHeight)
   }, [setPaddingTop, location])
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-10" ref={header}>
        <div className="flex justify-between items-center pb-2 px-4 pt-4">
            {search ? <Input onSubmit={onSearch} placeholder="브랜드, 상품, 프로필, 태그 등" className='bg-gray-100 rounded-md w-full px-4 py-3 text-[16px]' defaultVlaue={params?.keyword} /> 
            : <h1>Header</h1> }
            {menu}
        </div>
        {tabs && tabs.length > 0 &&  <Tabs tabs={tabs} current={current} value={['redirect_web_url', 'id']} onClick={(url, id) => navigate(
          url ? url
            : location.pathname 
          , url ? {}
          :{
            state: sub_group_list 
            ? {tab: id, sg: currentGroup}
            : {tab: id}
          }
        )} />}
        {sub_group_list && sub_group_list.length > 0 && <Tabs type="button" tabs={sub_group_list} current={currentGroup} value={['id']} onClick={(id) => navigate( location.pathname , {state: {
            tab: current,
            sg: id
        }})} />}
    </div>
  )
}
