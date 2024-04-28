import { useState } from 'react'

import domToImage from 'dom-to-image'

export const useCreateImage = (
  ImageRef: React.RefObject<HTMLDivElement>
) => {
  const [imageSrc, setImageSrc] = useState('')

  const createImage = async () => {
    const node = ImageRef.current
    if (!node) return
      // スケールを設定して高解像度で画像を生成
    const options = {
      style: {
        transform: 'scale(1)',  // 解像度を2倍に設定
        transformOrigin: 'top left'
      },
      quality: 1.0  // 最高品質に設定
    }

    try {
      const dataUrl = await domToImage.toPng(node, options)
      setImageSrc(dataUrl)
    } catch (err) {
        console.error('oops, something went wrong!', err)
    }
  }

  return {
    imageSrc,
    createImage
  }
}
