import React from 'react';
import { IonItemSliding, IonItem, IonLabel } from '@ionic/react';
import { Order } from '../models/Order';

interface OrderItemProps {
  order: Order;
  listType: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, listType }) => {
  return (
    <IonItemSliding class={'order-' + listType}>
      <IonItem routerLink={`/tabs/order/${order.LO_Number}`}>
        <IonLabel>
          <div style={{display : "flex"}}>
            <div style={{display : "flex", width : "50%"}}>
              <h2 style={{fontWeight: "bolder"}}>{order.LO_Number}</h2>
              <h5><span>&nbsp;/&nbsp;{order.SPBU}</span></h5>
            </div>
            <div style={{textAlign : "right", width : "50%"}}>
              <h5><span>{order.Plann_Date}</span></h5>
            </div>
          </div>
          <p>
            {order.Product}&nbsp;/&nbsp;
            {order.Volume}KL
          </p>
        </IonLabel>
      </IonItem>
    </IonItemSliding>
  );
};

export default React.memo(OrderItem);