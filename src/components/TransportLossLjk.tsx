import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { LossFormDataOffline, Tank } from '../models/Transportloss';
import './TransportLossLjk.scss';
import { TextFieldTypes } from '@ionic/core';
import { sendTransportLossFormData } from '../data/sync';

interface OwnProps {
  onDismissModal: () => void;
  onSubmit: () => void;
  shipID: number;
  comp: number;
  measureBy: string;
}

interface StateProps {
  lossFormOfflineData: LossFormDataOffline;
  tankOptions: Tank[];
}

const TransportLossLjk : React.FC<OwnProps & StateProps & {}> = ({onDismissModal, onSubmit, lossFormOfflineData, tankOptions, measureBy}) => {
  const [volBefore, setVolBefore] = useState(0);
  const [ttlLoss, setTtlLoss] = useState(0);
  const [ttlLossClaim, setTtlLossClaim] = useState(0);
  const [tolerance, setTolerance] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onSubmit",
    reValidateMode: "onChange"
	});

  const calculateVolumeBefore = (data: any) => {
    const vol_1 = parseInt(lossFormOfflineData.lolines_ids.filter((id) => id.lo_id === data.lolines_id1)[0].lo_volume);
    const vol_2 = parseInt(lossFormOfflineData.lolines_ids.filter((id) => id.lo_id === data.lolines_id2)[0].lo_volume);

    let vol_before = 0 as number;
    if (measureBy === 'ijkbout') {
      if (vol_1 + vol_2 < lossFormOfflineData.vol_compartment) {
        vol_before = vol_1 + vol_2;
      }
      else if (vol_1 + vol_2 === lossFormOfflineData.vol_compartment) {
        vol_before = lossFormOfflineData.vol_compartment;
      }
      else if (vol_1 + vol_2 > lossFormOfflineData.vol_compartment){
        const error = "'Total Volume LO (%s Liter) lebih besar dari Kapasitas Compartment (%s Liter), silakan periksa kembali data yang dientry' % \n(all_volbefore2,vals['vol_compartment'])";
        setErrorMessage(error);
      }
    }
    else if (measureBy === 'flowmeter') {
      vol_before = vol_1 + vol_2;
    }

    setVolBefore(vol_before);
  };

  const calculateTTLloss = (data: any) => {
    let ttl_loss = 0 as number;
    if (measureBy === 'ijkbout') {
      ttl_loss = data.height_after >= lossFormOfflineData.height_before ? 0 : (lossFormOfflineData.height_before - data.height_after) * lossFormOfflineData.sensitivity;
    }
    else if (measureBy === 'flowmeter') {
      ttl_loss = data.vol_after >= volBefore ? 0 : volBefore - data.vol_after;
    }

    const ttl_loss_min = lossFormOfflineData.treshold_ttl_loss.match(/\[\d,/g);
    const ttl_loss_max = lossFormOfflineData.treshold_ttl_loss.match(/,\d\]/g);
    if (ttl_loss_min != null && ttl_loss_max != null && (ttl_loss < parseInt(ttl_loss_min[0]) || ttl_loss > parseInt(ttl_loss_max[0]))) {
      const error = "Total Loss (%s Liter) diluar batas kewajaran, Apakah anda yakin sudah benar memasukan data?"
      setErrorMessage(error);
    }

    setTtlLoss(ttl_loss);
  }

  const calculateTolerance = () => {
    const tolerance = ttlLoss > 0 ? parseInt(lossFormOfflineData.conf_tolerance) / 100 * volBefore : 0;
    setTolerance(tolerance);
    const ttl_loss_claim = ttlLoss - tolerance;
    setTtlLossClaim(ttl_loss_claim);
  }

  const onSubmitData = (data: any) => {
    alert(JSON.stringify(data, null, 2));
    calculateVolumeBefore(data);
    calculateTTLloss(data);
    calculateTolerance();
    
    if (errorMessage !== "") return;
    
    data = {
      ...data,
      shipment_id: lossFormOfflineData.shipment_id,
      vol_before: volBefore,
      ttl_loss: ttlLoss,
      tolerance: tolerance,
      ttl_loss_claim: ttlLossClaim
    }
    
    sendTransportLossFormData(data);
  }
  
  const lo_ids = lossFormOfflineData.lolines_ids.map(id => {return {id: Number(id.lo_id), name: id.lo_number} as Tank}) as Tank[];
  
  const fields = [
    {
      visible: true,
      type: "input",
      label: "Pengukuran\nMenggunakan",
      props: {
        name: "measure_by",
        type: "text",
        disabled: true,
        value: measureBy
      }
    },
    {
      visible: true,
      type: "input",
      label: "Kompartemen",
      props: {
        name: "compartment",
        type: "text",
        disabled: true,
        value: lossFormOfflineData.compartment
      }
    },
    {
      visible: true,
      type: "select",
      label: "Lo Number",
      props: {
        name: "lolines_id1",
        interface: "popover",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.lolines_id1,
        options: lo_ids
      }
    },
    {
      visible: lossFormOfflineData.state === 'confirm',
      type: "select",
      label: "Lo Number",
      props: {
        name: "lolines_id2",
        interface: "popover",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.lolines_id2,
        options: lo_ids
      }
    },
    {
      visible: lossFormOfflineData.state === 'confirm',
      type: "text",
      label: "Vol Kompartemen(Liter) / Kepekaan \n(Liter/mm)",
      props: {
        value: `:${lossFormOfflineData.vol_before}/${lossFormOfflineData.sensitivity}`
      }
    },
    {
      visible: lossFormOfflineData.state === 'confirm',
      type: "text",
      label: "Height T2(mm)",
      props: {
        value: `:${lossFormOfflineData.height_before}`
      }
    },
    {
      visible: true,
      type: "input",
      label: "Level BBM Sebelum\nBongkar(mm)",
      props: {
        name: "height_after",
        type: "number",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.height_after
      }
    },
    {
      visible: lossFormOfflineData.state === 'confirm',
      type: "text",
      label: "Total Loss(Liter) / Toleransi(Liter)",
      props: {
        value: `:${lossFormOfflineData?.ttl_loss}/${lossFormOfflineData?.tolerance}`
      }
    },
    {
      visible: lossFormOfflineData.state === 'confirm',
      type: "text",
      label: "Total Claim Loss(Liter)",
      props: {
        value: `:${lossFormOfflineData?.ttl_loss_claim}`
      }
    },
    {
      visible: lossFormOfflineData.state === 'confirm',
      type: "text",
      label: "Vol Level SPBU(Liter)",
      props: {
        value: `:${lossFormOfflineData?.vol_after}`
      }
    },
    {
      visible: true,
      type: "description",
      props: {
        value: "* Untuk SPBU dengan program ATG sebagai custody transfer"
      }
    },
    {
      visible: true,
      type: "description",
      props: {
        value: "* Discrepancy diinput dengan tanda (-) jika loss, dan tanda (+) jika gain"
      }
    },
    {
      visible: true,
      type: "select",
      label: "Tank ID",
      props: {
        name: "tank_id",
        interface: "popover",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.tank_id,
        options: tankOptions
      }
    },
    {
      visible: true,
      type: "input",
      label: "Volume AR (Liter)",
      props: {
        name: "volume_after",
        type: "number",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.volume_ar
      }
    },
    {
      visible: true,
      type: "input",
      label: "Delivery Discrepancy\n(Liter)",
      props: {
        name: "delivery_discrepancy",
        type: "number",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.delivery_discrepancy
      }
    },
    {
      visible: true,
      type: "input",
      label: "Claim Discrepancy(Liter)",
      props: {
        name: "claim_discrepancy",
        type: "number",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.claim_discrepancy
      }
    },
    {
      visible: true,
      type: "input",
      label: "Temperature Obs ()",
      props: {
        name: "temperatur_obs",
        type: "number",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.temperatur_obs
      }
    },
    {
      visible: true,
      type: "input",
      label: "Density Obs ()",
      props: {
        name: "density_obs",
        type: "number",
        disabled: lossFormOfflineData.state === 'confirm',
        value: lossFormOfflineData.density_obs
      }
    },
  ];

  return(
    <IonPage id="transport-loss-ljk-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Form Transport Loss</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={ handleSubmit(onSubmitData) }>
        {
          fields.map((field, index) => {
            const { visible, type, label, props} = field;

            return (
              <>
              { visible &&
              <IonRow key={`form_field_${index}`}>
                { type !== "description" && 
                  <>
                    <IonCol size="6">
                      <IonText>
                        { label }
                      </IonText>
                    </IonCol>
                    { type === "input" && 
                      <IonCol size="6">
                        <IonInput type={props.type as TextFieldTypes} value={props.value} disabled={props.disabled} {...register(props.name!)}></IonInput>
                      </IonCol>
                    }
                    { type === "select" && 
                      <IonCol size="6">
                        <IonSelect interface="popover" value={props.value} disabled={props.disabled} {...register(props.name!)}>
                          {props.options!.map(option => (
                            <IonSelectOption value={option.id}>
                              {option.name}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonCol>
                    }
                    { type === "text" && 
                      <IonCol size="6">
                        <IonText>{props.value}</IonText>
                      </IonCol>
                    }
                  </>
                  }
                  { type === "description" &&
                    <IonText>{props.value}</IonText>
                  }
              </IonRow>
              }
              </>
            );
          })
        }
        {lossFormOfflineData.state !== "confirm" &&
          <IonButton type="submit" color="primary" expand="block" onClick={onSubmit}>Submit</IonButton>
        } 
        </form>
        <IonToast
          isOpen={errorMessage !== ""}
          message={errorMessage}
          duration={2000}
          onDidDismiss={() => setErrorMessage("")}
        />
      </IonContent>
    </IonPage>
  );
} 

export default connect<OwnProps, StateProps, {}>({
  mapStateToProps: (state, OwnProps) => ({
    lossFormOfflineData: selectors.getLossFormOfflineData(state, OwnProps),
    tankOptions: state.delivery.tanks
  }),
  component: React.memo(TransportLossLjk)
});
