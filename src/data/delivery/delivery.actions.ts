import { getCheckLists, getDelivery, getFeedbacks, getJustify, getOrders, getTanks, getTransportLossAll } from '../sync';
import { ActionType } from '../../util/types';
import { DeliveryState } from './delivery.state';


export const loadData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));

  const delivery = await getDelivery();
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
  
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-delivery-loading',
  isLoading
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



export type DeliveryActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setDeliveryData>
  | ActionType<typeof setOrderData>
  | ActionType<typeof setFeedbackData>
  | ActionType<typeof setTransLossData>
  | ActionType<typeof setCheckListData>
  | ActionType<typeof setTankData>
  | ActionType<typeof setJustifyData>

