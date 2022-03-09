import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { aperture, flag } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import './TransportLoss.scss';
import TransportLossAgree from './TransportLossAgree';
import TransportLossLjk from './TransportLossLjk';
import TransportLossMeter from './TransportLossMeter';
import TransportLossQuery from './TransportLossQuery';

interface OwnProps {
  onDismissModal: () => void;
}

const TransportLoss : React.FC<OwnProps> = (onDismissModal) => {
  const [showTransLossLjk, setShowTransLossLjk] = useState(false);
  const [showTransLossMeter, setShowTransLossMeter] = useState(false);

  const pageRef = useRef<HTMLElement>(null);
  return(
    <IonPage id="transport-loss-page" ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Form Transport Loss</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <hr/>
        <IonText>
          <h6>
            <strong>Pilih (salah satu) untuk metode pengukuran serah terima pembongkara BBM:</strong>
          </h6>
        </IonText>
        <hr/>
        <IonRow>
          <IonCol>
            <IonButton color="success" onClick={() => setShowTransLossLjk(true)}>
              <IonIcon icon={flag} />
              <IonLabel>
                A.&nbsp;Ijkbout
              </IonLabel>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="danger" onClick={() => setShowTransLossMeter(true)}>
              <IonIcon icon={aperture} />
              <IonLabel>
                B.&nbsp;Flow&nbsp;Meter
              </IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
        <hr/>
        <hr/>
        <IonText>
          <h6><strong>Keterangan :</strong><br/>
          1. Pilih Ijkbout apabila pembongkaran BBM menggunakan acuan serah terima custody transfer pada ijkbout mobil tangki (diukur menggunakan dipstick).<br/> 
          2. Pilih Flow Meter apabila pembongkaran BBM menggunakan acuan serah terima meter arus pada mobil tangki (meter arus PTO/meter portabel).
          </h6>
        </IonText>

        <IonModal
            isOpen={showTransLossMeter}
            onDidDismiss={() => setShowTransLossMeter(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLossMeter onDismissModal={() => setShowTransLossMeter(false)}></TransportLossMeter>
          </IonModal>

          <IonModal
            isOpen={showTransLossLjk}
            onDidDismiss={() => setShowTransLossLjk(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLossMeter onDismissModal={() => setShowTransLossLjk(false)}></TransportLossMeter>
          </IonModal>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLoss;