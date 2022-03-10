import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react';
import { options, search } from 'ionicons/icons';
import './Order.scss'

// import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { Order } from '../models/Order';
import OrderItem from '../components/OrderItem';
// import { setSearchText } from '../data/sessions/sessions.actions';

interface OwnProps { }

interface StateProps {
  orderList: Order[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  // setSearchText: typeof setSearchText;
}

type OrderPageProps = OwnProps & StateProps & DispatchProps;

const OrderPage: React.FC<OrderPageProps> = ({ orderList, mode }) => {

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  return (
    <IonPage ref={pageRef} id="order-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {!ios && !showSearchbar &&
            <IonTitle>Your Orders</IonTitle>
          }
          {showSearchbar &&
            // <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
            <IonSearchbar showCancelButton="always" placeholder="Search"></IonSearchbar>
          }

          <IonButtons slot="end">
            {!ios && !showSearchbar &&
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            }
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your Orders</IonTitle>
          </IonToolbar>
          <IonToolbar>
            {/* <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar> */}
            <IonSearchbar placeholder="Search"></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
        <IonList>
          { orderList.length === 0 &&
            <IonListHeader>
              No Orders Found
            </IonListHeader>
          }
          { orderList.length !== 0 && 
            orderList.map((list: Order, index: number) => (
              <OrderItem order={list} listType={list.Status.toLowerCase()} key={`order-${index}`} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    orderList: state.delivery.orders,
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    // setSearchText,
  },
  component: React.memo(OrderPage)
});