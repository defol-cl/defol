import { createContext } from "react";

export interface PublicContextState {
  username?: string
}

export interface PublicContextProps {
  state: PublicContextState
  setUsername: (username: string) => void
  clear: () => void
}

export const PublicContext = createContext<PublicContextProps>({
  state: {},
  setUsername: () => {
  },
  clear: () => {
  }
})
