import React from 'react';
import { IonItemSliding, IonItem, IonLabel, IonRow, IonCol, IonIcon } from '@ionic/react';
import { Order } from '../../models/Order';
import { invertMode } from 'ionicons/icons';

interface OrderItemProps {
  order: Order;
  listType: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, listType }) => {
  const toYYYYMMDD = (gmtDate: string) => {
    return gmtDate !== "" ? new Date(gmtDate).toISOString().split('T')[0] : "";
  };

  return (
    <IonItemSliding class={'order-' + listType}>
      <IonItem routerLink={`/tabs/order/${order.LO_Number}`}>
        <IonLabel>
          <IonRow>
            <IonCol size="1">
              <div id={order.Status == "Closed" ? "order-close-icon" : "order-open-icon"}>
                <IonIcon icon={invertMode} />
              </div>
            </IonCol>
            <IonCol size="4">
              <div style={{paddingLeft: 10}}>
                <div style={{display : "flex"}}>
                  <h2><strong>{order.LO_Number}</strong></h2>
                  <h5>&nbsp;/&nbsp;{order.SPBU}</h5>
                </div>
                <p>
                  {order.Product}&nbsp;/&nbsp;
                  {order.Volume}KL
                </p>
              </div>
            </IonCol>
            <IonCol>
              <div className="ion-float-right">
                <h5><span>{toYYYYMMDD(order.Plann_Date)}</span></h5>
              </div>
            </IonCol>
          </IonRow>
        </IonLabel>
      </IonItem>
    </IonItemSliding>
  );
};

export default React.memo(OrderItem);