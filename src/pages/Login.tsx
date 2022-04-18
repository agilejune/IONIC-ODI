import React, { useEffect, useState } from 'react';
import { IonIcon, IonContent, IonPage,  IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonSpinner } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername, setUserData, setLoading } from '../data/user/user.actions';
import { doAuthenticate } from '../data/api';
import { setUserData as setUserDataStorage } from '../data/storage';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { eyeOffOutline, eyeOutline, personOutline, lockClosedOutline, enterOutline } from 'ionicons/icons';
import { loadData } from '../data/delivery/delivery.actions';
import { useTranslation } from "react-i18next";
import { getIsAuthenticated, setIsAuthenticated } from '../data/storage';

interface OwnProps extends RouteComponentProps {}


interface DispatchProps {
  setLoading: typeof setLoading;
  setUsername: typeof setUsername;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUserData: typeof setUserData;
  loadData: typeof loadData;
}

interface StateProps {
  isLoading: boolean;
}

interface LoginProps extends OwnProps, StateProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({isLoading, history, loadData, setUsername: setUsernameAction, setIsLoggedIn, setUserData: setUserDataAction, setLoading}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [t, i18n] = useTranslation('common');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      setLoading(true);

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const userData = await doAuthenticate(formData);
      
      const isAuthenticated = !!userData;
      
      if (!isAuthenticated) {
        await setIsLoggedIn(false);
        history.push('/login', {direction: 'none'});
      }
      else {        
        await setIsLoggedIn(true);
        await setIsAuthenticated(true);
        setUserDataAction(userData);
        setUserDataStorage(userData);
        await setUsernameAction(userData.user_name);
        history.push('/tabs/delivery', {direction: 'none'});
        await loadData();
      }
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const checkAuthenticated = async () => {
  //   const isAuthenticated = await getIsAuthenticated(); 
  //   console.log(isAuthenticated);
  //   if (isAuthenticated) {
  //     history.push('/tabs/delivery', {direction: 'none'});
  //     loadData();
  //   }
  // }

  // useEffect(() => {
  //   checkAuthenticated();
  // }, []);

  return (
    <IonPage id="login-page">
      <IonContent>
        <div className="login-logo">
          <img src="assets/img/logo.png" alt="Ionic logo" />
          <h4>{t('home.title')}</h4>
        </div>
        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem className="login-input">
              <IonLabel><IonIcon icon={personOutline}></IonIcon></IonLabel>
              <IonInput name="username" type="text" value={username} placeholder="User name" spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem className="login-input">
              <IonLabel><IonIcon icon={lockClosedOutline}></IonIcon></IonLabel>
              <IonInput name="password" type={showPassword ? "text" : "password"} value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
              <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} onClick={() => toggleShowPassword()}></IonIcon>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol className="ion-item-center">
              <IonButton type="submit" expand="block">
                { isLoading && <IonSpinner name="bubbles" color="light" /> }
                <IonIcon icon={enterOutline}></IonIcon>&nbsp;&nbsp;{t('home.login')}
              </IonButton>
            </IonCol>
            {/* <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol> */}
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, { }, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    isLoading: state.user.loading
  }),
  mapDispatchToProps: {
    setUsername,
    setIsLoggedIn,
    setUserData,
    setLoading,
    loadData,
  },
  component: Login
})