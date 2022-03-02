import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel } from '@ionic/react';
import { Delivery } from '../models/Delivery';

interface DeliveryItemProps {
  delivery: Delivery;
  listType: "ongoing" | "past";
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({ delivery, listType }) => {
  return (
    <IonItemSliding class={'delivery-' + listType}>
      <IonItem routerLink={`/tabs/delivery/${delivery.shipment_id}`}>
        <IonLabel>
          <div style={{display : "flex"}}>
            <div style={{display : "flex", width : "50%"}}>
              <h2 style={{fontWeight: "bolder"}}>{delivery.vehicle}</h2>
              <h5><span>&nbsp;/&nbsp;{delivery.volume}KL</span></h5>
            </div>
            <div style={{textAlign : "right", width : "50%"}}>
              <h5><span>{delivery.date_shipment}</span></h5>
            </div>
          </div>
          <p>
            {delivery.driver}&nbsp;/&nbsp;
            {delivery.driver_assistant}
          </p>
        </IonLabel>
      </IonItem>
    </IonItemSliding>
  );
};

export default React.memo(DeliveryItem);