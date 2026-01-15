import { useEffect, useState } from "react";

type Appearance = 'dark' | 'light';

function useAppearance() {
    const initialAppearance = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const [appearance, setAppearance] = useState<Appearance>(initialAppearance);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setAppearance(event.matches ? "dark" : "light");
        });
    }, []);

    return [appearance, setAppearance] as const;
}

export default useAppearance