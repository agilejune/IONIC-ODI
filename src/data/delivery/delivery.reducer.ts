import { DeliveryActions } from './delivery.actions';
import { DeliveryState } from './delivery.state';

export function deliveryReducer(state: DeliveryState, action: DeliveryActions): DeliveryState {
  switch (action.type) {
    case 'set-delivery-loading':
      return { ...state, dataLoading: action.isLoading };
    case 'set-delivery-data':
    case 'set-order-data':
    case 'set-feedback-data':
    case 'set-transloss-data':
    case 'set-lossform-offline':
    case 'set-checklist-data':
    case 'set-tank-data':
    case 'set-justify-data':
    case 'set-driver-detail':
    case 'set-vehicle-detail':
      return { ...state, ...action.data };
    case 'set-search-text':
      return { ...state, searchText: action.searchText };
    case 'set-will-send-count':
      return { ...state, willSendCount: action.count };
  }
}