import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonSpinner, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { CheckList } from '../models/CheckList';
import './TransportLossQuery.scss';
import { useForm } from 'react-hook-form';
import { setResInfoAfterSend, setSending } from '../data/delivery/delivery.actions';
import { connect } from '../data/connect';
import { sendCheckLists } from '../data/sync';

interface OwnProps {
  onDismissModal: () => void;
  onSubmit: () => void;
  checkLists: CheckList[];
  comp: number;
  shipid: number;
}

interface DispatchProps {
  setResInfoAfterSend: typeof setResInfoAfterSend;
}

interface StateProps {
  isSending: boolean;
}

const TransportLossQuery : React.FC<OwnProps & DispatchProps & StateProps> = ({setResInfoAfterSend, onDismissModal, onSubmit, checkLists, comp, shipid}) => {
  const [isSending, setIsSending] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onSubmit",
    reValidateMode: "onChange"
	});

  const onSubmitForm = async (data : any) => {
    let formData = {};
    
    checkLists.map(list => {
      let tmp = {};

      Object.entries(data).forEach(([key, value]) => {
        const id_string = key.match(/_\d+_/g);
  
        if (id_string != null) {
          const id = Number(id_string[0].substring(1).slice(0,-1));
          if (id === list.id) {
            if (
              list.question_ids[0].type === "textbox" ||
              (list.question_ids[0].type === "simple_choice" && typeof value !== "string")
            ) {
              tmp = {
                ...tmp,
                [key]: value
              };
            }
          }
        }
      });

      formData = {
        ...formData,
        [list.id.toString()]: tmp
      };
    });

    const submitData = {
      comp: comp,
      survey_id: 7,
      pages: formData,
      shipid: shipid,
    }

    // alert(JSON.stringify(submitData, null, 2));
    setIsSending(true);
    const {msg, responseStatus } = await sendCheckLists(submitData);
    setIsSending(false);

    setResInfoAfterSend(msg, responseStatus);
    onSubmit();
  };

  return(
    <IonPage id="transport-loss-query-page">
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
        <form onSubmit={ handleSubmit(onSubmitForm) }>
          <div className="ion-padding-top">
            {checkLists.map(list => {
              return (
                <>
                  <div className="label-section">
                    <IonLabel><strong>{list.title}</strong></IonLabel>
                  </div>
                  <div className='ion-padding-top'>
                    {list.question_ids.map(q => {
                      return (
                        <>
                          {q.type === "textbox" && 
                            <>
                              <IonText><strong>{q.question}</strong></IonText>
                              <IonInput {...register(`7_${list.id}_${q.id}`)} />
                            </>
                          }
                          {q.type === "simple_choice" && 
                            <IonRow>
                              <IonCol size="1">
                                <IonCheckbox
                                  {...register(`7_${list.id}_${q.id}`)} 
                                  value={q.label_ids[0].id}
                                />
                              </IonCol>
                              <IonCol size="11">
                                <IonText>{q.question}</IonText>
                              </IonCol>
                            </IonRow>
                          }
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <div className="ion-padding-top">
            <IonButton type="submit" color="primary" expand="block">
              { isSending && <IonSpinner name="bubbles" color="light" /> }
              Submit
            </IonButton>        
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
} 

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    isSending: state.delivery.dataSending,
  }),
  mapDispatchToProps: {
    setResInfoAfterSend,
  },
  component: React.memo(TransportLossQuery)
});