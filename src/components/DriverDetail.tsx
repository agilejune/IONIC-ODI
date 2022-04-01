import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { getApiDriverDetail } from '../data/api';
import { Driver } from '../models/Driver';
import { useTranslation } from 'react-i18next';

interface OwnProps {
  onDismissModal: () => void;
  driver_id: number;
}

const DriverDetail : React.FC<OwnProps> = ({onDismissModal, driver_id}) => {
  const [driver, setDriver] = useState<Driver>();
  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    getData();

    async function getData() {
      const driverDetail = await getApiDriverDetail(driver_id);
      setDriver(driverDetail);
    }
    
  }, []);

  return(
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{ t('modal_detail_crew.title') }</IonTitle>
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
              <IonText><strong>{ t('modal_detail_crew.nip') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.driver_code }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_crew.nama_lengkap') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.driver }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_crew.jabatan') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.position }</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_crew.klasifikasi') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonText>{ driver?.classification }KL</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_detail_crew.jenis_sewa') }</strong></IonText>
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