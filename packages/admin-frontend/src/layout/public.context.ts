import { createContext } from "react";

export interface PublicContextState {
  username?: string
  cognitoUser?: any
}

export interface PublicContextProps {
  state: PublicContextState
  setUsername: (username: string) => void
  setCognitoUser: (user: any) => void
  clearUsername: () => void
  clearCognitoUser: () => void
}

export const PublicContext = createContext<PublicContextProps>({
  state: {},
  setUsername: () => {
  },
  setCognitoUser: () => {
  },
  clearUsername: () => {
  },
  clearCognitoUser: () => {
  }
})
