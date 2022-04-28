import React, { useEffect, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonButton, IonFooter} from '@ionic/react';
import { Feedback } from '../models/Feedback';
import { car, happyOutline, sadOutline, person } from 'ionicons/icons';
import './FeedbackDetail.css';

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
        <div>
        { feedback.AllMessage.map((message, index) => {
          return (
            <div key={index}>
              <div className="bubble-sent">
                <div className="sender-avatar avatar"></div>
                <div className="chat-bubble">
                  <div>
                    <p>~{message.sender}<span>{feedback.Shipment.SPBU }</span></p><br/>
                    {index == 0 && 
                      <div>
                        <p>
                          Shipment: {feedback.Shipment.Tanggal}
                        </p>
                        <p><IonIcon icon={car}/><strong>{feedback.Shipment.Nopol}</strong></p>
                        <p><IonIcon icon={person}/>{feedback.Shipment.Supir}</p>
                        <p><IonIcon icon={person}/>{feedback.Shipment.Kernet}</p>
                      </div>
                    }
                    <br/>
                    <p><strong>{message.pilihan}</strong></p>
                    <p>{message.message}</p>
                  </div>
                  <div className="bubble-arrow alt"></div>
                </div>
                
              </div>
              <div className="ion-padding-top bubble-received">
                <div className="responser-avatar avatar"></div>
                <div className="chat-bubble">
                  <div>
                    <p>~{message.responder}</p><br/>
                    <p>{message.response}</p>
                  </div>
                  <div className="bubble-arrow"></div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </IonContent>
      <IonFooter>
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
      </IonFooter>
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
