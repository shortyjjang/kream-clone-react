import dayjs from 'dayjs'
import React from 'react'

export default function CreatedTime({created, className = ''}) {
  return (
    <span className={className}>
        {dayjs().diff(dayjs(created), 'year') > 0 ? dayjs().diff(dayjs(created), 'year') + '분 전'
        : dayjs().diff(dayjs(created), 'month') > 0 ? dayjs().diff(dayjs(created), 'month') + '월 전'
        : dayjs().diff(dayjs(created), 'day') > 0 ? dayjs().diff(dayjs(created), 'day') + '일 전'
        : dayjs().diff(dayjs(created), 'hour') > 0 ? dayjs().diff(dayjs(created), 'hour') + '시간 전'
        : dayjs().diff(dayjs(created), 'minute') + '분 전'}
    </span>
  )
}
