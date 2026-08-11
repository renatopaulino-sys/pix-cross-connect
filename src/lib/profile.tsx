import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ProfileMode = "merchant" | "admin";

type Ctx = { mode: ProfileMode; setMode: (m: ProfileMode) => void; toggle: () => void };

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ProfileMode>("merchant");

  useEffect(() => {
    const saved = window.localStorage.getItem("cruziapay-profile");
    if (saved === "admin" || saved === "merchant") setModeState(saved);
  }, []);

  const setMode = (m: ProfileMode) => {
    setModeState(m);
    window.localStorage.setItem("cruziapay-profile", m);
  };

  return (
    <ProfileContext.Provider value={{ mode, setMode, toggle: () => setMode(mode === "admin" ? "merchant" : "admin") }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}