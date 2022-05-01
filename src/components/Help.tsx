import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import './Help.css';
const Help : React.FC = () => {
  const [t, i18n] = useTranslation('common');

  return(
    <IonPage>
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="help-logo">
          <img src="assets/img/logo.png" alt="Ionic logo" />
        </div>    
        <div className="ion-padding">
          <h4>Online Delivery Info (ODI)</h4>
          <p>
          This application is a small part of a fully integrated Automation System of Pertamina and its Subsidiaries
          </p>
          <p>
            Contact developers for suggestion <br/>
            Email: <a href="mailto:support@smart-leaders.net?subject=ODI%20suggestion&amp;body=Suggestion%20for%20Online%20Delivery%20Info%20(ODI)" data-nsfw-filter-status="swf">support@smart-leaders.net</a> 
            <br/>
            Web: <a href="http://smart-leaders.net">smart-leaders.net</a>
            <br/>
            <br/>
            "Ingin lebih cepat?" Gunakanlah versi APPS di HP android anda. 
            <br/>Tutorial: <a href="https://www.youtube.com/watch?v=Xd3vGif-PMA" download>disini</a> 
            <br/>Download: <a href="http://182.23.86.216/download/apk/odi_v2_0.apk" download>disini</a>
            <br/>Demo: <a href="https://beta.odi.smart-leaders.net/" >disini</a>  
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
} 

export default Help;