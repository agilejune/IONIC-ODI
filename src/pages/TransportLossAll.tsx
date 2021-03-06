import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonSpinner } from '@ionic/react';
import { options, search } from 'ionicons/icons';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { Transportloss } from '../models/Transportloss';
import TransportLossItem from '../components/ListItem/TransportLossItem';
import { setSearchText } from '../data/data/data.actions';
import { useTranslation } from 'react-i18next';

interface OwnProps { }

interface StateProps {
  transportLossList: Transportloss[];
  mode: 'ios' | 'md';
  isLoading: boolean;
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type TransportLossPageProps = OwnProps & StateProps & DispatchProps;

const TransportLossPage: React.FC<TransportLossPageProps> = ({ isLoading, transportLossList, mode, setSearchText }) => {

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);

  const [t, i18n] = useTranslation('common');
  
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
            <IonTitle>{t('menus.transport_loss')}</IonTitle>
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
            <IonTitle size="large">{t('menus.transport_loss')}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonList>
          { transportLossList.length === 0 &&
            <IonListHeader>
              No Transport Loss Found
            </IonListHeader>
          }
          { transportLossList.length !== 0 && 
            transportLossList.map((list: Transportloss, index: number) => (
              <TransportLossItem transportLoss={list} listType={list.State.toLowerCase()} key={`transport-loss-all-${index}`} />
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
    transportLossList: selectors.getSearchedTransportLossAll(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText,
  },
  component: React.memo(TransportLossPage)
});