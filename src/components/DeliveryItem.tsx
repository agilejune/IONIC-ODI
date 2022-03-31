import React from 'react';
import { IonItemSliding, IonItem, IonLabel, IonRow, IonCol, IonIcon } from '@ionic/react';
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
          <IonRow>
            <IonCol size="4">
                <div style={{display : "flex"}}>
                  <h2><strong>{delivery.vehicle}</strong></h2>
                  <h5>&nbsp;/&nbsp;{delivery.volume}KL</h5>
                </div>
                <p>
                  {delivery.driver}&nbsp;/&nbsp;
                  {delivery.driver_assistant}
                </p>
            </IonCol>
            <IonCol>
              <div className="ion-float-right">
                <h5><span>{delivery.date_shipment.split(' ')[0]}</span></h5>
              </div>
            </IonCol>
          </IonRow>
        </IonLabel>
      </IonItem>
    </IonItemSliding>
  );
};

export default React.memo(DeliveryItem);