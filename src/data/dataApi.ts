import { Plugins } from '@capacitor/core';
import { Delivery } from '../models/Delivery';
import { User } from '../models/User';

const { Storage } = Plugins;

const authUrl = '/assets/data/authenticate.json';
const ongoingDeliveryUrl = '/assets/data/ongoing_deliveries.json';
const pastDeliveryUrl = '/assets/data/past_deliveries.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const USERNAME = 'username';

export const doAuthenticate = async () => {
  const response = await Promise.all([
    fetch(authUrl)]);
  const responseData = await response[0].json();
  const status = responseData.status as string;
  if (status === "F") {
    return false;
  }
  else if (status === "S") {
    const user = responseData.data[0] as User;
    return user;
  }
}

export const getDelivery = async () => {
  const response = await Promise.all([
    fetch(ongoingDeliveryUrl),
    fetch(pastDeliveryUrl)
  ]);
  const ongoingData = await response[0].json();
  const ongoingDeliverys = ongoingData.data as Delivery[];
  const pastData = await response[1].json();
  const pastDeliverys = pastData.data as Delivery[];
 
  return {
    ongoingDeliverys,
    pastDeliverys
  };
}



export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  // await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setUsernameData = async (username?: string) => {
  // if (!username) {
  //   await Storage.remove({ key: USERNAME });
  // } else {
  //   await Storage.set({ key: USERNAME, value: username });
  // }
}
