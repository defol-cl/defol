import React, { FC, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const TopBarUsuario: FC = () => {
  const [fullName, setFullName] = useState<string>();
  
  useEffect(() => {
    Auth.currentUserInfo()
      .then(info => {
        info && setFullName(`${info.attributes.given_name} ${info.attributes.family_name}`);
      })
  });
  
  return (
    <>
      <Button color='inherit' startIcon={<AccountBoxIcon/>}>
        {fullName}
      </Button>
    </>
  );
}

export default TopBarUsuario;
