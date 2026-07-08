import { useEffect, useRef, useState } from 'react'
import { GAMES_BATCH_SIZE } from '@/shared/config/constants'

interface UseInfiniteScrollParams {
  totalItems: number
  batchSize?: number
  resetKey?: string
}

interface UseInfiniteScrollResult {
  visibleCount: number
  sentinelRef: React.RefObject<HTMLDivElement | null>
  hasMore: boolean
}

export const useInfiniteScroll = ({
  totalItems,
  batchSize = GAMES_BATCH_SIZE,
  resetKey = '',
}: UseInfiniteScrollParams): UseInfiniteScrollResult => {
  const [visibleCount, setVisibleCount] = useState(batchSize)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setVisibleCount(batchSize)
  }, [batchSize, resetKey, totalItems])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || visibleCount >= totalItems) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + batchSize, totalItems),
          )
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0,
      },
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [batchSize, totalItems, visibleCount])

  return {
    visibleCount,
    sentinelRef,
    hasMore: visibleCount < totalItems,
  }
}
