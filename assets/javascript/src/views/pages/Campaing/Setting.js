import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default function Setting() {
    return (
        <div>
            <Container fluid className='mt-5'>
                <Row>
                    <Col md='3'>
                        <div className='boxShadow setting_div'>
                            <div className='p-3 settingUnderline'>
                                <h3 className='display-4'>Sending Account</h3>
                                <label className='filter_app'>From address</label><br></br>
                                <select className='filter_select_prospect'>
                                    <option value='one'>One</option>
                                    <option value='two'>two</option>
                                    <option value='three'>three</option>
                                    <option value='four'>Four</option>
                                </select>
                                <label className='filter_app mt-3'>From name</label><br></br>
                                <input type='text' placeholder='' className='settingSendingInput'></input>
                            </div>
                            <div className='p-3'>
                                <button className=' btn sequence_btn'>SAVE</button>
                            </div>
                        </div>
                    </Col>
                    <Col md='3'>
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
                    <Col md='3'>
                        <div className='boxShadow setting_div'>
                            <div className='p-3 settingUnderline'>
                                <h3 className='display-4'>Lead Catcher</h3>
                                <label className='filter_app'>From address</label><br></br>
                                <select className='filter_select_prospect'>
                                    <option value='one'>One</option>
                                    <option value='two'>two</option>
                                    <option value='three'>three</option>
                                    <option value='four'>Four</option>
                                </select>
                                <label className='filter_app mt-3'>From name</label><br></br>
                                <input type='text' placeholder='' className='settingSendingInput'></input>
                            </div>
                            <div className='p-3'>
                                <button className=' btn sequence_btn'>SAVE</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


