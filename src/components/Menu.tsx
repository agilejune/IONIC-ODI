import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle} from '@ionic/react';
import { camera, pin, chatbox, basket, archiveOutline, help, logOut, person } from 'ionicons/icons';

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
  isAuthenticated: boolean;
}

interface DispatchProps { }

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ history, isAuthenticated }) => {
  const location = useLocation();
  const [t, i18n] = useTranslation('common');
  
  const routes = {
  
    deliveryPages: [
      { title: t('menus.delivery'), path: '/tabs/delivery', icon: archiveOutline },
      { title: t('menus.your_orders'), path: '/tabs/order', icon: basket },
      { title: t('menus.message_from_us'), path: '/tabs/message', icon: chatbox },
      { title: t('menus.transport_loss'), path: '/tabs/loss', icon: pin },
      { title: t('menus.transport_loss_qrcode'), path: '/tabs/scan_rqcode', icon: camera },
    ],
    operationInfoPages: [
      { title: t('menus.stock'), path: '/account', icon: person },
      { title: t('menus.sales'), path: '/support', icon: help },
      { title: t('menus.gain_loss'), path: '/logout', icon: logOut }
    ],
    accountPages: [
      { title: t('menus.help_feedback'), path: '/account', icon: person },
      { title: 'Profile', path: '/support', icon: help },
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
    <IonMenu  type="overlay" disabled={!isAuthenticated} contentId="main">
      <IonContent forceOverscroll={false}>
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
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
  }),
  component: withRouter(Menu)
})
