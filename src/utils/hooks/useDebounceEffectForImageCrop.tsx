import { useEffect, DependencyList } from 'react'

export function useDebounceEffectForImageCrop(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(
      () =>
        // eslint-disable-next-line prefer-spread
        //@ts-ignore
        // eslint-disable-next-line prefer-spread
        fn.apply(undefined, deps),
      waitTime
    )

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
