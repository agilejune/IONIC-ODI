import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { Driver } from '../../models/Driver';
import { useTranslation } from 'react-i18next';
import { connect } from '../../data/connect';
import * as selectors from '../../data/selectors';

interface OwnProps {
  onDismissModal: () => void;
  driver_id: number;
}

interface StateProps {
  driver: Driver;
}

const DriverDetail : React.FC<OwnProps & StateProps> = ({onDismissModal, driver}) => {
  const [t, i18n] = useTranslation('common');

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
      <IonContent className="ion-padding">
        <img src="assets/img/default.jpg" alt="Ionic logo" />
        <div className="ion-padding-top" />
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
      </IonContent>
    </>
  );
} 

export default connect<OwnProps, StateProps, {}>({
  mapStateToProps: (state, OwnProps) => ({
    driver: selectors.getDriverDetail(state, OwnProps),
  }),
  component: React.memo(DriverDetail)
});