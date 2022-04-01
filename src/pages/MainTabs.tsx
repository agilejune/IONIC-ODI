import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { archiveOutline, basket, chatbox, pin } from 'ionicons/icons';

import DeliveryPage from './Delivery';
import DeliveryDetail from './DeliveryDetail';
import OrderPage from './Order';
import FeedbackPage from './Feedback';
import TransportLossAllPage from './TransportLossAll';
import OrderDetail from './OrderDetail';
import TransportLossDetail from './TransportLossDetail';
interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/delivery" />
        <Route path="/tabs/delivery" render={() => <DeliveryPage />} exact={true} />
        <Route path="/tabs/order" render={() => <OrderPage />} exact={true} />
        <Route path="/tabs/message" render={() => <FeedbackPage />} exact={true} />
        <Route path="/tabs/loss" render={() => <TransportLossAllPage />} exact={true} />
        <Route path="/tabs/delivery/:id" component={ DeliveryDetail } exact={true} />
        <Route path="/tabs/order/:id" component={ OrderDetail } exact={true} />
        <Route path="/tabs/loss/:id" component={ TransportLossDetail } exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="delivery" href="/tabs/delivery">
          <IonIcon icon={archiveOutline} />
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
        <IonTabButton tab="loss" href="/tabs/loss">
          <IonIcon icon={pin} />
          <IonLabel>Loss</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;