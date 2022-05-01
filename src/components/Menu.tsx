import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonTitle, IonToolbar} from '@ionic/react';
import { camera, pin, chatbox, basket, archiveOutline, help, logOut, person, swapVerticalOutline, alarmOutline, readerOutline, alarm, reader, archive, water } from 'ionicons/icons';

import { connect } from '../data/connect';

import { useTranslation } from "react-i18next";

import './Menu.css'

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  isLoggedin: boolean;
  userName: string;
}

interface DispatchProps { }

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ history, isLoggedin, userName }) => {
  const location = useLocation();
  const [t, i18n] = useTranslation('common');
  
  const routes = {
  
    deliveryPages: [
      { title: t('menus.delivery'), path: '/tabs/delivery', icon: archive },
      { title: t('menus.your_orders'), path: '/tabs/order', icon: basket },
      { title: t('menus.message_from_us'), path: '/tabs/message', icon: chatbox },
      { title: t('menus.transport_loss'), path: '/tabs/loss', icon: water },
      { title: t('menus.transport_loss_qrcode'), path: '/scan_rqcode', icon: camera },
    ],
    operationInfoPages: [
      { title: t('menus.stock'), path: '/stock', icon: alarm },
      { title: t('menus.sales'), path: '/sales', icon: reader },
      { title: t('menus.gain_loss'), path: '/gain_loss', icon: swapVerticalOutline }
    ],
    accountPages: [
      { title: t('menus.help_feedback'), path: '/help_feedback', icon: help },
      { title: 'Profile', path: '/profile', icon: person },
      { title: 'Logout', path: '/logout', icon: logOut }
    ],
  };

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!isLoggedin} contentId="main">
      {/* <IonHeader no-border>
        <IonToolbar>
          <IonTitle> 
            <div className="menu-logo">
              <img src="assets/img/logo.png" alt="Ionic logo" /> 
              <h6>{userName}</h6>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent forceOverscroll={false}>
        <IonToolbar>
          <IonTitle> 
            <div className="menu-logo">
              <img src="assets/img/logo.png" alt="Ionic logo" /> 
              <h6>{userName}</h6>
            </div>
          </IonTitle>
        </IonToolbar>
        <div className="menu-list">
        <IonList lines="none">
          <IonListHeader>{ t('menus.title_1') }</IonListHeader>
          {renderlistItems(routes.deliveryPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>{ t('menus.title_2') }</IonListHeader>
          {renderlistItems(routes.operationInfoPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>{ t('menus.title_3') }</IonListHeader>
          { renderlistItems(routes.accountPages) }
        </IonList>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isLoggedin: state.user.isLoggedin,
    userName: state.user.user_name,
  }),
  component: withRouter(Menu)
})
