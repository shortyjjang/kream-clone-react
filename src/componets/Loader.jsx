import React from 'react'

export default function Loader({scale = 1, color = 'black'}) {
    const loadingStyle = {
        animation: 'lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        transformOrigin: '40px 40px'
    }
    const LoadingDot = ({delay, top, left}) => (
        <div style={{...loadingStyle, animationDelay: delay }}>
            <div className="absolute w-[7px] h-[7px] rounded-full bg-white -translate-x-1/2 -translate-y-1/2" style={{top:top, left:left, background:color}}></div>
        </div>
    )
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] aspect-square" style={{transform: `translate(var(--tw-translate-x), var(--tw-translate-y)) scale(${scale})`}}>
      <LoadingDot delay="-0.036s" top="63px" left="63px"/>
      <LoadingDot delay="-0.072s" top="68px" left="56px"/>
      <LoadingDot delay="-0.108s" top="71px" left="48px"/>
      <LoadingDot delay="-0.144s" top="72px" left="40px"/>
      <LoadingDot delay="-0.18s" top="71px" left="32px"/>
      <LoadingDot delay="-0.216s" top="68px" left="24px"/>
      <LoadingDot delay="-0.252s" top="63px" left="17px"/>
      <LoadingDot delay="-0.288s" top="56px" left="12px"/>
    </div>
  )
}
