import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { aperture, closeOutline, flag } from 'ionicons/icons';
import React, { Dispatch, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from '../data/connect';
import { setResInfoAfterSend } from '../data/delivery/delivery.actions';
import { sendTransportLossFormData } from '../data/sync';
import { Justify } from '../models/Transportloss';
import './TransportLossJustify.scss';

interface OwnProps {
  onDismissModal: () => void;
  calcData: any;
}

interface StateProps {
  justifyOptions: Justify[];
}

interface DispatchProps {
  setResInfoAfterSend: typeof setResInfoAfterSend;
}

const TransportLossJustify : React.FC<OwnProps & StateProps & DispatchProps> = ({setResInfoAfterSend, onDismissModal, justifyOptions, calcData}) => {
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onSubmit",
    reValidateMode: "onChange"
	});

  const [check, setCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitData = async (data: any) => {
    if (!check) {
      setErrorMessage("must check box");
      return;
    }
    if (data.password !== calcData.password) {
      setErrorMessage("wrong password");
      return;
    }
    data = {...calcData, ...data, ...{is_justified: "True"}};
    // alert(JSON.stringify(data, null, 2));
    setIsSending(true);
    const {msg, responseStatus} = await sendTransportLossFormData(data);
    setIsSending(false);

    setResInfoAfterSend(msg, responseStatus);
    onDismissModal();
  }
  return(
    <IonPage id="transport-loss-justify-page">
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
        <hr/>
        <br/>
        <form onSubmit={ handleSubmit(onSubmitData) }>
          <IonText>
            <h5><strong>VERIFIKASI</strong></h5>
            <h6>Apahkah anda sudah yakin nilai yang diinput sudah sesuai dengan sebenarnya ?</h6>
          </IonText>
          <div className="ion-padding-top">
            <IonLabel><h5><strong>Justify Reason</strong></h5></IonLabel>
            <IonSelect 
            interface="popover" 
            {...register("justify_reason", {required: true})}>
              {
                justifyOptions.map((option, index) => (
                  <IonSelectOption key={`justify-option-${index}`} value={option.id}>{option.name}</IonSelectOption>
                ))
              }
            </IonSelect>
          </div>
          <div className="ion-padding-top">
            <IonLabel><h5><strong>Petugas</strong></h5></IonLabel>
            <IonInput {...register("users", {required: true})}></IonInput>
          </div>
          <div className="ion-padding-top">
            <IonLabel><h5><strong>Password (PIN_Supir)</strong></h5></IonLabel>
            <IonInput type="password" {...register("password", {required: true})}></IonInput>
          </div>
          <hr/>
          <div className="ion-padding-top">
            <IonRow>
                <IonCol size="1">
                  <IonCheckbox onIonChange={e=> setCheck(e.detail.checked)}></IonCheckbox>
                </IonCol>
                <IonCol size="11">
                  <IonText>
                    saya telah membaca dan menyatakan bahwa data tersebut adalah benar.
                  </IonText>
                </IonCol>
            </IonRow>
          </div>
          <div className="ion-padding-top">
            <IonButton type="submit" color="primary" expand="block">
              { isSending && <IonSpinner name="bubbles" color="light" /> }
              Submit
            </IonButton>
          </div>
        </form>
        <IonToast
          cssClass="fail-toast"
          isOpen={errorMessage !== ""}
          message={errorMessage}
          duration={5000}
          onDidDismiss={() => setErrorMessage("")}
        />
      </IonContent>
    </IonPage>
  );
} 

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    justifyOptions: state.delivery.justify,
  }),
  mapDispatchToProps: {
    setResInfoAfterSend
  },
  component: React.memo(TransportLossJustify)
});