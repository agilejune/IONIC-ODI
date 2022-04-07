import React, { useEffect, useState,} from 'react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { Transportloss } from '../models/Transportloss';
import { IonText, IonRow, IonCol, IonToolbar, IonBackButton, IonButtons, IonPage, IonTitle, IonHeader, IonContent, IonLabel } from '@ionic/react';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  transportloss: Transportloss;
};

interface DispatchProps {
}

type TransportlossDetailProps = OwnProps & StateProps & DispatchProps;

const TransportlossDetail: React.FC<TransportlossDetailProps> = ({ transportloss }) => {
  const[shipments, setShipments] = useState([] as {label : string, data : string}[]);
  const[losses, setLosses] = useState([] as {label : string, data : string | number}[]);

  useEffect(() => {
    const s = [
      { 
        label: "Tanggal:",
        data: transportloss.Date
      },
      { 
        label: "Nopol:",
        data: transportloss.Vehicle
      },
      { 
        label: "Supir/Kernet",
        data: `${transportloss.Driver}/${transportloss.Driver_Assistant}`
      },
      { 
        label: "TBBM:",
        data: transportloss.Company
      },
      { 
        label: "SPBU:",
        data: transportloss.SPBU
      }
    ];
    
    const l = [
      { 
        label: "Compartment:",
        data: transportloss.Compartment
      },
      { 
        label: "LO Number:",
        data: transportloss.LO
      },
      { 
        label: "Product",
        data: transportloss.Product
      },
      { 
        label: "Vol Compartment(Lt):",
        data: transportloss.Vol_Before
      },
      { 
        label: "Kepekaan (Lt/mm):",
        data: transportloss.Sensitivity
      },
      { 
        label: "Height T2 (mm):",
        data: transportloss.Height_Before
      },
      { 
        label: "Level BBM Sbl Bongkar(mm):",
        data: transportloss.Height_After
      },
      { 
        label: " ",
        data: " "
      },
      { 
        label: "Total Loss(Lt):",
        data: transportloss.Ttl_Loss
      },
      { 
        label: "Toleransi(Lt):",
        data: transportloss.Tolerance
      },
      { 
        label: "Total Claim Loss(Lt):",
        data: transportloss.Ttl_Loss_Claim
      },
      { 
        label: "Vol Level SPBU(Lt):",
        data: transportloss.Vol_After
      }
    ];

    setShipments(s);
    setLosses(l);
  }, [transportloss]);
 
  return (
    <IonPage id="transportloss-detail">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/transportloss"></IonBackButton>
          </IonButtons>
          <IonTitle>Transport Loss Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
        <div className="ion-padding-top">
          <IonLabel><strong>Info:</strong></IonLabel>
        </div>
        <div className="ion-padding-top">
          <IonLabel><strong>Shipment</strong></IonLabel>
        </div>
        {shipments.length > 0 && shipments.map(s => {
          return (
          <IonRow>
            <IonCol size="5">
              <IonText>{s.label}</IonText>
            </IonCol>
            <IonCol size="7">
              <IonText>{s.data}</IonText>
            </IonCol>
          </IonRow>
          );
        })}
        <div className="ion-padding-top">
          <IonLabel><strong>Transport Loss</strong></IonLabel>
        </div>
        {losses.length > 0 && losses.map(l => {
          return (
          <IonRow>
            <IonCol size="5">
              <IonText>{l.label}</IonText>
            </IonCol>
            <IonCol size="7">
              <IonText>{l.data}</IonText>
            </IonCol>
          </IonRow>
          );
        })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    transportloss: selectors.getTransportloss(state, OwnProps)
  }),
  mapDispatchToProps: {
  },
  component: withRouter(TransportlossDetail)
});
