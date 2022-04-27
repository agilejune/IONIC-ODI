import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonSpinner } from '@ionic/react';
import { options, search } from 'ionicons/icons';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { Feedback } from '../models/Feedback';
import FeedbackItem from '../components/ListItem/FeedbackItem';
import { setSearchText } from '../data/data/data.actions';
import { useTranslation } from 'react-i18next';

interface OwnProps { }

interface StateProps {
  feedbackList: Feedback[];
  mode: 'ios' | 'md';
  isLoading: boolean;
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type FeedbackPageProps = OwnProps & StateProps & DispatchProps;

const FeedbackPage: React.FC<FeedbackPageProps> = ({ isLoading, feedbackList, mode, setSearchText }) => {

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
            <IonTitle>{t('menus.message_from_us')}</IonTitle>
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
            <IonTitle size="large">{t('menus.message_from_us')}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonList>
          { feedbackList.length === 0 &&
            <IonListHeader>
              No Feedbacks Found
            </IonListHeader>
          }
          { feedbackList.length !== 0 && 
            feedbackList.map((list: Feedback, index: number) => (
              <FeedbackItem feedback={list} listType={list.Status.toLowerCase()} key={`feedback-${index}`} />
          ))}
        </IonList>
        </>}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoading: state.data.dataLoading,
    feedbackList: selectors.getSearchedFeedbacks(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText,
  },
  component: React.memo(FeedbackPage)
});