import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function Back({title, extra}) {
    const navigate = useNavigate()
  return (
    <div className='fixed top-0 left-0 w-full z-10 border-b border-gray-100 bg-white p-4 text-[16px] font-bold text-center'>
        <button onClick={() => navigate(-1)} className='absolute top-0 left-0 flex items-center px-4 h-full aspect-square'>
            <FiArrowLeft size={24} />
        </button>
        {title}
        {extra && extra}
    </div>
  )
}
