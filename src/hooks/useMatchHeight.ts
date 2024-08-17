import { useEffect, useState, useRef, useCallback, RefObject, createRef } from 'react'

export const useMatchHeight = (
  elementLength: number
) => {
  const [height, setHeight] = useState<number | null>(null)
  const refsArray = useRef<RefObject<HTMLDivElement>[]>([])
  const countArray = Array.from(new Array(elementLength), (_) => '')

  countArray.forEach((_, index) => {
    refsArray.current[index] = createRef<HTMLDivElement>()
  })

  const adjustContentHeight = useCallback((remedyHeight?: number) => {
    if (remedyHeight) {
      setHeight(remedyHeight)
      return
    }

    let maxHeight = 0
    refsArray.current.forEach((ref) => {
      const itemHeight = ref.current?.getBoundingClientRect().height
      if (itemHeight && maxHeight < itemHeight) maxHeight = itemHeight
    })
    if (maxHeight > 0) setHeight(maxHeight)
  }, [refsArray])

  useEffect(() => {
    adjustContentHeight()
    window.addEventListener('resize', () => adjustContentHeight)
    return () => {
      window.removeEventListener('resize', () => adjustContentHeight)
    }
  }, [adjustContentHeight])

  return {
    height,
    refsArray,
    adjustContentHeight
  }
}
