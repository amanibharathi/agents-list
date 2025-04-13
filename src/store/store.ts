import { create } from "zustand";

const initialState = {
  token: "",
  userData: null,
};

const useAppStore = create((set) => ({
  ...initialState,

  setToken: (data: string) => {
    set({ token: data });
  },
  setUserData: (data: unknown) => {
    set({ userData: data });
  },
  setUserDataAndTokenInStore: ({
    userData,
    token,
  }: {
    userData: unknown;
    token: string;
  }) => {
    set({ userData: userData, token: token });
  },
}));

export default useAppStore;
