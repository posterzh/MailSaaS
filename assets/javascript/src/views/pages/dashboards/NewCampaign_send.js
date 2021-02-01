import React, { Component } from 'react'
import Button from 'reactstrap/lib/Button'
import { Row, Col, Container } from "reactstrap"

export class Send extends Component {
    render() {
        return (
            <div>

                <Container>
                    <Row >
                        <Col md="6" className="mx-auto">
                            <Row className="ready_campaign">Are you ready to start your campaign?</Row>
                            <Row className="startcampaign_button mt-5"><Button>START CAMPAIGN</Button></Row>
                            <Row className="pause_campaign mt-4"> Pause Campaign</Row>
                            <Row className="mt-5" style={{ borderBottom: "1px solid #ddd" }}></Row>
                            {/* <div>
                                <Row className="mt-5">
                                <Row>From address</Row>
                                <Row className="mt-5">seing account</Row>
                                <Row>gauravsurolia@externlabs.com</Row>
                                <Row className="mt-2">From Name</Row>
                                <Row>Gaurav surolia</Row>
                                </Row >
                              </div> */}
                        </Col>
                    </Row>
                    <Row >
                        <Col md="6" className="mx-auto" style={{background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'}}>
                            <div style={{margin:'17px 0px 24px 24px'}}>
                                <div className="dv1">
                                    <Row>
                                        <h1>From address</h1>
                                    </Row>
                                    <Row className="mt-5">Sending account</Row>
                                    <Row>gauravsurolia@externlabs.com</Row>
                                    <Row className="mt-3">From name</Row>
                                    <Row>gauravsurolia</Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md="6" className="mx-auto" style={{background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'}}>
                            <div style={{margin:'17px 0px 24px 24px'}}>
                                <div className="dv1">
                                    <Row>
                                        <h1>Recipients</h1>
                                    </Row>
                                    <Row className="mt-5" style={{fontSize: 12}}>1 recipient will be sent this campaign immediately</Row>
                                    <Row style={{fontSize: 14}}>gauravsurolia@externlabs.com</Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-5">
                        <Col md="6" className="mx-auto" style={{background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'}}>
                            <div style={{margin:'17px 0px 24px 24px'}}>
                                <div className="dv1">
                                    <Row>
                                        <h1>Messages</h1>
                                    </Row>
                                    <Row className="mt-5" style={{fontSize: 12}}>Initial campaign email</Row>
                                    <Row style={{fontSize: 14}}>fgh</Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Send
