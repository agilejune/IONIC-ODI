import { Storage } from '@capacitor/storage';

const HAS_LOGGED_IN = 'hasLoggedIn';
const USERDATA = 'user_data';
const DELIVERY = 'deliverys';
const FEEDBACK = 'feedback';
const ORDER = 'order';
const TANK_OPTIONS = 'tank';
const JUSTIFY_DATA = 'justify';
const TRANSPORTLOSS_ALL = 'transport_loss_all';
const CHECK_LIST = 'check_list';
const TRANSPORTLOSS_OFFLINE = 'transport_loss_offline';
const OFFLINE_STACK = "offline_stack";
const DRIVER_DETAIL = "driver_detail";
const VEHICLE_DETAIL = "vehicle_detail";
const AUTHENTICATED = "authenticated";

export const setIsAuthenticated = async (isAuthenticated: boolean) => {
  await Storage.set({ key: AUTHENTICATED, value: JSON.stringify(isAuthenticated) });
}

export const getIsAuthenticated = async () => {
  const { value } = await Storage.get({ key: AUTHENTICATED });
  
  if (value == null || value == "undefined") return false;

  return JSON.parse(value) === true;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setUserData = async (data: any) => {
  await Storage.set({ key: USERDATA, value: data });
}

export const getUserData = async (data?: any) => {
  const { value } = await Storage.get({ key: USERDATA });
  
  if (value == null || value == "undefined") return false;

  return JSON.parse(value);
}

export const setDeliverys = async (data : any) => {
  await Storage.set({ key: DELIVERY, value: JSON.stringify(data) });
}

export const getStorageDeliverys = async () => {
  const { value } = await Storage.get({ key: DELIVERY });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setOrder = async (data : any) => {
  await Storage.set({ key: ORDER, value: JSON.stringify(data) });
}

export const getStorageOrders = async () => {
  const { value } = await Storage.get({ key: ORDER });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setFeedback = async (data : any) => {
  await Storage.set({ key: FEEDBACK, value: JSON.stringify(data) });
}

export const getStorageFeedbacks = async () => {
  const { value } = await Storage.get({ key: FEEDBACK });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setTankOptions = async (data : any) => {
  await Storage.set({ key: TANK_OPTIONS, value: JSON.stringify(data) });
}

export const getStorageTankOptions = async () => {
  const { value } = await Storage.get({ key: TANK_OPTIONS });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setJustify = async (data : any) => {
  await Storage.set({ key: JUSTIFY_DATA, value: JSON.stringify(data) });
}

export const getStorageJustify = async () => {
  const { value } = await Storage.get({ key: JUSTIFY_DATA });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setTransportLossAll = async (data : any) => {
  await Storage.set({ key: TRANSPORTLOSS_ALL, value: JSON.stringify(data) });
}

export const getStorageTransportLossAll = async () => {
  const { value } = await Storage.get({ key: TRANSPORTLOSS_ALL });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setTransportLossOffline = async (data : any) => {
  await Storage.set({ key: TRANSPORTLOSS_OFFLINE, value: JSON.stringify(data) });
}

export const getStorageTransportLossOffline = async () => {
  const { value } = await Storage.get({ key: TRANSPORTLOSS_OFFLINE });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setChecklists = async (data : any) => {
  await Storage.set({ key: CHECK_LIST, value: JSON.stringify(data) });
}

export const getStorageChecklists = async () => {
  const { value } = await Storage.get({ key: CHECK_LIST });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setDriverDetails = async (data : any) => {
  await Storage.set({ key: DRIVER_DETAIL, value: JSON.stringify(data) });
}

export const getStorageDriverDetails = async () => {
  const { value } = await Storage.get({ key: DRIVER_DETAIL });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const setVehicleDatails = async (data : any) => {
  await Storage.set({ key: VEHICLE_DETAIL, value: JSON.stringify(data) });
}

export const getStorageVehicleDatails = async () => {
  const { value } = await Storage.get({ key: VEHICLE_DETAIL });
  
  if (value == null || value == "undefined") return;
  
  return JSON.parse(value);
}

export const saveStorageStack = async (param: string, data: any) => {
  let storageData = undefined;
  const { value } = await Storage.get({ key: OFFLINE_STACK});
  storageData = value;
  
  if (value == null || value == "undefined") {
    await initStorageStack();
    const { value } = await Storage.get({ key: OFFLINE_STACK});
    storageData = value;
  }
  
  const prevData = JSON.parse(storageData!) as StackOffline;
  Object.entries(prevData).forEach(([key, value]) => {
    if (key === param) {
      if (Array.isArray(value))
        value.push(data); 
      else
        value = data;  
    }
  });
  
  await Storage.set({ key: OFFLINE_STACK, value: JSON.stringify(prevData) });
  console.log("successful to save into storage stack");
}

export const getStorageStack = async () => {
  let storageData = undefined;
  const { value } = await Storage.get({ key: OFFLINE_STACK});
  storageData = value;
  
  if (value == null || value == "undefined") {
    await initStorageStack();
    const { value } = await Storage.get({ key: OFFLINE_STACK});
    storageData = value;
  }
  
  return JSON.parse(storageData!) as StackOffline;
}

interface StackOffline {
  feedback: any[],
  checklist: any[],
  transportLoss: any[],
  profile: any,
}

export const initStorageStack = async () => {
  Storage.set({ 
    key: OFFLINE_STACK, 
    value: JSON.stringify({
          checklist: [],
          transportLoss: [], 
          feedback: [], 
          profile: ""
        }) 
  });
}

// initStorageStack();