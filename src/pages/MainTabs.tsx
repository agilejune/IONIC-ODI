import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { archiveOutline, basket, chatbox, pin } from 'ionicons/icons';

import DeliveryPage from './Delivery';
import DeliveryDetail from './DeliveryDetail';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/delivery" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/delivery" render={() => <DeliveryPage />} exact={true} />
        <Route path="/tabs/delivery/:id" component={ DeliveryDetail } exact={true} />
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