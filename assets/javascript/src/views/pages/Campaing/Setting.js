import React from 'react'
import { Container, Row, Col } from 'reactstrap'
export default function Setting() {
    return (
        <div>
            <div className='main-view'>
                <Container fluid className='mt-5'>
                    <Row className='mb-5'>
                        <Col md='4' ></Col>
                        <Col md='4' >
                            <div className='boxShadow setting_div'>
                                <div className='p-3 settingUnderline'>
                                    <h3 className='display-4'>Sending Account</h3>
                                    <label className='filter_app'>Who should leads be assigned to ?</label><br></br>
                                    <select className='filter_select_prospect'>
                                        <option value='one'>Me</option>
                                    </select>
                                    <p>When does a recipient become a lead?</p>
                                    <Row>
                                        <Col>
                                            <label className='filter_app'>Who should leads be assigned to ?</label><br></br>
                                            <select className='filter_select_prospect'>
                                                <option value='one'>Me</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='p-3'>
                                    <button className=' btn sequence_btn'>SAVE</button>
                                </div>
                            </div>
                        </Col>
                        <Col md='4' ></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}


