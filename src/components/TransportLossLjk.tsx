import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { aperture, closeOutline, flag } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { getLossFormData } from '../data/dataApi';
import { LossFormData, LossFormDataOffline } from '../models/Transportloss';
import './TransportLossLjk.scss';

interface OwnProps {
  onDismissModal: () => void;
  onSubmit: () => void;
  shipID: number;
}

const TransportLossLjk : React.FC<OwnProps> = ({onDismissModal, onSubmit, shipID}) => {
  const [lossFormData, setLossFormData] = useState<LossFormData>();
  const [lolinesId1, setLolinesId1] = useState('0');
  const [lolinesId2, setLolinesId2] = useState('0');
  const [heightAfter, setHeightAfter] = useState(0);

  useEffect(() => {
    getData();

    async function getData() {
      const lossData = await getLossFormData();
      console.log(lossData)
      setLossFormData(lossData);
    }
  }, [shipID]);

  const getVolumeBefore = (data: LossFormData) => {
    const vol_1 = parseInt(data.lolines_ids.filter((id) => id.lo_id === lolinesId1)[0].lo_volume);
    const vol_2 = parseInt(data.lolines_ids.filter((id) => id.lo_id === lolinesId2)[0].lo_volume);
    if (data.measure_by === 'ijkbout') {
      if (vol_1 + vol_2 < data.vol_compartment) {
        data.vol_before = vol_1 + vol_2;
      }
      else if (vol_1 + vol_2 === data.vol_compartment) {
        data.vol_before = data.vol_compartment;
      }
      else if (vol_1 + vol_2 > data.vol_compartment){
        const error = "'Total Volume LO (%s Liter) lebih besar dari Kapasitas Compartment (%s Liter), silakan periksa kembali data yang dientry' % \n(all_volbefore2,vals['vol_compartment'])";
      }
    }
    else if (data.measure_by === 'flowmeter') {
      data.vol_before = vol_1 + vol_2;
    }
  };

  const getTTLloss = (data: LossFormDataOffline) => {
    if (data.measure_by === 'ijkbout') {
      data.ttl_loss = heightAfter >= data.height_before ? 0 : (data.height_before - heightAfter) * data.sensitivity;
    }
    else if (data.measure_by === 'flowmeter') {
      data.ttl_loss = data.vol_after >= data.vol_before ? 0 : data.vol_before - data.vol_after;
    }

    const ttl_loss_min = data.treshold_ttl_loss.match(/\[\d,/g);
    const ttl_loss_max = data.treshold_ttl_loss.match(/,\d\]/g);
    if (ttl_loss_min != null && ttl_loss_max != null && (data.ttl_loss < parseInt(ttl_loss_min[0]) || data.ttl_loss > parseInt(ttl_loss_max[0]))) {
      const error = "Total Loss (%s Liter) diluar batas kewajaran, Apakah anda yakin sudah benar memasukan data?"
    }
  }

  const getTolerance = (data: LossFormDataOffline) => {
    data.tolerance = data.ttl_loss > 0 ? parseInt(data.conf_tolerance) / 100 * data.vol_before : 0;

    data.ttl_loss_claim = data.ttl_loss - data.tolerance;
  }

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
            <IonInput value={lossFormData?.measure_by} disabled></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Kompartemen
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput value={ lossFormData?.compartment } disabled></IonInput>
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
        {/* <IonRow>
          <IonCol size="6">
            <IonText>
              Lo Number
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonSelect></IonSelect>
          </IonCol>
        </IonRow> */}
        <hr/>
        <IonRow>
          <IonCol size="6">
            <IonText>
            Vol Kompartemen(Liter) / Kepekaan <br/>(Liter/mm)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonText>:{lossFormData?.vol_before}/{lossFormData?.sensitivity}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
            Height T2(mm)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonText>:{lossFormData?.height_before}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Level BBM Sebelum<br/>Bongkar(mm)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput value={lossFormData?.height_after}></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
            Total Loss(Liter) / Toleransi(Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonText>:{lossFormData?.ttl_loss}/{lossFormData?.tolerance}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
            Total Claim Loss(Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonText>:{lossFormData?.ttl_loss_claim}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
            Vol Level SPBU(Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonText>:{lossFormData?.vol_after}</IonText>
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
            <IonInput value={ lossFormData?.delivery_discrepancy }></IonInput>
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
            <IonInput value={lossFormData?.volume_ar}></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Volume Sales (Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput value={ lossFormData?.volume_sales }></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
            Threshold Discrepancy(Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonText>:{lossFormData?.tolerance_discrepancy}</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
            Claim Discrepancy(Liter)
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonText>:{lossFormData?.claim_discrepancy}</IonText>
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
            <IonInput value={lossFormData?.temperatur_obs}></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonText>
              Density Obs ()
            </IonText>
          </IonCol>
          <IonCol size="6">
            <IonInput value={lossFormData?.density_obs}></IonInput>
          </IonCol>
        </IonRow>
        <hr/>
        <IonButton color="primary" expand="block" onClick={onSubmit}>Submit</IonButton>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLossLjk;