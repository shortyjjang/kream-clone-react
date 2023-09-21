import React from 'react'
import RatioImage from '../RatioImage'

export default function ShortcutCollection({collection}) {
  return (
    <button key={collection.id} className=' inline-flex flex-col gap-1 text-[12px] items-center'>
        <RatioImage {...collection} className="aspect-square rounded-full" contain={true} />
        {collection.title}
    </button>
  )
}
