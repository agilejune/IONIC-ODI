import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setUserData: Function;
  setIsAuthenticated: Function;
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUserData, setIsAuthenticated }) => {
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setUserData(undefined);
    ionRouterContext.push('/login')
  }, [setIsLoggedIn, setUserData, ionRouterContext]);
  return null;
};

export default RedirectToLogin;
