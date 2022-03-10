import React from 'react';
import { IonItemSliding, IonItem, IonLabel } from '@ionic/react';
import { Feedback } from '../models/Feedback';

interface FeedbackItemProps {
  feedback: Feedback;
  listType: string;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, listType }) => {
  return (
    <IonItemSliding class={'feedback-' + listType}>
      {/* <IonItem routerLink={`/tabs/message/${feedback.LO_Number}`}>
        <IonLabel>
          <div style={{display : "flex"}}>
            <div style={{display : "flex", width : "50%"}}>
              <h2 style={{fontWeight: "bolder"}}>{feedback.LO_Number}</h2>
              <h5><span>&nbsp;/&nbsp;{feedback.SPBU}</span></h5>
            </div>
            <div style={{textAlign : "right", width : "50%"}}>
              <h5><span>{feedback.Plann_Date}</span></h5>
            </div>
          </div>
          <p>
            {feedback.Product}&nbsp;/&nbsp;
            {feedback.Volume}KL
          </p>
        </IonLabel>
      </IonItem> */}
    </IonItemSliding>
  );
};

export default React.memo(FeedbackItem);