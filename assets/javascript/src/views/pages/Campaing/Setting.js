// CAMPAIGN SETTING
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import Form from 'reactstrap/lib/Form'
import Campaign_details from "../../../views/pages/Campaing/Campaign_details"
import {CampaignLeadCatcherAction} from "../../../redux/action/CampaignAction"

// export default function Setting() {
export class CampSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipientsData: '',
            num: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if(!this.state.recipientsData || !this.state.num ){
            alert('Fill all information')
        }
        console.log(this.state)
        const leadData={
            leadcatcher_recipient:this.state.recipientsData,
            of_times:this.state.num
        }
        this.props.CampaignLeadCatcherAction(leadData)
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Container fluid>
                        <Row>
                            <Campaign_details />
                        </Row>
                        <Row className='mb-5 mt-5'>
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
                                                        <select name='recipientsData' onChange={this.handleChange} value={this.state.name} className='filter_select_prospect'>
                                                            <option value='Replies'>Replies</option>
                                                            <option value='Opens'>Opens</option>
                                                            <option value='Click_any_link'>Click any link</option>
                                                            <option value='Click_specific_link'>Click specific link</option>
                                                        </select>
                                                    </Col>
                                                    <Col md='4'>
                                                        <label>#Of times</label>
                                                        <input type='number' name="num" onChange={this.handleChange} value={this.state.num} className='filter_select_prospect'></input>
                                                    </Col>
                                                    <Col md='4' style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                                        <i className="fa fa-trash"></i>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='mt-3 ml-2'>
                                            <a href=''><i className="fa fa-plus"></i> &nbsp;Add another condition</a>
                                        </Row>
                                    </div>
                                    <Row className='ml-2'>
                                        <div className='p-3' style={{ display: 'flex' }}>
                                            <button type='submit' className=' btn sequence_btn'>SAVE</button>
                                            {/* <button className=' btn sequence_btn'>CANCEL</button> */}
                                        </div>
                                    </Row>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // hjsdjds
    };
};
const mapDispatchToProps = (dispatch) => ({
    CampaignLeadCatcherAction: leadData => { dispatch(CampaignLeadCatcherAction(leadData)) },

});

export default connect(mapStateToProps, mapDispatchToProps)(CampSetting)
