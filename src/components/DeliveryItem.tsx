import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Delivery } from '../models/Delivery';

interface DeliveryItemProps {
  delivery: Delivery;
  listType: "ongoing" | "past";
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({ delivery, listType }) => {
  return (
    <IonItemSliding class={'delivery-' + listType}>
      {console.log(`delivery-item : ${delivery}`)}
      <IonItem routerLink={`/tabs/delivery/${delivery.shipment_id}`}>
        <IonLabel>
          <h3>{delivery.vehicle}</h3>
          <span>&nbsp;/&nbsp;{delivery.volume}KL</span>
          <span>{delivery.date_shipment}</span>
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