import React, { useState, useRef } from 'react';
import { IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonSpinner, IonBadge } from '@ionic/react';
import { notificationsCircleOutline, options, search } from 'ionicons/icons';
import './MainPage.css'
import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import DeliveryItem from '../components/ListItem/DeliveryItem';
import { Delivery } from '../models/Delivery';
import { setSearchText } from '../data/data/data.actions';
import { useTranslation } from "react-i18next";

interface OwnProps { }

interface StateProps {
  pastDeliveryList: Delivery[];
  ongoingDeliveryList: Delivery[];
  mode: 'ios' | 'md';
  isLoading: boolean;
  willSendCount: number;
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type DeliveryPageProps = OwnProps & StateProps & DispatchProps;

const DeliveryPage: React.FC<DeliveryPageProps> = ({willSendCount, isLoading, ongoingDeliveryList, pastDeliveryList, mode, setSearchText }) => {

  const [segment, setSegment] = useState<'ongoing' | 'past'>('ongoing');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const pageRef = useRef<HTMLElement>(null);
  const [t, i18n] = useTranslation('common');

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
          {ios &&
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="ongoing">
                { t('pages_delivery.category_ongoing') }
              </IonSegmentButton>
              <IonSegmentButton value="past">
              { t('pages_delivery.category_past') }
              </IonSegmentButton>
            </IonSegment>
          }
          {!ios && !showSearchbar &&
            <IonTitle>{ t('pages_delivery.title') }</IonTitle>
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
            { willSendCount > 0 &&
              <IonButton id="sync-noti">
                <IonIcon icon={notificationsCircleOutline}></IonIcon>
                <IonBadge id="sync-badge" color="primary">{ willSendCount }</IonBadge>
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
        { isLoading && 
          <div className="spin">
            <IonSpinner name="bubbles" color="primary" /> 
          </div>
        }
        { !isLoading &&  
        <>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{ t('pages_delivery.title') }</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

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
        </>}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoading: state.data.dataLoading,
    ongoingDeliveryList: selectors.getSearchedOngoingDeliverys(state),
    pastDeliveryList: selectors.getSearchedPastDeliverys(state),
    mode: getConfig()!.get('mode'),
    willSendCount: state.data.willSendCount
  }),
  mapDispatchToProps: {
    setSearchText,
  },
  component: React.memo(DeliveryPage)
});
