import { create } from 'zustand'

const useShowFooterBlock = create((set) => ({
  blockVisible: true,
  hideBlock: () => set(() => ({ blockVisible: false })),
  showBlock: () => set(() => ({ blockVisible: true })),
}))

export { useShowFooterBlock }
