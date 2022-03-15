import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { CheckList } from '../models/CheckList';
import './TransportLossQuery.scss';

interface OwnProps {
  onDismissModal: () => void;
  onSubmit: () => void;
  checkLists: CheckList[]
}

const TransportLossQuery : React.FC<OwnProps> = ({onDismissModal, onSubmit, checkLists}) => {

  return(
    <IonPage id="transport-loss-query-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Form Transport Loss</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="ion-padding-top">
          {checkLists.map(list => {
            return (
              <>
                <div className="label-section">
                  <IonLabel><strong>{list.title}</strong></IonLabel>
                </div>
                <div className='ion-padding-top'>
                  {list.question_ids.map(q => {
                    return (
                      <>
                        {q.type === "textbox" && 
                          <>
                            <IonText><strong>{q.question}</strong></IonText>
                            <IonInput></IonInput>
                          </>
                        }
                        {q.type === "simple_choice" && 
                          <IonRow>
                            <IonCol size="1">
                              <IonCheckbox></IonCheckbox>
                            </IonCol>
                            <IonCol size="11">
                              <IonText>{q.question}</IonText>
                            </IonCol>
                          </IonRow>
                        }
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
        <div className="ion-padding-top">
          <IonButton color="primary" expand="block" onClick={onSubmit}>Submit</IonButton>        
        </div>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLossQuery;