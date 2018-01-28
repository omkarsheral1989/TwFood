import React, {Component} from 'react';

import {uploadImages} from '../actions/index';

export default class AddImages extends Component {

  onFileSelected(event) {
    uploadImages(event.target.files);
  }

  addImages() {
    this.inputFile.click();
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