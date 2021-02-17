// CAMPAIGN SETTING
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
// export default function Setting() {
export class Setting extends Component {
    constructor()
    {
        super()
        
    }
    render() {
        return (
            <div>
                <div className='main-view'>
                    <Container fluid className='mt-5'>
                        <Row className='mb-5'>
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
                            <Col md='4' >
                                <div className='boxShadow setting_div'>
                                    <div className='p-3 settingUnderline'>
                                        <h3 className='display-4'>Lead Catcher</h3>
                                        <Row>
                                            <Col>
                                                <label className='filter_app'>Who should leads be assigned to ?</label><br></br>
                                                <select className='filter_select_prospect'>
                                                    <option value='one'>Me</option>
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label className='filter_app'>When does a recipient become a lead?</label><br></br>
                                                <Row className='mt-3'>
                                                    <Col md='4'>
                                                        <label>recipients</label>
                                                        <select className='filter_select_prospect'>
                                                            <option value='Replies'>Replies</option>
                                                            <option value='Opens'>Opens</option>
                                                            <option value='Click any link'>Click any link</option>
                                                            <option value='Click specific link'>Click specific link</option>
                                                        </select>
                                                    </Col>
                                                    <Col md='4'>
                                                        <label>#Of times</label>
                                                        <input type='number' className='filter_select_prospect'></input>
                                                    </Col>
                                                    <Col md='4' style={{display:'flex',flexDirection:'row-reverse'}}>
                                                        <i className="fa fa-trash"></i>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='p-3' style={{display:'flex'}}>
                                        <button className=' btn sequence_btn'>SAVE</button>
                                        <button className=' btn sequence_btn'>CANCEL</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Setting
