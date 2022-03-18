import { CheckList } from "../../models/CheckList";
import { Delivery } from "../../models/Delivery";
import { Feedback } from "../../models/Feedback";
import { Order } from "../../models/Order";
import { Justify, Tank, Transportloss } from "../../models/Transportloss";
export interface DeliveryState {
  loading: boolean,
  ongoingDeliverys: Delivery[],
  pastDeliverys: Delivery[],
  feedbacks: Feedback[],
  orders: Order[],
  transLossAll: Transportloss[],
  checkLists: CheckList[],
  tanks: Tank[],
  justify: Justify[],
};