import React, { Component } from 'react'
import LeadCatchermodel from "./LeadCatchermodel"
// import LeadCatcherdata from "./LeadCatcherdata"
// importing reacstrap elements
import { Container, Row, Col, Label, Input, Dropdown, Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, Card } from 'reactstrap'

class LeadCatcher extends Component {
  constructor() {
    super()
    this.state = {
      modal: false

    }
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }
  render() {
    const { modal } = this.state;
    return (
      <div >
        <div>
          <Modal className="Leadcatcher_modal" isOpen={modal} toggle={this.toggle} className={LeadCatcher}>
            <ModalHeader className="Leadcatcher_modalheader"  toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody className="Leadcatcher_modalbody" >
             <LeadCatchermodel/>
           </ModalBody>
          </Modal>
        </div>

        <div className="graph_container" style={{ display: "flex", flexDirection: "row-reverse" }}>
          <span className="graph_title">Last 30 days</span>
        </div>

        <div className="Leadcatcher_Barcontainer">

          <Container style={{ pading: "20px 30px 0px" }} fluid className='mt-0'>
            <Row>
              <Col md="4">
                <div>
                  <Col md='4' className=' '>
                    <div className='grand_parent'>
                      <div className='input_field'>
                        <Input type='email' className='in' placeholder='Search' />
                        <div className='child'>
                          <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                            <span className='font_icon'><i className="fa fa-search" aria-hidden="true"></i></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </Col>
              <Col md="2">
                <div>

                  <select className='filter_select'>
                    <option value='one'>All Campaigns</option>
                    <option value='two'>Campaign 1</option>
                    <option value='three'>Campaign 2</option>

                  </select>
                </div>
              </Col>
              <Col md="2">
                <div>

                  <select className='filter_select'>
                    <option value='one'>unassigned</option>
                    <option value='two'>unassigned1</option>
                    <option value='three'>unassigned2</option>

                  </select>
                </div>
               
              </Col>
              <Col md="2">
                <div>

                  <select className='filter_select'>
                    <option value='open'>open</option>
                    <option value='lost'>lost</option>
                    <option value='won'>won</option>
                    <option value='ignore'>ignore</option>

                  </select>
                </div>
                {/* <Dropdown isOpen={this.state.dd1} toggle={this.dropdownToggle} >
                  <DropdownToggle caret className='drop_span' >
                    <span onClick={this.dropdownToggle}>
                      {this.state.value}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.select}>Header</DropdownItem>
                    <DropdownItem onClick={this.select}>Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
              </Col>
              <Col md="2">
                <div className='refresh_child mt-0'>
                  <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                    <span className='font_icon'><i class="fa fa-undo" aria-hidden="true"></i></span>
                  </a>
                </div>

              </Col>
            </Row>
          </Container>
        </div>

        <div className="Leadcatcher_table">
          <Card className="table">
            <table >
              <thead>
                <tr>
                  <th scope="col" className="tableheader1" ><input type="checkbox" /></th>
                  <th scope="col" className="tableheader2">Person</th>
                  <th scope="col" className="header_created">Campaign</th>
                  <th scope="col" className="header_assigned">AssignedTo</th>
                  <th scope="col" className="header_recipents">LeadDate</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={this.toggle}>
                  <td className="check_box"><input type="checkbox" /></td>
                  <td  className="Campaign_title">Person name</td>
                  <td className="Created">Campaign name</td>
                  <td className="Assigned">Omaid Faizyar</td>
                  <td className="Recipient">00:00</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>




      </div>
    )
  }
}

export default LeadCatcher