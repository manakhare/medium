import { atom } from "recoil";

export const userNameAtom = atom({
    key: "userName",
    default: {
        name: "Anomymous"
    }
})


export const isUserLoggedInAtom = atom({
    key: "isLoggedIn",
    default: {
        loggedIn: false
    }
})

// export const userEmailAtom = atom({
//     key: "userEmail",
//     default: {
//         email: ""
//     }
// })

export const userEmailAtom = atom({
    key: "userEmail",
    default: ""
})