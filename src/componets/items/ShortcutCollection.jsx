import React from 'react'
import RatioImage from '../RatioImage'
import { useNavigate } from 'react-router-dom'

export default function ShortcutCollection({collection}) {
  const navigate = useNavigate()
  return (
    <button key={collection.id} onClick={() => navigate(collection.destination_url)} 
    className=' inline-flex flex-col gap-1 text-[12px] items-center'>
        <RatioImage {...collection} className="aspect-square rounded-full" contain={true} />
        {collection.title}
    </button>
  )
}
