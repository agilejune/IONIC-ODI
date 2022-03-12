import { getDelivery, getFeedbacks, getOrders, getTransportLossAll } from '../dataApi';
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


export type DeliveryActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setDeliveryData>
  | ActionType<typeof setOrderData>
  | ActionType<typeof setFeedbackData>
  | ActionType<typeof setTransLossData>
