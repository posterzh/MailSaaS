import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Input, Form } from 'reactstrap';
import SMTP from './SMTP'
import { connect } from "react-redux";
import { MailSenderAction, MailGetDataAction } from '../../../redux/action/MailSenderAction'

class MailAccount extends Component {
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
        // this.props.dispatch(MailGetDataAction());
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    handleChange = (e) => {
        console.log( e.target.value,'e.target.name')
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
        // console.log(this.props.mailGetData, this.props.mailAccountId, 'this is Id')
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
                <Button className='btn btn-light mt-5' onClick={(e) => { e.preventDefault(), this.setState({ modal: !this.state.modal }) }}>+</Button>
                <SMTP isOpen={this.state.modal} handleChange={this.handleChange} handleSubmit={this.handleSubmit}  toggle={this.toggle} />
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
