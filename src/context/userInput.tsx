import { createContext, useContext, useState } from "react";

const initialValue = {
  speed: 0,
  depth: 0,
  stroke: 0,
  sensation: 0,
};

export type UserInput = typeof initialValue;

type UserInputContextType = [
  value: UserInput,
  setValue: (newValue: Partial<UserInput>) => void,
];

const UserInputContext = createContext<UserInputContextType | null>(null);

export function SharedValueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(initialValue);

  const updateValue = (newValue: Partial<typeof initialValue>) => {
    setValue((prev) => ({ ...prev, ...newValue }));
  };

  return (
    <UserInputContext.Provider value={[value, updateValue]}>
      {children}
    </UserInputContext.Provider>
  );
}

export function useUserInput() {
  const context = useContext(UserInputContext);

  if (!context) {
    throw new Error("useUserInput must be used within a SharedValueProvider");
  }

  return context;
}
