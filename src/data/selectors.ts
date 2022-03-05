import { createSelector } from 'reselect';
import { Delivery } from '../models/Delivery';
import { AppState } from './state';

const getDeliverys = (state: AppState) => [...state.delivery.ongoingDeliverys, ...state.delivery.pastDeliverys];
const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getDelivery = createSelector(
  getDeliverys, getIdParam,
  (deliverys, id) => {
    return deliverys.find((d: Delivery) => d.shipment_id === +id);
  }
);
