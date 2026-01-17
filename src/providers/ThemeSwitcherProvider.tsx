import { useEffect, type PropsWithChildren } from "react";
import useAppearance from "../hooks/useAppearance";

type ThemeSwitcherProviderProps = PropsWithChildren;

function ThemeSwitcherProvider({ children }: ThemeSwitcherProviderProps) {
  const [appearance] = useAppearance();

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(appearance);
  }, [appearance]);

  return children;
}

export default ThemeSwitcherProvider;
