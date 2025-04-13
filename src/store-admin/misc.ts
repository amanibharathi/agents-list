import { create } from 'zustand'

type modalStoreType = {
  isModalOpen: boolean
  toggleModalState: () => void
  openModalState: () => void
  closeModalState: () => void
  selectedImageIndex: number
  setSelectedImageIndex: (x: number) => void
}

export const useBackdropImageSliderStore = create<modalStoreType>((set) => ({
  isModalOpen: false,
  toggleModalState: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  openModalState: () => set(() => ({ isModalOpen: true })),
  closeModalState: () => set(() => ({ isModalOpen: false })),
  selectedImageIndex: 0,
  setSelectedImageIndex: (index: number) =>
    set(() => ({ selectedImageIndex: index })),
}))
