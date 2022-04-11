import { CheckList } from '../models/CheckList';
import { Delivery } from '../models/Delivery';
import { Driver } from '../models/Driver';
import { Feedback, FeedbackOption, Feedback_Data } from '../models/Feedback';
import { Order } from '../models/Order';
import { Justify, LossFormData, LossFormDataOffline, Tank, Transportloss } from '../models/Transportloss';
import { User } from '../models/User';
import { Comp, Vehicle } from '../models/Vehicle';

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
  justify : '/assets/data/transportloss_justify.json',
  tank : '/assets/data/tank_spbu.json',
  lossForm : '/assets/data/transportloss_lonumber.json',
  feedbackOptions : '/assets/data/feedback_options/',
  lossOfflineForm : '/assets/data/transportloss_offline.json'
};

let commonFormData = new FormData();
let spbu : string;

const delay = () => new Promise(res => setTimeout(res, 1000));

export const doAuthenticate = async (formData : FormData) => {
  await delay();
  const response = await Promise.all([
    fetch(jsonUrl.auth)
    // fetch(`${baseUrl}/authenticate`, {
    //   method: "post",
    //   body: formData
    // }), 
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
  await delay();

  commonFormData.append('menu', 'ongoing_deliveries');
  
  const response_ongoing = await Promise.all([
    fetch(jsonUrl.ongoingDelivery),
    // fetch(`${baseUrl}/shipment`, {
    //   method: "post",
    //   body: commonFormData
    // })
  ]);

  const ongoingData = await response_ongoing[0].json();
  const ongoingDeliverys = ongoingData.data as Delivery[];
  const shipIds_ongoing = ongoingDeliverys.map(d => { return d.shipment_id; });

  commonFormData.delete('menu');
  commonFormData.append('menu', 'past_deliveries');
  const response_past = await Promise.all([
    fetch(jsonUrl.pastDelivery)
    // fetch(`${baseUrl}/shipment`, {
    //   method: "post",
    //   body: commonFormData
    // })
  ]);
  const pastData = await response_past[0].json();
  const pastDeliverys = pastData.data as Delivery[];
 
  commonFormData.delete('menu');

  const shipIds = [
    ...ongoingDeliverys.map(d => { return d.shipment_id; }), 
    ...pastDeliverys.map(d => { return d.shipment_id; }) 
  ];

  const driverAssistantIDs = [
    ...ongoingDeliverys.map(d => { return [d.driver_id, d.driver_assistant_id]; }), 
    ...pastDeliverys.map(d => { return [d.driver_id, d.driver_assistant_id]; }) ,
  ];

  const vehicleIDs = [
    ...ongoingDeliverys.map(d => { return d.vehicle_id; }), 
    ...pastDeliverys.map(d => { return d.vehicle_id; }) 
  ];
  return {
    delivery: {
      ongoingDeliverys,
      pastDeliverys
      },
    shipIds: shipIds,
    driverAssistantIDs: driverAssistantIDs,
    vehicleIDs: vehicleIDs
  };
}

export const getApiOrders = async () => {
  await delay();
  const response = await Promise.all([
    fetch(jsonUrl.order),
    // fetch(`${baseUrl}/order`, {
    //   method: "post",
    //   body: commonFormData
    // }),
  ]);
  const responseData = await response[0].json();
  const orders = responseData.data as Order[];
 
  return {
    orders,
  };
}

export const getApiFeedbacks = async () => {
  await delay();
  const response = await Promise.all([
    fetch(jsonUrl.feedback),
    // fetch(`${baseUrl}/feedback`, {
    //   method: "post",
    //   body: commonFormData
    // })
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
  await delay();
  const response = await Promise.all([
    fetch(jsonUrl.transportLossAll),
    // fetch(`${baseUrl}/transportloss_all`,  {
    //   method: "post",
    //   body: commonFormData
    // }),
  ]);
  const responseData = await response[0].json();
  const transLossAll = responseData.data as Transportloss[];
 
  return {
    transLossAll,
  };
}

export const getApiDriverDetails = async (driverIDs: []) => {
  await delay();
  const formData = new FormData();
  formData.append('driver_id', driverIDs.join(","));
  const response = await Promise.all([
    fetch(jsonUrl.driverDetail),
    // fetch(`${baseUrl}/driver_detail`, {
    //   method: "post",
    //   body: formData
    // })
  ]);
  const responseData = await response[0].json();
  const drivers = responseData.data as Driver[];
 
  return {
    drivers
  };
}

export const getApiVehicleDatails = async (vehicleIDs: []) => {
  await delay();
  const formData = new FormData();
  formData.append('vehicle_id', vehicleIDs.join(","));

  const response = await Promise.all([
    fetch(jsonUrl.vehicleDetail),
    // fetch(`${baseUrl}/vehicle_detail`, {
    //   method: "post",
    //   body: formData
    // }),
  ]);
  const responseData = await response[0].json();
  const vehicleDetails = responseData.data as [];

  const vehicles = vehicleDetails.map(vehicleDetail => {
    const comps = [] as Comp[];
    [1,2,3,4,5,6].forEach(i => {
      const comp = {
        empty_space: vehicleDetail[`empty_space_comp1`],
        sensitivity: vehicleDetail[`sensitivity_comp${i}`],
        t2: vehicleDetail[`t2_comp${i}`],
      };
      comps.push(comp);
    });
    
    const vehicle = {
      attachment: vehicleDetail["attachment"],
      capacity: vehicleDetail["capacity"],
      comp: comps, 
      id: vehicleDetail["id"], 
      name: vehicleDetail["name"], 
      re_calibration_time: vehicleDetail["re_calibration_time"],
      rental_type: vehicleDetail["rental_type"],
    }
    
    return vehicle;
  });

  return {
    vehicles
  };
}

export const getApiCheckLists = async () => {
  await delay();
  const formData = new FormData();
  formData.append('survey_id', "7");
  const response = await Promise.all([
    fetch(jsonUrl.checklist),
    // fetch(`${baseUrl}/get_survey`,  {
    //   method: "post",
    //   body: formData
    // }),
  ]);
  const responseData = await response[0].json();
  const checkLists = responseData.data as CheckList[];
 
  return {
    checkLists,
  };
}

export const getApiTanks = async () => {
  await delay();
  const formData = new FormData();
  formData.append('site_id', spbu);

  const response = await Promise.all([
    fetch(jsonUrl.tank),
    // fetch(`${baseUrl}/slc_tank_spbu`, {
    //   method: "post",
    //   body: formData
    // }),
  ]);
  const responseData = await response[0].json();
  const tanks = responseData.data as Tank[];
 
  return {
    tanks,
  };
}

export const getApiJustify = async () => {
  await delay();
  const response = await Promise.all([
    fetch(jsonUrl.justify),
    // fetch(`${baseUrl}/slc_justify`, {
    //   method: "post"
    // }),
  ]);
  const responseData = await response[0].json();
  const justify = responseData.data as Justify[];
 
  return {
    justify,
  };
}

export const getApiLossFormData = async () => {
  await delay();
  const response = await Promise.all([
    fetch(jsonUrl.lossForm),
    // fetch(`${baseUrl}/transportloss`,
  ]);
  const responseData = await response[0].json();
  const lossFormData = responseData.data as LossFormData[];

  return lossFormData[0];
}

export const getApiLossFormOffineData = async (shipIds : []) => {
  await delay();
  const response = await Promise.all([
    fetch(jsonUrl.lossOfflineForm),
    // fetch(`${baseUrl}/transportloss_ofline`, {
    // method: "post",
    // body: {shipIds: shipIds.join(","), no_spbu: spbu}
    // }
  ]);
  const responseData = await response[0].json();
  const transFormOfflineDatas = responseData.data as LossFormDataOffline[];

  return {
    transFormOfflineDatas
  };
}

export const getFeedbackOptions = async (id: string | undefined, code: string | undefined) => {
  const response = await Promise.all([
    fetch(jsonUrl.feedbackOptions + (id ?? code) + '.json')
    // fetch(`${baseUrl}/slc_feedback`, {id: id, code: code})
  ]);

  const responseData = await response[0].json();
  const options = responseData.data as FeedbackOption[];
  return options;
}

export const sendApiFeedback = async (data: any) => {

  data = {...data, ...{ nospbu: spbu }};

  const response = await Promise.all([
    fetch(`${baseUrl}/send_feedback`, {
      method: "post",
      body: data
    })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  
  return status == "S";

}

export const sendApiCheckLists = async (data: any) => {

  data = {...data, ...{ no_spbu: spbu }};

  const response = await Promise.all([
    fetch(`${baseUrl}/send_survey`,{
        method: "post",
        body: data
      })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  
  return status == "S";

}

export const sendApiTransportLossFormData = async (data: any) => {

  data = {...data, ...{ spbu: spbu }};

  const response = await Promise.all([
    fetch(`${baseUrl}/send_transportloss_ofline`,{
        method: "post",
        body: data
      })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  
  return status == "S";

}




