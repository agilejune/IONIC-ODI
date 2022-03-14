import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import './TransportLossAgree.scss';

interface OwnProps {
  onDismissModal: () => void;
  onSubmit: () => void
}

const TransportLossAgree : React.FC<OwnProps> = ({onDismissModal, onSubmit}) => {

  return(
    <IonPage id="transport-loss-agree-page">
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
        <IonTextarea>
          Online Delivery Info (ODI) Transport Loss adalah Aplikasi yang digunakan di lingkup bisnis PT Pertamina (Persero) untuk monitoring pengiriman BBM melalui Mobil Tangki serta untuk pelaporan dan penyelesaian claim Transport Loss yang muncul pada saat pengiriman BBM.
          Anda sebagai pengguna harus membaca, memahami, menerima dan menyetujui semua persyaratan dan ketentuan dalam Perjanjian ini sebelum menggunakan aplikasi dan/atau menerima konten yang terdapat di dalamnya. 
          Dengan mengakses atau menggunakan aplikasi ODI Transport Loss, pengguna dianggap telah memahami dan meyetujui semua isi dalam syarat dan ketentuan di bawah ini. Syarat dan ketentuan dapat diubah dan akan diinformasikan serta tercantum dalam aplikasi ODI Transport Loss.

          <br/><br/>Syarat &amp; Ketentuan

          <br/><br/>1. Semua data harus diisi dengan data yang terverifikasi secara lengkap dan benar serta tidak diperbolehkan adanya penyalahgunaan atau penyelewengan data

          <br/><br/>2. Setiap pengguna bertanggung jawab sepenuhnya terhadap password dan penggunaan akunnya. Penyalahgunaan akun oleh pihak lain di luar tanggung jawab PT Pertamina (Persero)

          <br/><br/>3. Susut minyak dihitung berdasarkan volume BBM per kompartemen dalam satuan Liter Observe yang dikirimkan ke lembaga penyalur

          <br/><br/>4. Titik serah yang digunakan dan dijadikan acuan dalam pengajuan claim losses transport loss adalah ijkbout/baut tera pada Mobil Tangki

          <br/><br/>5. Sebelum dilakukan pemeriksaan dan pengukuran BBM pada Mobil Tangki, wajib dilakukan pemeriksaan validitas dan kondisi segel yang terpasang pada Mobil Tangki (sesuai dengan langkah-langkah pembongkaran BBM di SPBU)

          <br/><br/>6. Claim losses Transport Loss yang dapat diproses oleh PT Pertamina (Persero) adalah losses pengiriman BBM diatas toleransi 0,15% dari volume BBM per kompartemen yang dikirimkan ke lembaga penyalur. Apabila terdapat kejadian losses yang masih dalam toleransi, maka tidak dapat dilakukan claim. Jika apabila terdapat kejadian losses diatas toleransi, maka dapat dilakukan claim dengan perhitungan ganti rugi setelah dikurangi dengan toleransi 0,15% dari volume BBM per kompartemen yang dikirimkan tersebut.
          <br/>7. Setiap lembaga penyalur (SPBU/SPBN/SPBUN/SPDN/SPBB/APMS) yang akan melaksanakan proses claim Transport Loss diwajibkan untuk dapat memastikan telah memenuhi beberapa hal sebagai berikut :
          <br/>&nbsp;&nbsp;&nbsp;- Pengukuran tinggi cairan BBM kompartemen Mobil Tangki di lembaga penyalur menggunakan alat ukur milik lembaga penyalur yang telah terkalibrasi dan ditera oleh pejabat yang berwenang seperti Dinas Metrologi 
          <br/>&nbsp;&nbsp;&nbsp;- Pemeriksaan losses pengiriman BBM di lembaga penyalur harus terdokumentasikan dengan lengkap dengan disaksikan oleh pihak lembaga penyalur dan Awak Mobil Tangki (AMT)

          <br/><br/>8. Setiap pelaporan claim transport loss menghasilkan Berita Acara elektronik dan dinyatakan sah serta dapat dipertanggungjawabkan

          <br/><br/>9. Setiap claim transport loss yang terbukti tidak memenuhi syarat dan ketentuan yang telah disampaikan sebelumnya, maka claim tidak dapat diproses lebih lanjut             
            
        </IonTextarea>
        <div className="ion-padding-top">
          <IonRow>
            <IonCol size="1">
              <IonCheckbox></IonCheckbox>
            </IonCol>
            <IonCol size="11">
              <IonText>
                Dengan ini saya selaku pengguna apps ODI Transport Loss menyatakan setuju atas semua syarat dan ketentuan di atas
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1">
              <IonCheckbox></IonCheckbox>
            </IonCol>
            <IonCol size="11">
              <IonText>
              Data yang diinput adalah data sebenar-benarnya dan dapat dilakukan verifikasi dan dipertanggungjawabkan
              </IonText>
            </IonCol>
          </IonRow>
        </div>
        <div className="ion-padding-top">
          <IonButton color="primary" expand="block" onClick={onSubmit}>Submit</IonButton>        
        </div>
      </IonContent>
    </IonPage>
  );
} 

export default TransportLossAgree;