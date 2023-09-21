

export default function Tabs({tabs, current, onClick, value, type = 'default'}) {
  return (
    <div className={`flex items-center overflow-auto scroll-m-0 scroll-p-0 ${type === 'button' ? 'gap-2 text-[13px] py-3 px-4 border-b border-gray-100':' text-[15px]'}`} style={type === 'button' ? {
        
    } : {
        boxShadow:'inset 0 -1px 0 0 #e5e5e5'
    }}>
        {tabs.map(tab => (
            <button key={tab.id} className={`${type === 'button'?'border rounded-s-full rounded-e-full py-1 px-3':'border-b-2 py-2 px-4 w-full'} whitespace-nowrap ${current === tab.id ? (type === 'button' ?'border-black bg-black text-white' :'border-black'): (type === 'button' ?'border-gray-200 text-gray-500' :'border-transparent')}`} onClick={() => {
                onClick && onClick(...value.map(v => tab[v]))
            }} 
                style={{color: tab.font_color || ''}}
            >
                {tab.name}
            </button>
        ))}
    </div>
  )
}
 