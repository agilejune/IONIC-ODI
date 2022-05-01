import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { mailOutline, phonePortraitOutline, settingsOutline, location, earthOutline, person } from 'ionicons/icons';
import React from 'react';
import { useForm } from "react-hook-form";
import { User } from '../models/User';
import { connect } from '../data/connect';
import './Profile.scss';

interface OwnProps {

}

interface StateProps {
  user: User;
}

const Profile: React.FC<OwnProps & StateProps> = ({ user }) => {

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
  

  };

  const fields = [
    {
      label: "Email",
      icon: mailOutline,
      data: user.email
    },
    {
      label: "Mobile with WhatsApp",
      icon: phonePortraitOutline,
      data: user.mobile
    },
    {
      label: "Location in Maps",
      icon: location,
      data: `${user.lat_geo}/${user.log_geo}`
    },
    {
      label: "Address",
      icon: earthOutline,
      data: user.address_home
    },
    {
      label: "Owner",
      icon: person,
      data: user.owner
    },
  ]

  return (
    <IonPage id="profile-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => {}}>
                <IonIcon slot="icon-only" icon={settingsOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="profile-header">
          <div className="profile-image" style={{textAlign: 'center'}}>
            <p style={{marginTop: 150, color: 'white'}}>{user.user_name}<br/><br/>spbu</p>
          </div>
        </div>
        <div className="profile-content ion-padding">
          <form onSubmit={ handleSubmit(onSubmit) }>
            { fields.map(field => (
              <>
                <p>
                  <h3><IonIcon icon={field.icon}/> <strong>{field.label}</strong></h3>
                </p>
                <p>{field.data}</p>
                <hr/>
              </>
            ))
            }
          </form>
        </div>  
      </IonContent>
    </IonPage>
  );
}
export default connect<OwnProps, StateProps>({
  mapStateToProps: (state, OwnProps) => ({
    user: state.user.userData
  }),
  component: React.memo(Profile)
});