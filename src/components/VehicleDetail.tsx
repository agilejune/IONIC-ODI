import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { getVehicleDetail } from '../data/dataApi';
import { Vehicle } from '../models/Vehicle';

interface OwnProps {
  onDismissModal: () => void;
  vehicle_id: number;
}

const VehicleDetail : React.FC<OwnProps> = (onDismissModal, vehicle_id) => {
  const [vehicle, setVehicle] = useState<Vehicle>();
  useEffect(() => {
    getData();

    async function getData() {
      const vehicleDetail = await getVehicleDetail(vehicle_id);
      setVehicle(vehicleDetail);
    }
    
  }, []);

  return(
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail Vehicle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText><strong>Nopol</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.name }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Kapasitas</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.capacity }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Jenis Sewa</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.rental_type }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Tanggal Tera</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ vehicle?.re_calibration_time }KL</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Dwonload Dokumen Tera</strong></IonText>
            </IonCol>
            <IonCol>
              { vehicle && vehicle.attachment.map((a, index) => (
                <a key={index} href={ a.datas_download }>{ a.datas_fname }</a>
              )) }
            </IonCol>
          </IonRow>
          <br/>
          <IonText><strong>Detail Compartment</strong></IonText>
          <IonRow>
            <IonCol>
                <IonText><strong>Comp</strong></IonText>
            </IonCol>
            <IonCol>
                <IonText><strong>Tera Ulang<br/>(T2(mm))</strong></IonText>
            </IonCol>
            <IonCol>
                <IonText><strong>Kepekaan<br/>(Lt/mm)</strong></IonText>
            </IonCol>
            <IonCol>
                <IonText><strong>Ruang Kosong<br/>(Lt)</strong></IonText>
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