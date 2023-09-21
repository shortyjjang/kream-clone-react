import React, { useEffect, useRef, useState } from 'react'

export default function Dropdown({children, header, className = ''}) {
    const [open, setOpen] = useState(false)
    const openBtn =useRef(null)
    const dropdown = useRef(null)
    useEffect(() => {
      if(!dropdown?.current) return;
      dropdown.current.addEventListener('click', () => setOpen(false))
    },[open])
  return (
    <div className={`relative ${className}`}>
        <button ref={openBtn} onClick={() => setOpen(!open)}>{header}</button>
        {open && <>
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-20' onClick={() => setOpen(false)}/>
          <div className='fixed bottom-0 left-0 w-full bg-white flex flex-col rounded-t-2xl z-20' ref={dropdown}>{children}</div>
        </>}
    </div>
  )
}
