import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
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
import { AppContextProvider } from './data/AppContext';
import { connect } from './data/connect';
import { loadData, refreshWillSendCount, sendOfflineData } from './data/delivery/delivery.actions';
import { useEffect } from 'react';
import React from 'react';
import { ConnectionStatus, Network } from '@capacitor/network';

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

}

interface DispatchProps {
  loadData: typeof loadData;
  refreshWillSendCount: typeof refreshWillSendCount;
  sendOfflineData: typeof sendOfflineData;
}

const OdiApp: React.FC<StateProps & DispatchProps & OwnProps> = ({authenticated, loadData, refreshWillSendCount, sendOfflineData }) => {

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

  useEffect(() => {
    Network.addListener("networkStatusChange", onNetWorkStatus);
    
    refreshWillSendCount();
    
    checkNetWorkAndSend();
    
    if(authenticated) {
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
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;

const OdiAppConnected = connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: () => ({
  }),
  mapDispatchToProps: {
    loadData,
    sendOfflineData,
    refreshWillSendCount
  },
  component: OdiApp
})