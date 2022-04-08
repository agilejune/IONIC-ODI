import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { aperture, closeOutline, flag } from 'ionicons/icons';
import React from 'react';
import './TransportLossMeter.scss';

interface OwnProps {
  onDismissModal: () => void;
  onOpenLjk: () => void;
}

const TransportLossMeter : React.FC<OwnProps> = ({onDismissModal, onOpenLjk}) => {

  return(
    <IonPage id="transport-loss-meter-page">
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
              <strong>Pengukuran<br/>Menggunakan</strong>
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput disabled></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              <strong>Kompartemen</strong>
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput disabled></IonInput>
          </IonCol>
        </IonRow>
        <br/><br/>
        <IonRow>
          <IonCol size="4">
            <IonText><strong>LO Number</strong></IonText>
          </IonCol>
          <IonCol size="4">
            <IonText><strong>Volume Meter<br/>(Liter)</strong></IonText>
          </IonCol>
          <IonCol size="4">
            <IonText><strong>Action</strong></IonText>
          </IonCol>
        </IonRow>
        <hr/>
        <IonRow>
          <IonCol size="4">
            <IonInput disabled></IonInput>
          </IonCol>
          <IonCol size="4">
            <IonInput disabled></IonInput>
          </IonCol>
          <IonCol size="4">
            <IonButton color="danger" onClick={onOpenLjk}>Open</IonButton>
          </IonCol>
        </IonRow>
        <hr/>
        <IonRow>
          <IonCol size="4">
            <IonInput disabled></IonInput>
          </IonCol>
          <IonCol size="4">
            <IonInput disabled></IonInput>
          </IonCol>
          <IonCol size="4">
            <IonButton color="danger" onClick={onOpenLjk}>Open</IonButton>
          </IonCol>
        </IonRow>
        <hr/>
        <hr/>
        <IonText>
          <strong>Keterangan : </strong><br/>
          * Volume Meter = Volume terima berdasarkan angka Meter MT
        </IonText>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLossMeter;