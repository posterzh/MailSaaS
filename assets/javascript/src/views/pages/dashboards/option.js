// file for option pick in campaign
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class Option extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="option_note">Tweak how your campaign will be sent</Row>
                </Container>
                <Container>
                    <Row>
                        <Col md="6" className="mx-auto">
                            <Row>
                                <div >
                                    <input type="checkbox"></input>&nbsp;
                           <span className="track_option">Track opens</span><br />
                                    <input type="checkbox"></input>
                                    <span className="track_line">Track Link clicks</span><br />
                                    <input type="checkbox"></input>
                                    <span className="schedule">Schedule this send</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="time_container">
                                    <span className="sending_calendar">Sending calendar timezone</span><br />
                                    <span className="time_zone">Asia/Calcutta</span><br />
                                    </div>
                                    </Row>
                                    <Row style={{marginLeft:"2px"}}>
                                    <div style={{display:"flex",flexDirection:"row"}}>
                                    <input type="date" className="date_picker" />
                                    <input type="time" className="time_picker" /><br />
                                </div>
                            </Row>
                            <Row className="Leadcatcher_settingdiv">
                                <span className="leadcatchersetting_icon"><i class="fa fa-caret-down"></i></span>
                                <span className="leadcatchersetting">Lead Catcher setting</span>
                            </Row>
                            <Row>
                                <span className="about_leadcatcher">ABOUT LEAD CATCHER</span>
                                <span className="about_leadcatchericon"><i class="fa fa-question-circle-o" aria-hidden="true"></i></span><br />
                                <span className="leadcatcher_note">Follow-up emails stop when a recipient becomes a lead, and leads are collected in one place so you can efficiently respond or take action.</span>
                            </Row>
                            <Row className="select_boxdiv">
                                <div>
                                    <label className="selectbox_label">Who should leads be assigned to?</label><br />
                                    <select className="select_box">
                                        <option value="" selected>me</option>
                                    </select>
                                </div>
                            </Row>
                            <Row >
                                <div>
                                    <span className="recipient_condition">When does a recipient become a lead?</span>
                                    <div>
                                        <div className="recipient_replies">
                                            <span style={{ display: "flex" }}>
                                                <label className="Recipient_label">Recipient</label>
                                                <span className="numberof_replieslabel" ># of times</span>
                                            </span>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                {/* <span className="replies_selectbox"> */}
                                                    <select>
                                                        <option value="" selected>Replies</option>
                                                        <option value="" >Opens</option>
                                                        <option value="" >Click any link</option>
                                                        <option value="" >Click apecific link</option>
                                                    </select>
                                                {/* </span> */}
                                                {/* <span className="numberof_replieslabel"># of times</span> */}
                                                {/* <span className="numberof_repliesinput"> */}
                                                    <input type="text" />
                                                {/* </span> */}
                                                <span className="delete_icon"><i class="fa fa-trash"></i></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <span><i class="fa fa-caret-down"></i></span>
                                <span>CRM sync</span>
                            </Row>
                            <Row>
                                <span>CRM sync</span><br />
                            </Row>
                            <Row>
                                <span>Send updates to your team‘s CRMs when this campaign has activity:</span>
                            </Row>
                            <Row>
                                <span><input type="checkbox" /></span>
                                <span><i class="fa fa-slack"></i></span>
                                <span>Extern Labs</span>
                            </Row>
                            <Row>
                                <div>
                                    <input type="checkbox" />
                                    <span>I'll obey pertinent laws and I've read these< a href="www.google.com"> important notes.</a>
                                    </span>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>


            </div>
        )
    }
}

export default Option
