import React, { Component } from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import Form from 'reactstrap/lib/Form'

class NewCampaign_recipients extends Component {
    constructor() {
        super()
        this.state = {
            csvFile: '',

        }
    }
    render() {
        return (
            <div>
                <div style={{ height: '100%', width: '100%', backgroundColor: "#eee" }}>
                    <Container fluid>
                        <Row>
                            <Col md='12' style={{ backgroundColor: "#eee" }}>
                                <Form>
                                    <Container fluid>
                                        <Row className='mt-5'>
                                            <Col><h1 style={{ fontSize: '30px', fontWeight: '200', textAlign: 'center', color: 'black', backgroundColor: "#eee" }}>Drop in your first list of recipients</h1></Col>
                                        </Row>
                                        <Row className='mt-5'>
                                            <Col md="6" className="receipentlist_box mx-auto">
                                                <div className="receipentlist_data_box" >
                                                    <div className="option1_container">
                                                        <Row className='mt-3'>
                                                            <Col md='3' ><span className="option1">OPTION #1</span></Col>
                                                            <Col md='9'><Row>
                                                                <span className="csv_logo"><i class="fa fa-file" aria-hidden="true"></i></span>
                                                                <span className="csv_logo_text">Drop a CSV file here</span>
                                                                <span className="choose_option"> <Input type='file' name='csvFile' value={this.state.csvFile} onChange={this.handleChange}>(or choose one)</Input></span></Row>
                                                                <Row><span>Campaigns are limited to 5k recipients; uploads to 1MB.</span></Row></Col>
                                                        </Row>
                                                        <Row className='mt-5'>
                                                            <Col md='3' className="option1"><span>OPTION #2</span></Col>
                                                            <Col md='9'><span className="textarea"><textarea placeholder="type here"></textarea></span></Col>
                                                        </Row>
                                                        <Row className='mt-5'>
                                                            <Col md='3'> <span className="option1">OPTION #3</span></Col>
                                                            <Col md='9'><span className="input_box_csv"><input placeholder='Select an existing list'></input></span></Col>
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

export default NewCampaign_recipients
