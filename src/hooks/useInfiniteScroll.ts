import { useEffect, useRef, useState } from 'react'

const BATCH_SIZE = 45

export const useInfiniteScroll = (
  totalItems: number,
  resetKey: string,
) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setVisibleCount(BATCH_SIZE)
  }, [resetKey, totalItems])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || visibleCount >= totalItems) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + BATCH_SIZE, totalItems),
          )
        }
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [totalItems, visibleCount])

  return {
    visibleCount,
    sentinelRef,
    hasMore: visibleCount < totalItems,
  }
}
