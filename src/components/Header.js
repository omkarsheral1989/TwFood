import React, {Component} from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import {refresh} from '../actions';


export default class Header extends Component {

  render() {
    return (
        <Navbar style={{borderRadius:'0'}} inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="">TW Foood (Alpha)</a>
            </Navbar.Brand>

            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={refresh}>
                <i className="fas fa-sync-alt"></i>&nbsp;Refresh
              </NavItem>

              <NavItem onClick={this.props.onClickAddImages}>
                <i className="fas fa-upload"></i>&nbsp;Add Images
              </NavItem>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
