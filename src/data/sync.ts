import { Network } from '@capacitor/network';
import { getApiCheckLists, getApiDelivery, getApiDriverDetails, getApiFeedbacks, getApiJustify, getApiLossFormOffineData, getApiOrders, getApiTanks, getApiTransportLossAll, getApiVehicleDatails, sendApiCheckLists, sendApiFeedback, sendApiTransportLossFormData } from './api';
import { getStorageChecklists, getStorageDeliverys, getStorageDriverDetails, getStorageFeedbacks, getStorageJustify, getStorageOrders, getStorageStack, getStorageTankOptions, getStorageTransportLossAll, getStorageTransportLossOffline, getStorageVehicleDatails, initStorageStack, saveStorageStack, setChecklists, setDeliverys, setDriverDetails, setFeedback, setJustify, setOrder, setTankOptions, setTransportLossAll, setTransportLossOffline, setVehicleDatails } from './storage';

export const getCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();

  return status.connected;
};

export const getCheckLists = async () => {
  let checklist = undefined;
  if (await getCurrentNetworkStatus()) {
    try {
      checklist = await getApiCheckLists();
      await setChecklists(checklist);
    } catch(err) {
      checklist = await getStorageChecklists();  
    }
  }
  else {
    checklist = await getStorageChecklists();
  }
  return checklist;
}

export const getDelivery = async () => {
  let delivery = undefined;

  if (await getCurrentNetworkStatus()) {
    try {
      delivery = await getApiDelivery()
      await setDeliverys(delivery);
    } catch(err) {
      console.log(`Display Error : \n ${err}`);
      delivery = await getStorageDeliverys();
    }

  }
  else {
    delivery = await getStorageDeliverys();
  }

  return delivery;
}

export const getFeedbacks = async () => {
  let feedbacks = undefined;
  if (await getCurrentNetworkStatus()) {
    try {
      feedbacks = await getApiFeedbacks();
      await setFeedback(feedbacks);
    } catch(err) {
      feedbacks = await getStorageFeedbacks();  
    }
    
  }
  else {
    feedbacks = await getStorageFeedbacks();
  }

  return feedbacks;
}

export const getJustify = async () => {
  let justify = undefined;

  if (await getCurrentNetworkStatus()) {
    try {
      justify = await getApiJustify();
      await setJustify(justify);
    } catch(err) {
      justify = await getStorageJustify();  
    }
    
  }
  else {
    justify = await getStorageJustify();
  }

  return justify;
}

export const getOrders = async () => {
  let order = undefined;

  if (await getCurrentNetworkStatus()) {
    try {
      order = await getApiOrders();
      await setOrder(order);
    } catch(err) {
      order = await getStorageOrders();
    }
  }
  else {
    order = await getStorageOrders();
  }

  return order;
}

export const getTanks = async () => {
  let tank = undefined;
  if (await getCurrentNetworkStatus()) {
    try {
      tank = await getApiTanks();
      await setTankOptions(tank);
    } catch(err) {
      tank = await getStorageTankOptions();
    }
    
  }
  else {
    tank = await getStorageTankOptions();
  }

  return tank;
}

export const getTransportLossAll = async () => {
  let transportlossAll = undefined;
  if (await getCurrentNetworkStatus()) {
    try {
      transportlossAll = await getApiTransportLossAll();
      await setTransportLossAll(transportlossAll);
    } catch(err) {
      transportlossAll = await getStorageTransportLossAll();
    }
  }
  else {
    transportlossAll = await getStorageTransportLossAll();
  }

  return transportlossAll;
}

export const getLossFormOffineData = async (shipIds : []) => {
  let lossFormOfflineData = undefined;

  if (await getCurrentNetworkStatus()) {
    try {
      lossFormOfflineData = await getApiLossFormOffineData(shipIds);
      await setTransportLossOffline(lossFormOfflineData);
    } catch(err) {
      lossFormOfflineData = await getStorageTransportLossOffline();  
    }
  }
  else {
    lossFormOfflineData = await getStorageTransportLossOffline();
  }

  return lossFormOfflineData;

}

export const getDriverDetails = async (driverIDs : []) => {
  let driverDetails = undefined;
  if (await getCurrentNetworkStatus()) {
    try {
      driverDetails = await getApiDriverDetails(driverIDs);
      await setDriverDetails(driverDetails);
    } catch(err) {
      driverDetails = await getStorageDriverDetails();  
    }
  }
  else {
    driverDetails = await getStorageDriverDetails();
  }
  return driverDetails;
}

export const getVehicleDatails = async (vehicleIDs : []) => {
  let vehicleDetails = undefined;
  if (await getCurrentNetworkStatus()) {
    try {
      vehicleDetails = await getApiVehicleDatails(vehicleIDs);
      await setVehicleDatails(vehicleDetails);
    } catch(err) {
      vehicleDetails =  await getStorageVehicleDatails();  
    }
  }
  else {
    vehicleDetails =  await getStorageVehicleDatails();
  }

  return vehicleDetails;
}

export const sendFeedback = async (data: any) => {
  let msg = "";
  let responseStatus = "";
  if (await getCurrentNetworkStatus()) {
    try {
      const {message, status} = await sendApiFeedback(data);
      msg = message;
      responseStatus = status;
    } catch(err) {
      await saveStorageStack("feedback", data);
      msg = "Error is occured with Network, So Datas are saved to Storage temporarily"
      responseStatus = "E";
    }
  }
  else {
    await saveStorageStack("feedback", data);
    msg = "Datas are saved to Storage temporarily"
    responseStatus = "S";
  }
  return { msg, responseStatus };
}

export const sendCheckLists = async (data: any) => {
  let msg = "";
  let responseStatus = "";
  if (await getCurrentNetworkStatus()) {
    try {
      const {message, status} = await sendApiCheckLists(data);
      msg = message;
      responseStatus = status;
    } catch(err) {
      await saveStorageStack("checklist", data);
      msg = "Error is occured with Network, So Datas are saved to Storage temporarily";
      responseStatus = "E";
    }
  }
  else {
    await saveStorageStack("checklist", data);
    msg = "Datas are saved to Storage temporarily";
    responseStatus = "S";
  }
  return { msg, responseStatus };
}

export const sendTransportLossFormData = async (data: any) => {
  let msg = "";
  let responseStatus = "";
  if (await getCurrentNetworkStatus()) {
    try {
      const {message, status} = await sendApiTransportLossFormData(data);
      msg = message;
      responseStatus = status;
    } catch(err) {
      await saveStorageStack("transportLoss", data);
      msg = "Error is occured with Network, So Datas are saved to Storage temporarily";
      responseStatus = "E";
    }
  }
  else {
    await saveStorageStack("transportLoss", data);
    msg = "Datas are saved to Storage temporarily"
    responseStatus = "S";
  }
  return { msg, responseStatus };
}

export const sendOfflineStackData = async () => {
  let success = true;
  const datas= await getStorageStack();
  let msg = "Datas are sent successfully";
  let responseStatus = "S";
  
  if (datas == null) return;

  try {
    Object.entries(datas).forEach(async ([key, value]) => {
      if (key === "profile") {

      }
      else if (key === "feedback" && Array.isArray(value)) {
        value.map(async (feedback: any) => {
          console.log("send feedback from offine stack");

          try {
            const { status } = await sendApiFeedback(feedback);
          }
          catch(err) {
            throw Error();
          }
        });
      }
      else if (key === "transportLoss" && Array.isArray(value)) {
        value.map(async (data: any) => {
          console.log("send transportloss calculation data from offine stack");

          try {
            const { status } = await sendApiTransportLossFormData(data);
          }
          catch(err) {
            throw Error();
          }
        });
      }
      else if (key === "checklist" && Array.isArray(value)) {
        value.map(async (list: any) => {
          console.log("send checklist from offine stack");

          try {
            const { status } = await sendApiFeedback(list);
          }
          catch(err) {
            throw Error();
          }
        });
      }
    });
  } catch(err) {
    success = false;
  }

  if (success)
    initStorageStack();
}

export const getOfflineStackCount = async () => {
  let count = 0;

  const datas= await getStorageStack();
  
  if (datas == null) return 0;

  Object.entries(datas).forEach(async ([key, value]) => {
    if (key === "profile" && value !== "") {
      ++count;
    }
    else if (key === "feedback" && Array.isArray(value)) {
      count += value.length;
    }
    else if (key === "transportLoss" && Array.isArray(value)) {
      count += value.length;
    }
    else if (key === "checklist" && Array.isArray(value)) {
      count += value.length;
    }
  });

  return count;
}