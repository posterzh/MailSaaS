import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import OverView from './OverView';
import Sequence from './Sequence';
import Recipients from './Recipients';
import Setting from './Setting';

class Campaign_details extends React.Component {
  constructor() {
    super()
    this.state = {
      activeTab: '1',
    }
  }
    //  Campaign_Details = (props) => {
    //   const [activeTab, setActiveTab] = useState('1');

      toggle = tab => {
        if (this.state.activeTab !== tab) {
          this.setState(tab)
        }
      }   
  
  render() {
    const { activeTab } = this.state;
    return (
      <>
        <div className='campaign_navbar' >
          <h1 style={{ color: 'white', fontSize: '30px', textAlign: 'left' }}>Date Outreach</h1>
        </div>
        <div className='main-view'>

          <div>
            <Nav tabs>
              <NavItem><NavLink><span style={{ color: 'black' }}><i className="fa fa-chevron-left" aria-hidden="true"></i></span></NavLink></NavItem>
              <NavItem><NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggle('1'); }}><span style={{ color: 'Black' }}>OVERVIEW</span></NavLink></NavItem>
              <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggle('2'); }}><span style={{ color: 'Black' }}>SEQUENCE</span></NavLink></NavItem>
              <NavItem><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { this.toggle('3'); }}><span style={{ color: 'Black' }}>RECIPIENTS</span></NavLink></NavItem>
              <NavItem><NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { this.toggle('4'); }}><span style={{ color: 'Black' }}>SETTINGS</span></NavLink></NavItem>
            </Nav>
          </div>
          {/* </div> */}
          <div>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1" className='mt-5'>
                <OverView />
              </TabPane>
              <TabPane tabId="2">
                <Sequence />
              </TabPane>
              <TabPane tabId="3">
                <Recipients />
              </TabPane>
              <TabPane tabId="4">
                <Setting />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </>
    );
  }
}

export default Campaign_details
