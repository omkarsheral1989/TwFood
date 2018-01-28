import {toastr} from 'react-redux-toastr'

import firebase from '../utils/firebase';
import * as Actions from './constants';
import store from '../utils/store';
import * as Constants from '../utils/constants';


export function fetchImages() {
  checkWhichPageToDisplay();

  dispatchFetchingImages();

  const imagesFirebaseDatabaseRef = getImagesFirebaseDatabaseRef();

  imagesFirebaseDatabaseRef.on('value', (snapshot)=> {
    let imageUrls = [];
    snapshot.forEach((childSnapshot)=> {
      imageUrls.push(childSnapshot.val().imageUrl);
    });

    dispatchImagesFetched(imageUrls);
  });
}

export function uploadImages(files) {
  if (files.length === 0) {
    return;
  }

  dispatchUploadingImages();

  const database = getImagesFirebaseDatabaseRef();
  const storage = getImageFirebaseStorageRef();

  let promises = [];


  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;

    const fileRef = storage.child(fileName);

    let promise = fileRef.put(file).then((snapshot)=> {
      const imageUrl = snapshot.downloadURL;
      return database.push().set({
        name: fileName,
        imageUrl
      });
    });

    promises.push(promise);
  }

  Promise.all(promises).then(()=> {
    dispatchImagesUploaded();
  }).catch((e)=> {
    console.log("error uploading images: ", e);
    dispatchImagesUploaded();
  });
}

export function refresh() {
  toastr.info("Refreshing", "in background");

  var page = getPageAsPerCurrentTime();

  var pageFirebaseRef = getPageFirebaseDatabaseRef();

  pageFirebaseRef.once('value').then(function (snapshot) {
    const pageFirebase = snapshot.val();
    if (page !== pageFirebase) {
      pageFirebaseRef.set(page);
      deleteAllImagesFromFirebaseDatabaseAndStorage();
    }
  });
}

function getPageAsPerCurrentTime() {
  const date = new Date();
  const hour = date.getHours();
  //const hour = 12;

  let page = Constants.PAGE_BREAKFAST;
  if (hour >= 16) {
    page = Constants.PAGE_SNACKS;
  } else if (hour >= 12) {
    page = Constants.PAGE_LUNCH;
  }

  console.log('page as per current time=' + page);

  return page;
}

function checkWhichPageToDisplay() {
  var page = getPageAsPerCurrentTime();

  store.dispatch({
    type: Actions.PAGE,
    page: page
  });

  var pageFirebaseRef = getPageFirebaseDatabaseRef();

  pageFirebaseRef.once('value').then(function (snapshot) {
    const pageFirebase = snapshot.val();
    if (page !== pageFirebase) {
      pageFirebaseRef.set(page);
      deleteAllImagesFromFirebaseDatabaseAndStorage();
    }
  });

  pageFirebaseRef.on('value', (snapshot)=> {
    const pageOnFirebase = snapshot.val();
    console.log('Page to display: ' + pageOnFirebase);

    store.dispatch({
      type: Actions.PAGE,
      page: pageOnFirebase
    });
  });
}

function getImagesFirebaseDatabaseRef() {
  return firebase.database().ref(Constants.CITY_PUNE + '/images');
}

function getImageFirebaseStorageRef() {
  return firebase.storage().ref(Constants.CITY_PUNE);
}

function getPageFirebaseDatabaseRef() {
  return firebase.database().ref(Constants.CITY_PUNE + '/page');
}

export function deleteAllImagesFromFirebaseDatabaseAndStorage() {
  console.log('Deleting all images on Firebase');

  var database = getImagesFirebaseDatabaseRef();
  var storage = getImageFirebaseStorageRef();

  database.once('value').then((snapshot)=> {
    database.remove();

    snapshot.forEach((childSnapshot)=> {
      const fileNameOnStorage = childSnapshot.val().name;
      console.log('deleting file', fileNameOnStorage);
      const fileOnStorage = storage.child(fileNameOnStorage);
      fileOnStorage.delete();
    });
  });
}

function dispatchFetchingImages() {
  console.log('Fetching Images');

  store.dispatch({
    type: Actions.FETCHING_IMAGES
  });

  store.dispatch({
    type: Actions.SHOW_PROGRESS_DIALOG,
    text: "Fetching Images"
  });
}

function dispatchImagesFetched(imageUrls) {
  console.log('Images fetched');

  store.dispatch({
    type: Actions.IMAGES_FETCHED,
    imageUrls: imageUrls
  });

  store.dispatch({
    type: Actions.HIDE_PROGRESS_DIALOG
  });
}

function dispatchUploadingImages() {
  console.log("uploading images");
  store.dispatch({
    type: Actions.UPLOADING_IMAGES
  });

  toastr.info('Images will be uploaded', 'in background');
}

function dispatchImagesUploaded() {
  console.log("images uploaded");
  store.dispatch({
    type: Actions.IMAGES_UPLOADED
  });
}
