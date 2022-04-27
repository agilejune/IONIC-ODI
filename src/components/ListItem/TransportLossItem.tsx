import React from 'react';
import { IonItemSliding, IonItem, IonLabel, IonRow, IonCol, IonIcon } from '@ionic/react';
import { Transportloss } from '../../models/Transportloss';
import { hourglassOutline, mailOpen } from 'ionicons/icons';

interface TransportLossItemProps {
  transportLoss: Transportloss;
  listType: string;
}

const TransportLossItem: React.FC<TransportLossItemProps> = ({ transportLoss, listType }) => {
  return (
    <IonItemSliding class={'transportLoss-' + listType}>
      <IonItem routerLink={`/tabs/loss/${transportLoss.LO}`}>
        <IonLabel>
          <IonRow>
            <IonCol size="1">
              <div id="loss-icon">
                <IonIcon icon={mailOpen} />
              </div>
            </IonCol>
            <IonCol size="4">
              <div style={{paddingLeft: 10}}>
                <div style={{display : "flex"}}>
                  <h2><strong>{transportLoss.LO}</strong></h2>
                  <h5>&nbsp;/&nbsp;{transportLoss.SPBU}</h5>
                </div>
                <p>
                  {transportLoss.Product}&nbsp;/&nbsp;
                  {transportLoss.Vol_Before}KL
                </p>
              </div>
            </IonCol>
            <IonCol>
              <div className="ion-float-right" style={{textAlign: 'right'}}>
                <h5><span>{transportLoss.Date}</span></h5>
                { Number(transportLoss.Ttl_Loss) > 0 &&
                <p>
                  <IonIcon icon={hourglassOutline} />
                  Loss&nbsp;{transportLoss.Ttl_Loss}&nbsp;Lt
                </p>
                }
              </div>
            </IonCol>
          </IonRow>
        </IonLabel>
      </IonItem>
    </IonItemSliding>
  );
};

export default React.memo(TransportLossItem);