import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react';
import { options, search } from 'ionicons/icons';
import './Delivery.scss'

// import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import DeliveryItem from '../components/DeliveryItem';
import { Delivery } from '../models/Delivery';
// import { setSearchText } from '../data/sessions/sessions.actions';

interface OwnProps { }

interface StateProps {
  pastDeliveryList: Delivery[];
  ongoingDeliveryList: Delivery[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  // setSearchText: typeof setSearchText;
}

type DeliveryPageProps = OwnProps & StateProps & DispatchProps;

const DeliveryPage: React.FC<DeliveryPageProps> = ({ ongoingDeliveryList, pastDeliveryList, mode }) => {

  const [segment, setSegment] = useState<'ongoing' | 'past'>('ongoing');
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
    <IonPage ref={pageRef} id="delivery-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {ios &&
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="ongoing">
                OnGoing
              </IonSegmentButton>
              <IonSegmentButton value="past">
                Past
              </IonSegmentButton>
            </IonSegment>
          }
          {!ios && !showSearchbar &&
            <IonTitle>Delivery</IonTitle>
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

        {!ios &&
          <IonToolbar>
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="ongoing">
                OnGoing
              </IonSegmentButton>
              <IonSegmentButton value="past">
                Past
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        }
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Delivery</IonTitle>
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
        { segment === 'ongoing' &&
          <IonList>
            { ongoingDeliveryList.length === 0 &&
              <IonListHeader>
                No Ongoing Delivery Found
              </IonListHeader>
            }
            {ongoingDeliveryList.length !== 0 && 
              ongoingDeliveryList.map((list: Delivery, index: number) => (
                <DeliveryItem delivery={list} listType="ongoing" key={`delivery-ongoing-${index}`} />
            ))}
          </IonList>
        }

        { segment === 'past' &&
          <IonList>
            { pastDeliveryList.length === 0 &&
              <IonListHeader>
                No Past Delivery Found
              </IonListHeader>
            }
            { pastDeliveryList.length !== 0 && 
              pastDeliveryList.map((list: Delivery, index: number) => (
                <DeliveryItem delivery={list} listType="past" key={`delivery-past-${index}`} />
            ))}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    // schedule: selectors.getSearchedSchedule(state),
    // favoritesSchedule: selectors.getGroupedFavorites(state),
    ongoingDeliveryList: state.delivery.ongoingDeliverys,
    pastDeliveryList: state.delivery.pastDeliverys,
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    // setSearchText,
  },
  component: React.memo(DeliveryPage)
});