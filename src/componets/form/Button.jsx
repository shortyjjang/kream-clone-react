import React from 'react'

export default function Button({
    type = 'button',
    style = 'default', // default, primary, secondary, danger
    size = 'default', // default, small, large
    onClick,
    className = '',
    children
}) {
  return (
    <button type={type} onClick={onClick} className={(` 
        ${size === 'small' ? 'text-[12px] rounded-sm px-3 py-1' : size === 'large' ? 'px-6 py-4 rounded-lg' :'px-4 py-2 rounded-md'}
        ${style === 'primary' ? 'bg-black text-white':'bg-white text-black border border-black border-opacity-60'}
        ${className}
    `)}>
        {children}
    </button>
  )
}