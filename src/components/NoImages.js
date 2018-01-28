import React, {Component} from 'react';

import './NoImages.css';

export default class NoImages extends Component {
  render() {
    return (
        <div className="NoImages">
          <div className="center-horizontally">
            <div className="center-vertically" onClick={this.props.onClickAddImages}>
              <i className="fas fa-image icon"></i>
              <div>
                <span className="no-images-text">No Images &#9785;</span>
                <br/>
                <span className="add-images">Click here to add Images</span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
