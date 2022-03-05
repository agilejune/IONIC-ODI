import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { getDriverDetail } from '../data/dataApi';
import { Driver } from '../models/Driver';

interface OwnProps {
  onDismissModal: () => void;
  driver_id: number;
}

const DriverDetail : React.FC<OwnProps> = (onDismissModal, driver_id) => {
  const [driver, setDriver] = useState<Driver>();
  useEffect(() => {
    getData();

    async function getData() {
      const driverDetail = await getDriverDetail(driver_id);
      setDriver(driverDetail);
    }
    
  }, []);

  return(
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crew Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText><strong>NIP</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.driver_code }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Nama Lengkap</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.driver }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Jabatan</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.position }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Klasifikasi</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.classification }KL</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>Jenis Sewa</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.contract_type }</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
} 

export default DriverDetail;