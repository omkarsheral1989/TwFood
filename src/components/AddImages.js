import React, {Component} from 'react';

import {uploadImages} from '../actions/index';

import sendGAEvent from '../utils/googleAnalytics';

export default class AddImages extends Component {

  onFileSelected(event) {
    uploadImages(event.target.files);
    sendGAEvent('AddImages', 'Images Added');
  }

  addImages() {
    this.inputFile.click();
    sendGAEvent('AddImages', 'clicked');
  }

  render() {
    return (
        <input
            style={{display:"none"}}
            type="file" id="inpFile"
            ref={(element)=>{this.inputFile = element}}
            onChange={this.onFileSelected.bind(this)}
            accept="image/*"
            multiple/>
    )
  }
}