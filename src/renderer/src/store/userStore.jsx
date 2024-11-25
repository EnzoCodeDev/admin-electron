import { create } from "zustand";

let inicialState = {
  login: false,
  expire_token: 0,
  typeUser: '',
  user: {},
  token: '',
  token_type: '',
};

const userStore = create((set) => ({
  ...inicialState,
  setState: (data) => set((state) => ({
    ...state,
    ...data,
  })),
  resetState: () => set(() => ({
    ...inicialState,
  })),
}));

export default userStore;
