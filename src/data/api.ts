import { CheckList } from '../models/CheckList';
import { Delivery } from '../models/Delivery';
import { Driver } from '../models/Driver';
import { Feedback, FeedbackOption, FeedbackOptionAll, FeedbackOptionChild, Feedback_Data, Pengirim, Respon, Shipment } from '../models/Feedback';
import { Order } from '../models/Order';
import { Justify, LossFormData, LossFormDataOffline, Tank, Transportloss } from '../models/Transportloss';
import { User } from '../models/User';
import { Comp, Vehicle } from '../models/Vehicle';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer';
import { File, FileEntry } from '@awesome-cordova-plugins/file';
// import { key } from './storage';

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

const jsonMode = false;
let commonFormData = new FormData();
let spbu : string;

const delay = () => new Promise(res => setTimeout(res, 1000));

export const fileDownload = async (url: string) => {
  const fileTransfer: FileTransferObject = FileTransfer.create();
  const filename = url.match(/=[a-zA-Z.\s0-9]+.pdf/g)![0].substring(1);
  let entry: FileEntry | null = null;
  
  try {
    entry = await fileTransfer.download(url, File.externalRootDirectory + '/Download/' + filename);
  } catch (err) {
    alert("Download failed" + JSON.stringify(err))
  }

  if (!entry) {
    return "";
  } else {
    return entry.toURL();
  }
}

export const doAuthenticate = async (formData : FormData) => {
  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.auth) :
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
    let user = responseData.data[0] as User;
    // user = {...user, password: CryptoJS.AES.encrypt(user.password, key).toString()};
    putUserInfoInFormData(user);
    return user;
  }
}

export const putUserInfoInFormData = (user: User) => {
  commonFormData.append('spbu', user.user_name);
  commonFormData.append('company_id', user.company_id.toString());
  spbu = user.user_name;
}

export const getApiDelivery = async () => {
  commonFormData.append('menu', 'ongoing_deliveries');
  
  const response_ongoing = await Promise.all([
    jsonMode ? fetch(jsonUrl.ongoingDelivery) :
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
    jsonMode ? fetch(jsonUrl.pastDelivery) :
    fetch(`${baseUrl}/shipment`, {
      method: "post",
      body: commonFormData
    })
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
  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.order) :
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
    jsonMode ? fetch(jsonUrl.feedback) :
    fetch(`${baseUrl}/feedback`, {
      method: "post",
      body: commonFormData
    })
  ]);
  const responseData = await response[0].json();
  const feedbacks = responseData.data as Feedback[];
  // const feedbacks = feedback_datas!.map(feedback => {
  //   const shipment = toJson(feedback.Shipment) as Shipment;
  //   const message = (feedback.Message == "" ? { Pengirim: "", Pesan: ""} : toJson(feedback.Message)) as Pengirim;
  //   const respon = (feedback.Respon == "" ? { Respon: "", Pesan: ""} : toJson(feedback.Respon)) as Respon;
    
  //   return {...feedback, ...{Shipment: shipment, Message: message, Respon: respon}} as Feedback;
  // });
  
  return {
    feedbacks,
  };
}

const toJson = (data: string) => {
  let tmp = data.replace(/\s<ent>+/g, '","');
  tmp = tmp.replace(/:\s+/g, '":"');
  
  return JSON.parse(`{"${tmp}"}`);
}

export const getApiTransportLossAll = async () => {
  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.transportLossAll) :
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

export const getApiDriverDetails = async (driverIDs: []) => {
  const formData = new FormData();
  formData.append('driver_id', driverIDs.join(","));
  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.driverDetail) :
    fetch(`${baseUrl}/driver_detail`, {
      method: "post",
      body: formData
    })
  ]);
  const responseData = await response[0].json();
  const drivers = responseData.data as Driver[];
 
  return {
    drivers
  };
}

export const getApiVehicleDatails = async (vehicleIDs: []) => {
  const formData = new FormData();
  formData.append('vehicle_id', vehicleIDs.join(","));

  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.vehicleDetail) :
    fetch(`${baseUrl}/vehicle_detail`, {
      method: "post",
      body: formData
    }),
  ]);
  const responseData = await response[0].json();
  const vehicleDetails = responseData.data as [];

  const vehicles = vehicleDetails.map(vehicleDetail => {
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
  const formData = new FormData();
  formData.append('survey_id', "7");
  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.checklist) :
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
    jsonMode ? fetch(jsonUrl.tank) :
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
    jsonMode ? fetch(jsonUrl.justify) :
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
    jsonMode ? fetch(jsonUrl.lossForm) :
    fetch(`${baseUrl}/transportloss`, {
      method: "post",
      body: new FormData()
    })
  ]);
  const responseData = await response[0].json();
  const lossFormData = responseData.data as LossFormData[];

  return lossFormData[0];
}

export const getApiLossFormOffineData = async (shipIds : []) => {
  const formData = new FormData();
  formData.append('shipids', shipIds.join(","));
  formData.append('no_spbu', spbu);
  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.lossOfflineForm) :
    fetch(`${baseUrl}/transportloss_ofline`, {
      method: "post",
      body: formData
    })
  ]);
  const responseData = await response[0].json();
  const transFormOfflineDatas = responseData.data as LossFormDataOffline[];

  return {
    transFormOfflineDatas
  };
}

export const getFeedbackOptions = async (id: string | undefined, code: string | undefined) => {
  const formData = new FormData();
  formData.append('id', id ?? "");
  formData.append('code', code ?? "");

  const response = await Promise.all([
    jsonMode ? fetch(jsonUrl.feedbackOptions + (id ?? code) + '.json') :
    fetch(`${baseUrl}/slc_feedback`, 
      {
        method: "post",
        body: formData
      }
    )
  ]);

  const responseData = await response[0].json();
  const options = responseData.data as FeedbackOption[];
  return options;
}

export const getApiFeedbackOfflineOptions = async () => {
  const codes = ["A", "B", "C", "D", "E"];
  const feedbackOptions = [] as FeedbackOptionAll[];

  for (let i = 0; i < codes.length; ++i) {
    const formData = new FormData();
    formData.append('id', "");
    formData.append('code', codes[i]);
    formData.append('all_data', "True");
  
    const response = await Promise.all([
      jsonMode ? fetch(jsonUrl.feedbackOptions + codes[i] + '.json') :
      fetch(`${baseUrl}/slc_feedback`, 
        {
          method: "post",
          body: formData
        }
      )
    ]);
  
    const responseData = await response[0].json();
    const options = responseData.data as FeedbackOptionChild[];
    feedbackOptions.push({code: codes[i], data: options});
  }

  return {
    feedbackOptions
  };
}

const getFormData = (data : any, addData: object) => {

  const formData = new FormData();
  Object.entries(addData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") formData.append(key, value);
    else if (typeof value === "number") formData.append(key, value.toString());
    else if (typeof value === "object") formData.append(key, JSON.stringify(value));
  });

  return formData;
}

export const sendApiFeedback = async (data: object) => {
  const formData = new FormData();
  formData.append('nospbu', spbu);
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await Promise.all([
    fetch(`${baseUrl}/send_feedback`, {
      method: "post",
      body: formData
    })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  const desc_msg = responseData.desc_msg as string;
  
  return {
    status: status,
    message: desc_msg
  };
}

export const sendApiChangedPassword = async (data: object) => {
  const formData = new FormData();
  formData.append('username', spbu);
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await Promise.all([
    fetch(`${baseUrl}/change_password`, {
      method: "post",
      body: formData
    })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  const desc_msg = responseData.desc_msg as string;
  
  return {
    status: status,
    message: desc_msg
  };
}

export const sendApiProfile = async (data: object) => {
  const formData = new FormData();
  formData.append('nospbu', spbu);
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await Promise.all([
    fetch(`${baseUrl}/change_password`, {
      method: "post",
      body: formData
    })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  const desc_msg = responseData.desc_msg as string;
  
  return {
    status: status,
    message: desc_msg
  };
}


export const sendApiCheckLists = async (data: object) => {
  const formData = new FormData();
  formData.append('no_spbu', spbu);

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "object")
      formData.append(key, JSON.stringify(value));
    else 
      formData.append(key, value);
  });

  console.log("send checklist with api");
  console.log(JSON.stringify(data));

  const response = await Promise.all([
    fetch(`${baseUrl}/send_survey`,{
        method: "post",
        body: formData
      })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  const desc_msg = responseData.desc_msg as string;
  
  return {
    status: status,
    message: desc_msg
  };

}

export const sendApiTransportLossFormData = async (data: object) => {
  data = {...data, ...{spbu: spbu}};
  const formData = new FormData();

  const exceptFields = ["density_15c", "password", "state", "tank_name", "treshold_ttl_loss", "lolines_ids", "conf_tolerance", "conf_tolerance_discrepancy", "datas_fname", "datas_fname_atg", "datas_id", "datas_id_atg", "is_atg"];
  const numberFields = ['density_obs', 'delivery_discrepancy', 'temperatur_obs', 'vol_after', 'volume_ar', 'volume_sales', 'ship_loss_id', 'shipment_id', 'height_after', 'tank_id', 'height_before', 'ttl_loss', 'claim_discrepancy', 'sensitivity', 'tolerance_discrepancy', 'ttl_loss_claim', 
  'tolerance', 'vol_compartment', 'vol_before'];

  Object.entries(data).forEach(([key, value]) => {
    if (exceptFields.indexOf(key) == -1)
      formData.append(key, numberFields.indexOf(key) != -1 ? Number(value) : value);
  });

  console.log("send form offline data with api");
  console.log(JSON.stringify(data));

  const response = await Promise.all([
    fetch(`${baseUrl}/send_transportloss_ofline`,{
        method: "post",
        body: formData
      })
  ]);

  const responseData = await response[0].json();
  const status = responseData.status as string;
  const desc_msg = responseData.desc_msg as string;
  
  return {
    status: status,
    message: desc_msg
  };
}




