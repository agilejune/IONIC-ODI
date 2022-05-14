import { getPlatforms, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { Vehicle } from '../../models/Vehicle';
import { useTranslation } from 'react-i18next';
import { connect } from '../../data/connect';
import * as selectors from '../../data/selectors';
import { fileDownload } from '../../data/api';

interface OwnProps {
  onDismissModal: () => void;
  vehicle_id: number;
}

interface StateProps {
  vehicle: Vehicle;
  platforms: ("ios" | "ipad" | "iphone" | "android" | "phablet" | "tablet" | "cordova" | "capacitor" | "electron" | "pwa" | "mobile" | "mobileweb" | "desktop" | "hybrid")[];
}

const VehicleDetail : React.FC<OwnProps & StateProps> = ({onDismissModal, vehicle, platforms}) => {
  const [t, i18n] = useTranslation('common');
  const desktop = platforms.indexOf("desktop") != -1;
  const [message, setMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState(false);

  const downloadFile = async (url: string) => {

    const path = await fileDownload(url);
    if (path == "") {
      setDownloadStatus(false);
      setMessage("File donwload is failed");
    } 
    else {
      setDownloadStatus(true);
      setMessage(`File is downloaded to ${path}`)
    }
  }

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
      <IonContent className='ion-padding'>
        <img src="assets/img/mt_popup.png" alt="Ionic logo" />
        <div className="ion-padding-top" />
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
              <>
              { desktop &&
              <a key={index} href={ a.datas_download } download>{ a.datas_fname }</a>
              }
              { !desktop &&
              <a key={index} onClick={() => {downloadFile(a.datas_download)}}>{ a.datas_fname }</a>
              }
              </>
            )) }
          </IonCol>
        </IonRow>
        <br/>
        <IonText><strong>{ t('modal_detail_vehicle.detail_compartment') }</strong></IonText>
        <div className="ion-padding-top" />
        <IonGrid>
          <IonRow>
            <IonCol size="3">
                <IonText><strong>{ t('modal_detail_vehicle.comp') }</strong></IonText>
            </IonCol>
            <IonCol size="3">
                <IonText><strong>{ t('modal_detail_vehicle.tera_ulang') }</strong></IonText>
            </IonCol>
            <IonCol size="3">
                <IonText><strong>{ t('modal_detail_vehicle.kepekaan') }</strong></IonText>
            </IonCol>
            <IonCol size="3">
                <IonText><strong>{ t('modal_detail_vehicle.ruang_kosong') }</strong></IonText>
            </IonCol>
          </IonRow>
          { vehicle?.comp.map((c, index) => (
            
            <IonRow>
              <IonCol size="3">
                  <IonText>{index + 1}</IonText>
              </IonCol>
              <IonCol size="3">
                  <IonText>{ c.t2 }</IonText>
              </IonCol>
              <IonCol size="3">
                  <IonText>{ c.sensitivity }</IonText>
              </IonCol>
              <IonCol size="3">
                  <IonText>{ c.empty_space }</IonText>
              </IonCol>
            </IonRow>
          ))

          }
        </IonGrid>
        <IonToast
          cssClass={downloadStatus ? "success-toast" : "fail-toast"}
          isOpen={message !== ""}
          message={message}
          duration={5000}
          onDidDismiss={() => { setMessage("");}}
        />
      </IonContent>
    </>
  );
} 

export default connect<OwnProps, StateProps, {}>({
  mapStateToProps: (state, OwnProps) => ({
    vehicle: selectors.getVehicleDetail(state, OwnProps),
    platforms: getPlatforms(),
  }),
  component: React.memo(VehicleDetail)
});