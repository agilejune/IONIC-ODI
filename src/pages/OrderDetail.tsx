import React, { useEffect, useRef, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { Order } from '../models/Order';
import { IonButton, IonItem, IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, useIonViewDidLeave, IonIcon, IonLabel, IonModal} from '@ionic/react';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  order: Order;
};

interface DispatchProps {
}

type OrderDetailProps = OwnProps & StateProps & DispatchProps;

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const[orderDetail, setOrderDetail] = useState([] as {label : string, data : string | number}[]);

  useEffect(() => {
    const o = [
      { 
        label: "SPBU:",
        data: order.SPBU
      },
      { 
        label: "TBBM:",
        data: order.Company
      },
      { 
        label: "Product",
        data: order.Product
      },
      { 
        label: "Quantity:",
        data: order.Volume
      },
      { 
        label: "Tgl. Data dibuat:",
        data: order.Plann_Date
      },
      { 
        label: "Rencana Kirim:",
        data: ""
      },
      { 
        label: "SPBU:",
        data: order.SPBU
      },
      { 
        label: "Shift:",
        data: order.Shift
      },
      { 
        label: "Status:",
        data: order.Status
      }
    ];
   
    setOrderDetail(o);
  }, [order]);
  return (
    <IonPage id="order-detail">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/order"></IonBackButton>
          </IonButtons>
          <IonTitle>Order Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonLabel><strong>{order.LO_Number}</strong></IonLabel>
          <IonText></IonText>
          <div className="ion-padding-top">
            <IonLabel><strong>Info:</strong></IonLabel>
          </div>
          { orderDetail.map(d => {
            return (
            <IonRow>
              <IonCol size="5">
                <IonText>{d.label}</IonText>
              </IonCol>
              <IonCol size="7">
                <IonText>{d.data}</IonText>
              </IonCol>
            </IonRow>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    order: selectors.getOrder(state, OwnProps)
  }),
  mapDispatchToProps: {
  },
  component: withRouter(OrderDetail)
});