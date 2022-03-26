export interface Transportloss {
  Claim_Discrepancy: number, //0.0,
  Company: string, //TBBM PADALARANG,
  Compartment: string, //1,
  Date: string, //2020-10-06,
  Delivery_Discrepancy: number, //0.0,
  Density_Obs: number, //765.0,
  Driver: string, //Ece Sugandi,
  Driver_Assistant: string, //Sugia Purnawan,
  Height_After: number, //0.0,
  Height_Before: number, //1345.0,
  LO: string, //8057819861,
  No: string, //1,
  Product: string, //PERTALITE,
  SPBU: string, //3443309,
  Sensitivity: number, //3.508,
  State: string, //confirm,
  Temperatur_Obs: number, //30.0,
  Tolerance: number, //0.0,
  Tolerance_Discrepancy: number, //0.0,
  Ttl_Loss: number, //4020.0,
  Ttl_Loss_Claim: number, //4020.0,
  Vehicle: string, //B9274SFU,
  Vol_After: number, //3980.0,
  Vol_Before: number, //8000.0
}

export interface TransportLossCate {
  compt: string,
  lolineid: number,
  lonumber: string,
  measure_by: string,
  shipment_id: number,
  tloss_id: number,
  ttl_loss: number,
  vol_after: number,
  vol_before: number
}

export interface LossFormData {
  claim_discrepancy: number,
  compartment: number,
  datas_fname: string,
  datas_fname_atg: string,
  datas_id: number,
  datas_id_atg: number,
  delivery_discrepancy: number,
  density_15c: number,
  density_obs: number,
  height_after: number,
  height_before: number,
  lolines_ids: LoLinesID[],
  measure_by: string,
  message: string,
  sensitivity: number,
  ship_loss_id: number,
  shipment_id: number,
  state: string,
  tank_id: number,
  tank_name: string,
  temperatur_obs: number,
  tolerance: number,
  tolerance_discrepancy: number,
  ttl_loss: number,
  ttl_loss_claim: number,
  vol_after: number,
  vol_before: number,
  vol_compartment: number,
  volume_ar: number,
  volume_sales: number
}

export interface LossFormDataOffline extends LossFormData {
  conf_tolerance: string, //0.15,
  conf_tolerance_discrepancy: string,  //0.30,
  is_atg: boolean,
  is_justified: boolean,
  justify_reason: string,  //,
  lolines_id1: number, //69948226,
  lolines_id2: number, //0,
  password: string,
  spbu: string,
  treshold_ttl_loss: string,  //[0,100],
  users: string,  //dede,
}

export interface Tank {
  id: number,
  name: string
}

export interface Justify {
  id: string,
  name: string
}

interface LoLinesID {
  lo_id: string, //69948226,
  lo_number: string, //8057819861,
  lo_product: string, //PERTALITE,
  lo_volume: string //8
}