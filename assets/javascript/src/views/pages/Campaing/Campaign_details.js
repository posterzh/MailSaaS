import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import classnames from 'classnames';
import Campaign_data from './OverView'

const Campaign_Details = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (

    <div style={{ background: '#ffffff' }}>
      <Nav tabs>
        <NavItem><NavLink><i class="fa fa-chevron-left" aria-hidden="true"></i></NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '1' })} to="/Campaign_data" onClick={() => { toggle('1'); }}>OVERVIEW</NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>SEQUENCE</NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}>RECIPIENTS</NavLink></NavItem>
        <NavItem><NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}>SETTINGS</NavLink></NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className='mt-5'>
          <Campaign_data />
          
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="4" className='mx-auto' style={{ border: '2px solid' }}>
              <h4>Tab 2 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="4" className='mx-auto' style={{ border: '2px solid' }}>
              <h4>Tab 3 Contents</h4>
            </Col>
          </Row>
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

export default Campaign_Details;
