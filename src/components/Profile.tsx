import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonPopover, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { mailOutline, phonePortraitOutline, settingsOutline, location, earthOutline, person, arrowBack, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { User } from '../models/User';
import { connect } from '../data/connect';
import './Profile.scss';
import { sendChangedPassword } from '../data/sync';
import { setServerMessage, setServerResStatus } from '../data/data/data.actions';

interface OwnProps {

}

interface StateProps {
  user: User;
}

interface DispatchProps {
  setServerMessage: typeof setServerMessage;
  setServerResStatus: typeof setServerResStatus;
}

const Profile: React.FC<OwnProps & StateProps & DispatchProps> = ({ user, setServerMessage, setServerResStatus }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [popoverMenuEvent, setPopoverMenuEvent] = useState<MouseEvent>();
  const [showChangePassForm, setShowChangePassForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassError, setCurrentPassError] = useState(" ");
  const [newPassError, setNewPassError] = useState(" ");
  const [confirmPassError, setConfirmPassError] = useState(" ");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const presentMenu = (e: React.MouseEvent) => {
    setPopoverMenuEvent(e.nativeEvent);
    setShowMenu(true);
  };

  const sendNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    const comparedNewPassword = newPassword === confirmPassword;
    if (!comparedNewPassword) {
      setNewPassError("password is not matched");
      return;
    }

    setIsSending(true);
    const {msg, responseStatus} = await sendChangedPassword({current_password: currentPassword, new_password: newPassword});
    setIsSending(false);

    setServerMessage(msg);
    setServerResStatus(responseStatus);

    // if (responseStatus == "S") {
      setShowChangePassForm(false);
    // }
  }

  const initChangePasswordForm = () => {
    setConfirmPassError("");
    setNewPassError("");
    setCurrentPassError("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setShowCurrentPassword(false);
    setNewPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
  }

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
              { !showChangePassForm &&
                <IonMenuButton></IonMenuButton>
              }
              { showChangePassForm &&
                <IonButton onClick={() => {setShowChangePassForm(false);}}>
                  <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                </IonButton>
              }
            </IonButtons>
            <IonTitle>{ showChangePassForm ? "Change Password" : "Profile" }</IonTitle>
            <IonButtons slot="end">
              { !showChangePassForm &&
                <IonButton onClick={presentMenu}>
                  <IonIcon slot="icon-only" icon={settingsOutline}></IonIcon>
                </IonButton>
              }
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="profile-header">
          <div className="profile-image" style={{textAlign: 'center'}}>
            <p style={{marginTop: 150, color: 'white'}}>{user.user_name}<br/><br/>spbu</p>
          </div>
        </div>
        <div className="profile-content ion-padding">
          { !showChangePassForm && fields.map(field => (
              <>
                <p>
                  <h3><IonIcon icon={field.icon}/> <strong>{field.label}</strong></h3>
                </p>
                <p>{field.data}</p>
                <hr/>
              </>
            ))
            }
          { showChangePassForm && 
          <form onSubmit={ sendNewPassword }>
            <div className="ion-padding-top">
              <IonLabel>Current Password</IonLabel>
              <IonItem>
                <IonInput type={showCurrentPassword ? "text" : "password"} value={currentPassword} onIonChange={e => setCurrentPassword(e.detail.value!)}  onIonFocus={() => setCurrentPassError("")}>
                  </IonInput>
                <IonIcon icon={showCurrentPassword ? eyeOutline : eyeOffOutline} onClick={() => setShowCurrentPassword(!showCurrentPassword)}></IonIcon>
              </IonItem>
              <IonText>{currentPassError}</IonText>
            </div>
            <div className="ion-padding-top">
              <IonLabel>New Password</IonLabel>
              <IonItem>
                <IonInput type={showNewPassword ? "text" : "password"} value={newPassword} onIonChange={e => setNewPassword(e.detail.value!)} onIonFocus={() => setNewPassError("")}>
                  </IonInput>
                <IonIcon icon={showNewPassword ? eyeOutline : eyeOffOutline} onClick={() => setShowNewPassword(!showNewPassword)}></IonIcon>
              </IonItem>
            </div>
            <div className="ion-padding-top">
              <IonLabel>Confirm Password</IonLabel>
              <IonItem>
                <IonInput type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} onIonFocus={() => setNewPassError("")}>
                  </IonInput>
                <IonIcon icon={showConfirmPassword ? eyeOutline : eyeOffOutline} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></IonIcon>
              </IonItem>
              <IonText>{newPassError}</IonText>
            </div>
            <div className="ion-padding-top">
              <IonButton type="submit" color="primary" expand="block">
                { isSending && <IonSpinner name="bubbles" color="light" /> }
                submit
              </IonButton>
            </div>
          </form>
          }
        </div>
      </IonContent>
      <IonPopover
        isOpen={showMenu}
        event={popoverMenuEvent}
        onDidDismiss={() => setShowMenu(false)}
      >
        <IonList>
          <IonItem button onClick={() => {setShowChangePassForm(true); setShowMenu(false); initChangePasswordForm();}}>
            <IonLabel>Change Password</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonPage>
  );
}
export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    user: state.user.userData
  }),
  mapDispatchToProps: {
    setServerMessage,
    setServerResStatus
  },
  component: React.memo(Profile)
});