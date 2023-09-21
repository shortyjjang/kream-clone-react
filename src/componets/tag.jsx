import React from 'react'

export default function Tag({className ='', background_color, tag_color, border_color, icon_url, tag}) {
  return (
    <span className={className} style={{
        backgroundColor: background_color,
        color: tag_color,
        borderColor: border_color ? border_color : background_color
    }}>
        {icon_url && <img src={icon_url} className='inline-block align-middle -mt-1 mr-1' alt={tag} />}
        {tag}
    </span>
  )
}
