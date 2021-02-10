import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Input, Form } from 'reactstrap';
import SMTP from './SMTP'
import { connect } from "react-redux";
import { MailSenderAction } from '../../../redux/action/AuthourizationAction'

export class MailAccount extends Component {
    constructor() {
        super()
        this.state = {
            modal: true,
            emailAddress: '',
            FullName: '',
            smtpPort: '',
            smtpHost: '',
            smtpPassword: '',
            imapHost: '',
            imapPassword: '',
            imapPort: ''
        }
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)

        const mailData={
            email: this.state.emailAddress,
            full_name: this.state.FullName,
            smtp_port: this.state.smtpPort,
            smtp_host: this.state.smtpHost,
            smtp_password: this.state.smtpPassword,
            smtp_username: this.state.emailAddress,
            imap_port: this.state.imapPort,
            imap_host: this.state.imapHost,
            imap_password: this.state.imapPassword,
            imap_username: this.state.emailAddress,
        }
        this.props.MailSenderAction(mailData)
        console.log(mailData)
    }
    render() {
        return (
            <div>
                <h1>Mail Account</h1>
                <Button className='btn btn-light' onClick={(e) => { e.preventDefault(), this.setState({ modal: true }) }}>+</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <Form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={this.toggle}><h1>Connect a mail account</h1><p>How will you be sending emails?</p></ModalHeader>
                        <ModalBody >
                            <Container>
                                <Row>
                                    <Col md='2'>logo</Col>
                                    <Col md='10'>
                                        <Row>Sending address</Row>
                                        <Row><p style={{ fontSize: '0.7em' }}>This will be the “from” name and address on your emails and must be an address allowed by your email provider.</p></Row>
                                        <Row><Input type='email' name='emailAddress' value={this.state.emailAddress} autoComplete='off' onChange={this.handleChange} placeholder='Email Address'></Input></Row><br></br>
                                        <Row><Input type='text' name='FullName' value={this.state.FullName} onChange={this.handleChange} placeholder='Full Name'></Input></Row>
                                    </Col>
                                </Row><br></br>
                                <Row>
                                    <Col md='2'>logo</Col>
                                    <Col md='10'>
                                        <Row>SMTP connection</Row>
                                        <Row><p style={{ fontSize: '0.7em' }}>This information comes from your email provider and is how we‘ll send your emails.</p></Row>
                                        <Row>
                                            <Col md='8'><Input style={{ width: '100%' }} name='smtpHost' value={this.state.smtpHost} onChange={this.handleChange} className='mt-4' type='text' placeholder='Host(e.g.mail.server.com)'></Input></Col>
                                            <Col md='4'><label className='selectbox_label' >Port Number</label>
                                                <Input name='smtpPort' onChange={this.handleChange} value={this.state.smtpPort} type='select' style={{ width: '100%' }}>
                                                    <option>25</option>
                                                    <option>587</option>
                                                    <option>465</option>
                                                    <option>2525</option>
                                                </Input>
                                            </Col>
                                        </Row><br></br>
                                        <Row><Input type='email' name='emailAddress' onChange={this.handleChange} value={this.state.emailAddress} placeholder='Username(usually your email address)'></Input></Row><br></br>
                                        <Row><Input type='password' name='smtpPassword' onChange={this.handleChange} value={this.state.smtpPassword} placeholder='Password'></Input></Row>
                                    </Col>
                                </Row><br></br>
                                <Row>
                                    <Col md='2'>logo</Col>
                                    <Col md='10'>
                                        <Row>IMAP connection</Row>
                                        <Row><p style={{ fontSize: '0.7em' }}>This information comes from your email provider and is how we‘ll check your inbox for replies.</p></Row>
                                        <Row>
                                            <Col md='8'><Input style={{ width: '100%' }} onChange={this.handleChange} name='imapHost' value={this.state.imapHost} className='mt-4' type='text' placeholder='Host(e.g.mail.server.com)'></Input></Col>
                                            <Col md='4'><label className='selectbox_label' >Port Number</label>
                                                <Input type='select' name='imapPort' onChange={this.handleChange} value={this.state.imapPort}>
                                                    <option>143</option>
                                                    <option>993</option>
                                                    <option>995</option>

                                                </Input>
                                            </Col>
                                        </Row><br></br>
                                        <Row><Input type='email' name='emailAddress' onChange={this.handleChange} value={this.state.emailAddress}  placeholder='Username(usually your email address)'></Input></Row><br></br>
                                        <Row><Input type='password' name='imapPassword' onChange={this.handleChange} value={this.state.imapPassword} placeholder='Password'></Input></Row>
                                    </Col>
                                </Row>
                                <Row><br></br>
                                    <Col md='2'>logo</Col>
                                    <Col md='10'>
                                        <Row>Help</Row>
                                        <Row><p style={{ fontSize: '0.7em' }}>In most cases you‘ll need to contact your email provider or administrator to get help connecting your mail account. We‘re here to help as best we can.</p></Row>
                                        <Row><p style={{ fontSize: '0.7em' }}>Not having luck? Let Mailshake try auto-configuration.</p></Row><br></br>
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit'>NEXT <i className='fa fa-right-arrow '></i></Button>
                            <Button>Cancle</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // token: state.token
    };
};
const mapDispatchToProps = dispatch => ({
    MailSenderAction: mailData => {
        dispatch(MailSenderAction(mailData));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(MailAccount)

{/* < Container >
                            <Row>
                                <Col md='3'>
                                    <a href=''><div style={{ border: '2px solid', height: '100%', width: '100%', textAlign: 'center' }}>
                                        <div>logo</div>
                                        <div style={{ fontSize: '0.8em', fontWeight: 'bold' }}>GMAIL /G SUITE </div>
                                        <div><p style={{ fontSize: '0.7em' }}>Any Google account</p></div>
                                    </div></a>
                                </Col>
                                <Col md='3'>
                                    <a href=''><div style={{ border: '2px solid', height: '100%', width: '100%', textAlign: 'center' }}>
                                        <div>logo</div>
                                        <div style={{ fontSize: '0.8em', fontWeight: 'bold' }}>GMAIL ALIAS</div>
                                        <div><p style={{ fontSize: '0.7em' }}>Any Google account</p></div>
                                    </div></a>
                                </Col>
                                <Col md='3'>
                                    <a href=''><div style={{ border: '2px solid', height: '100%', width: '100%', textAlign: 'center' }}>
                                        <div>logo</div>
                                        <div style={{ fontSize: '0.8em', fontWeight: 'bold' }}>mICROSOFT</div>
                                        <div><p style={{ fontSize: '0.7em' }}>Any Google account</p></div>
                                    </div></a>
                                </Col><Col md='3'>
                                    <a href=''><div style={{ border: '2px solid', height: '100%', width: '100%', textAlign: 'center' }}>
                                        <div>logo</div>
                                        <div style={{ fontSize: '0.8em', fontWeight: 'bold' }}>SMPT</div>
                                        <div><p style={{ fontSize: '0.7em' }}>Any Google account</p></div>
                                    </div></a>
                                </Col>
                            </Row>
                        </Container > */}
