import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';

import "./Images.css"

import NoImages from './NoImages';

class Images extends Component {

  isSmallDevice() {
    return window.innerWidth < 768;
  }

  render() {
    if (this.props.noImages) {
      return (
          <NoImages onClickAddImages={this.props.onClickAddImages}/>
      );
    }

    const images = this.props.images.map((url)=> {
      return (
          <a href={url} key={url} target="blank">
            <img key={url} className="image" src={url} alt="food"/>
          </a>
      );
    });

    if (this.isSmallDevice()) {
      return (
          <div className="col-small-device">
            {images}
          </div>
      )
    }

    const evenImages = images.filter((image, index)=> {
      return index % 2 === 0;
    });

    const oddImages = images.filter((image, index)=> {
      return index % 2 === 1;
    });

    return (
        <Grid>
          <Col className="col" md={6} key="1">
            {evenImages}
          </Col>
          <Col className="col col-right" md={6} key="2">
            <div className="col-right">
              {oddImages}
            </div>
          </Col>
        </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.images,
    noImages: (!state.fetchingImages && state.images.length === 0)
  };
}

export default connect(mapStateToProps)(Images);
