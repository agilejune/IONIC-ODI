import { Storage } from '@capacitor/storage';

const HAS_LOGGED_IN = 'hasLoggedIn';
const USERNAME = 'username';
const DELIVERY = 'deliverys';
const FEEDBACK = 'feedback';
const ORDER = 'order';
const TANK_OPTIONS = 'tank';
const JUSTIFY_DATA = 'justify';
const TRANSPORTLOSS_ALL = 'transport_loss_all';
const CHECK_LIST = 'check_list';
const TRANSPORTLOSS_OFFLINE = 'transport_loss_offline';
const OFFLINE_STACK = "offline_stack";

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

export const setDeliverys = async (data : any) => {
  await Storage.set({ key: DELIVERY, value: JSON.stringify(data) });
}

export const getStorageDeliverys = async () => {
  const { value } = await Storage.get({ key: DELIVERY });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const setOrder = async (data : any) => {
  await Storage.set({ key: ORDER, value: JSON.stringify(data) });
}

export const getStorageOrders = async () => {
  const { value } = await Storage.get({ key: ORDER });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const setFeedback = async (data : any) => {
  await Storage.set({ key: FEEDBACK, value: JSON.stringify(data) });
}

export const getStorageFeedbacks = async () => {
  const { value } = await Storage.get({ key: FEEDBACK });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const setTankOptions = async (data : any) => {
  await Storage.set({ key: TANK_OPTIONS, value: JSON.stringify(data) });
}

export const getStorageTankOptions = async () => {
  const { value } = await Storage.get({ key: TANK_OPTIONS });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const setJustify = async (data : any) => {
  await Storage.set({ key: JUSTIFY_DATA, value: JSON.stringify(data) });
}

export const getStorageJustify = async () => {
  const { value } = await Storage.get({ key: JUSTIFY_DATA });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const setTransportLossAll = async (data : any) => {
  await Storage.set({ key: TRANSPORTLOSS_ALL, value: JSON.stringify(data) });
}

export const getStorageTransportLossAll = async () => {
  const { value } = await Storage.get({ key: TRANSPORTLOSS_ALL });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const setTransportLossOffline = async (data : any) => {
  await Storage.set({ key: TRANSPORTLOSS_OFFLINE, value: JSON.stringify(data) });
}

export const getStorageTransportLossOffline = async () => {
  const { value } = await Storage.get({ key: TRANSPORTLOSS_OFFLINE });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const setChecklists = async (data : any) => {
  await Storage.set({ key: CHECK_LIST, value: JSON.stringify(data) });
}

export const getStorageChecklists = async () => {
  const { value } = await Storage.get({ key: JUSTIFY_DATA });
  
  if (value == null) return;
  
  return JSON.parse(value);
}

export const saveStorageStack = async (param: string, data: any) => {
  const { value } = await Storage.get({ key: OFFLINE_STACK});
  if (value == null) return;

  const prevData = JSON.parse(value) as StackOffline;
  
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
  const { value } = await Storage.get({ key: OFFLINE_STACK });
  console.log("get stroage stack");
  console.log(value);
  if (value == null) return;
  
  return JSON.parse(value) as StackOffline;
}

interface StackOffline {
  feedback: any[],
  transportLoss: any[],
  profile: any,
}

export const initStorageStack = async () => {
  Storage.set({ key: OFFLINE_STACK, value: JSON.stringify({transportLoss: [], feedback: [], profile: ""}) });
}




initStorageStack();