import React, { Component } from 'react'
import {
  Card,
  Input,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { CampaignTableAction } from '../../../redux/action/CampaignAction'
class Campaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      hide: true,
      data: []
    }
  }
  componentDidMount() {
    this.props.CampaignTableAction()

    // console.log("state.CampaignTableReducer.CampaignTableData",this.props.CampaignTableReducer.CampaignTableData)
  }

  render() {
    const { show, hide } = this.state;
    const { Tables } = this.props;
    return (
      <>
        <div className='main-view'>
          <div >
            <div className='campaign_navbar' >
              <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Campaigns</h1>
              <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
            </div>
            {/* <div className='bg-dark' style={{ height: 70 }} >
             <ul>
               <li> <i className="fa fa-times" aria-hidden="true"></i></li>
               <li>Selected items</li>
             </ul>

            </div> */}
            <div className=''>
              <Container fluid className=''>
                <Row>
                  <Col md='2' className='mt-1'>
                    <div className='grand_parent' >
                      <div className='input_field'>
                        <Input type='email' className='in' placeholder='Search' />
                        <div className='child mt-2'>
                          <a href='#'> <span className='font_icon'><i className="fa fa-search" aria-hidden="true"></i></span></a></div>
                      </div>
                    </div>
                  </Col>
                  <Col md='1'>
                    <div>
                      <label className='filter_app'>Teammate</label><br></br>
                      <select className='filter_select'>
                        <option value='Any'>Any</option>
                        <option value='Unassigned'>Unassigned</option>
                        <option value='name'>NAme</option>
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
                            <span className='font_icon'><i className="fa fa-check" aria-hidden="true"></i></span>
                          </a>
                        </div>
                        <div className='child mt-2'>
                          <a href='' onClick={(e) => { e.preventDefault(), this.setState({ show: true }) }}>
                            <span className='font_icon'><i className="fa fa-check" aria-hidden="true"></i></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Col>}
                  <Col md='1'>
                    <div className='campaign_label'>
                      <div className='add_label'> <span>
                        <i className="fa fa-ban" aria-hidden="true"></i>Unlabeled</span></div>
                    </div>
                  </Col>
                  <Col md='1'>
                    <div className='campaign_label'>
                      <div className='add_label' onMouseOut={(e) => { e.preventDefault(), this.setState({ hide: hide }) }} onMouseMove={(e) => { e.preventDefault(), this.setState({ hide: !hide }) }}>
                        <span><i className="fa fa-tags" aria-hidden="true"></i>testlabel<span>
                        </span>
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container fluid className='mt-4' >
                <Card>
                  <Row>
                    <Col md='12'>
                      <Table responsive hover ><div className='bg-dark' style={{ height: 70 }} >
             <ul>
               <li> <i className="fa fa-times" aria-hidden="true"></i></li>
               <li>Selected items</li>
             </ul>

            </div>
                        <thead>
                          <tr>
                            <th scope="col" className="tableheader1" ><input type="checkbox" /></th>
                            <th className="tableheader2">Campaign Title</th>
                            <th className="header_created">Created</th>
                            <th className="header_assigned">Assigned</th>
                            <th className="header_recipents">RECIPIENTS</th>
                            <th className="header_sent">SENT</th>
                            <th className="header_leads">LEADS</th>
                            <th className="header_replies">REPLIES</th>
                            <th className="header_open">OPENS</th>
                            <th className="header_bounces">BOUNCES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Tables && Tables.CampaignTableData.map((item, index) => {
                            return (<>
                              <tr key={index} className='pointer' >
                                <td><input type='checkbox' /></td>
                                <td className="Campaign_title"><Link to='/app/admin/OverView'>{item.camp_title}</Link></td>
                                <td className='Created'>{item.camp_created_date_time.substring(5, 10)}</td>
                                <td className='Assigned'>{item.assigned}</td>
                                <td className='Recipient'>{item.recipientCount}</td>
                                <td className='Sent'>{item.sentCount}</td>
                                <td className='Leads'>{item.leadCount}</td>
                                <td className='Replies'>-</td>
                                <td className='Open'>{item.openLeadCount}</td>
                                <td key={index} className='Bounces'>-</td>
                              </tr>
                            </>
                            )
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Card>
              </Container>
              <div className='plus-button-div'>
                <div className='new_add_button'>
                  <span className="plusicon">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('statedjshadjsahdjh', state.CampaignTableReducer.CampaignTableData && state.CampaignTableReducer.CampaignTableData)
  return {
    Tables: state.CampaignTableReducer.CampaignTableData && state.CampaignTableReducer
  };
};
const mapDispatchToProps = dispatch => ({
  CampaignTableAction: mailGetData => { dispatch(CampaignTableAction(mailGetData)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Campaign)
