import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal'
import ProgressBar from 'react-bootstrap/lib/ProgressBar'

class ProgressDialog extends Component {
  render() {
    return (
        <Modal style={{top:'40%'}} show={this.props.show}>
          <Modal.Body>
            <h4>{this.props.text}</h4>
            <ProgressBar striped bsStyle="success" active now={100}/>
          </Modal.Body>
        </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: state.progressDialog.show,
    text: state.progressDialog.text
  }
}

export default connect(mapStateToProps)(ProgressDialog);