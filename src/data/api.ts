import { CheckList } from '../models/CheckList';
import { Delivery } from '../models/Delivery';
import { Driver } from '../models/Driver';
import { Feedback, Feedback_Data } from '../models/Feedback';
import { Order } from '../models/Order';
import { Justify, LossFormData, LossFormDataOffline, Tank, Transportloss } from '../models/Transportloss';
import { User } from '../models/User';
import { Comp } from '../models/Vehicle';

const baseUrl = 'http://182.23.86.213:4000/odi';
const jsonUrl = {
  auth: '/assets/data/authenticate.json',
  ongoingDelivery: '/assets/data/ongoing_deliveries.json',
  pastDelivery : '/assets/data/past_deliveries.json',
  driverDetail : '/assets/data/driver_details.json',
  vehicleDetail : '/assets/data/vehicle_details.json',
  transportLossAll : '/assets/data/transportloss.json',
  order : '/assets/data/order.json',
  feedback : '/assets/data/feedback.json',
  checklist : '/assets/data/survey.json',
  justify : '/assets/data/transport_justify.json',
  tank : '/assets/data/tank_spbu.json',
  lossForm : '/assets/data/transportloss_lonumber.json',
};

let commonFormData = new FormData();
let spbu : string;

export const doAuthenticate = async (formData : FormData) => {
  const response = await Promise.all([
    // fetch(jsonUrl.auth)
    fetch(`${baseUrl}/authenticate`, {
      method: "post",
      body: formData
    }), 
  ]);
  const responseData = await response[0].json();
  const status = responseData.status as string;
  if (status === "F") {
    return;
  }
  else if (status === "S") {
    const user = responseData.data[0] as User;
    commonFormData.append('spbu', user.user_name);
    commonFormData.append('company_id', user.company_id.toString());
    spbu = user.user_name;
    return user;
  }
}

export const getApiDelivery = async () => {
  commonFormData.append('menu', 'ongoing_deliveries');
  
  const response_ongoing = await Promise.all([
    // fetch(jsonUrl.ongoingDelivery),
    fetch(`${baseUrl}/shipment`, {
      method: "post",
      body: commonFormData
    })
  ]);

  const ongoingData = await response_ongoing[0].json();
  const ongoingDeliverys = ongoingData.data as Delivery[];

  commonFormData.delete('menu');
  commonFormData.append('menu', 'past_deliveries');
  const response_past = await Promise.all([
    // fetch(jsonUrl.pastDelivery)
    fetch(`${baseUrl}/shipment`, {
      method: "post",
      body: commonFormData
    })
  ]);
  const pastData = await response_past[0].json();
  const pastDeliverys = pastData.data as Delivery[];
 
  commonFormData.delete('menu');

  return {
    ongoingDeliverys,
    pastDeliverys
  };
}

export const getApiOrders = async () => {
  const response = await Promise.all([
    // fetch(jsonUrl.order),
    fetch(`${baseUrl}/order`, {
      method: "post",
      body: commonFormData
    }),
  ]);
  const responseData = await response[0].json();
  const orders = responseData.data as Order[];
 
  return {
    orders,
  };
}

export const getApiFeedbacks = async () => {
  const response = await Promise.all([
    // fetch(jsonUrl.feedback),
    fetch(`${baseUrl}/feedback`, {
      method: "post",
      body: commonFormData
    })
  ]);
  const responseData = await response[0].json();
  const feedback_datas = responseData.data as Feedback_Data[];
  const feedbacks = feedback_datas!.map(feedback => {
    let shipment = feedback.Shipment as string;
    shipment = shipment.replace(/\s\n+/g, '","');
    shipment = shipment.replace(/:\s+/g, '":"');
    return {...feedback, Shipment: JSON.parse(`{"${shipment}"}`)} as Feedback;
  });
  
  return {
    feedbacks,
  };
}

export const getApiTransportLossAll = async () => {
  const response = await Promise.all([
    // fetch(jsonUrl.transportLossAll),
    fetch(`${baseUrl}/transportloss_all`,  {
      method: "post",
      body: commonFormData
    }),
  ]);
  const responseData = await response[0].json();
  const transLossAll = responseData.data as Transportloss[];
 
  return {
    transLossAll,
  };
}

export const getApiDriverDetail = async (driverID: number) => {
  const formData = new FormData();
  formData.append('driver_id', driverID.toString());
  const response = await Promise.all([
    // fetch(jsonUrl.driverDetail),
    fetch(`${baseUrl}/driver_detail`, {
      method: "post",
      body: formData
    })
  ]);
  const responseData = await response[0].json();
  const driverDetail = responseData.data[0] as Driver;
 
  return driverDetail;
}

export const getApiVehicleDetail = async (vehicleID: number) => {
  const formData = new FormData();
  formData.append('vehicle', vehicleID.toString());

  const response = await Promise.all([
    // fetch(jsonUrl.vehicleDetail),
    fetch(`${baseUrl}/vehicle_detail`, {
      method: "post",
      body: formData
    }),
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

export const getApiCheckLists = async () => {
  const formData = new FormData();
  formData.append('survey_id', "7");
  const response = await Promise.all([
    // fetch(jsonUrl.checklist),
    fetch(`${baseUrl}/get_survey`,  {
      method: "post",
      body: formData
    }),
  ]);
  const responseData = await response[0].json();
  const checkLists = responseData.data as CheckList[];
 
  return {
    checkLists,
  };
}

export const getApiTanks = async () => {
  const formData = new FormData();
  formData.append('site_id', spbu);

  const response = await Promise.all([
    // fetch(jsonUrl.tank),
    fetch(`${baseUrl}/slc_tank_spbu`, {
      method: "post",
      body: formData
    }),
  ]);
  const responseData = await response[0].json();
  const tanks = responseData.data as Tank[];
 
  return {
    tanks,
  };
}

export const getApiJustify = async () => {
  const response = await Promise.all([
    // fetch(jsonUrl.justify),
    fetch(`${baseUrl}/slc_justify`, {
      method: "post"
    }),
  ]);
  const responseData = await response[0].json();
  const justify = responseData.data as Justify[];
 
  return {
    justify,
  };
}

export const getApiLossFormData = async () => {
  const response = await Promise.all([
    fetch(jsonUrl.lossForm),
    // fetch(`${baseUrl}/transportloss`,
  ]);
  const responseData = await response[0].json();
  const lossFormData = responseData.data as LossFormData[];

  return lossFormData[0];
}

export const getApiLossFormOffineData = async () => {
  const response = await Promise.all([
    fetch(jsonUrl.lossForm),
    // fetch(`${baseUrl}/transportloss_ofline`,
  ]);
  const responseData = await response[0].json();
  const lossFormData = responseData.data as LossFormDataOffline[];

  return lossFormData;
}

