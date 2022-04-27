import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as selectors from '../../data/selectors';
import { connect } from '../../data/connect';
import { LossFormDataOffline, Tank } from '../../models/Transportloss';
import { TextFieldTypes } from '@ionic/core';
import { sendTransportLossFormData } from '../../data/sync';
import { refreshTransportLossAll, setResInfoAfterSend, updateTransportLossOfflineData } from '../../data/data/data.actions';

interface OwnProps {
  onDismissModal: () => void;
  moveToJustify: (data : any) => void;
  shipID: number;
  comp: number;
  measureBy: string;
}

interface StateProps {
  lossFormOfflineData: LossFormDataOffline;
  tankOptions: Tank[];
}

interface DispatchProps {
  setResInfoAfterSend: typeof setResInfoAfterSend;
  updateTransportLossOfflineData: typeof updateTransportLossOfflineData;
  refreshTransportLossAll: typeof refreshTransportLossAll;
}

const TransportLossLjk : React.FC<OwnProps & StateProps & DispatchProps> = ({refreshTransportLossAll, updateTransportLossOfflineData, setResInfoAfterSend, onDismissModal, moveToJustify, lossFormOfflineData, tankOptions, measureBy}) => {
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tryCount, setTryCount] = useState(0);

  // const message = "Msg SIOD D05 : Kompartemen ini tujuan SPBU lain";
  let isValid = true;

  const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onSubmit",
    reValidateMode: "onChange"
	});

  const getLoVolume = (lolines_id : number) => {
    const datas = lossFormOfflineData.lolines_ids.filter((id) => Number(id.lo_id) === lolines_id);
    
    if (datas.length == 0)
      return 0;
    
    return parseInt(datas[0].lo_volume);
  }

  const getLoName = (lolines_id : number) => {
    const datas = lossFormOfflineData.lolines_ids.filter((id) => Number(id.lo_id) === lolines_id);
    
    if (datas.length == 0)
      return;
    
    return datas[0].lo_number;
  }

  const getLoProduct = (lolines_id : number) => {
    const datas = lossFormOfflineData.lolines_ids.filter((id) => Number(id.lo_id) === lolines_id);
    
    if (datas.length == 0)
      return;
    
    return datas[0].lo_product;
  }

  const getVolumeBefore = (data: any) => {
    const vol_1 = getLoVolume(Number(data.lolines_id1));
    // const vol_2 = getLoVolume(Number(data.lolines_id2));

    let vol_before = 0 as number;
    if (measureBy === 'ijkbout') {
      if (vol_1 < lossFormOfflineData.vol_compartment) {
        vol_before = vol_1;
      }
      else if (vol_1 === lossFormOfflineData.vol_compartment) {
        vol_before = lossFormOfflineData.vol_compartment;
      }
      else if (vol_1 > lossFormOfflineData.vol_compartment){
        const error = "'Total Volume LO (%s Liter) lebih besar dari Kapasitas Compartment (%s Liter), silakan periksa kembali data yang dientry' % \n(all_volbefore2,vals['vol_compartment'])";
        setErrorMessage(error);
        isValid = false;
      }
    }
    else if (measureBy === 'flowmeter') {
      vol_before = vol_1;
    }

    return vol_before;
  };

  const getTTLloss = (data: any, volBefore: number) => {
    let ttl_loss = 0 as number;
    if (measureBy === 'ijkbout') {
      ttl_loss = Number(data.height_after) >= lossFormOfflineData.height_before ? 0 : (lossFormOfflineData.height_before - Number(data.height_after)) * lossFormOfflineData.sensitivity;
    }
    else if (measureBy === 'flowmeter') {
      ttl_loss = Number(data.vol_after) >= volBefore ? 0 : volBefore - Number(data.vol_after);
    }

    const ttl_loss_min = Number((lossFormOfflineData.treshold_ttl_loss.match(/\[\d+,/g) ?? [""])[0].substring(1).slice(0, -1));
    const ttl_loss_max = Number((lossFormOfflineData.treshold_ttl_loss.match(/,\d+\]/g) ?? [""])[0].substring(1).slice(0, -1));

    if (ttl_loss < ttl_loss_min || ttl_loss > ttl_loss_max) {
      const error = "Total Loss (%s Liter) diluar batas kewajaran, Apakah anda yakin sudah benar memasukan data?"
      setErrorMessage(error);
      isValid = false;
    }

    return ttl_loss;
  }

  const getToleranceAndTtlLossClaim = (ttlLoss: number, volBefore: number) => {
    const tolerance = ttlLoss > 0 ? parseInt(lossFormOfflineData.conf_tolerance) / 100 * volBefore : 0;
    const ttl_loss_claim = ttlLoss - tolerance;

    return {tolerance: tolerance, ttlLossClaim: ttl_loss_claim}
  }

  const getVolAfter = (data: any, ttlLoss: number, volBefore: number) => {
    let vol_after = 0 as number;
    if (measureBy === 'ijkbout') {
      vol_after = volBefore - ttlLoss;
    }
    else if (measureBy === 'flowmeter') {
      vol_after = Number(data.vol_after);
    }
    return vol_after;
  }

  const getHeightAfter = (data: any) => {
    let height_after = 0 as number;
    if (measureBy === 'ijkbout') {
      height_after = Number(data.height_after);
    }
    else if (measureBy === 'flowmeter') {
      height_after = 0;
    }
    return height_after;
  }

  const getToleranceDiscrepancy = (data: any, volBefore: number) => {
    let toleranceDiscrepancy = 0 as number;
    if (Number(data.delivery_discrepancy) > 0)
      toleranceDiscrepancy = Number(lossFormOfflineData.conf_tolerance_discrepancy) * volBefore / 100;
    else 
      toleranceDiscrepancy = 0;
    
    return toleranceDiscrepancy;
  }

  const getClaimDiscrepancy = (data: any, toleranceDescrepancy: number) => {
    return Number(data.delivery_discrepancy) - toleranceDescrepancy;
  }

  const onSubmitData = async (data: any) => {
    const volBefore = getVolumeBefore(data);
    const ttlLoss = getTTLloss(data, volBefore);
    const {tolerance, ttlLossClaim} = getToleranceAndTtlLossClaim(ttlLoss, volBefore);
    const volAfter = getVolAfter(data, ttlLoss, volBefore);
    const heightAfter = getHeightAfter(data);
    const toleranceDiscrepancy = getToleranceDiscrepancy(data, volBefore);
    const claimDiscrepancy = getClaimDiscrepancy(data, toleranceDiscrepancy);
    
    data = {
      ...lossFormOfflineData,
      ...data,
      ...{
        vol_after: volAfter,
        height_after: heightAfter,
        tolerance_discrepancy: toleranceDiscrepancy,
        claim_discrepancy: claimDiscrepancy,
        vol_before: volBefore,
        ttl_loss: ttlLoss,
        tolerance: tolerance,
        ttl_loss_claim: ttlLossClaim,
        measure_by: measureBy,
        compartment: lossFormOfflineData.compartment,
        lolines_name1: getLoName(Number(data.lolines_id1)) ?? "",
        lolines_name2: getLoName(Number(data.lolines_id2)) ?? "",
        produk: getLoProduct(Number(data.lolines_id1)) ?? getLoProduct(Number(data.lolines_id2)) ?? "",
        locmb: 0
      }
    }
    console.log(JSON.stringify(data, null, 2))
    if (!isValid) {

      if(tryCount >= 2) {
        moveToJustify(data);
        onDismissModal();
      };

      setTryCount(tryCount + 1);
      
      return;
    }
    
    // alert(JSON.stringify(data, null, 2));
    setIsSending(true);
    const {msg, responseStatus} = await sendTransportLossFormData(data);
    await updateTransportLossOfflineData(data);
    await refreshTransportLossAll();
    setIsSending(false);

    setResInfoAfterSend(msg, responseStatus);
    onDismissModal();
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
        disabled: lossFormOfflineData.spbu != null,
        value: lossFormOfflineData.lolines_id1,
        options: lo_ids
      }
    },
    // {
    //   visible: lossFormOfflineData.state !== 'confirm',
    //   type: "select",
    //   label: "Lo Number",
    //   props: {
    //     name: "lolines_id2",
    //     interface: "popover",
    //     disabled: lossFormOfflineData.state === 'confirm',
    //     value: lossFormOfflineData.lolines_id2,
    //     options: lo_ids
    //   }
    // },
    {
      visible: lossFormOfflineData.spbu != null,
      type: "text",
      label: "Vol Kompartemen(Liter) / Kepekaan \n(Liter/mm)",
      props: {
        value: `:${lossFormOfflineData.vol_before}/${lossFormOfflineData.sensitivity}`
      }
    },
    {
      visible: lossFormOfflineData.spbu != null,
      type: "text",
      label: "Height T2(mm)",
      props: {
        value: `:${lossFormOfflineData.height_before}`
      }
    },
    {
      visible: measureBy == "ijkbout",
      type: "input",
      label: "Level BBM Sebelum\nBongkar(mm)",
      props: {
        name: "height_after",
        type: "number",
        disabled: lossFormOfflineData.spbu != null,
        value: lossFormOfflineData.height_after
      }
    },
    {
      visible: measureBy == "flowmeter",
      type: "input",
      label: "Volume Meter (Liter)",
      props: {
        name: "vol_after",
        type: "number",
        disabled: lossFormOfflineData.spbu != null,
        value: lossFormOfflineData.vol_after
      }
    },
    {
      visible: lossFormOfflineData.spbu != null,
      type: "text",
      label: "Total Loss(Liter) / Toleransi(Liter)",
      props: {
        value: `:${lossFormOfflineData?.ttl_loss}/${lossFormOfflineData?.tolerance}`
      }
    },
    {
      visible: lossFormOfflineData.spbu != null,
      type: "text",
      label: "Total Claim Loss(Liter)",
      props: {
        value: `:${lossFormOfflineData?.ttl_loss_claim}`
      }
    },
    {
      visible: lossFormOfflineData.spbu != null,
      type: "text",
      label: "Vol Level SPBU(Liter)",
      props: {
        value: `:${lossFormOfflineData?.vol_after}`
      }
    },
    {
      visible: true,
      type: "input",
      label: "Delivery Discrepancy\n(Liter)",
      props: {
        name: "delivery_discrepancy",
        type: "number",
        disabled: lossFormOfflineData.spbu != null,
        value: lossFormOfflineData.delivery_discrepancy
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
        disabled: lossFormOfflineData.spbu != null,
        value: lossFormOfflineData.tank_id,
        options: tankOptions
      }
    },
    {
      visible: true,
      type: "input",
      label: "Volume AR (Liter)",
      props: {
        name: "volume_ar",
        type: "number",
        disabled: lossFormOfflineData.spbu != null,
        value: lossFormOfflineData.volume_ar
      }
    },
    {
      visible: true,
      type: "input",
      label: "Volume Sales (Liter)",
      props: {
        name: "volume_sales",
        type: "number",
        disabled: lossFormOfflineData.spbu != null,
        value: lossFormOfflineData.volume_sales
      }
    },
    {
      visible: lossFormOfflineData.spbu != null,
      type: "text",
      label: "Threshold Discrepancy(Liter)",
      props: {
        value: `:${lossFormOfflineData.tolerance_discrepancy}`
      }
    },
    {
      visible: lossFormOfflineData.spbu != null,
      type: "text",
      label: "Claim Discrepancy(Liter)",
      props: {
        value: `:${lossFormOfflineData.claim_discrepancy}`
      }
    },
    {
      visible: true,
      type: "input",
      label: "Temperature Obs ()",
      props: {
        name: "temperatur_obs",
        type: "number",
        disabled: lossFormOfflineData.spbu != null,
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
        disabled: lossFormOfflineData.spbu != null,
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
                        <IonSelect 
                        interface="popover" 
                        value={props.value} disabled={props.disabled} {...register(props.name!)}>
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
          <IonButton type="submit" color="primary" expand="block">
            { isSending && <IonSpinner name="bubbles" color="light" /> }
            Submit
          </IonButton>
        } 
        </form>
        <hr/>
        <IonRow>
          <IonCol>
            <IonText>
              <strong>Keterangan :</strong><br/>
              Total Loss(Liter) = (Height t2(mm) - Level BBM Sebelum Bongkar(mm)) * Kepekaan (Liter/mm)<br/><br/>
              Toleransi(Liter) = (% Toleransi * Vol Kompartemen(Liter))<br/><br/>
              Total Claim Loss(Liter) = Total Loss(Liter) - Toleransi(Liter)
            </IonText>
          </IonCol>
        </IonRow>

        <IonToast
          cssClass="fail-toast"
          isOpen={errorMessage !== ""}
          message={errorMessage}
          duration={5000}
          onDidDismiss={() => setErrorMessage("")}
        />
      </IonContent>
    </IonPage>
  );
} 

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    lossFormOfflineData: selectors.getLossFormOfflineData(state, OwnProps),
    tankOptions: state.data.tanks,
    isSending: state.data.dataSending,
  }),
  mapDispatchToProps: {
    setResInfoAfterSend,
    updateTransportLossOfflineData,
    refreshTransportLossAll
  },
  component: React.memo(TransportLossLjk)
});
