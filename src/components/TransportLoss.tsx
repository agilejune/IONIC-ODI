import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { aperture, closeOutline, flag } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { setServerMessage, setServerResStatus } from '../data/delivery/delivery.actions';
import { connect } from '../data/connect';

interface OwnProps {
  onDismissModal: () => void;
  onLjk: () => void;
  onMeter: () => void;
}

interface StateProps {
  responseStatus: string,
  message: string,
};

interface DispatchProps {
  setServerMessage: typeof setServerMessage,
  setServerResStatus: typeof setServerResStatus,
}

type TransportLossProps = OwnProps & StateProps & DispatchProps;

const TransportLoss : React.FC<TransportLossProps> = ({setServerMessage, setServerResStatus, responseStatus, message, onDismissModal, onLjk, onMeter}) => {

  const pageRef = useRef<HTMLElement>(null);
  return(
    <IonPage id="transport-loss-page" ref={pageRef}>
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
        <IonText>
          <h6>
            <strong>Pilih (salah satu) untuk metode pengukuran serah terima pembongkara BBM:</strong>
          </h6>
        </IonText>
        <hr/>
        <IonRow>
          <IonCol>
            <IonButton color="success" onClick={onLjk}>
              <IonIcon icon={flag} />
              <IonLabel>
                A.&nbsp;Ijkbout
              </IonLabel>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton color="danger" onClick={onMeter}>
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
        <IonToast
          cssClass={responseStatus == "S" ? "success-toast" : responseStatus == "E" ? "fail-toast" : ""}
          isOpen={message !== "" && responseStatus !==""}
          message={message}
          duration={5000}
          onDidDismiss={() => { setServerMessage(""); setServerResStatus("")}}
        />
      </IonContent>
    </IonPage>
  );
} 

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    message: state.delivery.message,
    responseStatus: state.delivery.responseStatus
  }),
  mapDispatchToProps: {
    setServerMessage,
    setServerResStatus
  },
  component: React.memo(TransportLoss)
});