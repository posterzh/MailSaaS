import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import Input from 'reactstrap/lib/Input';

export class MailAccount extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            emailAddress:'',
        }
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    handleChange=(e)=>{
       this.setState({ [e.target.name]:e.target.value})
       console.log(this.state)
    }
    
    render() {
        return (
            <div>
                <h1>Mail Account</h1>
                <Button className='btn btn-light' onClick={(e) => { e.preventDefault(), this.setState({ modal: true }) }}>+</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}><h1>Connect a mail account</h1><p>How will you be sending emails?</p></ModalHeader>
                    <ModalBody >
                        <Container>
                            <Row>
                                <Col md='2'>logo</Col>
                                <Col md='10'>
                                    <Row>Sending address</Row>
                                    <Row><p style={{ fontSize: '0.7em' }}>This will be the “from” name and address on your emails and must be an address allowed by your email provider.</p></Row>
                                    <Row><Input type='email' name='emailAddress' value={this.state.emailAddress} onChange={this.handleChange} placeholder='Email Address'></Input></Row><br></br>
                                    <Row><Input type='text' placeholder='Full Name'></Input></Row>
                                </Col>
                            </Row><br></br>
                            <Row>
                                <Col md='2'>logo</Col>
                                <Col md='10'>
                                    <Row>SMTP connection</Row>
                                    <Row><p style={{ fontSize: '0.7em' }}>This information comes from your email provider and is how we‘ll send your emails.</p></Row>
                                    <Row>
                                        <Col md='8'><Input style={{ width: '100%' }} className='mt-2' type='email' placeholder='Host(e.g.mail.server.com)'></Input></Col>
                                        <Col md='4'><label className='selectbox_label' >Port Number</label>
                                            <select style={{ width: '100%' }}>
                                                <option>143</option>
                                                <option>993</option>
                                                <option>995</option>
                                            </select>
                                        </Col>
                                    </Row><br></br>
                                    <Row><Input type='email' placeholder='Username(usually your email address)'></Input></Row><br></br>
                                    <Row><Input type='password' placeholder='Password'></Input></Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>logo</Col>
                                <Col md='10'>
                                    <Row>Help</Row>
                                    <Row><p style={{ fontSize: '0.7em' }}>In most cases you‘ll need to contact your email provider or administrator to get help connecting your mail account. We‘re here to help as best we can.</p></Row>
                                    <Row><p style={{ fontSize: '0.7em' }}>Not having luck? Let Mailshake try auto-configuration.</p></Row><br></br>
                                    <Row><Input type='email' placeholder='Username(usually your email address)'></Input></Row><br></br>
                                    <Row><Input type='password' placeholder='Password'></Input></Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>logo</Col>
                                <Col md='10'>
                                    <Row>IMAP connection</Row>
                                    <Row><p style={{ fontSize: '0.7em' }}>This information comes from your email provider and is how we‘ll check your inbox for replies.</p></Row>
                                    <Row>
                                        <Col md='8'><Input style={{ width: '100%' }} className='mt-2' type='email' placeholder='Host(e.g.mail.server.com)'></Input></Col>
                                        <Col md='4'><label className='selectbox_label' >Port Number</label>
                                            <select style={{ width: '100%' }}>
                                                <option>25</option>
                                                <option>587</option>
                                                <option>465</option>
                                                <option>2525</option>
                                            </select>
                                        </Col>
                                    </Row><br></br>
                                    <Row><Input type='email' placeholder='Username(usually your email address)'></Input></Row><br></br>
                                    <Row><Input type='password' placeholder='Password'></Input></Row>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button>NEXT <i className='fa fa-right-arrow '></i></Button>
                        <Button>Cancle</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default MailAccount


   