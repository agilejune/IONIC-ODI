import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import { connect } from '../../data/connect';
import { useTranslation } from 'react-i18next';
import { Delivery } from '../../models/Delivery';
import { useForm } from "react-hook-form";
import { getFeedbackOptions } from '../../data/api';
import { FeedbackOption } from '../../models/Feedback';
import { setResInfoAfterSend } from '../../data/data/data.actions';
import { sendFeedback } from '../../data/sync';

interface OwnProps {
  onDismissModal: () => void;
  delivery: Delivery;
}

interface DispatchProps {
  setResInfoAfterSend: typeof setResInfoAfterSend;
}

const SendFeedback : React.FC<OwnProps & DispatchProps> = ({setResInfoAfterSend, onDismissModal, delivery}) => {
  const [isSending, setIsSending] = useState(false);
  const [t, i18n] = useTranslation('common');
  const [devSuggestions, setDevSuggestions] = useState<FeedbackOption[]>([]);
  const [complaintScopes, setComplaintScopes] = useState<FeedbackOption[]>([]);
  const [complaintCates, setComplaintCates] = useState<FeedbackOption[]>([]);

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

  const onSubmit = async (data : any) => {
  
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) value = "";
    });

    const moreData = {
      vehicle: delivery.vehicle,
      date: delivery.date_shipment,
      company_id: delivery.company_id,
      driver_code: delivery.driver_code,
      driver_assistant_code: delivery.driver_assistant_code,
      state: 1
    }
    data = {...data, ...moreData};

    // alert(JSON.stringify(data, null, 2));
    setIsSending(true);
    const {msg, responseStatus} = await sendFeedback(data);
    setIsSending(false);

    setResInfoAfterSend(msg, responseStatus);
    onDismissModal();
  };

  const ratingOptions = [
    {
      value : "A",
      option : "Sangat Baik"
    },
    {
      value : "B",
      option : "Baik"
    },
    {
      value : "C",
      option : "Cukup"
    },
    {
      value : "D",
      option : "Buruk"
    },
    {
      value : "E",
      option : "Sangat Buruk"
    }
  ];

  const changeOption = async (id: string | undefined, code: string | undefined) => {
    const options = await getFeedbackOptions(id, code);

    if (options.length == 0) return;

    if (options[0].id < 8) {
      setDevSuggestions(options);
      setComplaintScopes([]);
      setComplaintCates([]);
    }
    else if (options[0].id < 13) {
      setComplaintScopes(options);
      setDevSuggestions([]);
    }
    else {
      setComplaintCates(options);
      setDevSuggestions([]);
    }
  };

  return(
    <IonPage id="send-feedback">
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
      <IonContent className="ion-padding">
        <form onSubmit={ handleSubmit(onSubmit) }>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.nopol') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonInput disabled>{ delivery.vehicle }</IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.tgl_validasi') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonInput disabled>{ delivery.date_shipment }</IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.pengirim') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonInput {...register("sender", { required: true, minLength: { value: 4, message: "Must be 4 chars long" } })} />
              {showError("sender")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.no_telepon') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonInput type="number" {...register("mobile", { required: true })} />
              {showError("mobile")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.rating_layanan') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonSelect 
                interface="popover"
                onIonChange={e => changeOption(undefined, e.detail.value)} 
                {...register("rating", { required: true })}
              >
                { ratingOptions.map((o, index) => (
                  <IonSelectOption value={o.value} key={'rating-' + index}>{o.option}</IonSelectOption>  
                )) }
              </IonSelect>
              {showError("rating")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.saran_pengembangan') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonSelect 
                interface="popover"
                disabled={devSuggestions.length === 0}
                onIonChange={e => changeOption(e.detail.value, undefined)} 
                {...register("development_suggestions")}
              >
                { devSuggestions.map((o, index) => (
                  <IonSelectOption value={o.id} key={'development_suggestions-' + index}>{o.name}</IonSelectOption>  
                )) }
              </IonSelect>
              {showError("development_suggestions")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.lingkup_keluhan') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonSelect 
                interface="popover"
                disabled={complaintScopes.length === 0}
                onIonChange={e => changeOption(e.detail.value, undefined)} 
                {...register("complaint")}
              >
                { complaintScopes.map((o, index) => (
                  <IonSelectOption value={o.id} key={'complaint-' + index}>{o.name}</IonSelectOption>  
                )) }
              </IonSelect>
              {showError("complaint")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.kategori_keluhan') }</strong></IonText>
            </IonCol>
            <IonCol size="6">
              <IonSelect 
                interface="popover"
                disabled={complaintCates.length === 0}
                onIonChange={e => changeOption(e.detail.value, undefined)} 
                {...register("complaint_category")}
              >
                { complaintCates.map((o, index) => (
                  <IonSelectOption value={o.id} key={'complaint_category-' + index}>{o.name}</IonSelectOption>  
                )) }
              </IonSelect>
              {showError("complaint_category")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonText><strong>{ t('modal_feedback.message') }</strong></IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonTextarea {...register("message", {required: true, minLength: {value: 20, message: "Must be more than 20 letters"}})}></IonTextarea>
              {showError("message")}
            </IonCol>
          </IonRow>

          <IonButton type="submit" color="primary" expand="block">
            { isSending && <IonSpinner name="bubbles" color="light" /> }
            { t('modal_feedback.submit') }
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
} 


export default connect<OwnProps, DispatchProps>({
  mapDispatchToProps: {
    setResInfoAfterSend
  },
  component: React.memo(SendFeedback)
});