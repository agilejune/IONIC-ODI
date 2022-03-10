import { DeliveryActions } from './delivery.actions';
import { DeliveryState } from './delivery.state';

export function deliveryReducer(state: DeliveryState, action: DeliveryActions): DeliveryState {
  switch (action.type) {
    case 'set-delivery-loading':
      return { ...state, loading: action.isLoading };
    case 'set-delivery-data':
      return { ...state, ...action.data };
    case 'set-order-data':
      return { ...state, ...action.data };
    case 'set-feedback-data':
      return { ...state, ...action.data };
    case 'set-transloss-data':
      return { ...state, ...action.data };
  }
}