import React, { Component } from 'react'
import LeadCatchermodel from "./LeadCatchermodel"
import { connect } from 'react-redux'
import { CampaignLeadViewAction,CampaignOverviewAction } from "../../../redux/action/CampaignAction";
import { Container, Row, Col, Input, Modal, ModalHeader, ModalBody, Card } from 'reactstrap'

class LeadCatcher extends Component {
  constructor() {
    super()
    this.state = {
      modal: false

    }
  }
  componentDidMount() {
    const id = this.props
    console.log("id hu m===>",id)
    this.props.CampaignLeadViewAction(id)
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }
  render() {
    const { modal } = this.state;
    return (
      <div >
        <div className='campaign_navbar' >
          <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Leads</h1>
          <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
        </div>
        <div>
          <Modal className="Leadcatcher_modal" isOpen={modal} toggle={this.toggle} className={LeadCatcher}>
            <ModalHeader className="Leadcatcher_modalheader" toggle={this.toggle}>email id</ModalHeader>
            <ModalBody className="Leadcatcher_modalbody" >
              <LeadCatchermodel />
            </ModalBody>
          </Modal>
        </div>
        <div className="graph_container" style={{ display: "flex", flexDirection: "row-reverse" }}>
          <span className="graph_title">Last 30 days</span>
        </div>
        <Container fluid>
          <Row>
            <Col md={3} className=''>
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
            <Col md={3}>
              <div >
                <select className='filter_select1 w-100 mt-3' >
                  <option value='one'>All Campaigns</option>
                  <option value='two'>Campaign 1</option>
                  <option value='three'>Campaign 2</option>

                </select>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <select className='filter_select1 mt-3'>
                  <option value='one'>unassigned</option>
                  <option value='two'>unassigned1</option>
                  <option value='three'>unassigned2</option>
                </select>
              </div>
            </Col>
            <Col md={2}>
              <div>
                <select className='filter_select1 mt-3'>
                  <option value='open'>open</option>
                  <option value='lost'>lost</option>
                  <option value='won'>won</option>
                  <option value='ignore'>ignore</option>
                </select>
              </div>
            </Col>
            <Col md={1}>
              <div className='refresh_child mt-3'>
                <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                  <span className='font_icon'><i className="fa fa-undo" aria-hidden="true"></i></span>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
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
                  <td className="Campaign_title">Person name</td>
                  <td className="Created">Campaign name</td>
                  <td className="Assigned">Omaid Faizyar</td>
                  <td className="Recipient">00:00</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div >
    )
  }
}
const mapStateToProps = (state) => {
  console.log("state",state.MailGetDataReducer && state.MailGetDataReducer.mailGetData)
  return {
  };
};
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(LeadCatcher)
