import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonSpinner } from '@ionic/react';
import { options, search } from 'ionicons/icons';

// import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { Feedback } from '../models/Feedback';
import FeedbackItem from '../components/FeedbackItem';
// import { setSearchText } from '../data/sessions/sessions.actions';

interface OwnProps { }

interface StateProps {
  feedbackList: Feedback[];
  mode: 'ios' | 'md';
  isLoading: boolean;
}

interface DispatchProps {
  // setSearchText: typeof setSearchText;
}

type FeedbackPageProps = OwnProps & StateProps & DispatchProps;

const FeedbackPage: React.FC<FeedbackPageProps> = ({ isLoading, feedbackList, mode }) => {

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

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
            <IonTitle>Message From Us</IonTitle>
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
      { isLoading && 
          <div className="spin">
            <IonSpinner name="bubbles" color="primary" /> 
          </div>
        }
        { !isLoading &&  
        <>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Message From Us</IonTitle>
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
    isLoading: state.delivery.dataLoading,
    feedbackList: state.delivery.feedbacks,
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    // setSearchText,
  },
  component: React.memo(FeedbackPage)
});