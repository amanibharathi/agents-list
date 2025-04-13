// @ts-nocheck

import { create } from 'zustand'

const mapViewportBoundsDefaultValue = {
  north: null,
  east: null,
  south: null,
  west: null,
}

const listMapState = {
  isPolygonOutlineRemoved: false,
  removeOulineFlag: false,
  mapViewportBounds: mapViewportBoundsDefaultValue,
  isDrawEnabled: false,
  globalDrawPolyline: null,
  handleRemoveGlobalOutline: () => undefined,
}

const useListMapStore: any = create((set) => ({
  ...listMapState,
  //Actions
  setMapViewportBounds: (bounds: {
    north: number
    east: number
    south: number
    west: number
  }) =>
    set(() => ({
      mapViewportBounds: bounds,
    })),
  toggleisPolygonOutlineRemoved: () =>
    set((state) => ({
      isPolygonOutlineRemoved: !state.isPolygonOutlineRemoved,
    })),
  setIsPolygonOutline: (value) =>
    set(() => ({
      isPolygonOutlineRemoved: value,
    })),
  toggleOutlineFlag: () =>
    set((state) => ({
      removeOulineFlag: !state.removeOulineFlag,
    })),
  resetOutlineValues: () => {
    set(() => ({
      isPolygonOutlineRemoved: false,
      removeOulineFlag: false,
    }))
  },
  enableDrawFeature: () => {
    set(() => ({
      isDrawEnabled: true,
    }))
  },
  disableDrawFeature: () => {
    set(() => ({
      isDrawEnabled: false,
    }))
  },
  setGlobalDrawPolyline: (value) => {
    set(() => ({
      globalDrawPolyline: value,
    }))
  },
  setHandleRemoveGlobalOutline: (value) => {
    set(() => ({
      handleRemoveGlobalOutline: value,
    }))
  },
}))

export { useListMapStore, mapViewportBoundsDefaultValue }
