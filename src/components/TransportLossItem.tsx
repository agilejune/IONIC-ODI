import React from 'react';
import { IonItemSliding, IonItem, IonLabel } from '@ionic/react';
import { Transportloss } from '../models/Transportloss';

interface TransportLossItemProps {
  transportLoss: Transportloss;
  listType: string;
}

const TransportLossItem: React.FC<TransportLossItemProps> = ({ transportLoss, listType }) => {
  return (
    <IonItemSliding class={'transportLoss-' + listType}>
      <IonItem routerLink={`/tabs/loss/${transportLoss.LO}`}>
        <IonLabel>
          <div style={{display : "flex"}}>
            <div style={{display : "flex", width : "50%"}}>
              <h2 style={{fontWeight: "bolder"}}>{transportLoss.LO}</h2>
              <h5><span>&nbsp;/&nbsp;{transportLoss.SPBU}</span></h5>
            </div>
            <div style={{textAlign : "right", width : "50%"}}>
              <h5><span>{transportLoss.Date}</span></h5>
            </div>
          </div>
          <p>
            {transportLoss.Product}&nbsp;/&nbsp;
            {transportLoss.Vol_Before}KL
          </p>
        </IonLabel>
      </IonItem>
    </IonItemSliding>
  );
};

export default React.memo(TransportLossItem);