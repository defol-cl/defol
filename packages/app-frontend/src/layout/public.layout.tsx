import React, { useState } from 'react';
import { PublicContext, PublicContextProps, PublicContextState } from "./public.context";
import Box from "@mui/material/Box";

const PublicLayout: React.FC = ({ children }) => {
  const [contextState, setContextState] = useState<PublicContextState>({ });
  const setUsername = (username: string) => setContextState({ username });
  const clear = () => setContextState({ });
  
  const context: PublicContextProps = {
    state: contextState,
    setUsername, clear
  };
  
  return (
    <Box className="public-layout" sx={{minHeight: 700}}>
      <PublicContext.Provider value={context}>
        {children}
      </PublicContext.Provider>
    </Box>
  );
};

export default PublicLayout;
