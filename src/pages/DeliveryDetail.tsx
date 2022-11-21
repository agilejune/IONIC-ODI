import React, { useEffect, useRef, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { Delivery } from '../models/Delivery';
import { IonButton, IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, IonIcon, IonLabel, IonModal, IonToast, IonItem} from '@ionic/react';
import { person, receipt, car, reload, contrast, ticket, navigateCircleOutline, callOutline, chatboxEllipsesOutline } from 'ionicons/icons';
import DriverDetail from '../components/Modal/DriverDetail';
import VehicleDetail from '../components/Modal/VehicleDetail';
import './DeliveryDetail.scss';
import TransportLossAgree from '../components/Modal/TransportLossAgree';
import TransportLossQuery from '../components/Modal/TransportLossQuery';
import TransportLoss from '../components/Modal/TransportLoss';
import TransportLossForm from '../components/Modal/TransportLossForm';
import TransportLossMeter from '../components/Modal/TransportLossMeter';
import TransportLossJustify from '../components/Modal/TransportLossJustify';
import { CheckList } from '../models/CheckList';
import { useTranslation } from "react-i18next";
import SendFeedback from '../components/Modal/Feedback';
import { LossFormDataOffline } from '../models/Transportloss';
import WebViewModal from '../components/Modal/WebViewModal';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  delivery: Delivery;
  checkLists: CheckList[];
  responseStatus: string;
  message: string;
  lossFormOfflineDatas: LossFormDataOffline[];
};

type DeliveryDetailProps = OwnProps & StateProps;

const DeliveryDetail: React.FC<DeliveryDetailProps> = ({ delivery, checkLists, responseStatus, message, lossFormOfflineDatas, /*setServerResStatus, setServerMessage*/ }) => {
  const [showDriverDetail, setShowDriverDetail] = useState(false);
  const [showVehicleDetail, setShowVehicleDetail] = useState(false);
  const [showTransLossAgree, setShowTransLossAgree] = useState(false);
  const [showTransLossQuery, setShowTransLossQuery] = useState(false);
  const [showTransLoss, setShowTransLoss] = useState(false);
  const [showTransLossForm, setShowTransLossForm] = useState(false);
  const [showTransLossMeter, setShowTransLossMeter] = useState(false);
  const [showTransLossJustify, setShowTransLossJustify] = useState(false);
  const [showSendFeedback, setShowSendFeedback] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewTitle, setWebViewTitle] = useState("");
  const [url, setUrl] = useState("");
  const [measureBy, setMeasureBy] = useState("");
  const [comp, setComp] = useState(0);
  const [compartments, setCompartments] = useState<any[]>();
  const [transLossCalcData, setTransLossCalcData] = useState<any>();
  const [driverAssistantID, setDriverAssistantID] = useState(0);
  const [flowmeterLoId, setFlowmeterLoId] = useState("");
  const pageRef = useRef<HTMLElement>(null);
  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    let comps = lossFormOfflineDatas
      .filter((d: LossFormDataOffline) => d.shipment_id == delivery.shipment_id)[0]
      .lolines_ids.map((lo) => lo.lo_compartment);
    
    let vacancy = false;
    comps.forEach(comp => {
      if (comp === "") 
        vacancy = true;
    })
    if (vacancy) {
      comps = ["1", "2", "3"];
    } 
    else {
      comps.sort();
    }
    
    setCompartments(comps);
  }, [delivery, lossFormOfflineDatas]);

  const checkCompEnteredAndOpen = (comp : number) => {
    setComp(comp);
    
    const data = lossFormOfflineDatas
      .filter((d: LossFormDataOffline) => d.shipment_id == delivery.shipment_id && d.compartment == Number(comp))[0] as LossFormDataOffline;

    if (data.measure_by == null) {
      setShowTransLossAgree(true);
    }
    else {
      setMeasureBy(data.measure_by);
      if (data.measure_by === "ijkbout")
        setShowTransLossForm(true);
      else if (data.measure_by === "flowmeter")
        setShowTransLossMeter(true);
    }
  }

  const openMap = (lat: string, lng: string) => {
    const origin = delivery.company_lat_geo + ',' + delivery.company_log_geo;
    const destination = lat + ',' + lng;
    const label = encodeURI('My Label');
	  window.open('geo:' + origin + '?q=' + destination);
  }

  const openWACall = (mobile_number: string) => {
    window.open(`https://api.whatsapp.com/send?phone=${mobile_number}`)
  }

  const openWAText = (mobile_number: string) => {
    window.open(`https://api.whatsapp.com/send?phone=${mobile_number}`)
  }

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
      <IonContent className="ion-padding">
        <IonButtons onClick={() => setShowVehicleDetail(true)}>
          <IonText>
            <h5><strong>{delivery.vehicle}</strong>&nbsp;/&nbsp;<span className="">{delivery.volume}&nbsp;KL</span></h5>
          </IonText>
        </IonButtons>
        <IonRow>
          <IonCol size="8">
            <IonButtons 
                onClick={() => { 
                  setShowDriverDetail(true); 
                  setDriverAssistantID(delivery.driver_id); }
                }
              >
              <IonLabel><IonIcon icon={person}/>{delivery.driver}</IonLabel>
            </IonButtons>
          </IonCol>
          <IonCol>
            <IonButtons 
              className="ion-float-right"
              onClick={() => { 
                setUrl(delivery.url_tracking); 
                setShowWebView(true);
                setWebViewTitle("Online Delivery Info / Tracking"); }
              }
            >
              <IonLabel><IonIcon icon={car} />{ t('pages_delivery.tracking') }</IonLabel>
            </IonButtons>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="8">
            <IonButtons 
              className="ion-float-left"
              onClick={() => { 
                setShowDriverDetail(true); 
                setDriverAssistantID(delivery.driver_assistant_id); }
              }
            >
              <IonLabel><IonIcon icon={person} />{delivery.driver_assistant}</IonLabel>
            </IonButtons>
          </IonCol>
          <IonCol>
            <IonButtons 
              className="ion-float-right"
              onClick={() => { 
                setUrl(delivery.url_survey); 
                setShowWebView(true);
                setWebViewTitle("Online Delivery Info / Survey"); }
              }
            >
              <IonLabel><IonIcon icon={car} />{ t('pages_delivery.survey') }</IonLabel>
            </IonButtons>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          </IonCol>
          <IonCol>
            <IonButtons className="ion-float-right" onClick={() => setShowSendFeedback(true)}>
              <IonLabel><IonIcon icon={receipt} />{ t('pages_delivery.send_feedback') }</IonLabel>
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
          <IonCol size="8">
            <h5><strong>{ t('pages_delivery.last_position') }:</strong></h5>
          </IonCol>
          <IonCol size="4">
            <IonButton fill="outline" className="ion-float-right">
              <IonIcon icon={reload}></IonIcon>
              <p style={{fontSize: 12}}>Refresh GPS</p>
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
          <h5><strong>Destination:</strong></h5>        
          { delivery.spbu_compiled_detail !== null && delivery.spbu_compiled_detail.map((detail) => (
              <IonRow>
                <IonCol size="8">
                  <IonText>{detail.spbu},{detail.address_home}</IonText>
                </IonCol>
                <IonCol size="4">
                  <IonIcon 
                    icon={navigateCircleOutline} 
                    style={{fontSize: 24}}
                    onClick={() => openMap(detail.lat_geo, detail.log_geo)}/>
                  <IonIcon 
                    icon={callOutline} 
                    style={{fontSize: 24, paddingLeft: 5}}
                    onClick={() => openWACall(detail.mobile)}/>
                  <IonIcon 
                    icon={chatboxEllipsesOutline} 
                    style={{fontSize: 24, paddingLeft: 5}}
                    onClick={() => openWAText(detail.mobile)}/>
                </IonCol>
              </IonRow>
          ))}
        </div>
        <div className="ion-padding-top">
          <h5><strong>Receiving & Loss claim</strong></h5>
          <IonRow>
            <IonButtons>
              <IonButton>
                <IonLabel>
                  <i className="zmdi zmdi-truck zmdi-hc-flip-horizontal zmdi-hc-2x mdc-text-red" />
                </IonLabel>
              </IonButton>
              { compartments?.map(comp => (
                <IonButton onClick={() => { checkCompEnteredAndOpen(comp)}}>
                  <IonLabel><i className="zmdi zmdi-gas-station zmdi-hc-2x" /><span>C{comp}:8KL</span></IonLabel>
                </IonButton>
            ))}
            </IonButtons>
          </IonRow>
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
          isOpen={showWebView}
          onDidDismiss={() => setShowWebView(false)}
          swipeToClose={true}
          presentingElement={pageRef.current!}
        >
          <WebViewModal url={url} title={webViewTitle}  onDismissModal={() => setShowWebView(false)}></WebViewModal>
        </IonModal>

        <IonModal
          isOpen={showDriverDetail}
          onDidDismiss={() => setShowDriverDetail(false)}
          swipeToClose={true}
          presentingElement={pageRef.current!}
        >
          <DriverDetail driver_id={driverAssistantID} onDismissModal={() => setShowDriverDetail(false)}></DriverDetail>
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
          <TransportLoss 
            onLjk={() => {
              setShowTransLossForm(true); 
              setShowTransLoss(false); 
              setMeasureBy('ijkbout');
              }} 
            onMeter={() => {
              setShowTransLossMeter(true);
              setShowTransLoss(false);
              setMeasureBy('flowmeter')
              }} 
            onDismissModal={() => setShowTransLoss(false)}>
          </TransportLoss>
        </IonModal>

        <IonModal
          isOpen={showTransLossForm}
          onDidDismiss={() => setShowTransLossForm(false)}
          swipeToClose={true}
          presentingElement={pageRef.current!}
        >
          <TransportLossForm measureBy={measureBy} comp={comp} shipID={delivery.shipment_id} flowmeterLoId={flowmeterLoId} moveToJustify={data => {setShowTransLossJustify(true); setTransLossCalcData(data);} } onDismissModal={() => setShowTransLossForm(false)}></TransportLossForm>
        </IonModal>
        <IonModal
          isOpen={showTransLossMeter}
          onDidDismiss={() => setShowTransLossMeter(false)}
          swipeToClose={true}
          presentingElement={pageRef.current!}
        >
          <TransportLossMeter measureBy={measureBy} comp={comp} shipID={delivery.shipment_id} onOpenLossForm={(lo_id) => {setShowTransLossForm(true); setShowTransLossMeter(false); setFlowmeterLoId(lo_id)}} onDismissModal={() => setShowTransLossMeter(false)}></TransportLossMeter>
        </IonModal>

        <IonModal
          isOpen={showTransLossJustify}
          onDidDismiss={() => setShowTransLossJustify(false)}
          swipeToClose={true}
          presentingElement={pageRef.current!}
        >
          <TransportLossJustify calcData={transLossCalcData} onDismissModal={() => setShowTransLossJustify(false)}></TransportLossJustify>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps>({
  mapStateToProps: (state, OwnProps) => ({
    delivery: selectors.getDelivery(state, OwnProps),
    checkLists: state.data.checkLists,
    message: state.data.message,
    responseStatus: state.data.responseStatus,
    lossFormOfflineDatas: state.data.transFormOfflineDatas,
  }),
  component: withRouter(DeliveryDetail)
});
