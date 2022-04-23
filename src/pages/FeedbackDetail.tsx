import React, { useEffect, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonButton} from '@ionic/react';
import { Feedback } from '../models/Feedback';
import { car, happyOutline, sadOutline, person } from 'ionicons/icons';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  feedback: Feedback;
};

interface DispatchProps {
}

type FeedbackDetailProps = OwnProps & StateProps & DispatchProps;

const FeedbackDetail: React.FC<FeedbackDetailProps> = ({ feedback }) => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/message"></IonBackButton>
          </IonButtons>
          <IonTitle>Message Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonRow>
                <IonCol>
                  <IonText>{feedback.AllMessage[0].sender }</IonText>
                </IonCol>
                <IonCol>
                  <IonText className="ion-float-right">{feedback.Shipment.SPBU }</IonText>
                </IonCol>
              </IonRow>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{color: "black", fontSize: 17}}>
            <div style={{backgroundColor: "#f8f2d6", padding: 8}}>
              <IonText>
                Shipment: {feedback.Shipment.Tanggal}
              </IonText>
              <br/>
              <IonLabel style={{color: "#3F51B5"}}><IonIcon icon={car}/><strong>{feedback.Shipment.Nopol}</strong></IonLabel>
              <br/>
              <IonLabel><IonIcon icon={person}/>{feedback.Shipment.Supir}</IonLabel>
              <br/>
              <IonLabel><IonIcon icon={person}/>{feedback.Shipment.Kernet}</IonLabel>
            </div>
            <br/>
            <IonText>
              <strong><h1>{feedback.AllMessage[0].pilihan }</h1></strong>
            </IonText>
            <br/>
            <IonText>
              {feedback.AllMessage[0].message}
            </IonText>
          </IonCardContent>
        </IonCard>
        <br/>
        <div style={{textAlign: "center"}}>
          <IonText>
            <h5><strong>Apakah Anda merasa Puas?(Ya/Tidak)</strong></h5>
          </IonText>
          <IonRow>
            <IonCol>
              <IonButton color="primary" fill="outline" >
                <IonIcon icon={happyOutline} />Ya
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="danger" fill="outline" >
                <IonIcon icon={sadOutline} />Tidak
              </IonButton>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    feedback: selectors.getFeedback(state, OwnProps)
  }),
  mapDispatchToProps: {
  },
  component: withRouter(FeedbackDetail)
});
