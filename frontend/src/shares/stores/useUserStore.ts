import { create } from "zustand";

export interface User {
    id: number
    fullName: string
    email: string
    password: string | null
    googleId: string
    picture: string
    createdAt: string
    updatedAt: string
}

export interface UserStore {
    doingLogin: boolean;
    user: User | null;
    checkLogin:  () => Promise<User | null>;
    logout: () => void;
}

const getInitialUser = () => {
    const userLocal = localStorage.getItem("user")
    return userLocal ? JSON.parse(userLocal) : null
}

const getInitialDoingLogin = () => {
    const doingLoginLocal = localStorage.getItem("doingLogin")
    return doingLoginLocal ? JSON.parse(doingLoginLocal) : false
}

const verifyLogin = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data : User | null = await response.json()
    return data?.id? data : null
}

export const useUserStore = create<UserStore>((set) => ({
    doingLogin: getInitialDoingLogin(),
    user: getInitialUser(),
    checkLogin: async () => {
        const data = await verifyLogin();
        set({ user: data, doingLogin: false });

        chrome?.storage?.sync?.set({ user: data });
        window.localStorage.setItem("user", JSON.stringify(data));

        chrome?.storage?.sync?.set({ isLoggingIn: false });
        window.localStorage.setItem("isLoggingIn", JSON.stringify(false));
        return data;
    },
    logout: () => {
        set({ user: null, doingLogin: false });
        chrome?.storage?.sync?.set({ user: null });
        window.localStorage.removeItem("user");

        chrome?.storage?.sync?.set({ isLoggingIn: false });
        window.localStorage.setItem("isLoggingIn", JSON.stringify(false));

        fetch("http://localhost:5000/api/v1/auth/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
    },
}));

