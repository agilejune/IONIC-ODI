import { Delivery } from "../../models/Delivery";
export interface DeliveryState {
  loading: boolean,
  ongoingDeliverys: Delivery[],
  pastDeliverys: Delivery[],
};