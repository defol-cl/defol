import React, { useState } from 'react';
import { PublicContext, PublicContextProps, PublicContextState } from "./public.context";

const PublicLayout: React.FC = ({ children }) => {
  const [contextState, setContextState] = useState<PublicContextState>({});
  const setUsername = (username: string) => setContextState({ ...contextState, username });
  const setCognitoUser = (cognitoUser: any) => setContextState({ ...contextState, cognitoUser });
  const clearUsername = () => setContextState({ cognitoUser: contextState.cognitoUser });
  const clearCognitoUser = () => setContextState({ username: contextState.username });
  
  const context: PublicContextProps = {
    state: contextState,
    setUsername, setCognitoUser, clearUsername, clearCognitoUser
  };
  
  return (
    <div className="public-layout">
      <PublicContext.Provider value={context}>
        {children}
      </PublicContext.Provider>
    </div>
  );
};

export default PublicLayout;
