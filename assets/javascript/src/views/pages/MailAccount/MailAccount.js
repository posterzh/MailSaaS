import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Input, Form } from 'reactstrap';
import SMTP from './SMTP'
import { connect } from "react-redux";
import { MailSenderAction, MailGetDataAction } from '../../../redux/action/MailSenderAction'

export class MailAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hide: true,
            modal: false,
            emailAddress: '',
            FullName: '',
            smtpPort: '587',
            smtpHost: '',
            smtpPassword: '',
            imapHost: '',
            imapPassword: '',
            imapPort: '993',
        }
    }

    componentDidMount() {
        this.props.MailGetDataAction();
        console.log(this.props)
        // this.props.dispatch(MailGetDataAction());
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ modal: !this.state.modal })
        const mailData = {
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
    }
    render() {
        const { mailGetData } = this.props;
        console.log(this.props.mailGetData, this.props.mailAccountId, 'this is Id')
        // console.log(mailGetData && mailGetData.map((i)=>{console.log('i------->', i)}))
        return (
            <div>
                <h1>Mail Account</h1>
                <div style={{ display: 'flex', color: 'black' }}>
                    <p style={{ fontSize: '20px' }}>Email Address</p>&nbsp;&nbsp;
                    <button style={{ border: 'none' }} onClick={(e) => { e.preventDefault(), this.setState({ hide: !this.state.hide }) }}><i className="fas fa-ellipsis-v mt-2" style={{ fontSize: '20px' }}></i></button>
                    {!this.state.hide && <ul style={{ listStyleType: 'none' }}>
                        <li><button style={{ border: 'none' }} >Edit Connection</button></li>
                        <li><button style={{ border: 'none' }}>Delete</button></li>
                    </ul>}
                </div>
                <div style={{ display: 'flex' }}>
                    <div>
                        {
                            mailGetData && mailGetData.map((item, index) => {
                                return <div style={{ boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)', width: 300, height: 300, margin: 20, padding: 10 }}>
                                    <div>{item.full_name}</div>
                                    <div>{item.email}</div>
                                </div>
                            })
                        }
                        <button>Edit</button>
                    </div>
                </div>
                <Button className='btn btn-light mt-5' onClick={(e) => { e.preventDefault(), this.setState({ modal: true }) }}>+</Button>
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
                                            <Col md='8'><Input name='smtpHost' value={this.state.smtpHost} onChange={this.handleChange} className='mt-4' type='text' placeholder='Host(e.g.mail.server.com)'></Input></Col>
                                            <Col md='4'><label className='selectbox_label' >Port Number</label>
                                                <Input name='smtpPort' type='select' onChange={this.handleChange} defaultValue='587'>
                                                    <option value='25'>25</option>
                                                    <option value='465'>465</option>
                                                    <option value='587'>587</option>
                                                    <option value='2525'>2525</option>
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
                                            <Col md='8'><Input onChange={this.handleChange} name='imapHost' value={this.state.imapHost} className='mt-4' type='text' placeholder='Host(e.g.mail.server.com)'></Input></Col>
                                            <Col md='4'><label className='selectbox_label' >Port Number</label>
                                                <Input type='select' name='imapPort' onChange={this.handleChange} defaultValue='993'>
                                                    <option value='143' >143</option>
                                                    <option value='993'>993</option>
                                                    <option value='995'>995</option>

                                                </Input>
                                            </Col>
                                        </Row><br></br>
                                        <Row><Input type='email' name='emailAddress' onChange={this.handleChange} value={this.state.emailAddress} placeholder='Username(usually your email address)'></Input></Row><br></br>
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
                            <Button type='submit'>NEXT<i className='fa fa-right-arrow '></i></Button>
                            <Button onClick={(e) => { e.preventDefault, this.setState({ modal: !this.state.modal }) }}>CANCEL</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.MailGetDataReducer.mailAccountId,"state")

    return {
        mailGetData: state.MailGetDataReducer.mailGetData,
        mailAccountId: state.MailGetDataReducer.mailAccountId
    };
};
const mapDispatchToProps = dispatch => ({
    MailSenderAction: mailData => { dispatch(MailSenderAction(mailData)) },
    MailGetDataAction: mailGetData => { dispatch(MailGetDataAction(mailGetData)) },
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
