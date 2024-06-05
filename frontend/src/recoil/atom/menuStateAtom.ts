import { atom } from "recoil";

export const menuStateAtom = atom({
    key: "menuState",
    default: {
        hidden: ''
    }
})