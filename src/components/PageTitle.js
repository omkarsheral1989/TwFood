import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import './PageTitle.css';

class PageTitle extends Component {
  render() {
    return (
        <Grid className="PageTitle">
          {
            this.props.pageTitle
          }
        </Grid>
    );
  }
}


function mapStateToProps(state) {
  return {
    pageTitle: state.page
  };
}

export default connect(mapStateToProps)(PageTitle);