import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserType = {
  username: string;
  token: string;
};

type UserStore = {
  user: UserType;
  setUser: (newUsername: UserType) => void;
  clearUsername: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        username: "",
        token: "",
      },

      setUser: (newUsername: UserType) => set({ user: newUsername }),
      clearUsername: () =>
        set({
          user: {
            username: "",
            token: "",
          },
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
