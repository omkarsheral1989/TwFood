import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr'

import './App.css';
import '../assets/toastr.css';

import Header from './Header';
import PageTitle from './PageTitle';
import Images from './Images';
import AddImages from './AddImages';
import ProgressDialog from './ProgressDialog';

import {fetchImages} from '../actions/index';

class App extends Component {
  componentWillMount() {
    console.log('App: Component will mount');
    fetchImages();
  }

  render() {
    return (
        <div className="App">
          <Header onClickAddImages={()=>{this.addImagesRef.addImages();}}/>
          <PageTitle/>
          <Images onClickAddImages={()=>{this.addImagesRef.addImages();}}/>
          <AddImages ref={(ref)=>{this.addImagesRef=ref}}/>
          <ProgressDialog/>
          <ReduxToastr
              timeOut={3000}
              newestOnTop={true}
              position="bottom-center"
              transitionIn="fadeIn"
              transitionOut="fadeOut"/>
        </div>
    );
  }
}

export default App;
