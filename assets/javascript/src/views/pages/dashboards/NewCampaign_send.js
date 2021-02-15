import React, { Component } from 'react'
import { Row, Col, Container, Button } from "reactstrap"
import { connect } from "react-redux";
import { CampaignSendAction } from "../../../redux/action/CampaignAction"

export class Send extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.CampaignSendAction();
    }
    render() {
        const { sendData } = this.props;
        console.log(sendData && sendData, "sendData send")
        return (
            <div>
                <Container>
                    <Row >
                        <Col md="6" className="mx-auto">
                            <Row className="ready_campaign">Are you ready to start your campaign?</Row>
                            <Row className="startcampaign_button mt-5"><Button className="startcampaign_buttonicon">START CAMPAIGN</Button></Row>
                            <Row className="pause_campaign mt-4"> Pause Campaign</Row>
                            <Row className="mt-5" style={{ borderBottom: "1px solid #ddd" }}></Row>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="6" className="mx-auto" style={{ background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)' }}>
                            <div style={{ margin: '17px 0px 24px 24px' }}>
                                <div className="dv1">
                                    <Row>
                                        <h1>From address</h1>
                                    </Row>
                                    <Row style={{ color: 'navy', fontWeight: 'bold' }} className='mt-2'>Sending account</Row>
                                    <Row>{sendData && sendData.from_address}</Row>
                                    <Row className='mt-3' style={{ color: 'navy', fontWeight: 'bold' }}>Full Name</Row>
                                    <Row>{sendData && sendData.full_name}</Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md="6" className="mx-auto" style={{ background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)' }}>
                            <div style={{ margin: '17px 0px 24px 24px' }}>
                                <div className="dv1">
                                    <Row>
                                        <h1>Recipients</h1>
                                    </Row>
                                    <Row className="mt-5" style={{ fontSize: 12 }}>1 recipient will be sent this campaign immediately</Row>
                                    <Row style={{ fontSize: 14 }}>
                                        <ul>
                                            {
                                                sendData && sendData.recipients.map((item, index) => {
                                                   return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-5">
                        <Col md="6" className="mx-auto" style={{ background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)' }}>
                            <div style={{ margin: '17px 0px 24px 24px' }}>
                                <div className="dv1">
                                    <Row>
                                        <h1>Messages</h1>
                                    </Row>
                                    <Row className="mt-3" style={{ fontSize:"12px" }}>Initial campaign email</Row>
                                    <Row style={{ fontSize: 14 }}>
                                    <ul>
                                            {
                                                sendData && sendData.campEamil.map((item, index) => {
                                                   return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                    <Row className="mt-3" style={{ fontSize:"12px" }}>Follow-up campaign email</Row>
                                    <Row style={{ fontSize: 14 }}>
                                    <ul>
                                            {
                                                sendData && sendData.follow_up.map((item, index) => {
                                                   return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                    <Row className="mt-3" style={{ fontSize:"12px" }}>Drip campaign email</Row>
                                    <Row style={{ fontSize: 14 }}>
                                    <ul>
                                            {
                                                sendData && sendData.drip.map((item, index) => {
                                                   return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                    <Row className="mt-3" style={{ fontSize:"12px" }}>OnLinkClick campaign email</Row>
                                    <Row style={{ fontSize: 14 }}>
                                    <ul>
                                            {
                                                sendData && sendData.onLinkClick.map((item, index) => {
                                                   return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        sendData: state.CamapignSendReducer && state.CamapignSendReducer.sendData,
    };
};
const mapDispatchToProps = dispatch => ({
    CampaignSendAction: sendData => { dispatch(CampaignSendAction(sendData)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Send)
