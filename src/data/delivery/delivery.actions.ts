import { getCheckLists, getDelivery, getDriverDetails, getFeedbacks, getJustify, getOfflineStackCount, getOrders, getTanks, getTransportLossAll, getVehicleDatails, sendCheckLists as sendCheckListsSync, sendFeedback as sendFeedbackSync, sendTransportLossFormData as sendTransportLossFormDataSync, sendOfflineStackData } from '../sync';
import { ActionType } from '../../util/types';
import { DeliveryState } from './delivery.state';
import { getLossFormOffineData } from '../sync';


export const loadData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));

  const {delivery, shipIds, driverAssistantIDs, vehicleIDs} = await getDelivery();
  dispatch(setDeliveryData(delivery));

  const order = await getOrders();
  dispatch(setOrderData(order));

  const feedback = await getFeedbacks();
  dispatch(setFeedbackData(feedback));

  const transportloss = await getTransportLossAll();
  dispatch(setTransLossData(transportloss));

  const checkList = await getCheckLists();
  dispatch(setCheckListData(checkList));

  const tank = await getTanks();
  dispatch(setTankData(tank));

  const justify = await getJustify();
  dispatch(setJustifyData(justify));

  const lossFormDataOffline = await getLossFormOffineData(shipIds);
  dispatch(setLossFormDataOffline(lossFormDataOffline));
  
  const driverDetails = await getDriverDetails(driverAssistantIDs);
  dispatch(setDriverDetails(driverDetails));

  const vehicleDetails = await getVehicleDatails(vehicleIDs);
  dispatch(setVehicleDetails(vehicleDetails));

  dispatch(setLoading(false));
}

export const sendFeedback = (data: any) => async (dispatch: React.Dispatch<any>) => {
  setSending(true);
  const { msg, responseStatus } = await sendFeedbackSync(data);
  const count = await getOfflineStackCount();
  dispatch(setWillSendCount(count));
  dispatch(setServerMessage(msg));
  dispatch(setServerResStatus(responseStatus));
  setSending(false);
}

export const sendOfflineData = () => async (dispatch: React.Dispatch<any>) => {
  await sendOfflineStackData();
  const count = await getOfflineStackCount();
  dispatch(setWillSendCount(count));
}

export const sendCheckLists = (data: any) => async (dispatch: React.Dispatch<any>) => {
  setSending(true);
  const { msg, responseStatus } = await sendCheckListsSync(data);
  const count = await getOfflineStackCount();
  dispatch(setWillSendCount(count));
  dispatch(setServerMessage(msg));
  dispatch(setServerResStatus(responseStatus));
  setSending(false);
}

export const sendTransportLossFormData = (data: any) => async (dispatch: React.Dispatch<any>) => {
  setSending(true);
  const { msg, responseStatus } = await sendTransportLossFormDataSync(data);
  const count = await getOfflineStackCount();
  dispatch(setWillSendCount(count));
  dispatch(setServerMessage(msg));
  dispatch(setServerResStatus(responseStatus));
  setSending(false);
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-delivery-loading',
  isLoading
} as const);

export const setSending = (isSending: boolean) => ({
  type: 'set-data-sending',
  isSending
} as const);

export const setServerMessage = (msg: string) => ({
  type: 'set-server-message',
  msg
} as const);

export const setServerResStatus = (status: string) => ({
  type: 'set-server-res-status',
  status
} as const);


export const setDeliveryData = (data: Partial<DeliveryState>) => ({
  type: 'set-delivery-data',
  data
} as const);

export const setOrderData = (data: Partial<DeliveryState>) => ({
  type: 'set-order-data',
  data
} as const);

export const setFeedbackData = (data: Partial<DeliveryState>) => ({
  type: 'set-feedback-data',
  data
} as const);

export const setTransLossData = (data: Partial<DeliveryState>) => ({
  type: 'set-transloss-data',
  data
} as const);

export const setCheckListData = (data: Partial<DeliveryState>) => ({
  type: 'set-checklist-data',
  data
} as const);

export const setJustifyData = (data: Partial<DeliveryState>) => ({
  type: 'set-justify-data',
  data
} as const);

export const setTankData = (data: Partial<DeliveryState>) => ({
  type: 'set-tank-data',
  data
} as const);

export const setSearchText = (searchText?: string) => ({ 
  type: 'set-search-text', 
  searchText 
} as const);

export const setWillSendCount = (count: number) => {
  console.log(`notification : ${count}`);
  return ({ 
  type: 'set-will-send-count', 
  count 
} as const)};

export const setLossFormDataOffline = (data: Partial<DeliveryState>) => ({
  type: 'set-lossform-offline',
  data
} as const);

export const setDriverDetails = (data: Partial<DeliveryState>) => ({
  type: 'set-driver-detail',
  data
} as const);

export const setVehicleDetails = (data: Partial<DeliveryState>) => ({
  type: 'set-vehicle-detail',
  data
} as const);

export type DeliveryActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setSending>
  | ActionType<typeof setDeliveryData>
  | ActionType<typeof setOrderData>
  | ActionType<typeof setFeedbackData>
  | ActionType<typeof setTransLossData>
  | ActionType<typeof setCheckListData>
  | ActionType<typeof setTankData>
  | ActionType<typeof setJustifyData>
  | ActionType<typeof setSearchText>
  | ActionType<typeof setWillSendCount>
  | ActionType<typeof setLossFormDataOffline>
  | ActionType<typeof setDriverDetails> 
  | ActionType<typeof setVehicleDetails> 
  | ActionType<typeof setServerMessage>
  | ActionType<typeof setServerResStatus>
  


