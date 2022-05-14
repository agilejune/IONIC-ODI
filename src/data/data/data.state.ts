import { CheckList } from "../../models/CheckList";
import { Delivery } from "../../models/Delivery";
import { Driver } from "../../models/Driver";
import { Feedback, FeedbackOptionAll } from "../../models/Feedback";
import { Order } from "../../models/Order";
import { Justify, LossFormDataOffline, Tank, Transportloss } from "../../models/Transportloss";
import { Vehicle } from "../../models/Vehicle";

export interface DataState {
  dataLoading: boolean,
  ongoingDeliverys: Delivery[],
  pastDeliverys: Delivery[],
  feedbacks: Feedback[],
  orders: Order[],
  transLossAll: Transportloss[],
  transFormOfflineDatas: LossFormDataOffline[],
  feedbackOptions: FeedbackOptionAll[],
  checkLists: CheckList[],
  tanks: Tank[],
  justify: Justify[],
  searchText?: string,
  willSendCount: number,
  drivers: Driver[],
  vehicles: Vehicle[],
  message: string,
  responseStatus: string,
};