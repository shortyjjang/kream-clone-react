import React, { useState } from 'react'

export default function Input({type = 'text', className = '', onChange, onSubmit, placeholder = '', defaultValue = ''}) {
    const [value, setValue] = useState(defaultValue)
  return (
    <input type={type} value={value} placeholder={placeholder} onKeyDown={e => e.key === 'Enter' && onSubmit && onSubmit(value)}
    onChange={(e) => {
        setValue(e.target.value)
        onChange && onChange(e.target.value)
    }} className={className} />
  )
}
