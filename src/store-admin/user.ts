// @ts-nocheck

import { create } from 'zustand'

const initialState = {
  user_token: '',
  user_type: null,
  user_data: null,
  isLoginModalOpen: false,
  loginModalInfo: {
    type: 'userLogin',
  },
  globalSelectValue: null,
  pausedAction: null,
  multiSelectValue: {
    label: '',
    value: '',
    polygon_id: '',
  },
  formBuilderCurField: [],
  tools_mandatory: '',
  sponsors: [],
  isFounderVideoOpen: false,
  isContractModalOpen: false,
  agentRoles: null,
  adminRoles: null,
}

const useAppStore: any = create((set) => ({
  ...initialState,
  //Actions
  setUserToken: ({ token }: { token: string }) =>
    set(() => ({
      user_token: token,
    })),
  setUserDataAndToken: ({
    user_data,
    token,
  }: {
    token: string
    user_data: unknown
  }) =>
    set(() => ({
      user_data: user_data,
      user_token: token,
    })),
  setUserRoles: ({
    agentRoles,
    adminRoles,
  }: {
    agentRoles: unknown
    adminRoles: unknown
  }) =>
    set(() => ({
      adminRoles,
      agentRoles,
    })),

  clearUserDataAndToken: () =>
    set(() => ({
      user_token: '',
      user_type: null,
      user_data: null,
    })),
  setUserType: ({ user_type }: { user_data: unknown }) =>
    set(() => ({
      user_type,
    })),
  setOpenLoginModal: () =>
    set(() => ({
      isLoginModalOpen: true,
    })),
  setCloseLoginModal: () =>
    set(() => ({
      isLoginModalOpen: false,
    })),
  setLoginModalInfo: ({ type }: { type: string }) =>
    set(() => ({
      loginModalInfo: { type },
    })),
  setGlobalSelectValue: (value: any) =>
    set(() => ({
      globalSelectValue: value,
    })),
  setPausedAction: (action: any) => set({ pausedAction: action }),
  clearPausedAction: () => set({ pausedAction: null }),
  setMultiSelectValue: (value: any) => {
    set(() => ({
      multiSelectValue: value.map((each) => ({
        label: each?.identity,
        value: each?.identity,
        polygon_id: each?.polygon_id,
        type: each?.type,
        identity: each?.identity,
        state_code: each?.state_code,
        place: each?.place,
      })),
    }))
  },
  setFormBuilderCurField: (value) => {
    set(() => ({ formBuilderCurField: value }))
  },
  setToolsMandatory: (value: string) =>
    set(() => ({
      tools_mandatory: value,
    })),
  setSponsors: (value: any) =>
    set(() => ({
      sponsors: value,
    })),
  setFounderVideo: (value: boolean) =>
    set(() => ({
      isFounderVideoOpen: value,
    })),
  setContractModal: (value: boolean) =>
    set(() => ({
      isContractModalOpen: value,
    })),
}))

export { useAppStore }
