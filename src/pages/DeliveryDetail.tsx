import React, { useRef, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { Delivery } from '../models/Delivery';
import { IonButton, IonItem, IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, useIonViewDidLeave, IonIcon, IonLabel, IonModal} from '@ionic/react';
import { person, receipt, car, reload, contrast, ticket } from 'ionicons/icons';
import DriverDetail from '../components/DriverDetail';
import VehicleDetail from '../components/VehicleDetail';
import './DeliveryDetail.scss';
import TransportLoss from '../components/TransportLoss';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  delivery: Delivery;
};

interface DispatchProps {
}

type DeliveryDetailProps = OwnProps & StateProps & DispatchProps;

const DeliveryDetail: React.FC<DeliveryDetailProps> = ({ delivery }) => {
  const [showDriverDetail, setShowDriverDetail] = useState(false);
  const [showVehicleDetail, setShowVehicleDetail] = useState(false);
  const [showTransLoss, setShowTransLoss] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  return (
    <IonPage ref={pageRef} id="delivery-detail">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/delivery"></IonBackButton>
          </IonButtons>
          <IonTitle>Delivery Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonButtons onClick={() => setShowVehicleDetail(true)}>
            <IonText color="primary">
              <h5><strong>{delivery.vehicle}</strong>&nbsp;/&nbsp;<span className="">{delivery.volume}&nbsp;KL</span></h5>
            </IonText>
          </IonButtons>
          <IonRow>
            <IonCol>
              <IonButtons onClick={() => setShowDriverDetail(true)}>
                <IonIcon icon={person}></IonIcon>
                <IonLabel>{delivery.driver}</IonLabel>
              </IonButtons>
            </IonCol>
            <IonCol>
              <IonButtons className="ion-float-right">
                <IonIcon icon={car}></IonIcon>
                <IonLabel>Tracking</IonLabel>
              </IonButtons>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButtons className="ion-float-left">
                <IonIcon icon={person}></IonIcon>
                <IonLabel>{delivery.driver_assistant}</IonLabel>
              </IonButtons>
            </IonCol>
            <IonCol>
              <IonButtons className="ion-float-right">
                <IonIcon icon={car}></IonIcon>
                <IonLabel>Survey</IonLabel>
              </IonButtons>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            </IonCol>
            <IonCol>
              <IonButtons className="ion-float-right">
                <IonIcon icon={receipt}></IonIcon>
                <IonLabel>Send Feedback</IonLabel>
              </IonButtons>
            </IonCol>
          </IonRow>
          
          <h5 className="ion-padding-top"><strong>Status:</strong></h5>

          <h6>
            {delivery.company_name}&nbsp;/&nbsp;{delivery.gate_in_time}
            <br/>Gate Out: {delivery.gate_out_time}
            <br/>End Shipment: {delivery.end_shipment}
          </h6>
          <IonRow>
            <IonCol>
              <h5><strong>Last Position</strong></h5>
            </IonCol>
            <IonCol>
              <IonButton fill="outline">
                <IonIcon icon={reload}></IonIcon>
                <IonLabel>Refresh GPS</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <h5>{delivery.last_position.Jalan}</h5>
          </IonRow>
          <div>
            <h5><strong>Produk:</strong></h5>        
            { delivery.spbu_product_volume_lo !== null && delivery.spbu_product_volume_lo.split('\n').map((pro_vol) => (
                <div>
                  <IonIcon icon={contrast}></IonIcon>
                  <IonText>{pro_vol}</IonText>
                </div>
            ))}
          </div>
          <div className="ion-padding-top">
            <h6>* Urutan LO bukan merupakan urutan kompartemen produk. Pastikan kembali fisik produk yang akan dibongkar</h6>
          </div>
          <div className="ion-padding-top">
            <h5><strong>Receiving & Loss claim</strong></h5>
            <div className="transport-loss">
              <IonRow>
                <IonCol>
                  <IonButtons>
                    <IonIcon icon={car} />
                  </IonButtons>
                </IonCol>
                <IonCol>
                  <IonButtons onClick={() => setShowTransLoss(true)}>
                    <IonIcon icon={car} />
                    <IonLabel>C1:8KL</IonLabel>
                  </IonButtons>
                </IonCol>
                <IonCol>
                  <IonButtons>
                    <IonIcon icon={car} />
                    <IonLabel>C2:8KL</IonLabel>
                  </IonButtons>
                </IonCol>
                <IonCol>
                  <IonButtons>
                    <IonIcon icon={car} />
                    <IonLabel>C3:8KL</IonLabel>
                  </IonButtons>
                </IonCol>
              </IonRow>
            </div>
          </div>
          <div className="ion-padding-top">
            <h5><strong>Seal:</strong></h5>
            <IonRow>
            { delivery.seal_compiled !== null && delivery.seal_compiled.slice(0, -1).split(",").map((seal, index) => (
                <IonCol size="4">
                  <IonItem lines="none">
                    <IonIcon icon={ticket} color="warning"></IonIcon>
                    <h6>{seal}</h6>
                  </IonItem>
                </IonCol>
            ))}
            </IonRow>
          </div>

          <IonModal
            isOpen={showDriverDetail}
            onDidDismiss={() => setShowDriverDetail(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <DriverDetail driver_id={delivery.driver_id} onDismissModal={() => setShowDriverDetail(false)}></DriverDetail>
          </IonModal>

          <IonModal
            isOpen={showVehicleDetail}
            onDidDismiss={() => setShowVehicleDetail(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <VehicleDetail vehicle_id={delivery.vehicle_id} onDismissModal={() => setShowVehicleDetail(false)}></VehicleDetail>
          </IonModal>

          <IonModal
            isOpen={showTransLoss}
            onDidDismiss={() => setShowTransLoss(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLoss onDismissModal={() => setShowTransLoss(false)}></TransportLoss>
          </IonModal>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    delivery: selectors.getDelivery(state, OwnProps)
  }),
  mapDispatchToProps: {
  },
  component: withRouter(DeliveryDetail)
});
