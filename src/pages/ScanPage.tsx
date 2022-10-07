import React, { useState, useRef, useEffect } from 'react';

import {IonListHeader, IonList, IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonSpinner, IonText, useIonRouter, IonLabel } from '@ionic/react';
import { NFC } from '@awesome-cordova-plugins/nfc';
import { connect } from '../data/connect';
import { Delivery } from '../models/Delivery';

interface OwnProps { }

interface StateProps {
  deliverys: Delivery[];
}

interface DispatchProps {
}

type ScanPageProps = OwnProps & StateProps & DispatchProps;

const ScanPage: React.FC<ScanPageProps> = ({ deliverys }) => {
  const [msg, setMsg] = useState("");
  const ionRouter = useIonRouter();
  let flags = NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V;

  const scanNFC = () => {
    const readerMode$ = NFC.readerMode(flags).subscribe(
      tag => {
        if (tag.id) {
          const nfc_id = NFC.bytesToHexString(tag.id);
          const selected = deliverys.find(d => d.nfc_id === nfc_id);

          if (selected) {
            setMsg("");
            ionRouter.push(`/tabs/delivery/${selected.shipment_id}`, "forward", "push");
          }
          else
            setMsg(`No matched Delivery Info for nfc_id ${nfc_id}`)
          
        }
        else {
          setMsg("Can't read NFC ID");
        }
      },
      err => setMsg(`Error reading tag${err}`)
    );
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Scan RQCode</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <div className="ion-padding">
          <IonLabel><strong>Put your mobile device to the RFID sticker on the windscreen of your vehicle, and click the SCAN button</strong></IonLabel>
          <br/>
          <br/>
          <IonLabel><strong style={{color: 'red'}}>{msg}</strong></IonLabel>
          <br/>
          <IonButton 
            color="primary"  
            onClick={scanNFC}>
          SCAN
          </IonButton>  
          </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    deliverys: [...state.data.ongoingDeliverys, ...state.data.pastDeliverys],
  }),
  mapDispatchToProps: {
  },
  component: React.memo(ScanPage)
});