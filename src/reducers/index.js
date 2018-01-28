import { combineReducers } from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import * as Actions from '../actions/constants';
import * as Constants from '../utils/constants';

const combinedReducer = combineReducers({
  page,
  fetchingImages,  //true|false
  images,
  uploadingImages,
  progressDialog,
  toastr: toastrReducer
});

export default combinedReducer;


function page(state = "Breakfast", action) {
  switch (action.type) {
    case Actions.PAGE:
      switch (action.page) {
        case Constants.PAGE_BREAKFAST:
          return "Breakfast";
        case Constants.PAGE_LUNCH:
          return "Lunch";
        case Constants.PAGE_SNACKS:
        default:
          return "Snacks";
      }
    default:
      return state;
  }
}

function fetchingImages(state = false, action) {
  switch (action.type) {
    case Actions.FETCHING_IMAGES:
      return true;
    case Actions.IMAGES_FETCHED:
      return false;
    default:
      return state;
  }
}

function images(state = [], action) {
  switch (action.type) {
    case Actions.IMAGES_FETCHED:
      return action.imageUrls;
    default:
      return state;
  }
}

function uploadingImages(state = false, action) {
  switch (action.type) {
    case Actions.UPLOADING_IMAGES:
      return true;
    case Actions.IMAGES_UPLOADED:
      return false;
    default:
      return state;
  }
}

function progressDialog(state = {show: false}, action) {
  switch (action.type) {
    case Actions.SHOW_PROGRESS_DIALOG:
      return {show: true, text: action.text};
    case Actions.HIDE_PROGRESS_DIALOG:
      return {show: false, text: state.text}; //old text is kept so that animation is smooth
    default:
      return state;
  }
}