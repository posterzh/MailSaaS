import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Button, Input, Nav, Form } from 'reactstrap';
import { Link, Route } from 'react-router-dom';

import { RecipientAction, StartCampaignAction } from "../../../redux/action/CampaignAction";
import Csvfile from './csvfile'

class NewCampaign_recipients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            csvFile: '',
            email: [],
            options: [],
            campaign: this.props.history.location.state && this.props.history.location.state.id
        }
    }
    handleChange = (e) => {
        this.setState({
            csvFile: e.target.files[0],
            show: true
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.state.options.length = 0
        if (!this.state.email && !this.state.csvFile) {
            alert('Fill option 1 or 2')
            return false;
        }
        else if (this.state.csvFile && !this.state.email) {
            let temp = 1;
            this.state.options.push(temp)
        }
        else if (this.state.email && !this.state.csvFile) {
            let temp = 2;
            this.state.options.push(temp)
        }
        else if (this.state.csvFile && this.state.email) {
            let temp1 = 1;
            let temp2 = 2;
            this.state.options.push(temp1, temp2)
        }
        else { return false }
        const recipientData = {
            csvfile_op1: this.state.csvFile,
            option: `[${this.state.options}]`,
            email: `["${this.state.email}"]`,
            campaign: this.state.campaign
        }
        console.log(this.state.csvFile,'file')
        this.props.RecipientAction(recipientData)
    }
   
    render() {
        const { show } = this.state;
        console.log(this.props.location, this.props.campaignDetails, "recipient")
        return (
            <div className='main-view'>
                <div style={{ height: 980, width: '100%', backgroundColor: "#eee" }}>
                    <Container fluid>
                        <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='logo_div' style={{ display: 'flex', alignItems: 'center' }}>
                                    <div><img src={STATIC_FILES.mailsaas_logo_32}></img>
                                        <span style={{ color: 'black', fontSize: '20px' }}>MailSaaaS</span></div>
                                </div>
                            </Col>
                            <Col >
                                <h1 style={{ textAlign: 'center', fontSize: '60px', color: "#333333" }}>New Campaign</h1>
                            </Col>
                            <Col style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <div className='mt-3'>
                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                        <span><i className="fa fa-question-circle-o fa-lg" aria-hidden="true"></i></span>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                            <Col style={{ display: "flex" }}><Nav className='mx-auto' navbar>
                                <Row className='mx-auto' style={{ width: '100%' }}>
                                    <ul style={{ listStyleType: 'none', display: 'flex' }}>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname: "/app/admin/CampaignStart",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>START</Link></li>
                                        <li className='mr-3 ml-3'><Link to="/app/admin/CampaignRecipient">RECIPICIENT</Link></li>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname:
                                                "/app/admin/CampaignCompose",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>COMPOSE</Link></li>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname: "/app/admin/CampaignPreview",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>PREVIEW</Link></li>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname: "/app/admin/CampaignOptions",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>OPTIONS</Link></li>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname: "/app/admin/CampaignSend",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>SEND</Link></li>
                                    </ul>
                                </Row>
                            </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='12' style={{ backgroundColor: "#eee" }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Container fluid>
                                        <Row className='mt-5'>
                                            <Col><h1 style={{ fontSize: '30px', fontWeight: '200', textAlign: 'center', color: 'black', backgroundColor: "#eee" }}>Drop in your first list of recipients</h1></Col>
                                        </Row>
                                        <Row className='mt-5'>
                                            <Col md="6" className="receipentlist_box mx-auto">
                                                <div className="receipentlist_data_box" >
                                                    <div className="option1_container">
                                                        <Row className='mt-3'>
                                                            <Col md='3'><span className="option1">OPTION #1</span></Col>
                                                            <Col md='9'><Row>
                                                                <span className="csv_logo"><i className="fa fa-file" aria-hidden="true"></i></span>
                                                                <span className="csv_logo_text">Drop a CSV file here</span>
                                                                <span className="choose_option"><Input type='file' name='csvFile' value={this.state.value} onChange={this.handleChange}></Input></span></Row>
                                                                <Row><span>Campaigns are limited to 5k recipients; uploads to 1MB.</span></Row></Col>
                                                        </Row>
                                                        <Row className='mt-5'>
                                                            <Col md='3' className="option1"><span>OPTION #2</span></Col>
                                                            <Col md='9'><span className="textarea"><textarea type="email" name='email' value={this.state.email} onChange={(e) => { this.setState({ show: true, email: e.target.value }) }} placeholder="type here"></textarea>{show && <Button className='btn startBtn'>IMPORT</Button>}</span></Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        campaignDetails: state.StartCampaignReducer.startCampaignData.id,
        mailGetData: state.MailGetDataReducer.mailGetData
    };
};
const mapDispatchToProps = dispatch => ({
    RecipientAction: (recipientData) => { dispatch(RecipientAction(recipientData)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign_recipients)
