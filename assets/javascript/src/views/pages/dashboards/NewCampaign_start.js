import React from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Form, Input, Nav } from 'reactstrap';
import { Link, Route } from 'react-router-dom';

import { StartCampaignAction } from "../../../redux/action/CampaignAction";
import { MailGetDataAction } from '../../../redux/action/MailSenderAction';
class NewCampaign_start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            from_address: 12,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this.props.MailGetDataAction();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            from_address: this.state.from_address
        }
        this.props.StartCampaignAction(data)
    }
    render() {
        const { mailGetData } = this.props;
        return (
            <div className='main-view'>
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
                            <Row >
                                <Col md='6'  className='mx-auto mt-5'>
                                <Form onSubmit={this.handleSubmit}>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }} >
                                        <h1 style={{ fontSize: '30px', textAlign: 'center', color: "#333333" }}> Let's get started</h1>
                                    </Row>
                                    <Row className='mt-5'>
                                        <div style={{ width: '100%' }}> <label>Title (for your team's eyes only)</label><br></br>
                                            <input type='text' name='title' value={this.state.title} onChange={this.handleChange} className='start_input' autoComplete="off" required></input></div>
                                    </Row>
                                    <Row className='mt-5'>
                                        <div style={{ width: '100%' }}><label >From Address</label><br></br>
                                            <Input type="select" name='from_address' onChange={this.handleChange} id="exampleSelect" >
                                                {
                                                    mailGetData && mailGetData.map((item, index) => {
                                                        return (<>
                                                            <option key={index} value={item.id}>{item.email}</option>
                                                        </>)
                                                    })
                                                }
                                            </Input>
                                        </div>
                                    </Row>
                                    <Row className='mt-5'>
                                        <Col style={{ display: "flex", justifyContent: "center" }}>
                                            <button type='submit' className='btn startBtn'> Next <i className="fas fa-angle-right"></i>
                                            </button>
                                        </Col>
                                    </Row>
                                    </Form>
                                </Col>
                            </Row>
                    </Container>
                {/* </div> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        mailGetData: state.MailGetDataReducer.mailGetData
    };
};
const mapDispatchToProps = dispatch => ({
    StartCampaignAction: data => { dispatch(StartCampaignAction(data)) },
    MailGetDataAction: mailGetData => { dispatch(MailGetDataAction(mailGetData)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign_start)
