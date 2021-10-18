import React, { useState } from 'react';
import { PublicContext, PublicContextProps, PublicContextState } from "./public.context";

const PublicLayout: React.FC = ({ children }) => {
  const [contextState, setContextState] = useState<PublicContextState>({ });
  const setUsername = (username: string) => setContextState({ username });
  const clear = () => setContextState({ });
  
  const context: PublicContextProps = {
    state: contextState,
    setUsername, clear
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
