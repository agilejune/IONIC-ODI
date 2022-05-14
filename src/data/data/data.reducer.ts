import { DataActions } from './data.actions';
import { DataState } from './data.state';

export function dataReducer(state: DataState, action: DataActions): DataState {
  switch (action.type) {
    case 'set-delivery-loading':
      return { ...state, dataLoading: action.isLoading };
    case 'set-server-message':
      return { ...state, message: action.msg};
    case 'set-server-res-status':
      return { ...state, responseStatus: action.status};
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
    case 'set-feedback-option':
      return { ...state, ...action.data };
    case 'set-search-text':
      return { ...state, searchText: action.searchText };
    case 'set-will-send-count':
      return { ...state, willSendCount: action.count };
  }
}