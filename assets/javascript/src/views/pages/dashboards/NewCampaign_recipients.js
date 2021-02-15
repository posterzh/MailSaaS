// import { options } from 'dropzone';
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Button, Input, Form } from 'reactstrap'
import { RecipientAction, StartCampaignAction } from "../../../redux/action/CampaignAction";
import Csvfile from './csvfile'

class NewCampaign_recipients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            csvFile: '',
            email: [],
            campaign: 26,
            options: []
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
            // csvfile_op1:this.state.csvFile,
            option: `[${this.state.options}]`,
            email: `["${this.state.email}"]`,
            campaign: this.state.campaign
        }
        const token = localStorage.getItem('access_token')
        this.props.RecipientAction(recipientData, token)
    }
    render() {
        const { show } = this.state;
        return (
            <div>
                <div style={{ height: 800, width: '100%', backgroundColor: "#eee" }}>
                    <Container fluid>
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
                                                                <span className="csv_logo"><i class="fa fa-file" aria-hidden="true"></i></span>
                                                                <span className="csv_logo_text">Drop a CSV file here</span>
                                                                {/* < Csvfile /> */}
                                                                <span className="choose_option"><Input type='file' name='csvFile' onChange={this.handleChange}>(or choose one)</Input></span></Row>
                                                                <Row><span>Campaigns are limited to 5k recipients; uploads to 1MB.</span></Row></Col>
                                                        </Row>
                                                        <Row className='mt-5'>
                                                            <Col md='3' className="option1"><span>OPTION #2</span></Col>
                                                            <Col md='9'><span className="textarea"><textarea type='email' name='email' value={this.state.email} onChange={(e) => { this.setState({ show: true, email: e.target.value }) }} placeholder="type here"></textarea>{show && <Button className='btn startBtn'>IMPORT</Button>}</span></Col>
                                                        </Row>
                                                        <Row className='mt-5'>
                                                            {/* <Col md='3'> <span className="option1">OPTION #3</span></Col> */}
                                                            {/* <Col md='9'><span className="input_box_csv"><input name='campaign' value={this.state.campaign} onChange={this.handleChange} placeholder='Select an existing list'></input></span></Col> */}
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
    return { startCampaignId: state.StartCampaignReducer.startCampaignData && state.StartCampaignReducer.startCampaignData.id };
};
const mapDispatchToProps = dispatch => ({
    RecipientAction: (recipientData, token) => { dispatch(RecipientAction(recipientData, token)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign_recipients)
