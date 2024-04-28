import * as React from 'react'
import { memo, forwardRef } from 'react'

import 'swiper/css'
import 'swiper/css/virtual'
import 'swiper/css/navigation'

import styled from 'styled-components'
import { Pagination } from 'swiper/modules'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'


const StyledSwiper = styled(Swiper)`
  .swiper-pagination {
    display: flex;
    justify-content: space-around;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }

  .swiper-pagination-bullet {
    color: #fff;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    opacity: 1;
    text-align: center;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.24);
    border-bottom: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 5px;

    &:not(:first-child) {
      border-left: 1px solid rgba(255, 255, 255, 0.24);
    }
  }

  .swiper-pagination-bullet-active {
    background: #007aff;
    color: #fff;
  }
`
interface RefProps {
  children?: Array<React.ReactNode>
  initialSlide?: number
  onSlideChange?: () => void
  onSwiper?: (_swiper?: any) => void
  onReachBeginning?: (_swiper?: any) => void
  onReachEnd?: (_swiper?: any) => void
  pagination?: any
  loop?: boolean
  navigation?: boolean
}

export const SwipeComponent = memo(forwardRef(
  function RefComponent (
    {
      children,
      initialSlide = 0,
      onSlideChange,
      onSwiper,
      onReachBeginning,
      onReachEnd,
      pagination,
      loop = true,
      navigation = false
    }: RefProps,
    ref?: React.Ref<SwiperRef>
  ): JSX.Element {
  return (
    <StyledSwiper
      navigation={navigation}
      loop={loop}
      pagination={pagination}
      modules={[Pagination, Navigation]}
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
    </StyledSwiper>
  )
}))


SwipeComponent.displayName = 'SwipeComponent'
