// import React, { Component } from 'react'

// // importing reacstrap elements
// import {
//   Badge,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   UncontrolledDropdown,
//   Form,
//   Input,
//   ListGroupItem,
//   ListGroup,
//   Media,
//   NavItem,
//   NavLink,
//   Nav,
//   Progress,
//   Table,
//   Container,
//   Row,
//   Col,
//   Tabs, Tab,
//   UncontrolledTooltip
// } from "reactstrap";
// import Prospects from '../Prospects/Prospects';




// export class Campaign extends Component {
//   constructor() {
//     super()

//     this.state = {
//       show: true,
//       hide: true
//     }
//   }
//   render() {
//     const { show, hide } = this.state;

//     return (
//       <div className='main-view'>
//         <Container fluid className='mt-3'>
//           <Row>
//             <Col md='2' className='mt-1'>
//               <div className='grand_parent' >
//                 <div className='input_field'>
//                   <Input type='email' className='in' placeholder='Search' />
//                   <div className='child mt-2'>
//                     <a href='' ooverview_table
//                 </div>
//               </div>
//             </Col>
//             <Col md='1'>
//               <div>
//                 <label className='filter_app'>Teammate</label><br></br>
//                 <select className='filter_select'>
//                   <option value='one'>One</option>
//                   <option value='two'>two</option>
//                   <option value='three'>three</option>
//                   <option value='four'>Four</option>
//                 </select>
//               </div>
//             </Col>
//             <Col md='9'></Col>
//           </Row>
//           <Row className='mt-4'>
//             {show && <Col md='1' style={{ height: '40px' }}>
//               <div className='campaign_label'>
//                 <div className='add_label' onClick={(e) => { e.preventDefault(), this.setState({ show: !show }) }}> <span>+ Label</span></div>
//               </div>
//             </Col>}
//             {!show && <Col md='3'>
//               <div className='grand_parent' >
//                 <div className='input_field'>
//                   <Input type='email' className='label_input w-100' placeholder='Create a campaign label' />
//                   <div className='child mt-2'>
//                     <a href='' onClick={(e) => { e.preventDefault(), this.setState({ show: true }) }}>
//                       <span className='font_icon'><i class="fa fa-times" aria-hidden="true"></i></span>
//                     </a>
//                   </div>
//                   <div className='child mt-2'>
//                     <a href='' onClick={(e) => { e.preventDefault(), this.setState({ show: true }) }}>
//                       <span className='font_icon'><i class="fa fa-check" aria-hidden="true"></i></span>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </Col>}
//             <Col md='1'>
//               <div className='campaign_label'>
//                 <div className='add_label'> <span>
//                   <i class="fa fa-ban" aria-hidden="true"></i>Unlabeled</span></div>
//               </div>
//             </Col>
//             <Col md='1'>
//               <div className='campaign_label'>
//                 <div className='add_label' onMouseOut={(e) => { e.preventDefault(), this.setState({ hide: hide }) }} onMouseMove={(e) => { e.preventDefault(), this.setState({ hide: !hide }) }}>
//                   <span><i class="fa fa-tags" aria-hidden="true"></i>testlabel<span>
//                     {/* {!hide &&
//                       <span><i class="fa fa-edit" aria-hidden="true"></i>
//                         <i class="fa fa-trash" aria-hidden="true"></i></span>
//                     } */}
//                   </span>
//                   </span>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//         <Container fluid className='mt-4' >
//           <Card>
//             <Row>
//               <Col md='12'>
//                 <Table responsive hover >
//                   <thead>
//                     <tr>
//                       <th scope="col" className="tableheader1" ><input type="checkbox" /></th>
//                       <th className="tableheader2">Campaign Title</th>
//                       <th className="header_created">Created</th>
//                       <th className="header_assigned">Assigned</th>
//                       <th className="header_recipents">RECIPIENTS</th>
//                       <th className="header_sent">SENT</th>
//                       <th className="header_leads">LEADS</th>
//                       <th className="header_replies">REPLIES</th>
//                       <th className="header_open">OPENS</th>
//                       <th className="header_bounces">BOUNCES</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td><input type='checkbox' /></td>
//                       <td className="Campaign_title">January 19 Outreach</td>
//                       <td className="Created">0</td>
//                       <td className="Assigned">0</td>
//                       <td className="Recipient">0</td>
//                       <td className="Sent">0</td>
//                       <td className="Leads" >0</td>
//                       <td className="Replies">0</td>
//                       <td className="Open">0</td>
//                       <td className="Bounces">0</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//           </Card>
//         </Container>
//       </div>
//     )
//   }
// }

// export default Campaign
import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import classnames from 'classnames';
import Campaign_data from './OverView'
import Sequence from './Sequence';
import Recipients from './Recipients'

const Prospects = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (

    <div style={{ background: '#eee' }}>
      <Nav tabs>
        <NavItem><NavLink><i class="fa fa-chevron-left" aria-hidden="true"></i></NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '1' })} to="/Campaign_data" onClick={() => { toggle('1'); }}>OVERVIEW</NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '2' })} to="/Sequence" onClick={() => { toggle('2'); }}>SEQUENCE</NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '3' })} to="/Recipients" onClick={() => { toggle('3'); }}>RECIPIENTS</NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}>SETTINGS</NavLink></NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className='mt-5'>
          <Campaign_data />

        </TabPane>
        <TabPane tabId="2">
          <Sequence />
        </TabPane>
        <TabPane tabId="3">
          <Recipients />
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="4" className='mx-auto' style={{ border: '2px solid' }}>
              <h4>Tab 4 Contents</h4>
            </Col>
          </Row>
        </TabPane>

      </TabContent>
    </div>
  );
}

export default Prospects;
