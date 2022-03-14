import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import './TransportLossQuery.scss';

interface OwnProps {
  onDismissModal: () => void;
  onSubmit: () => void;
}

const TransportLossQuery : React.FC<OwnProps> = ({onDismissModal, onSubmit}) => {

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
          <div className="label-section">
            <IonLabel><strong>Data Order</strong></IonLabel>
          </div>
          <div className="ion-padding-top">
            <IonText><strong>Petugas SPBU</strong></IonText>
            <IonInput></IonInput>
          </div>
          <div className="label-section">
            <IonLabel><strong>Checklist Pembongkaran BBM</strong></IonLabel>
          </div>
          <div className="ion-padding-top">
            <IonRow>
              <IonCol size="1">
                <IonCheckbox></IonCheckbox>
              </IonCol>
              <IonCol size="11">
                <IonText>
                  1. Dengan ini saya selaku pengguna apps ODI Transport Loss menyatakan setuju atas semua syarat dan ketentuan di atas
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="1">
                <IonCheckbox></IonCheckbox>
              </IonCol>
              <IonCol size="11">
                <IonText>
                2. Data yang diinput adalah data sebenar-benarnya dan dapat dilakukan verifikasi dan dipertanggungjawabkan
                </IonText>
              </IonCol>
            </IonRow>
          </div>
        </div>
        <div className="ion-padding-top">
          <IonButton color="primary" expand="block" onClick={onSubmit}>Submit</IonButton>        
        </div>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLossQuery;