import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { getApiVehicleDetail } from '../data/api';
import { Vehicle } from '../models/Vehicle';
import { useTranslation } from 'react-i18next';

interface OwnProps {
  onDismissModal: () => void;
  vehicle_id: number;
}

const VehicleDetail : React.FC<OwnProps> = ({onDismissModal, vehicle_id}) => {
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    getData();

    async function getData() {
      const vehicleDetail = await getApiVehicleDetail(vehicle_id);
      setVehicle(vehicleDetail);
    }
    
  }, []);

  return(
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{ t('modal_detail_vehicle.title') }</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_vehicle.nopol') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.name }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_vehicle.kapasitas') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.capacity }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_vehicle.jenis_sewa') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.rental_type }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_vehicle.tanggal_tera') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.re_calibration_time }KL</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_vehicle.download_dokumen_tera') }</strong></IonText>
            </IonCol>
            <IonCol>
              { vehicle && vehicle.attachment.map((a, index) => (
                <a key={index} href={ a.datas_download }>{ a.datas_fname }</a>
              )) }
            </IonCol>
          </IonRow>
          <br/>
          <IonText><strong>{ t('modal_detail_vehicle.detail_compartment') }</strong></IonText>
          <IonRow>
            <IonCol>
                <IonText><strong>{ t('modal_detail_vehicle.comp') }</strong></IonText>
            </IonCol>
            <IonCol>
                <IonText><strong>{ t('modal_detail_vehicle.tera_ulang') }</strong></IonText>
            </IonCol>
            <IonCol>
                <IonText><strong>{ t('modal_detail_vehicle.kepekaan') }</strong></IonText>
            </IonCol>
            <IonCol>
                <IonText><strong>{ t('modal_detail_vehicle.ruang_kosong') }</strong></IonText>
            </IonCol>
          </IonRow>
          { vehicle?.comp.map((c, index) => (
            
            <IonRow>
              <IonCol>
                  <IonText>{index}</IonText>
              </IonCol>
              <IonCol>
                  <IonText>{ c.t2 }</IonText>
              </IonCol>
              <IonCol>
                  <IonText>{ c.sensitivity }</IonText>
              </IonCol>
              <IonCol>
                  <IonText>{ c.empty_space }</IonText>
              </IonCol>
            </IonRow>
          ))

          }
        </IonGrid>
      </IonContent>
    </>
  );
} 

export default VehicleDetail;