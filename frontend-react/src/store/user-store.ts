import { create } from "zustand";
import { config } from "../config";
import { persist } from "zustand/middleware";

interface AuthStore {
    token: string | null,
    // isAuth: boolean,
    login: (token: string) => void,
    logout: () => void,
}

interface User {
    id: string,
    name: string,
    email: string,
};

interface UserStore {
    user: User | null,
    updateUserData: (user: User) => void,
}

export const useTokenStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            login: (token: string) => set({
                token,
            }),
            logout: () => set({
                token: null,
            })
        }),
        {
            name: 'token'
        }
    )
);

export const useUserStore = create<UserStore>((set) => {
    return {
        user: null,
        updateUserData: (user: User) => set(() => ({ user: user })),
    }
})

export async function updateUserStore() {
    const getMeResponse = await fetch(`${config.backendApiUrl}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${useTokenStore.getState().token}`,
        },
    });

    if (getMeResponse.ok) {
        const userData: User = await getMeResponse.json();

        useUserStore.getState().updateUserData(userData);
    }
}