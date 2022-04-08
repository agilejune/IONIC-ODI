import React, { useRef, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { Delivery } from '../models/Delivery';
import { IonButton, IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, IonIcon, IonLabel, IonModal} from '@ionic/react';
import { person, receipt, car, reload, contrast, ticket } from 'ionicons/icons';
import DriverDetail from '../components/DriverDetail';
import VehicleDetail from '../components/VehicleDetail';
import './DeliveryDetail.scss';
import TransportLossAgree from '../components/TransportLossAgree';
import TransportLossQuery from '../components/TransportLossQuery';
import TransportLoss from '../components/TransportLoss';
import TransportLossLjk from '../components/TransportLossLjk';
import TransportLossMeter from '../components/TransportLossMeter';
import TransportLossJustify from '../components/TransportLossJustify';
import { CheckList } from '../models/CheckList';
import { useTranslation } from "react-i18next";
import SendFeedback from '../components/Feedback';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  delivery: Delivery;
  checkLists: CheckList[];
};

interface DispatchProps {
}

type DeliveryDetailProps = OwnProps & StateProps & DispatchProps;

const DeliveryDetail: React.FC<DeliveryDetailProps> = ({ delivery, checkLists }) => {
  const [showDriverDetail, setShowDriverDetail] = useState(false);
  const [showVehicleDetail, setShowVehicleDetail] = useState(false);
  const [showTransLossAgree, setShowTransLossAgree] = useState(false);
  const [showTransLossQuery, setShowTransLossQuery] = useState(false);
  const [showTransLoss, setShowTransLoss] = useState(false);
  const [showTransLossLjk, setShowTransLossLjk] = useState(false);
  const [showTransLossMeter, setShowTransLossMeter] = useState(false);
  const [showTransLossJustify, setShowTransLossJustify] = useState(false);
  const [showSendFeedback, setShowSendFeedback] = useState(false);
  const [comp, setComp] = useState(0);
  const pageRef = useRef<HTMLElement>(null);
  const [t, i18n] = useTranslation('common');


  return (
    <IonPage ref={pageRef} id="delivery-detail">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/delivery"></IonBackButton>
          </IonButtons>
          <IonTitle>{ t('pages_delivery.title_detail') }</IonTitle>
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
                <IonLabel>{ t('pages_delivery.tracking') }</IonLabel>
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
                <IonLabel>{ t('pages_delivery.survey') }</IonLabel>
              </IonButtons>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            </IonCol>
            <IonCol>
              <IonButtons className="ion-float-right" onClick={() => setShowSendFeedback(true)}>
                <IonIcon icon={receipt}></IonIcon>
                <IonLabel>{ t('pages_delivery.send_feedback') }</IonLabel>
              </IonButtons>
            </IonCol>
          </IonRow>
          
          <h5 className="ion-padding-top"><strong>{ t('pages_delivery.status') }:</strong></h5>

          <h6>
            {delivery.company_name}&nbsp;/&nbsp;{delivery.gate_in_time}
            <br/>Gate Out: {delivery.gate_out_time}
            <br/>End Shipment: {delivery.end_shipment}
          </h6>
          <IonRow>
            <IonCol>
              <h5><strong>{ t('pages_delivery.last_position') }:</strong></h5>
            </IonCol>
            <IonCol>
              <IonButton fill="outline" className="ion-float-right">
                <IonIcon icon={reload}></IonIcon>
                <IonLabel>Refresh GPS</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <h5>{delivery.last_position.Jalan}</h5>
          </IonRow>
          <div>
            <h5><strong>{ t('pages_delivery.produk') }:</strong></h5>        
            { delivery.spbu_product_volume_lo !== null && delivery.spbu_product_volume_lo.split('\n').map((pro_vol) => (
                <div>
                  <IonIcon icon={contrast}></IonIcon>
                  <IonText>{pro_vol}</IonText>
                </div>
            ))}
          </div>
          <div className="ion-padding-top">
            <h6>{ t('pages_delivery.produk_info') }</h6>
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
                  <IonButtons onClick={() => { setShowTransLossAgree(true); setComp(1)}}>
                    <IonIcon icon={car} />
                    <IonLabel>C1:8KL</IonLabel>
                  </IonButtons>
                </IonCol>
                <IonCol>
                  <IonButtons onClick={() => { setShowTransLossAgree(true); setComp(2)}}>
                    <IonIcon icon={car} />
                    <IonLabel>C2:8KL</IonLabel>
                  </IonButtons>
                </IonCol>
                <IonCol>
                  <IonButtons onClick={() => { setShowTransLossAgree(true); setComp(3)}}>
                    <IonIcon icon={car} />
                    <IonLabel>C3:8KL</IonLabel>
                  </IonButtons>
                </IonCol>
              </IonRow>
            </div>
          </div>
          <div className="ion-padding-top">
            <h5><strong>{ t('pages_delivery.seal') }:</strong></h5>
            <IonRow>
            { delivery.seal_compiled !== null && delivery.seal_compiled.slice(0, -1).split(",").map((seal, index) => (
                <IonCol size="4">
                  <IonLabel>
                    <IonIcon icon={ticket} color="warning"></IonIcon>
                    <IonText>{seal}</IonText>
                  </IonLabel>
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
            isOpen={showSendFeedback}
            onDidDismiss={() => setShowSendFeedback(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <SendFeedback delivery={delivery} onDismissModal={() => setShowSendFeedback(false)}></SendFeedback>
          </IonModal>

          <IonModal
            isOpen={showTransLossAgree}
            onDidDismiss={() => setShowTransLossAgree(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLossAgree onSubmit={() => {setShowTransLossQuery(true); setShowTransLossAgree(false);}} onDismissModal={() => setShowTransLossAgree(false)}></TransportLossAgree>
          </IonModal>

          <IonModal
            isOpen={showTransLossQuery}
            onDidDismiss={() => setShowTransLossQuery(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLossQuery shipid={delivery.shipment_id} comp={comp} checkLists={checkLists} onSubmit={() => {setShowTransLoss(true); setShowTransLossQuery(false);}} onDismissModal={() => setShowTransLossQuery(false)}></TransportLossQuery>
          </IonModal>

          <IonModal
            isOpen={showTransLoss}
            onDidDismiss={() => setShowTransLoss(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLoss onLjk={() => {setShowTransLossLjk(true); setShowTransLoss(false);}} onMeter={() => {setShowTransLossMeter(true);setShowTransLoss(false);}} onDismissModal={() => setShowTransLoss(false)}></TransportLoss>
          </IonModal>

          <IonModal
            isOpen={showTransLossLjk}
            onDidDismiss={() => setShowTransLossLjk(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLossLjk comp={comp} shipID={delivery.shipment_id} onSubmit={() => {setShowTransLossJustify(true); setShowTransLossLjk(false);}} onDismissModal={() => setShowTransLossLjk(false)}></TransportLossLjk>
          </IonModal>
          <IonModal
            isOpen={showTransLossMeter}
            onDidDismiss={() => setShowTransLossMeter(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLossMeter onOpenLjk={() => {setShowTransLossLjk(true); setShowTransLossMeter(false);}} onDismissModal={() => setShowTransLossMeter(false)}></TransportLossMeter>
          </IonModal>

          <IonModal
            isOpen={showTransLossJustify}
            onDidDismiss={() => setShowTransLossJustify(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <TransportLossJustify onDismissModal={() => setShowTransLossJustify(false)}></TransportLossJustify>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    delivery: selectors.getDelivery(state, OwnProps),
    checkLists: state.delivery.checkLists
  }),
  mapDispatchToProps: {
  },
  component: withRouter(DeliveryDetail)
});
