import { createSelector } from 'reselect';
import { Delivery } from '../models/Delivery';
import { Driver } from '../models/Driver';
import { Feedback } from '../models/Feedback';
import { Order } from '../models/Order';
import { LossFormDataOffline, Transportloss } from '../models/Transportloss';
import { Vehicle } from '../models/Vehicle';
import { AppState } from './state';

const getAllDeliverys = (state: AppState) => [...state.data.ongoingDeliverys, ...state.data.pastDeliverys];
const getOngoingDeliverys = (state: AppState) => [...state.data.ongoingDeliverys];
const getPastDeliverys = (state: AppState) => [...state.data.pastDeliverys];
const getOrders = (state: AppState) => [...state.data.orders];
const getTransportlosses = (state: AppState) => [...state.data.transLossAll];
const getFeedbacks = (state: AppState) => [...state.data.feedbacks]
const getSearchText = (state: AppState) => state.data.searchText;
const getLossFormOfflineDatas = (state: AppState) => state.data.transFormOfflineDatas;
const getDriverDetails = (state: AppState) => state.data.drivers;
const getVehicleDatails = (state: AppState) => state.data.vehicles;

const getShipId = (_state: AppState, props: any) => {
  return props.shipID;
}

const getCompNum = (_state: AppState, props: any) => {
  return props.comp;
}

const getDriverID = (_state: AppState, props: any) => {
  return props.driver_id;
}

const getVehicleID = (_state: AppState, props: any) => {
  return props.vehicle_id;
}

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getDelivery = createSelector(
  getAllDeliverys, getIdParam,
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

export const getSearchedOngoingDeliverys = createSelector(
  getOngoingDeliverys, getSearchText,
  (deliverys, searchText) => {
    if (!searchText) {
      return deliverys;
    }
    return deliverys.filter((d: Delivery) => 
      d.vehicle.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      d.volume.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      d.driver.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      d.driver_assistant.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }
);

export const getSearchedPastDeliverys = createSelector(
  getPastDeliverys, getSearchText,
  (deliverys, searchText) => {
    if (!searchText) {
      return deliverys;
    }
    return deliverys.filter((d: Delivery) => 
      d.vehicle.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      d.volume.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      d.driver.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      d.driver_assistant.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }
);

export const getSearchedOrders = createSelector(
  getOrders, getSearchText,
  (orders, searchText) => {
    if (!searchText) {
      return orders;
    }
    return orders.filter((o: Order) => 
      o.LO_Number.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      o.SPBU.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      o.Product.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      o.Volume.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }
);

export const getSearchedTransportLossAll = createSelector(
  getTransportlosses, getSearchText,
  (losses, searchText) => {
    if (!searchText) {
      return losses;
    }
    return losses.filter((l: Transportloss) => 
      l.LO.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      l.SPBU.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      l.Product.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      l.Vol_Before.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }
);

export const getSearchedFeedbacks = createSelector(
  getFeedbacks, getSearchText,
  (feedbacks, searchText) => {
    if (!searchText) {
      return feedbacks;
    }
    return feedbacks.filter((f: Feedback) => 
      f.Shipment.SPBU.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      f.Shipment.Nopol.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      f.Reason.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
  }
);

export const getLossFormOfflineData = createSelector(
  getLossFormOfflineDatas, getShipId, getCompNum,
  (datas, shipId, comp) => {
    return datas.filter((d: LossFormDataOffline) => 
      d.shipment_id == shipId && d.compartment == comp.toString()
    )[0];
  }
);

export const getDriverDetail = createSelector(
  getDriverDetails, getDriverID,
  (datas, driver_id) => {
    return datas.filter((d: Driver) => 
      d.id == driver_id
    )[0];
  }
);

export const getVehicleDetail = createSelector(
  getVehicleDatails, getVehicleID,
  (datas, vehicle_id) => {
    return datas.filter((v: Vehicle) => 
      v.id == vehicle_id
    )[0];
  }
);




