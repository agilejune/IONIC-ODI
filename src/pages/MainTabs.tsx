import React, { useEffect, useRef, useState }  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, useIonRouter } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { archive, archiveOutline, basket, chatbox, pin, water } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';

import DeliveryPage from './Delivery';
import DeliveryDetail from './DeliveryDetail';
import OrderPage from './Order';
import FeedbackPage from './Feedback';
import TransportLossAllPage from './TransportLossAll';
import OrderDetail from './OrderDetail';
import TransportLossDetail from './TransportLossDetail';
import FeedbackDetail from './FeedbackDetail';
import ScanPage from './ScanPage';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {
  const location = useLocation();

  document.addEventListener('ionBackButton', (ev) => {
    (ev as CustomEvent).detail.register(140, () => {
      if (location.pathname !== '/tabs/delivery') {
        document.querySelectorAll('ion-tab-button').forEach(one => {
          one.classList.remove("tab-selected");
          one.removeAttribute("aria-selected");
        });
        document.getElementById('tab-button-delivery')!.click();
      }
      else
        App.exitApp();
    });
  });

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/delivery" />
        <Route path="/tabs/delivery" render={() => <DeliveryPage />} exact={true} />
        <Route path="/tabs/order" render={() => <OrderPage />} exact={true} />
        <Route path="/tabs/message" render={() => <FeedbackPage />} exact={true} />
        <Route path="/tabs/loss" render={() => <TransportLossAllPage />} exact={true} />
        <Route path="/tabs/scan_rqcode" render={() => <ScanPage />} exact={true} />
        
        <Route path="/tabs/delivery/:id" component={ DeliveryDetail } exact={true} />
        <Route path="/tabs/order/:id" component={ OrderDetail } exact={true} />
        <Route path="/tabs/loss/:id" component={ TransportLossDetail } exact={true} />
        <Route path="/tabs/message/:id" component={ FeedbackDetail } exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="delivery" href="/tabs/delivery">
          <IonIcon icon={archive} />
          <IonLabel>Delivery</IonLabel>
        </IonTabButton>
        <IonTabButton tab="order" href="/tabs/order">
          <IonIcon icon={basket} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>
        <IonTabButton tab="message" href="/tabs/message">
          <IonIcon icon={chatbox} />
          <IonLabel>Messages</IonLabel>
        </IonTabButton>
        <IonTabButton tab="scan_rqcode" href="/tabs/scan_rqcode">
          <IonIcon icon={water} />
          <IonLabel>Scan</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;