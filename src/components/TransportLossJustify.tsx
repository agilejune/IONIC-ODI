import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { aperture, closeOutline, flag } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import './TransportLossJustify.scss';

interface OwnProps {
  onDismissModal: () => void;
}

const TransportLossJustify : React.FC<OwnProps> = ({onDismissModal}) => {

  return(
    <IonPage id="transport-loss-justify-page">
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
        <hr/>
        <br/>
        <IonText>
          <h5><strong>VERIFIKASI</strong></h5>
          <h6>Apahkah anda sudah yakin nilai yang diinput sudah sesuai dengan sebenarnya ?</h6>
        </IonText>
        <div className="ion-padding-top">
          <IonLabel><h5><strong>Justify Reason</strong></h5></IonLabel>
          <IonSelect></IonSelect>
        </div>
        <div className="ion-padding-top">
          <IonLabel><h5><strong>Petugas</strong></h5></IonLabel>
          <IonInput></IonInput>
        </div>
        <div className="ion-padding-top">
          <IonLabel><h5><strong>Password (PIN_Supir)</strong></h5></IonLabel>
          <IonInput></IonInput>
        </div>
        <hr/>
        <div className="ion-padding-top">
          <IonRow>
              <IonCol size="1">
                <IonCheckbox></IonCheckbox>
              </IonCol>
              <IonCol size="11">
                <IonText>
                saya telah membaca dan menyatakan bahwa data tersebut adalah benar.
                </IonText>
              </IonCol>
          </IonRow>
        </div>
        <div className="ion-padding-top">
          <IonButton color="primary" expand="block">Submit</IonButton>        
        </div>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLossJustify;