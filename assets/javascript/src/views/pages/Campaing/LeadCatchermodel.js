import React, { Component } from 'react'
import { Container, Row, Col, Label, Input, Dropdown, Modal, ModalHeader, ModalBody, ModalFooter, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, Card } from 'reactstrap'


export class LeadCatchermodel extends Component {

    render() {
        return (
            <div>
                <div>
                    <span className="lead_Action">Lead actions</span>
                    <span className="info_icon"><i class="fa fa-question-circle-o" aria-hidden="true"></i></span>
                </div>
                <div>
                    <span className="link_icon"><i class="fa fa-link" aria-hidden="true"></i></span>
                    <span className="user_name"> Ashu JANUARY 18 OUTREACH</span>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Row>
                        <Col >
                            <span>REPLY</span>
                        </Col>
                        <Col  >
                            <select >
                                <option value="" selected disabled hidden>Status</option>
                                <option value="ignore">ignore</option>
                                <option value='won'>won3</option>
                                <option value='lost'>lost</option>
                            </select></Col >
                        <Col  >
                            <select>
                                <option value="" selected disabled hidden>Assign</option>
                                <option value="ignore">Unassigned</option>
                                <option value='won'>Me</option>
                            </select>
                        </Col>
                        <Col  >
                            <span>
                                Next
                        </span>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row style={{ display: "flex" }}>
                        <div>
                            <span className="leadinfo_icon"><i class="fa fa-info-circle"></i></span>
                            <span className="leadstatus_opened">Lead opened</span>
                            <span className="leadopened_date"> Jan 24,2020</span>
                            <span className="saparator"><i class="fa fa-circle"></i></span>
                            <span className="leadopened_time">12:09 pm</span>
                        </div>
                    </Row>
                    <Row className="saparator_row" >
                        <i class="fa fa-circle"></i>
                    </Row>
                </div>
                <div>
                    <Row style={{ display: "flex", marginTop: "5px" }}>
                        <div>
                            <span className="leadwon_icon"><i class="fa fa-thumbs-up"></i></span>
                            <span className="leadstatus_won"> Lead won</span>

                            <span className="leadwon_date">jan 24,2020</span>
                            <span className="saparator"><i class="fa fa-circle"></i></span>
                            <span className="leadwon_time">12:19pm</span>
                        </div>
                    </Row>
                    <Row className="saparator_row" >
                        <i class="fa fa-circle"></i>
                    </Row>
                </div>

                {/* <div>
                    <Row>
                        <div>
                            <i class="fa fa-reply"></i>
                        </div>
                        <div>
                            replied
                        </div>
                        <div>
                            jan 24,2020
                        </div>
                        <div>
                            12:19pm
                        </div>
                    </Row>
                    <Row>
                        
                            <i class="fa fa-circle"></i>
                            <div>
                                gf
                            </div>
                    </Row>
                </div> */}
                <div>
                    <Row style={{ display: "flex", marginTop: "5px" }}>
                        <div>
                            <span className="leadwon_icon">  <i class="fa fa-thumbs-up"></i></span>
                            <span className="leadstatus_rewon"> Lead won</span>
                            <span className="leadwon_redate">jan 24,2020</span>
                            {/* <span className="saparator"><i class="fa fa-circle"></i></span> */}
                            <span className="leadwon_retime">12:19pm</span>
                        </div>
                    </Row>
                    <Row className="saparator_row" >
                        <i class="fa fa-circle"></i>
                    </Row>
                </div>
                <div>
                    <Row style={{ display: "flex", marginTop: "5px" }}>
                        <div>
                            <span className="leadinfo_icon"><i class="fa fa-info-circle"></i></span>
                            <span className="leadstatus_opened"> Lead opened</span>
                            <span className="leadopened_date">jan 24,2020</span>
                            <span className="saparator"><i class="fa fa-circle"></i></span>
                            <span className="leadopened_time"> 3:28pm</span>
                        </div>
                    </Row>
                    <Row className="saparator_row" >
                        <i class="fa fa-circle"></i>
                    </Row>
                </div>
                <div>
                    <Row style={{ display: "flex", marginTop: "5px" }}>
                        <div>
                            <span className="leadopened_icon"> <i class="fa fa-eye"></i></span>
                            <span className="leadstatus_opened"> opened</span>
                            <span className="initial_email">installemail</span>
                            <span className="leadopened_date"> jan 24,2020</span>
                            <span className="saparator"><i class="fa fa-circle"></i></span>
                            <span className="leadopened_time">3:28pm</span>
                        </div>
                    </Row>
                    <Row className="saparator_row" >
                        <i class="fa fa-circle"></i>
                    </Row>
                </div>
                <div>
                    <Row style={{ display: "flex", marginTop: "5px" }}>
                        <div>
                            <span className="sent_icon">  <i class="fa fa-paper-plane"></i></span>
                            <span className="sent_status"> sent</span>
                            <span className="sent_date"> jan 18,2020</span>
                            <span className="saparator"><i class="fa fa-circle"></i></span>
                            <span className="sent_time">7:43pm</span>
                        </div>
                    </Row>
                    <div >
                        <Row>
                            <div style={{ borderBottom: "1px solid #ddd" }}>

                                <span>From:</span>
                                <span>Gaurav surolia </span>
                                <span>gauravsurolia@externlabs.com</span>
                            </div>
                            <div>
                                <span>subject:</span>
                                <span>Ashu Campaign mg</span>
                            </div>
                            <div>
                                msg body
                                        </div>
                        </Row>
                    </div>

                </div>













            </div>
        )
    }
}

export default LeadCatchermodel
