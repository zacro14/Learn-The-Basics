import create from 'zustand';

type AuthState = {
    auth: {
        id: string | null;
        username: string | null;
        role: string | null;
    };

    setAuth: (user: { id: string; username: string; role: string }) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
    auth: {
        id: null,
        username: null,
        role: null,
    },

    setAuth: (user) => set(() => ({ auth: user })),
}));
