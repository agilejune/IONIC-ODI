import { Network } from '@capacitor/network';
import { getApiCheckLists, getApiDelivery, getApiFeedbacks, getApiJustify, getApiLossFormOffineData, getApiOrders, getApiTanks, getApiTransportLossAll, sendApiCheckLists, sendApiFeedback } from './api';
import { getStorageChecklists, getStorageDeliverys, getStorageFeedbacks, getStorageJustify, getStorageOrders, getStorageStack, getStorageTankOptions, getStorageTransportLossAll, getStorageTransportLossOffline, initStorageStack, saveStorageStack, setChecklists, setDeliverys, setFeedback, setJustify, setOrder, setTankOptions, setTransportLossAll, setTransportLossOffline } from './storage';

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

export const getLossFormOffineData = async (shipIds : []) => {
  if (await getCurrentNetworkStatus()) {
    const lossFormOfflineData = await getApiLossFormOffineData(shipIds);
    console.log(lossFormOfflineData);
    await setTransportLossOffline(lossFormOfflineData);
    return lossFormOfflineData;
  }
  else {
    return await getStorageTransportLossOffline();
  }
}


export const sendFeedback = async (data: any) => {
  if (await getCurrentNetworkStatus()) {
    await sendApiFeedback(data);
  }
  else {
    await saveStorageStack("feedback", data);
  }
}

export const sendCheckLists = async (data: any) => {
  if (await getCurrentNetworkStatus()) {
    await sendApiCheckLists(data);
  }
  else {
    await saveStorageStack("checklist", data);
  }

}


export const sendOfflineStackData = async () => {
  let success = false;
  const datas= await getStorageStack();
  Object.entries(datas!).forEach(([key, value]) => {
    if (key === "profile") {

    }
    else if (key === "feedback" && Array.isArray(value)) {
      value.map(async (feedback: any) => {
        console.log("send feedback from offine stack");
        success = await sendApiFeedback(feedback);
      });
    }
    else if (key === "transportLoss" && Array.isArray(value)) {

    }
    else if (key === "checklist" && Array.isArray(value)) {
      value.map(async (list: any) => {
        console.log("send checklist from offine stack");
        success = await sendApiCheckLists(list);
      });
    }
  });

  if (success)
    initStorageStack();
}

export const getOfflineStackCount = async () => {
  let count = 0;

  const datas= await getStorageStack();
  
  Object.entries(datas!).forEach(([key, value]) => {
    if (key === "profile" && value !== "") {
      ++count;
    }
    else if (key === "feedback" && Array.isArray(value)) {
      count += value.length;
    }
    else if (key === "transportLoss" && Array.isArray(value)) {
      count += value.length;
    }
  });

  return count;
}