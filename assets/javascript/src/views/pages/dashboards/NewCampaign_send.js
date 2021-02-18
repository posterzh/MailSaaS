import React, { Component } from 'react'
import { Row, Col, Container, Button, Nav } from "reactstrap"
import { connect } from "react-redux";
import { Link} from 'react-router-dom';
import { CampaignSendAction, CampaignSaveAction} from "../../../redux/action/CampaignAction"

export class CampaignSend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            save: true
        }
    }
    componentDidMount() {
        this.props.CampaignSendAction();
        console.log('senddata',this.props.sendData)
        console.log("mounting in Send",this.props.startCampaignId)
    }
    render() {
        const { sendData} = this.props;
        console.log('senddata',sendData)
        return (
            <div>
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
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignStart">START</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignRecipient">RECIPICIENT</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignCompose">COMPOSE</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignPreview">PREVIEW</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignOptions">OPTIONS</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignSend">SEND</Link></li>
                                </ul>
                            </Row>
                        </Nav>
                        </Col>
                    </Row>
                    <Row className="ready_campaign mx-auto mt-4">Are you ready to start your campaign?</Row>
                    <Row className='mt-3'><Button className="startBtn mx-auto"
                    onClick={(e) => { this.setState({ save: true }); this.props.CampaignSaveAction(startCampaignId); console.log(this.state) }}
                    >START CAMPAIGN</Button></Row>
                    <Row className='mt-3'><Button className='btn mx-auto'
                    onClick={(e) => { this.setState({ save: false }); this.props.CampaignSaveAction(startCampaignId); console.log(this.state) }}
                    >Pause Campaign</Button></Row>
                    <Row className="mt-5 mb-4 w-50 mx-auto" style={{ borderBottom: "1px solid #ddd" }}></Row>
                    <Row>
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
                                    <Row className="mt-3" style={{ fontSize: "12px" }}>Initial campaign email</Row>
                                    <Row style={{ fontSize: 14 }}>
                                        <ul>
                                            {
                                                sendData && sendData.campEamil.map((item, index) => {
                                                    return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                    <Row className="mt-3" style={{ fontSize: "12px" }}>Follow-up campaign email</Row>
                                    <Row style={{ fontSize: 14 }}>
                                        <ul>
                                            {
                                                sendData && sendData.follow_up.map((item, index) => {
                                                    return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                    <Row className="mt-3" style={{ fontSize: "12px" }}>Drip campaign email</Row>
                                    <Row style={{ fontSize: 14 }}>
                                        <ul>
                                            {
                                                sendData && sendData.drip.map((item, index) => {
                                                    return <li key={index}>{item}</li>
                                                })
                                            }
                                        </ul>
                                    </Row>
                                    <Row className="mt-3" style={{ fontSize: "12px" }}>OnLinkClick campaign email</Row>
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
    console.log('recipientData-----: ',  state.StartCampaignReducer.startCampaignData.id)
    console.log('recipientData===================>-----: ',  state.CamapignSendReducer && state.CamapignSendReducer)
    return {
        sendData: state.CamapignSendReducer && state.CamapignSendReducer.sendData,
        startCampaignId: state.StartCampaignReducer.startCampaignData.id
    };
};
const mapDispatchToProps = dispatch => ({
    CampaignSendAction: (startCampaignId) => { dispatch(CampaignSendAction(startCampaignId));},
    CampaignSaveAction: (startCampaignId) => { dispatch(CampaignSaveAction(startCampaignId));},
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignSend)
