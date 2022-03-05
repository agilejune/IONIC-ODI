import { getDelivery } from '../dataApi';
import { ActionType } from '../../util/types';
import { DeliveryState } from './delivery.state';

export const loadDelivery = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getDelivery();
  dispatch(setDeliveryData(data));
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


export type DeliveryActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setDeliveryData>
