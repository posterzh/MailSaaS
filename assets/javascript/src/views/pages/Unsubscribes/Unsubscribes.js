import React, { useState } from 'react'
import { TabContent, TabPane, NavLink, Nav, NavItem } from 'reactstrap'
import { Container, Row } from 'reactstrap'
import Domainpage from './Domainpage'
import Addresstable from "./Addresstable"
import classnames from 'classnames';

const Unsubscribes = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div>
            <div>
                <div className='campaign_navbar' >
                    <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Unsubscribes</h1>
                    <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i class="fa fa-question-circle-o" aria-hidden="true"></i></p>
                </div>
            </div>
            <Container fluid>
                <Row className="mt-3 ml-1">
                    <div>
                        <input className="searchbox-unsubscribe" type="search" placeholder="search"></input>
                    </div>
                    <div className="unsubscribe-buttonsdiv">
                        <div>
                            <button className="refresh-button" ><i style={{fontSize:"15px"}} class="fa fa-refresh" aria-hidden="true"></i>
                            <span style={{marginLeft:"10px"}}>REFRESH</span></button></div>
                        <div><button className="Export-button">EXPORT</button></div>
                    </div>
                </Row>
                <Row className="mt-5 ml-1">
                    <Nav tabs style={{borderBottom:"1px solid #ccc",width:"99%"}} >
                        <NavItem className="address-nav"><NavLink className={classnames({ active1: activeTab === '1' })} onClick={() => { toggle('1'); }}><span style={{ color: 'black' }}>ADDRESS</span></NavLink></NavItem>
                        <NavItem className="domain-nav"><NavLink className={classnames({ active2: activeTab === '2' })} onClick={() => { toggle('2'); }}><span style={{ color: 'black' }}>DOMAIN</span></NavLink></NavItem>
                    </Nav>
                </Row>
                <Row>
                    <TabContent activeTab={activeTab} style={{ width: "100%" }}>
                        <TabPane tabId="1">
                            <Addresstable />
                        </TabPane>
                        <TabPane tabId="2">
                            <Domainpage />
                        </TabPane>
                    </TabContent>
                </Row>
            </Container>
        </div>
    );
}
export default Unsubscribes;

