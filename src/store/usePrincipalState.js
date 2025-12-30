import { create } from "zustand";

export const usePrincipalState = create((set, get) => ({
    isLoggedIn: false,
    principal: null,
    loading: true,
    login: (userData) => set({ isLoggedIn: true, principal: userData }),
    logout: () => {
        localStorage.removeItem("AccessToken");
        set({ isLoggedIn: false, principal: null });
        window.location.href = "/auth/signin";
    },
    setLoading: (isLoading) =>
        set({
            isLoggedIn: get().isLoggedIn, // 현재 상태 받아옴
            principal: get().principal, // 현재 상태 받아옴
            loading: isLoading,
        }),
}));
