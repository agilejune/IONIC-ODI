import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonSpinner, IonText } from '@ionic/react';

import { connect } from '../data/connect';

interface OwnProps { }

interface StateProps {
}

interface DispatchProps {
}

type ScanPageProps = OwnProps & StateProps & DispatchProps;

const ScanPage: React.FC<ScanPageProps> = ({  }) => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Scan RQCode</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonText>Data not found</IonText>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
  }),
  mapDispatchToProps: {
  },
  component: React.memo(ScanPage)
});