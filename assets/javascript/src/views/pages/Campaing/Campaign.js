import React, { Component } from 'react'
import { Container, Row, Col, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Table } from 'reactstrap'

class Campaign extends Component {
  constructor() {
    super();
    this.state = {
      dd1: false,
      value: 'Any',
      show: true,
      hide: true
    };
  }

  dropdownToggle = () => {
    this.setState({
      dd1: !this.state.dd1
    });
  }
  select = (e) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }
  render() {
    const{show,hide}=this.state;
    return (
      <div>
        <div className="graph_container" style={{ display: "flex", flexDirection: "row-reverse" }}>
          <span className="graph_title">Last 30 days</span>
        </div>

        <div className="Campaign_barcontainer">
          <Container fluid className='mt-0'>
            <Row>
            <Col md='3' className=' '>
                            <div className='grand_parent'>
                                <div className='input_field'>
                                    <Input type='email' className='in' placeholder='Search' />
                                    <div className='child'>
                                        <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                            <span className='font_icon'><i class="fa fa-search" aria-hidden="true"></i></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
              <Col md='3'>
              <div>
                        <label className='filter_app'>Filter by app</label><br/>
                        <select className='filter_select'>
                            <option value='one'>any</option>
                            <option value='two'>unassigned</option>
                            <option value='three'>omaid faziyer</option>
                           
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
            </Row>
            <Row>
              <Col md="3">
              {!show &&
                <div className='grand_parent' >
                  <div className='input_field'>
                    <Input type='email' className='label_input' placeholder='Create a campaign label' />
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
                </div>}
              </Col>
              </Row>

          </Container>
        </div>
        <div>
        <Container fluid className='mt-4' >

          <Card>
            <Row>
              <Col md='12'>
                <Table responsive hover >
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
                    <tr>
                      <td><input type='checkbox' /></td>
                      <td className="Campaign_title">January 19 Outreach</td>
                      <td className="Created">0</td>
                      <td className="Assigned">0</td>
                      <td className="Recipient">0</td>
                      <td className="Sent">0</td>
                      <td className="Leads" >0</td>
                      <td className="Replies">0</td>
                      <td className="Open">0</td>
                      <td className="Bounces">0</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card>
        </Container>
        </div>
      </div>
    )
  }
}


export default Campaign