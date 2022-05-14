import React from 'react';
import { IonItemSliding, IonItem, IonLabel, IonText, IonIcon, IonRow, IonCol } from '@ionic/react';
import { Feedback } from '../../models/Feedback';
import { chatboxEllipses, chatboxEllipsesOutline, chatbubbles } from 'ionicons/icons';
import './ListItem.css';

interface FeedbackItemProps {
  feedback: Feedback;
  listType: string;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, listType }) => {
  return (
    <IonItemSliding class={'feedback-' + listType}>
      <IonItem routerLink={`/tabs/message/${feedback.No}`}>
        <IonLabel>
          <IonRow>
            <IonCol size="1">
              <div id="feedback-icon">
                <IonIcon icon={chatbubbles} />
              </div>
            </IonCol>
            <IonCol size="4">
              <div style={{paddingLeft: 10}}>
                <div style={{display : "flex"}}>
                  <h2><strong>{feedback.Shipment.SPBU}</strong></h2>
                  <h5>&nbsp;/&nbsp;{feedback.Shipment.Nopol}</h5>
                </div>
                <p>{feedback.Reason}</p>
              </div>
            </IonCol>
            <IonCol>
              <div className="ion-float-right">
                <h5><span>{feedback.Shipment.Tanggal.split(' ')[0]}</span></h5>
              </div>
            </IonCol>
          </IonRow>
          <div id="message">
            <IonRow>
              <IonCol size="1">
                <IonIcon icon={chatboxEllipsesOutline}/>
              </IonCol>
              <IonCol size="11">
                <IonText><p>{feedback.Message.Pengirim}:{feedback.Message.Pesan}</p></IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="1">
                <IonIcon icon={chatboxEllipses}/>
              </IonCol>
              <IonCol size="11">
                <IonText><p>{feedback.Respon.Respon}:{feedback.Respon.Pesan}</p></IonText>
              </IonCol>
            </IonRow>
          </div>
        </IonLabel>
      </IonItem>
    </IonItemSliding>
  );
};

export default React.memo(FeedbackItem);