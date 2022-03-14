import { createSelector } from 'reselect';
import { Delivery } from '../models/Delivery';
import { Order } from '../models/Order';
import { Transportloss } from '../models/Transportloss';
import { AppState } from './state';

const getDeliverys = (state: AppState) => [...state.delivery.ongoingDeliverys, ...state.delivery.pastDeliverys];
const getOrders = (state: AppState) => [...state.delivery.orders];
const getTransportlosses = (state: AppState) => [...state.delivery.transLossAll];

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getDelivery = createSelector(
  getDeliverys, getIdParam,
  (deliverys, id) => {
    return deliverys.find((d: Delivery) => d.shipment_id === +id);
  }
);

export const getOrder = createSelector(
  getOrders, getIdParam,
  (orders, id) => {
    return orders.find((o: Order) => o.LO_Number === id);
  }
);

export const getTransportloss = createSelector(
  getTransportlosses, getIdParam,
  (losses, id) => {
    return losses.find((l: Transportloss) => l.LO === id);
  }
);

