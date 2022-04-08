import { CheckList } from "../../models/CheckList";
import { Delivery } from "../../models/Delivery";
import { Feedback } from "../../models/Feedback";
import { Order } from "../../models/Order";
import { Justify, LossFormDataOffline, Tank, Transportloss } from "../../models/Transportloss";

export interface DeliveryState {
  dataLoading: boolean,
  ongoingDeliverys: Delivery[],
  pastDeliverys: Delivery[],
  feedbacks: Feedback[],
  orders: Order[],
  transLossAll: Transportloss[],
  transFormOfflineDatas: LossFormDataOffline[],
  checkLists: CheckList[],
  tanks: Tank[],
  justify: Justify[],
  searchText?: string,
  willSendCount: number,
};