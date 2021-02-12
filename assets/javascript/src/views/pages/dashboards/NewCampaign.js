import React, { useState } from 'react';
import { TabContent, Container, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import NewCampaign_recipients from './NewCampaign_recipients';
import NewCampaign_start from './NewCampaign_start';
import Compose from "./NewCampaign_compose"
import Preview from "./NewCampaign_preview"
import Option from "./option"
import Send from "./NewCampaign_send"
const NewCampaign = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <>
            <div className='main-view'>
                <div className='navbar' style={{ background: '#f5f5f5', width: '100%' }}>
                    <Container fluid>
                        <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                            <Col md='2' style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='logo_div' style={{ display: 'flex', alignItems: 'center' }}>
                                    <div><img src={STATIC_FILES.mailsaas_logo_32}></img>
                                        <span style={{ color: 'black', fontSize: '20px' }}>MailSaaaS</span></div>
                                </div>
                            </Col>
                            <Col md='8'>
                                <h1 style={{ textAlign: 'center', fontSize: '60px', color: "#333333" }}>New Campaign</h1>
                            </Col>
                            <Col md='2' style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <div className='mt-3'>
                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                        <span><i className="fa fa-question-circle-o fa-lg" aria-hidden="true"></i></span>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <hr color='yellow'></hr>
                        </Row>
                        <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                            <Col style={{ display: "flex" }}><Nav className='mx-auto' navbar>
                                <Row className='mx-auto' style={{ width: '100%' }}>
                                    <Col><NavItem className='pointer'><NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>START</NavLink></NavItem></Col>
                                    <Col><NavItem className='pointer'><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>RECIPICIENT</NavLink></NavItem></Col>
                                    <Col><NavItem className='pointer'><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}>COMPOSE</NavLink></NavItem></Col>
                                    <Col><NavItem className='pointer'><NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}>PREVIEW</NavLink></NavItem></Col>
                                    <Col><NavItem className='pointer'><NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { toggle('5'); }}>OPTIONS</NavLink></NavItem></Col>
                                    <Col><NavItem className='pointer'><NavLink className={classnames({ active: activeTab === '6' })} onClick={() => { toggle('6'); }}>SEND</NavLink></NavItem></Col>
                                </Row>
                            </Nav>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className='nav_details'>
                    <div>
                        <TabContent activeTab={activeTab} className='hello-world'>
                            <TabPane tabId="1"><NewCampaign_start /></TabPane>
                            <TabPane tabId="2"><NewCampaign_recipients /></TabPane>
                            <TabPane tabId="3"><Compose /></TabPane>
                            <TabPane tabId="4"><Preview /></TabPane>
                            <TabPane tabId="5"><Option /></TabPane>
                            <TabPane tabId="6"><Send /></TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
        </>
    );
}
export default NewCampaign;
