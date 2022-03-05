import React, { useRef, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { Delivery } from '../models/Delivery';
import { IonButton, IonItem, IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, useIonViewDidLeave, IonIcon, IonLabel, IonModal} from '@ionic/react';
import { person, receipt, car, reload, contrast } from 'ionicons/icons';
import DriverDetail from '../components/DriverDetail';
import VehicleDetail from '../components/VehicleDetail';

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
        <div className="ion-padding-start ion-padding-end">
          <div className="ion-padding-top">
            <IonButtons onClick={() => setShowVehicleDetail(true)}>
              <IonText color="primary">
		            <h4>{delivery.vehicle}&nbsp;/&nbsp;<span className="">{delivery.volume}&nbsp;KL</span></h4>
              </IonText>
            </IonButtons>
          </div>
          <IonRow>
            <IonCol>
              <IonButtons onClick={() => setShowDriverDetail(true)}>
                <IonItem className="ion-float-left" lines="none">
                  <IonIcon icon={person}></IonIcon>
                  <IonLabel>{delivery.driver}</IonLabel>
                </IonItem>
              </IonButtons>
            </IonCol>
            <IonCol>
              <IonItem className="ion-float-right" lines="none">
                <IonIcon icon={car}></IonIcon>
                <IonLabel>Tracking</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem className="ion-float-left" lines="none">
                <IonIcon icon={person}></IonIcon>
                <IonLabel>{delivery.driver_assistant}</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem className="ion-float-right" lines="none">
                <IonIcon icon={car}></IonIcon>
                <IonLabel>Survey</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            </IonCol>
            <IonCol>
              <IonItem className="ion-float-right" lines="none">
                <IonIcon icon={receipt}></IonIcon>
                <IonLabel>Send Feedback</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          
          <h4 className="ion-padding-top">Status:</h4>

          <h6>{delivery.company_name}&nbsp;/&nbsp;{delivery.gate_in_time}</h6>
          <h6>Gate Out: {delivery.gate_out_time}</h6>
          <h6>End Shipment: {delivery.end_shipment}</h6>
          <IonRow>
            <IonCol>
              <h6>Last Position</h6>
              <h5>{JSON.stringify(delivery.last_position)}</h5>
            </IonCol>
            <IonCol>
              <IonButton fill="outline">
                <IonIcon icon={reload}></IonIcon>
                <IonLabel>Refresh GPS</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <div>
            <h4>Produk:</h4>        
            { delivery.spbu_product_volume_lo !== null && delivery.spbu_product_volume_lo.split('\n').map((pro_vol) => (
                <IonItem lines="none">
                  <IonIcon icon={contrast}></IonIcon>
                  <IonText>{pro_vol}</IonText>
                </IonItem>
            ))}
          </div>
          <div className="ion-padding-top">
            <h5>* Urutan LO bukan merupakan urutan kompartemen produk. Pastikan kembali fisik produk yang akan dibongkar</h5>
          </div>
          <div className="ion-padding-top">
            <h4>Transport Loss</h4>
          </div>
          <div className="ion-padding-top">
            <h4>Seal:</h4>
            { delivery.seal_compiled !== null && delivery.seal_compiled.slice(0, -1).split(",").map((seal) => (
                <h5>{seal}</h5>
            ))}
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
