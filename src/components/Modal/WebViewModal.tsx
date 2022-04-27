import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react'

interface OwnProps {
  onDismissModal: () => void;
  url: string;
  title: string;
}

const WebViewModal : React.FC<OwnProps> = ({onDismissModal, url, title}) => {
  const [isLoading, setIsLoading] = useState(true);
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
        {isLoading && 
          <div className="spin">
            <IonSpinner name="bubbles" color="primary" /> 
          </div>
        }
        { url !== "" &&
          <iframe src={url} onLoad={() => {setIsLoading(false)}} frameBorder="0" allowFullScreen style={{width: "100%", height: "100%"}}/>
        }
      </IonContent>
    </>
  );
} 

export default WebViewModal;