import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Delivery } from '../models/Delivery';
import { useForm } from "react-hook-form";

interface OwnProps {
  onDismissModal: () => void;
  delivery: Delivery;
}

const SendFeedback : React.FC<OwnProps> = ({onDismissModal, delivery}) => {
  const [t, i18n] = useTranslation('common');
  
  const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onSubmit",
    reValidateMode: "onChange"
	});

  const showError = (_fieldName: any) => {
    return (
      errors[_fieldName] && (
        <div
          style={{
            color: "red",
            padding: 5,
            paddingLeft: 12,
            fontSize: "smaller"
          }}
        >
          {errors[_fieldName].message || "This field is required"}
        </div>
      )
    );
  };
  const onSubmit = (data : any) => {
    alert(JSON.stringify(data, null, 2));
  }
  return(
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{ t('modal_feedback.title') }</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={ onDismissModal }>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={ handleSubmit(onSubmit) }>

          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.nopol') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonInput disabled>{ delivery.vehicle }</IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.tgl_validasi') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonInput disabled>{ delivery.date_shipment }</IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.pengirim') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonInput {...register("sender", { required: true, minLength: { value: 4, message: "Must be 4 chars long" } })} />
              {showError("sender")}
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.no_telepon') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonInput {...register("mobile", { required: true })} />
              {showError("mobile")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.rating_layanan') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonSelect {...register("rating", { required: true })}>
                <IonSelectOption value="aasss">adsfdsaf</IonSelectOption>
              </IonSelect>
              {showError("rating")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.saran_pengembangan') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonSelect name="development_suggestions"></IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.lingkup_keluhan') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonSelect name="complaint"></IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.kategori_keluhan') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonSelect name="complaint_category"></IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText><strong>{ t('modal_feedback.message') }</strong></IonText>
            </IonCol>
            <IonCol>
              <IonTextarea name="message"></IonTextarea>
            </IonCol>
          </IonRow>
          <IonButton type="submit" color="primary" expand="block">{ t('modal_feedback.submit') }</IonButton>
        </form>
      </IonContent>
    </>
  );
} 

export default SendFeedback;