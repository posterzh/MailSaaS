import React, { useState } from 'react'
import { Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane, } from 'reactstrap'
import classnames from 'classnames';
// import Overview_Summery from "./"
import Overview_Summery from "./OverviewSummery";
import Overview_Activity from './OverviewActivity'
const Campaign_data = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    {/* <Col md='12' className='mx-auto mt-4'>
                        <Row className='overview_hr'> */}
                    <Col md='8' className='mx-auto'><Nav tabs>
                        <Col md='3'>
                            <select className='select_overview'>
                                <option>All recipient lists</option>
                                <option value='Date'>Date</option>
                            </select>
                        </Col>
                        <Col md='3'><NavItem><NavLink className={classnames({ active3: activeTab === '1' })} to="/Campaign_data" onClick={() => { toggle('1'); }}>SUMMARY</NavLink></NavItem></Col>
                        <Col md='3'><NavItem><NavLink className={classnames({ active4: activeTab === '2' })} to="/Overview_Activity" onClick={() => { toggle('2'); }}>ACTIVITY</NavLink></NavItem></Col>
                        <Col md='2'><NavItem><NavLink className={classnames({ active5: activeTab === '3' })} onClick={() => { toggle('3'); }}>TIMELINE</NavLink></NavItem></Col>
                        <Col md='1'><div className='child ml-3'>
                            <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                <span className='font_icon'><i className="fa fa-undo" aria-hidden="true"></i></span>
                            </a></div>
                        </Col>
                    </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Overview_Summery />
                            </TabPane>
                            <TabPane tabId="2">
                               <Overview_Activity />
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="4" className='mx-auto' style={{ border: '2px solid' }}>
                                        <h4>Tab 3 Contents</h4>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
                {/* </Col>
                </Row> */}
            </Container>
        </div>
    )
}
export default Campaign_data