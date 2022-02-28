import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle} from '@ionic/react';
import { camera, pin, chatbox, basket, archiveOutline, help,  logIn, logOut, person, personAdd, send } from 'ionicons/icons';

import { connect } from '../data/connect';

import './Menu.css'

const routes = {
  deliveryPages: [
    { title: 'Delivery', path: '/tabs/delivery', icon: archiveOutline },
    { title: 'Your Orders', path: '/tabs/orders', icon: basket },
    { title: 'Message From Us', path: '/tabs/message', icon: chatbox },
    { title: 'Transport Loss', path: '/tabs/loss', icon: pin },
    { title: 'TLoss Scan RQCode', path: '/tabs/scan_rqcode', icon: camera },
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

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
    <IonMenu  type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>DELIVERY INFO</IonListHeader>
          {renderlistItems(routes.deliveryPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    // menuEnabled: state.data.menuEnabled
  }),
  component: withRouter(Menu)
})
