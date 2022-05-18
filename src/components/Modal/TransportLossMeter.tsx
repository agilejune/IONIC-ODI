import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { aperture, closeOutline, flag } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { LossFormDataOffline } from '../../models/Transportloss';
import * as selectors from '../../data/selectors';
import { connect } from '../../data/connect';

interface OwnProps {
  onDismissModal: () => void;
  onOpenLossForm: (lo_id: string) => void;
  shipID: number;
  comp: number;
  measureBy: string;
}

interface StateProps {
  lossFormOfflineData: LossFormDataOffline;
}

const TransportLossMeter : React.FC<OwnProps & StateProps> = ({onDismissModal, onOpenLossForm, lossFormOfflineData}) => {
  useEffect(() => {
    const myLolines_id = lossFormOfflineData.lolines_ids.filter((lo) => lo.lo_compartment === String(lossFormOfflineData.compartment));
    if (myLolines_id.length > 0) {
      lossFormOfflineData.lolines_ids = myLolines_id;
    }
    else {
      lossFormOfflineData.lolines_ids = lossFormOfflineData.lolines_ids.filter((lo) => lo.lo_compartment === "");
    }
  }, [lossFormOfflineData]);

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
            <IonInput value="flowmeter" disabled></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              <strong>Kompartemen</strong>
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput value={lossFormOfflineData.compartment} disabled></IonInput>
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
        {
          lossFormOfflineData.lolines_ids.map((lo) => 
          <>
          <IonRow>
            <IonCol size="4">
              <IonInput value={lo.lo_number} disabled></IonInput>
            </IonCol>
            <IonCol size="4">
              <IonInput value={lo.vol_after} disabled></IonInput>
            </IonCol>
            <IonCol size="4">
              <IonButton color="danger" onClick={() => onOpenLossForm(lo.lo_id)}>Open</IonButton>
            </IonCol>
          </IonRow>
          <hr/>
          </>
          )
        }
        <hr/>
        <IonText>
          <strong>Keterangan : </strong><br/>
          * Volume Meter = Volume terima berdasarkan angka Meter MT
        </IonText>
      </IonContent>
    </IonPage>
  );
} 

export default connect<OwnProps, StateProps>({
  mapStateToProps: (state, OwnProps) => ({
    lossFormOfflineData: selectors.getLossFormOfflineData(state, OwnProps),
  }),
  component: React.memo(TransportLossMeter)
});