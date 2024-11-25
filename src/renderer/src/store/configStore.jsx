import { create } from "zustand";

let inicialState = {
    theme: "light",
};

const configStore = create((set) => ({
    ...inicialState,
    setState: (data) => set((state) => ({
        ...state,
        ...data,
    })),
    resetState: () => set(() => ({
        ...inicialState,
    })),
}));

export default configStore;
