import React, { useState } from 'react'

import { Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane, } from 'reactstrap'
import classnames from 'classnames';
import Overview_Summery from './Overview_Summery';
import Overview_Activity from './Overview_Activity'


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
                        <Col md='3'><NavItem><NavLink className={classnames({ active: activeTab === '1' })}  onClick={() => { toggle('1'); }}>SUMMARY</NavLink></NavItem></Col>
                        <Col md='3'><NavItem><NavLink className={classnames({ active: activeTab === '2' })}  onClick={() => { toggle('2'); }}>ACTIVITY</NavLink></NavItem></Col>
                        <Col md='2'><NavItem><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}>TIMELINE</NavLink></NavItem></Col>

                        <Col md='1'><div className='child ml-3'>
                            <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                <span className='font_icon'><i class="fa fa-undo" aria-hidden="true"></i></span>
                            </a></div>
                        </Col>
                    </Nav>

                      <div className='mt-5' >
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
                      </div>
                    </Col>
                </Row>

                {/* </Col>
                </Row> */}
            </Container>
        </div>
    )

}
export default Campaign_data
