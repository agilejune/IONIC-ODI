import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { aperture, closeOutline, flag } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import './TransportLossLjk.scss';

interface OwnProps {
  onDismissModal: () => void;
}

const TransportLossLjk : React.FC<OwnProps> = ({onDismissModal}) => {

  return(
    <IonPage id="transport-loss-ljk-page">
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
        <IonRow>
          <IonCol size="6">
            <IonText>
              Pengukuran<br/>Menggunakan
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput disabled></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Kompartemen
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput disabled></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Lo Number
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonSelect></IonSelect>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Lo Number
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonSelect></IonSelect>
          </IonCol>
        </IonRow>
        <hr/>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Level BBM Sebelum<br/>Bongkar(mm)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput></IonInput>
          </IonCol>
        </IonRow>
        <hr/>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Delivery Discrepancy<br/>(Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonText>
            * Untuk SPBU dengan program ATG sebagai custody transfer
          </IonText>
        </IonRow>
        <IonRow>
          <IonText>
            * Discrepancy diinput dengan tanda (-) jika loss, dan tanda (+) jika gain
          </IonText>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Tank ID
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonSelect></IonSelect>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Volume AR (Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Volume Sales (Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput></IonInput>
          </IonCol>
        </IonRow>
        <hr/>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Temperature Obs ()
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Density Obs ()
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput></IonInput>
          </IonCol>
        </IonRow>
        <hr/>
        <IonButton color="primary" expand="block">Submit</IonButton>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLossLjk;