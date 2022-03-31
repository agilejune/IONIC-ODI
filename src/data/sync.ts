import { Network } from '@capacitor/network';
import { getApiCheckLists, getApiDelivery, getApiFeedbacks, getApiJustify, getApiOrders, getApiTanks, getApiTransportLossAll } from './api';
import { getStorageChecklists, getStorageDeliverys, getStorageFeedbacks, getStorageJustify, getStorageOrders, getStorageTankOptions, getStorageTransportLossAll, setChecklists, setDeliverys, setFeedback, setJustify, setOrder, setTankOptions, setTransportLossAll } from './storage';

Network.addListener('networkStatusChange', status => {
  console.log('Network status changed', status);
});

export const getCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();

  return status.connected;
};

export const getCheckLists = async () => {
  if (await getCurrentNetworkStatus()) {
    const checklist = await getApiCheckLists();
    await setChecklists(checklist);
    return checklist;
  }
  else {
    return await getStorageChecklists();
  }
}

export const getDelivery = async () => {
  if (await getCurrentNetworkStatus()) {
    const delivery = await getApiDelivery();
    await setDeliverys(delivery);
    return delivery;
  }
  else {
    return await getStorageDeliverys();
  }
}

export const getFeedbacks = async () => {
  if (await getCurrentNetworkStatus()) {
    const feedbacks = await getApiFeedbacks();
    await setFeedback(feedbacks);
    return feedbacks;
  }
  else {
    return await getStorageFeedbacks();
  }
}

export const getJustify = async () => {
  if (await getCurrentNetworkStatus()) {
    const justify = await getApiJustify();
    await setJustify(justify);
    return justify;
  }
  else {
    return await getStorageJustify();
  }
}

export const getOrders = async () => {
  if (await getCurrentNetworkStatus()) {
    const order = await getApiOrders();
    await setOrder(order);
    return order;
  }
  else {
    return await getStorageOrders();
  }
}

export const getTanks = async () => {
  if (await getCurrentNetworkStatus()) {
    const tank = getApiTanks();
    await setTankOptions(tank);
    return tank;
  }
  else {
    return await getStorageTankOptions();
  }
}

export const getTransportLossAll = async () => {
  if (await getCurrentNetworkStatus()) {
    const transportlossAll = await getApiTransportLossAll();
    await setTransportLossAll(transportlossAll);
    return transportlossAll;
  }
  else {
    return await getStorageTransportLossAll();
  }
}