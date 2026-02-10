"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "ja" | "en";

type LocaleContextType = {
  locale: Locale;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  toggleLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale");
    if (saved === "en" || saved === "ja") {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === "ja" ? "en" : "ja";
      localStorage.setItem("locale", next);
      return next;
    });
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
