import { Plugins } from '@capacitor/core';
import { Delivery } from '../models/Delivery';
import { Driver } from '../models/Driver';
import { User } from '../models/User';
import { Comp, Vehicle } from '../models/Vehicle';

const { Storage } = Plugins;

const authUrl = '/assets/data/authenticate.json';
const ongoingDeliveryUrl = '/assets/data/ongoing_deliveries.json';
const pastDeliveryUrl = '/assets/data/past_deliveries.json';
const driverDetailUrl = '/assets/data/driver_details.json';
const vehicleDetailUrl = '/assets/data/vehicle_details.json';

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

export const getDriverDetail = async (driverID: number) => {
  const response = await Promise.all([
    fetch(driverDetailUrl),
  ]);
  const responseData = await response[0].json();
  const driverDetail = responseData.data[0] as Driver;
 
  return driverDetail;
}

export const getVehicleDetail = async (vehicleID: number) => {
  const response = await Promise.all([
    fetch(vehicleDetailUrl),
  ]);
  const responseData = await response[0].json();
  const vehicleDetail = responseData.data[0];
  const comps = [] as Comp[];
  [1,2,3,4,5,6].forEach(i => {
    const comp = {
      empty_space: vehicleDetail[`empty_space_comp${i}`],
      sensitivity: vehicleDetail[`sensitivity_comp${i}`],
      t2: vehicleDetail[`t2_comp${i}`],
    };
    comps.push(comp);
  });
  
  const vehicle = {
    attachment: vehicleDetail.attachment,
    capacity: vehicleDetail.capacity,
    comp: comps, 
    id: vehicleDetail.id, 
    name: vehicleDetail.name, 
    re_calibration_time: vehicleDetail.re_calibration_time,
    rental_type: vehicleDetail.rental_type,
  }
  
  return vehicle;
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
