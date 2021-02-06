import React, { Component } from 'react'
// import {Col,Row,} from "reactstrap"
// import Container from 'reactstrap/lib/Container'
import { Row, Col, Container } from "reactstrap"

export class MailAccount extends Component {
    render() {
        return (
            <div>
                <div className='campaign_navbar' >
                    <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Prospects</h1>
                    <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i class="fa fa-question-circle-o" aria-hidden="true"></i></p>
                </div>
                <Container fluid>
                    <Row>
                        <Col md="4">
                            <div>
                                <div>
                                    <Row >
                                        <Col md="1" ><i class="fa fa-envelope-o" aria-hidden="true"></i></Col>
                                        <Col md="6" >
                                            <Row>developer@externlabs.com</Row>
                                            <Row>SMTP</Row>
                                        </Col>
                                        <Col md="2"><i class="fa fa-ellipsis-v"></i></Col>
                                        <Col><i class="fa fa-calendar-minus"></i></Col>
                                        </Row>
                                    </div>
                                </div>
                        </Col>
                        </Row>
                    </Container>
                <Container fluid >
                    {/* <Row className="mt-2">
                        <Col md="4">
                         <div>
                            <div> 
                       <Row>
                        <Col md="1" ><i class="fa fa-envelope"></i></Col>
                        <Col md="4" >
                            <Row>developer@externlabs.com</Row>
                            <Row>SMTP</Row>
                        </Col>
                        <Col md="2"><i class="fa fa-ellipsis-v"></i></Col>
                        <Col md="2"><i class="fa fa-calendar-minus"></i></Col>
                        </Row>
                         </div></div> 
                        </Col>
                    </Row> */}

                    <Row className="mt-3">
                        <Col md="4" style={{ border: "1px solid blue", background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)' }}>
                            <div style={{ margin: '17px 0px 24px 24px' }}>
                                <div className="dv1">
                                    <Row>
                                        <h1>developer</h1>
                                    </Row>
                                    <Row >developer@externlabs.com</Row>
                                    <Row className="mt-5">Omaid Faizyar</Row>
                                    <Row>chase</Row>
                                    <Row className="mt-5">gauravsurolia</Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MailAccount
