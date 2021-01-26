import React, { Component } from 'react'

// importing reacstrap elements
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";




export class Campaign extends Component {
  constructor() {
    super()

    this.state = {
      show: true,
      hide: true
    }
  }
  render() {
    const { show, hide } = this.state;

    return (
      <div className='main-view'>
        <Container fluid className='mt-3'>
          <Row>
            <Col md='2' className='mt-1'>
              <div className='grand_parent' >
                <div className='input_field'>
                  <Input type='email' className='in' placeholder='Search' />
                  <div className='child mt-2'>
                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                      <span className='font_icon'><i class="fa fa-search" aria-hidden="true"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md='1'>
              <div>
                <label className='filter_app'>Teammate</label><br></br>
                <select className='filter_select'>
                  <option value='one'>One</option>
                  <option value='two'>two</option>
                  <option value='three'>three</option>
                  <option value='four'>Four</option>
                </select>
              </div>
            </Col>
            <Col md='9'></Col>
          </Row>
          <Row className='mt-4'>
            {show && <Col md='1' style={{ height: '40px' }}>
              <div className='campaign_label'>
                <div className='add_label' onClick={(e) => { e.preventDefault(), this.setState({ show: !show }) }}> <span>+ Label</span></div>
              </div>
            </Col>}
            {!show && <Col md='3'>
              <div className='grand_parent' >
                <div className='input_field'>
                  <Input type='email' className='label_input w-100' placeholder='Create a campaign label' />
                  <div className='child mt-2'>
                    <a href='' onClick={(e) => { e.preventDefault(), this.setState({ show: true }) }}>
                      <span className='font_icon'><i class="fa fa-times" aria-hidden="true"></i></span>
                    </a>
                  </div>
                  <div className='child mt-2'>
                    <a href='' onClick={(e) => { e.preventDefault(), this.setState({ show: true }) }}>
                      <span className='font_icon'><i class="fa fa-check" aria-hidden="true"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </Col>}
            <Col md='1'>
              <div className='campaign_label'>
                <div className='add_label'> <span>
                  <i class="fa fa-ban" aria-hidden="true"></i>Unlabeled</span></div>
              </div>
            </Col>
            <Col md='1'>
              <div className='campaign_label'>
                <div className='add_label' onMouseOut={(e) => { e.preventDefault(), this.setState({ hide: hide }) }} onMouseMove={(e) => { e.preventDefault(), this.setState({ hide: !hide }) }}>
                  <span><i class="fa fa-tags" aria-hidden="true"></i>testlabel<span>
                    {!hide &&
                      <span><i class="fa fa-edit" aria-hidden="true"></i>
                        <i class="fa fa-trash" aria-hidden="true"></i></span>
                    }
                  </span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ height: '400px' }}></Row>
        </Container>
      </div>
    )
  }
}

export default Campaign