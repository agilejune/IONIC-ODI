import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react'

interface OwnProps {
  onDismissModal: () => void;
  url: string;
  title: string;
}

const WebViewModal : React.FC<OwnProps> = ({onDismissModal, url, title}) => {

  return(
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{ title }</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        { url !== "" &&
          <iframe src={url} frameBorder="0" allowFullScreen style={{width: "100%", height: "100%"}}/>
        }
      </IonContent>
    </>
  );
} 

export default WebViewModal;