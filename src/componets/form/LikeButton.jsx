import { PiHeartLight } from "react-icons/pi"

export default function LikeButton({withText = false, count = 0, className = '', size = 0}) {
  return (
    <button className={`inline-flex gap-1 items-center ${className}`}>
        {size > 0 && <PiHeartLight size={size} />}
        {withText && <span>좋아요</span>}
        {count > 0 && count}
    </button>
  )
}
