import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navbar from 'reactstrap/lib/Navbar';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';

export default class Campaign_details extends Component {
  render() {
    return (
      <>
       <div className='campaign_navbar'>
       <Container fluid>
          <Row className=''>
              <h1 style={{ color: 'white', fontSize: '30px', textAlign: 'left' }}>Date Outreach</h1>
          </Row>
          <Row className=''>
                <ul style={{ listStyleType: 'none', display: 'flex'  }}>
                  <li style={{color:'white'}} className='mr-3 ml-3'><Link to="/app/admin/OverView">OverView</Link></li>
                  <li className='mr-3 ml-3'><Link to="/app/admin/Message">Sequence</Link></li>
                  <li className='mr-3 ml-3'><Link to="/app/admin/Recipient/people">Recipients</Link></li>
                  <li className='mr-3 ml-3'><Link to="/app/admin/settings">Setting</Link></li>
                </ul>
              
          </Row>
        </Container>
       </div>
        {/* <div className='campaign_navbar' >
          <h1 style={{ color: 'white', fontSize: '30px', textAlign: 'left' }}>Date Outreach</h1>
        </div>
        <div className='main-view'>
          <div style={{ background: '#035AAC' }}>
            <ul style={{ listStyleType: 'none', display: 'flex' }}>
              <li className='mr-3 ml-3'><Link to="/app/admin/OverView">OverView</Link></li>
              <li className='mr-3 ml-3'><Link to="/app/admin/Message">Sequence</Link></li>
              <li className='mr-3 ml-3'><Link to="/app/admin/Recipient/people">Recipients</Link></li>
              <li className='mr-3 ml-3'><Link to="/app/admin/settings">Setting</Link></li>
            </ul>
          </div>
          </div> */}
      </>
    );
  }
}