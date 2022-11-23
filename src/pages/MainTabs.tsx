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
  const [tabButtons, setTabButtons] = useState<NodeListOf<HTMLIonTabButtonElement>>();
  const tabsRef = useRef<any>(null);
  const deliveryTabRef = useRef<any>(null);
  const ionRouter = useIonRouter();
  const location = useLocation();

  useEffect(() => {
    // tabsRef.current.tabBarRef.current.selectTab('order')
    // setTimeout(() => {
    //   // document.querySelectorAll('ion-tab-button').forEach(one => one.classList.remove("tab-selected"));
    //   // deliveryTabRef.current.click();
    //   document.getElementById('tab-button-delivery')!.click();
    // }, 5000)
    // setTimeout(() => {
    //   ionRouter.push("/tabs/delivery", "forward", "push");
    // }, 6000)
    // setTabButtons(document.querySelectorAll('ion-tab-button'));
  }, [])

  document.addEventListener('ionBackButton', (ev) => {
    (ev as CustomEvent).detail.register(140, () => {
      if (location.pathname !== '/tabs/delivery') {
        document.querySelectorAll('ion-tab-button').forEach(one => {
          one.classList.remove("tab-selected");
          one.removeAttribute("aria-selected");
        });
        document.getElementById('tab-button-delivery')!.click();
        // tabButtons!.forEach(one => {
        //   one.classList.remove("tab-selected")
        // });
        // setUpdate(!update);
        // ionRouter.push("/tabs/delivery", "forward", "push");
        // tabsRef.current.tabBarRef.current.selectTab('delivery')
      }
      else
        App.exitApp();
    });
  });

  return (
    <IonTabs ref={tabsRef}>
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
        <IonTabButton tab="delivery" href="/tabs/delivery" ref={deliveryTabRef}>
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