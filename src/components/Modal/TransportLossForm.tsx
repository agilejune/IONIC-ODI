import { getPlatforms, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import * as selectors from '../../data/selectors';
import { connect } from '../../data/connect';
import { LossFormDataOffline, Tank } from '../../models/Transportloss';
import { TextFieldTypes } from '@ionic/core';
import { sendTransportLossFormData } from '../../data/sync';
import { refreshTransportLossAll, setResInfoAfterSend, updateTransportLossOfflineData } from '../../data/data/data.actions';
import { fileDownload } from '../../data/api';

interface OwnProps {
  onDismissModal: () => void;
  moveToJustify: (data : any) => void;
  shipID: number;
  comp: number;
  measureBy: string;
  flowmeterLoId: string
}

interface StateProps {
  lossFormOfflineData: LossFormDataOffline;
  tankOptions: Tank[];
  platforms: ("ios" | "ipad" | "iphone" | "android" | "phablet" | "tablet" | "cordova" | "capacitor" | "electron" | "pwa" | "mobile" | "mobileweb" | "desktop" | "hybrid")[];
}

interface DispatchProps {
  setResInfoAfterSend: typeof setResInfoAfterSend;
  updateTransportLossOfflineData: typeof updateTransportLossOfflineData;
  refreshTransportLossAll: typeof refreshTransportLossAll;
}

const TransportLossForm : React.FC<OwnProps & StateProps & DispatchProps> = ({refreshTransportLossAll, updateTransportLossOfflineData, setResInfoAfterSend, onDismissModal, moveToJustify, lossFormOfflineData, tankOptions, measureBy, platforms, flowmeterLoId}) => {
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [message, setMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const desktop = platforms.indexOf("desktop") != -1;

  // const message = "Msg SIOD D05 : Kompartemen ini tujuan SPBU lain";
  let isValid = true;

  const downloadFile = async (url: string) => {

    const path = await fileDownload(url);
    if (path == "") {
      setDownloadStatus(false);
      setMessage("File donwload is failed");
    } 
    else {
      setDownloadStatus(true);
      setMessage(`File is downloaded to ${path}`)
    }
  }

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
      const error = `Total Loss (${ttl_loss} Liter) diluar batas kewajaran, Apakah anda yakin sudah benar memasukan data?`
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

  const onSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();

    let errorMessage = "";
    if (measureBy === "ijkbout" && (formData.height_after === "0" || formData.height_after === "" || formData.height_after === undefined)) {
      errorMessage = "Data 'Level BBM Sebelum Bongkar(mm)' yang diinput tidak boleh sama dengan 0 atau kurang dari 0, mohon check kembali nilai yang di masukan.";
    }
    // else if (measureBy === "flowmeter" && (formData.vol_after === "0" || formData.vol_after === "" || formData.vol_after === undefined)) {
    //   errorMessage = "Data 'Volume Meter (Liter)' yang diinput tidak boleh sama dengan 0 atau kurang dari 0, mohon check kembali nilai yang di masukan.";
    // }
    else if (formData.temperatur_obs === "0" || formData.temperatur_obs === "" || formData.temperatur_obs === undefined) {
      errorMessage = "'Temperature Obs' harus di isi.";
    }
    else if (formData.density_obs === "0" || formData.density_obs === "" || formData.density_obs === undefined) {
      errorMessage = "'Density Obs' harus di isi.";
    }

    if (errorMessage !== "") {
      setErrorMessage(errorMessage);
      return;
    }

    let sendFormData = formData;
    if (measureBy === "flowmeter") {
      sendFormData.lolines_id1 = flowmeterLoId;
    }
    const volBefore = getVolumeBefore(sendFormData);
    const ttlLoss = getTTLloss(sendFormData, volBefore);
    const {tolerance, ttlLossClaim} = getToleranceAndTtlLossClaim(ttlLoss, volBefore);
    const volAfter = getVolAfter(sendFormData, ttlLoss, volBefore);
    const heightAfter = getHeightAfter(sendFormData);
    const toleranceDiscrepancy = getToleranceDiscrepancy(sendFormData, volBefore);
    const claimDiscrepancy = getClaimDiscrepancy(sendFormData, toleranceDiscrepancy);

    sendFormData = {
      ...lossFormOfflineData,
      ...formData,
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
        lolines_name1: getLoName(Number(sendFormData.lolines_id1)) ?? "",
        lolines_name2: getLoName(Number(sendFormData.lolines_id2)) ?? "",
        produk: getLoProduct(Number(sendFormData.lolines_id1)) ?? getLoProduct(Number(sendFormData.lolines_id2)) ?? "",
        locmb: 0
      }
    }
    console.log(JSON.stringify(sendFormData, null, 2))
    if (!isValid) {

      if(tryCount >= 2) {
        moveToJustify(sendFormData);
        onDismissModal();
      };

      setTryCount(tryCount + 1);
      
      return;
    }
    
    // alert(JSON.stringify(data, null, 2));
    setIsSending(true);
    const {msg, responseStatus} = await sendTransportLossFormData(sendFormData);
    await updateTransportLossOfflineData(sendFormData);
    await refreshTransportLossAll();
    setIsSending(false);

    setResInfoAfterSend(msg, responseStatus);
    onDismissModal();

  }

  const [lo_ids, setLoIds] = useState<Tank[]>([]);
  
  useEffect(() => {
    let new_lo_ids = undefined;
    const myLolines_id = lossFormOfflineData.lolines_ids.filter((lo) => lo.lo_compartment === String(lossFormOfflineData.compartment));
    if (myLolines_id.length > 0) {
      new_lo_ids = myLolines_id;
    }
    else {
      new_lo_ids = lossFormOfflineData.lolines_ids.filter((lo) => lo.lo_compartment === "");
    }

    const tmp = new_lo_ids.map(id => {return {id: Number(id.lo_id), name: id.lo_number} as Tank}) as Tank[];
    setLoIds(tmp);
  }, [lossFormOfflineData]);
  
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
        disabled: lossFormOfflineData.spbu != null || measureBy === "flowmeter",
        value: measureBy !== "flowmeter" ? lossFormOfflineData.lolines_id1 : flowmeterLoId,
        options: measureBy !== "flowmeter" ? lo_ids : lo_ids.filter((lo) => lo.id === Number(flowmeterLoId))
      }
    },
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
      label: "Temperature Obs (℃)",
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
      label: "Density Obs (kg/㎥)",
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
        <form noValidate onSubmit={onSubmitData}>
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
                        <IonInput type={props.type as TextFieldTypes} value={formData[props.name!] ?? props.value} disabled={props.disabled} name={props.name!}  onIonChange={e => {setFormData({...formData, ...{[props.name!]: e.detail.value!}})}}></IonInput>
                      </IonCol>
                    }
                    { type === "select" && 
                      <IonCol size="6">
                        <IonSelect 
                        interface="popover" 
                        value={String(formData[props.name!] ?? props.value)} disabled={props.disabled} name={props.name!}onIonChange={e => {  setFormData({...formData, ...{[props.name!]: e.detail.value!}})}}>
                          {props.options!.map(option => (
                            <IonSelectOption value={String(option.id)}>
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
        {lossFormOfflineData.spbu === null && 
          <IonButton type="submit" color="primary" expand="block">
            { isSending && <IonSpinner name="bubbles" color="light" /> }
            Submit
          </IonButton>
        } 
        </form>
        <hr/>
        { lossFormOfflineData.datas_fname != null && 
        <IonRow>
          <IonCol>
            <IonText>
              <strong>Download BA</strong><br/>
              { lossFormOfflineData.datas_download != "" &&
                <>
                { desktop &&
                <a href={ lossFormOfflineData.datas_download } download>{ lossFormOfflineData.datas_fname }</a>
                }
                { !desktop &&
                <a onClick={() => {downloadFile(lossFormOfflineData.datas_download)}}>{ lossFormOfflineData.datas_fname }</a>
                }
                </>
              }
              <br/>
              { lossFormOfflineData.datas_atg_download != "" &&
                <>
                { desktop &&
                <a href={ lossFormOfflineData.datas_atg_download } download>{ lossFormOfflineData.datas_fname_atg }</a>
                }
                { !desktop &&
                <a onClick={() => {downloadFile(lossFormOfflineData.datas_atg_download)}}>{ lossFormOfflineData.datas_fname_atg }</a>
                }
                </>
              }
            </IonText>
          </IonCol>
        </IonRow>
        }
        <hr/>
        <IonRow>
          <IonCol>
            <IonText>
              <strong>Keterangan :</strong><br/>
              { measureBy === "ijkbout" && 
                <p>
                Total Loss(Liter) = (Height t2(mm) - Level BBM Sebelum Bongkar(mm)) * Kepekaan (Liter/mm)<br/><br/>
                Toleransi(Liter) = (% Toleransi * Vol Kompartemen(Liter))<br/><br/>
                Total Claim Loss(Liter) = Total Loss(Liter) - Toleransi(Liter)
                </p>
              }
              { measureBy === "flowmeter" && 
                <p>
                  Total Loss(Liter) = Volume LO (Liter) - Volume Meter (Liter)<br/>
                  <br/>
                  Total Claim Loss(Liter) = Total Loss(Liter)
                </p>
              }
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

        <IonToast
          cssClass={downloadStatus ? "success-toast" : "fail-toast"}
          isOpen={message !== ""}
          message={message}
          duration={5000}
          onDidDismiss={() => { setMessage("");}}
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
    platforms: getPlatforms(),
  }),
  mapDispatchToProps: {
    setResInfoAfterSend,
    updateTransportLossOfflineData,
    refreshTransportLossAll
  },
  component: React.memo(TransportLossForm)
});
