import * as React from 'react'
import { memo, forwardRef } from 'react'

import 'swiper/css'
import 'swiper/css/virtual'

import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'


interface RefProps {
  children?: Array<React.ReactNode>
  initialSlide?: number
  onSlideChange?: () => void
  onSwiper?: (_swiper?: any) => void
  onReachBeginning?: (_swiper?: any) => void
  onReachEnd?: (_swiper?: any) => void
}

export const SwipeComponent = memo(forwardRef(
  function RefComponent (
    {
      children,
      initialSlide = 0,
      onSlideChange,
      onSwiper,
      onReachBeginning,
      onReachEnd
    }: RefProps,
    ref?: React.Ref<SwiperRef>
  ): JSX.Element {
  return (
    <Swiper
      grabCursor={true}
      initialSlide={initialSlide}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
      onReachBeginning={onReachBeginning}
      onReachEnd={onReachEnd}
      setWrapperSize={true}
      style={{ alignItems: 'stretch' }}
      virtual={false}
      ref={ref}
    >
      {children?.map((child, index) => (
        <SwiperSlide
          style={{ height: 'auto' }}
          key={index}
          virtualIndex={1}
        >{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}))


SwipeComponent.displayName = 'SwipeComponent'
