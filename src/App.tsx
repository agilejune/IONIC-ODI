import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonToast, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import MainTabs from './pages/MainTabs';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/material-design-iconic-font/css/material-design-iconic-font.css';
import { AppContextProvider } from './data/AppContext';
import { connect } from './data/connect';
import { loadData, refreshWillSendCount, sendOfflineData, setServerMessage, setServerResStatus } from './data/data/data.actions';
import { useEffect } from 'react';
import React from 'react';
import { ConnectionStatus, Network } from '@capacitor/network';
import { setUsername, setUserData, setIsLoggedIn } from './data/user/user.actions';
import { getUserData, setIsAuthenticated, setUserData as setUserDataStorage } from './data/storage';
import { putUserInfoInFormData } from './data/api';
import RedirectToLogin from './components/RedirectToLogin';

setupIonicReact();

interface OwnProps {
  authenticated: boolean;
}

const App: React.FC<OwnProps> = ({authenticated}) => {
  return (
    <AppContextProvider>
      <OdiAppConnected authenticated={authenticated}/>
    </AppContextProvider>
  );
};

interface StateProps {
  responseStatus: string;
  message: string;
}

interface DispatchProps {
  loadData: typeof loadData;
  refreshWillSendCount: typeof refreshWillSendCount;
  sendOfflineData: typeof sendOfflineData;
  setUserData: typeof setUserData;
  setUsername: typeof setUsername;
  setIsLoggedIn: typeof setIsLoggedIn;
  setServerMessage: typeof setServerMessage;
  setServerResStatus: typeof setServerResStatus;
}

const OdiApp: React.FC<StateProps & DispatchProps & OwnProps> = ({setServerMessage, setServerResStatus, responseStatus, message, authenticated, setIsLoggedIn, loadData, refreshWillSendCount, sendOfflineData, setUsername,  setUserData: setUserDataAction }) => {

  const getCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
  
    return status.connected;
  };

  const onNetWorkStatus = (status: ConnectionStatus) => {
    console.log('Network status changed', status);
    
    if (status.connected) {
      sendOfflineData(); 
    }
    else {
      refreshWillSendCount();
    }
  }

  const checkNetWorkAndSend = async () => {
    const online = await getCurrentNetworkStatus();

    if (online) 
      sendOfflineData(); 
  }

  const setUserDataFromStorage = async () => {
    const userData = await getUserData();
    setUserDataAction(userData);
    setUserDataStorage(userData);
    putUserInfoInFormData(userData);
    setUsername(userData.user_name);
  }

  useEffect(() => {
    Network.addListener("networkStatusChange", onNetWorkStatus);
    
    refreshWillSendCount();
    
    checkNetWorkAndSend();
    
    if(authenticated) {
      setIsLoggedIn(true);
      setUserDataFromStorage();
      loadData();
    }
  }, [authenticated]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/tabs" render={() => <MainTabs />} />
            <Route path="/login" component={ Login } />
            <Redirect from="/" to={authenticated ? "/tabs/delivery" : "/login"} exact />
            <Route path="/logout" render={() => {
              return <RedirectToLogin
                setIsLoggedIn={setIsLoggedIn}
                setUserData={setUserData}
                setIsAuthenticated={setIsAuthenticated}
              />;
            }} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      <IonToast
        cssClass={responseStatus == "S" ? "success-toast" : responseStatus == "E" ? "fail-toast" : ""}
        isOpen={message !== "" && responseStatus !==""}
        message={message}
        duration={5000}
        onDidDismiss={() => { setServerMessage(""); setServerResStatus("")}}
      />
    </IonApp>
  );
}
export default App;

const OdiAppConnected = connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    message: state.data.message,
    responseStatus: state.data.responseStatus,
  }),
  mapDispatchToProps: {
    loadData,
    sendOfflineData,
    refreshWillSendCount,
    setUserData,
    setUsername,
    setIsLoggedIn,
    setServerMessage,
    setServerResStatus
  },
  component: OdiApp
})