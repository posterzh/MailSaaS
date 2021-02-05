// import React, { Component } from 'react'
// import { Container, Input } from 'reactstrap'
// import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
// import { useState } from 'react';
// import classnames from 'classnames';
// import { container } from 'webpack';


// // const Prospects = (props) => {
// //     const [activeTab, setActiveTab] = useState('1');
// //     const toggle = tab => {
// //       if (activeTab !== tab) setActiveTab(tab);
// //     }
// // }
// class NewCampaign extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeTab: 1,
//         }
//     }
//     navvar = (tab) => {
//         if (activeTab !== tab) {
//             this.setState({ activeTab: tab })
//         }
//     }




//     render() {
//         const { activeTab } = this.state;
//         return (
//             <div>
//                 <Container fluid >
//                     <Row style={{ display: "flex" }}>
//                         <Col className="logo">
//                             <img
//                                 src={STATIC_FILES.mailsaas_logo} />
//                             <span>MailSaaaS</span>
//                         </Col>
//                         <Col className="new_campaign">New Campaign</Col>
//                         <Col className="info_button"><i class="fa fa-question-circle-o" aria-hidden="true"></i>
//                         </Col>
//                     </Row>
//                     <Row style={{ borderBottom: "1px solid #ddd" }}>
//                         <Col>
//                             <span className="backbutton_icon"><i class="fa fa-chevron-left"></i></span>
//                             <span className="back">BACK</span>
//                         </Col>
//                     </Row>
//                     <Row style={{ borderBottom: "1px solid #ddd" }}>
//                         <Col md='8' className='mx-auto'>

//                             <Nav><NavItem><NavLink >START</NavLink></NavItem>
//                                 <NavItem><NavLink >RECIEPIENTS</NavLink></NavItem>
//                                 <NavItem><NavLink >COMPOSE</NavLink></NavItem>
//                                 <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={(e) => { alert('msg'), this.navvar(2) }}>SEQUENCE</NavLink></NavItem>
//                                 <NavItem><NavLink >PREVIEW</NavLink></NavItem>
//                                 <NavItem><NavLink >OPTIONS</NavLink></NavItem>
//                                 <NavItem><NavLink >SEND</NavLink></NavItem></Nav>
//                         </Col>
//                     </Row>
//                 </Container>
//                 <Container fluid>
//                     <Row>
//                         <Col md='4' className='mx-auto'>Let's get started!</Col>
//                     </Row>

//                     <Row>
//                         <Col md='8' className='mx-auto'>
//                             <Input type="text" placeholder="Title(For your team's only)"></Input>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md='8' className='mx-auto'>
//                             <label>From adress</label>
//                             <select className="create_campaign_selectbox" >
//                                 <option value="" selected disabled hidden className="status">Status</option>
//                                 <option value="ignore" className="ignore">ignore</option>
//                                 <option value='won' className="won">won3</option>
//                                 <option value='lost' className="lost">lost</option>
//                             </select>
//                         </Col>
//                     </Row>
//                 </Container>
//                 <Container fluid>
//                     <Row>
//                         <Col>Drop in your first list of recipients
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md="6" className="receipentlist_box">
//                             <div className="receipentlist_data_box" >
//                                 <div className="option1_container">
//                                     <div>
//                                         <span className="option1">OPTION #1</span>
//                                         <span className="csv_logo"><i class="fa fa-file-csv"></i></span>
//                                         <span className="csv_logo_text">Drop a CSV file here</span>
//                                         <span className="choose_option"> (<a href="">or choose one</a>)</span>
//                                     </div>
//                                     <div className="csv_note">
//                                         Campaigns are limited to 5k recipients; uploads to 1MB.
//                                     <i class="fa fa-file-csv"></i>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <span className="option1">OPTION #2</span>
//                                     <span className="textarea"><textarea placeholder="type here"></textarea></span>
//                                 </div>
//                                 <div>
//                                     <span className="option1">OPTION #3</span>
//                                     <span className="input_box_csv"><input></input></span>
//                                 </div>
//                                 <div style={{ display: "flex" }}>
//                                     <div style={{ display: "flex", flexDirection: "column" }}>
//                                         <span className="option1">OPTION #4</span>
//                                         <span className="Beta" >BETA</span>
//                                     </div>
//                                     <div>
//                                         <span><Button className="import_button">Import form app</Button></span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>

//             </div>
//         )
//     }
// }

// export default NewCampaign

import React, { useState } from 'react';
import { TabContent, Container, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table, Navbar, NavbarText } from 'reactstrap';
import classnames from 'classnames';
import NewCampaign_recipients from './NewCampaign_recipients';
import NewCampaign_start from './NewCampaign_start';
import Compose from "./NewCampaign_compose"
import Preview from "./NewCampaign_preview"
import Option from "./option"
import Send from "./NewCampaign_send"
// import Campaign_data from './OverView'
// import Sequence from './Sequence';
// import Recipients from './Recipients'
// import Setting from './Setting'
// import EditCampaign from './EditCampaign';

const NewCampaign = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <>
            <div className='main-view'>
                <div className='navbar' style={{ background: '#f5f5f5', width: '100%'}}>
                    <Container fluid>
                        <Row style={{ width: '100%' ,borderBottom:"1px solid #dedede"}}>
                            <Col md='2' style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='logo_div' style={{ display: 'flex', alignItems: 'center' }}>
                                    <div><img src={STATIC_FILES.mailsaas_logo_32}></img>
                                        <span style={{ color: 'black', fontSize: '20px' }}>MailSaaaS</span></div>
                                </div>
                            </Col>
                            <Col md='8'>
                                <h1 style={{ textAlign: 'center', fontSize: '60px',color:"#333333" }}>New Campaign</h1>
                            </Col>
                            <Col md='2' style={{display:"flex",flexDirection:"row-reverse"}}>
                                <div className='mt-3'>
                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                        <span><i class="fa fa-question-circle-o fa-lg" aria-hidden="true"></i></span>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <hr color='yellow'></hr>
                        </Row>
                        <Row style={{ width: '100%' , borderBottom:"1px solid #dedede"}}>
                            <Col style={{display:"flex"}}><Nav className='mx-auto' navbar>
                                <Row className='mx-auto' style={{ width: '100%' }}>
                                    <Col><NavItem  className='pointer'><NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>START</NavLink></NavItem></Col>
                                    <Col><NavItem  className='pointer'><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>RECIPICIENT</NavLink></NavItem></Col>
                                    <Col><NavItem  className='pointer'><NavLink  className='disabled-link'  onClick={() => { toggle('3'); }}>COMPOSE</NavLink></NavItem></Col>
                                    <Col><NavItem  className='pointer'><NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}>PREVIEW</NavLink></NavItem></Col>
                                    <Col><NavItem  className='pointer'><NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { toggle('5'); }}>OPTIONS</NavLink></NavItem></Col>
                                    <Col><NavItem  className='pointer'><NavLink className={classnames({ active: activeTab === '6' })} onClick={() => { toggle('6'); }}>SEND</NavLink></NavItem></Col>
                                </Row>
                            </Nav>
                            </Col>

                        </Row>
                    </Container>
                </div>
                <div className='nav_details'>
                    <div>
                        <TabContent activeTab={activeTab} className='hello-world'>
                            <TabPane tabId="1">
                                <NewCampaign_start />
                            </TabPane>
                            <TabPane tabId="2">
                                <NewCampaign_recipients />
                            </TabPane>
                            <TabPane tabId="3">
                                <Compose/>
                            </TabPane>
                            <TabPane tabId="4">
                            <Preview />
                            </TabPane>
                            <TabPane tabId="5">
                            <Option />
                            </TabPane>
                            <TabPane tabId="6">
                            <Send />
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
            {/* <Navbar color='light' light expand='md' fixed='top'>
                <Nav className='mx-auto' navbar>
                    <NavbarBrand  style={{marginLeft:'0px'}}></NavbarBrand>
                    <NavbarText style={{fontSize:'80px'}}><b>New Campaign</b></NavbarText>
                
                    <NavItem><NavLink><i class="fa fa-chevron-left" aria-hidden="true"></i></NavLink></NavItem>
                    <NavItem><NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>OVERVIEW</NavLink></NavItem>
                    <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>SEQUENCE</NavLink></NavItem>
                    <NavItem><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}>RECIPIENTS</NavLink></NavItem>
                    <NavItem><NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}>SETTINGS</NavLink></NavItem>
                </Nav>
            </Navbar> */}

        </>
    );
}
export default NewCampaign;
