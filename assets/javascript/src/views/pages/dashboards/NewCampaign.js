import React, { Component } from 'react'
import { Container, Input } from 'reactstrap'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import { useState } from 'react';
import classnames from 'classnames';
import { container } from 'webpack';

// const Prospects = (props) => {
//     const [activeTab, setActiveTab] = useState('1');
//     const toggle = tab => {
//       if (activeTab !== tab) setActiveTab(tab);
//     }
// }
class NewCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
        }
    }
    navvar = (tab) => {
        if (activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }




    render() {
        const { activeTab } = this.state;
        return (
            <div>
                {/* <Container fluid >
                    <Row style={{ display: "flex" }}>
                        <Col className="logo">
                            <img
                                src={STATIC_FILES.mailsaas_logo} />
                            <span>MailSaaaS</span>
                        </Col>
                        <Col className="new_campaign">New Campaign</Col>
                        <Col className="info_button"><i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        </Col>
                    </Row>
                    <Row style={{ borderBottom: "1px solid #ddd" }}>
                        <Col>
                            <span className="backbutton_icon"><i class="fa fa-chevron-left"></i></span>
                            <span className="back">BACK</span>
                        </Col>
                    </Row>
                    <Row style={{ borderBottom: "1px solid #ddd" }}>
                        <Col md='8' className='mx-auto'>

                            <Nav><NavItem><NavLink >START</NavLink></NavItem>
                                <NavItem><NavLink >RECIEPIENTS</NavLink></NavItem>
                                <NavItem><NavLink >COMPOSE</NavLink></NavItem>
                                <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={(e) => {alert('msg'), this.navvar(2) }}>SEQUENCE</NavLink></NavItem>
                                <NavItem><NavLink >PREVIEW</NavLink></NavItem>
                                <NavItem><NavLink >OPTIONS</NavLink></NavItem>
                                <NavItem><NavLink >SEND</NavLink></NavItem></Nav>                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col md='4' className='mx-auto'>Let's get started!</Col>
                    </Row>

                    <Row>
                        <Col md='8' className='mx-auto'>
                            <Input type="text" placeholder="Title(For your team's only)"></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='8' className='mx-auto'>
                            <label>From adress</label>
                            <select className="create_campaign_selectbox" >
                                <option value="" selected disabled hidden className="status">Status</option>
                                <option value="ignore" className="ignore">ignore</option>
                                <option value='won' className="won">won3</option>
                                <option value='lost' className="lost">lost</option>
                            </select>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Row>Add recipients to your campaign</Row>
                            <Row>gfhjbklm;hjkl;</Row>
                            <Row><Button>Next</Button></Row>
                        </Col>
                    </Row>

                </Container> */}
                <Container fluid>
                    <Row>
                        <Col>Drop in your first list of recipients
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" className="receipentlist_box">
                            <div  className="receipentlist_data_box" >
                                <div>
                                    <span className="option1">OPTION #1</span>
                                    <span className="csv_logo"><i class="fa fa-file-csv"></i></span>
                                    <span className="csv_logo_text">Drop a CSV file here</span>
                                    <span className="choose_option"> (<a href="">or choose one</a>)</span>
                                </div>
                                <div className="csv_note">
                                    Campaigns are limited to 5k recipients; uploads to 1MB.
                                    <i class="fa fa-file-csv"></i>
                                </div>
                                <div>
                                <span className="option1">OPTION #2</span>
                                <span className="textarea"><textarea placeholder="type here"></textarea></span>
                                </div>
                                <div>
                                <span className="option1">OPTION #3</span>
                                <span className="input_box_csv"><input></input></span>
                                </div>
                                <div style={{display:"flex"}}>
                                <div style={{display:"flex",flexDirection:"column"}}>
                                <span className="option1">OPTION #4</span>
                                <span className="Beta" >BETA</span>
                                </div>
                                <div>
                                <span><Button className="import_button">Import form app</Button></span>
                                </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

export default NewCampaign

