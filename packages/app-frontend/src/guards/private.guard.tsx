import React from 'react';
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { publicRoutes } from '../navigation';

const PrivateGuard: React.FC = ({ children }) => {
  const history = useHistory();
  
  Auth.currentAuthenticatedUser()
    .catch(() => {
      history.replace(publicRoutes.ingreso.route());
    })
  
  return <>{children}</>;
};

export default PrivateGuard;
