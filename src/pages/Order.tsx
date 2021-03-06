import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonSpinner } from '@ionic/react';
import { options, search } from 'ionicons/icons';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { Order } from '../models/Order';
import OrderItem from '../components/ListItem/OrderItem';
import { setSearchText } from '../data/data/data.actions';

interface OwnProps { }

interface StateProps {
  orderList: Order[];
  mode: 'ios' | 'md';
  isLoading: boolean;
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type OrderPageProps = OwnProps & StateProps & DispatchProps;

const OrderPage: React.FC<OrderPageProps> = ({ isLoading, orderList, mode, setSearchText }) => {

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);

  const pageRef = useRef<HTMLElement>(null);


  const ios = mode === 'ios';

  return (
    <IonPage ref={pageRef} >
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
            <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
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
      { isLoading && 
          <div className="spin">
            <IonSpinner name="bubbles" color="primary" /> 
          </div>
        }
        { !isLoading &&  
        <>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your Orders</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

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
        </> }
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoading: state.data.dataLoading,
    orderList: selectors.getSearchedOrders(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText,
  },
  component: React.memo(OrderPage)
});