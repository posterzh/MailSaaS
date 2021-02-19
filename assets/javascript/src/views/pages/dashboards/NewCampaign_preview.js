import React, { Component } from 'react'
import {
    Container,
    Row,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarText, Input, Col
} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { Link, Route } from 'react-router-dom';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { PreviewCampaignAction } from "../../../redux/action/CampaignAction"
import { connect } from 'react-redux'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import Container from 'reactstrap/lib/Container';

class CampaignPreview extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText('Hello'))
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }
    componentDidMount() {
        console.log(this.props.history.location.state && this.props.history.location.state.id, "preview")
        let id = this.props.history.location.state && this.props.history.location.state.id
        this.props.PreviewCampaignAction(id);
    }
    render() {
        const { editorState } = this.state;
        const { CampaignEmail } = this.props;
        console.log(editorState, "preview")
        return (
            <div>
                <div className='main-view'>
                    <Container fluid>
                        <Row style={{ width: '100%', borderBottom: "1px solid #DEDEDE" }}>
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
                        <Row style={{ width: '100%', borderBottom: "1px solid #DEDEDE" }}>
                            <Col style={{ display: "flex" }}><Nav className='mx-auto' navbar>
                                <Row className='mx-auto' style={{ width: '100%' }}>
                                    <ul style={{ listStyleType: 'none', display: 'flex' }}>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname: "/app/admin/CampaignStart",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>START</Link></li>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname: "/app/admin/CampaignRecipient",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>RECIPICIENT</Link></li>
                                        <li className='mr-3 ml-3'><Link to={{
                                            pathname: "/app/admin/CampaignCompose",
                                            state: {
                                                id: this.props.history.location.state && this.props.history.location.state.id
                                            }
                                        }}>COMPOSE</Link></li>
                                        <li className='mr-3 ml-3'><Link to="/app/admin/CampaignPreview">PREVIEW</Link></li>
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
                        <Row className='mt-3'>
                            <Col md="6" className="mx-auto">
                                <Row className="preview_email">Preview and personalize each email</Row>
                                <Row className="beforehitting_next">Before hitting next, make sure:</Row>
                                <Row style={{ display: "flex", justifyContent: "center" }}>
                                    {/* <Col md="6" className="mx-auto"> */}
                                    <Row className="condition_container">
                                        <Row >
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <div className="rightcheck_icon"><i className="fa fa-check-circle" aria-hidden="true"></i></div>
                                                <div className="condition">You sound like a human</div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <div className="rightcheck_icon"><i className="fa fa-check-circle" aria-hidden="true"></i></div>
                                                <div className="condition">Your signature looks good</div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <div className="rightcheck_icon"><i className="fa fa-check-circle" aria-hidden="true"></i></div>
                                                <div className="condition">Your signature looks good</div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <div className="rightcheck_icon"><i className="fa fa-check-circle" aria-hidden="true"></i></div>
                                                <div className="condition">Your call-to-action is clear</div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <div className="rightcheck_icon"><i className="fa fa-check-circle" aria-hidden="true"></i></div>
                                                <div className="condition">You‘ve sent a test email and checked it on your phone</div>
                                            </div>
                                        </Row>
                                    </Row><Col>
                                    </Col>
                                    {/* </Col> */}
                                </Row>
                                <Row className='mt-5'>
                                    <Col style={{ display: "flex", justifyContent: "center" }}><Link to={{
                                        pathname: '/app/admin/CampaignOptions',
                                        state: {
                                            id: this.props.history.location.state && this.props.history.location.state.id
                                        }
                                    }} className='btn startBtn'>Next <i className="fa fa-arrow-right" aria-hidden="true"></i></Link></Col>
                                </Row>
                                {/* <Row style={{ display: "flex", justifyContent: "center" }}>Edits are saved as you switch recipents or hit "Next".</Row> */}
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row className="mt-3">
                                <Col md='12' className='mx-auto'>
                                    <div style={{ backgroundColor: "#005aac", color: "white" }}>
                                        {
                                            <ul >
                                               {this.props.CampaignPreviewEmails && this.props.CampaignPreviewEmails.map((e,i)=> <li style={{ color: 'white' }}>{e.email}</li>)}
                                                </ul>
                                        }
                                    </div>

                                    <div style={{ backgroundColor: "#005aac", color: "white" }}>
                                        <ul>
                                        {
                                            // console.log(this.props.CampaignPreviewEmails && this.props.CampaignPreviewEmails.map((e,i)=>e.email)),
                                            console.log(this.props.CampaignPreviewEmails && this.props.CampaignPreviewEmails.map((e,i)=>e.email_body))
                                        }
                                        </ul>
                                    </div>
                                </Col>
                            </Row>


                    </Container>
                    <Container>
                        <Row>
                            <Col md='11' className='mx-auto'>
                                <Row className='mt-3'>
                                    <div><i className="fa fa-envelope-o" aria-hidden="true"></i><label style={{ marginLeft: "5px" }}>Initial campaign email</label></div>
                                    <div className='grand_parent'>
                                        <div className='input_field'>
                                            <Input type='email' className='in' placeholder='Subject' value={this.props.CampaignPreviewEmails && this.props.CampaignPreviewEmails.map((item, index) => <p key='index' style={{ color: 'white' }}>{item.subject}</p>)} />
                                            <div className='mt-3'>
                                                <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                                    <span><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mt-5 mb-5">
                                    <div className='Editor_div'>
                                        <Editor
                                            className='editorDiv'
                                            mention={{
                                                separator: ' ',
                                                trigger: '@',
                                                suggestions: [
                                                    { text: 'APPLE', value: 'apple', url: 'apple' },
                                                    { text: 'BANANA', value: 'banana', url: 'banana' },
                                                    { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                                                    { text: 'DURIAN', value: 'durian', url: 'durian' },
                                                    { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                                                    { text: 'FIG', value: 'fig', url: 'fig' },
                                                    { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                                                    { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                                                ],
                                            }}
                                            defaultEditorState={editorState}
                                            initialContentState={editorState}
                                            editorState={editorState}
                                            // contentState={EditorState.createWithContent(ContentState.createFromText('Hello'))}
                                            toolbarClassName="rdw-storybook-toolbar"
                                            wrapperClassName="rdw-storybook-wrapper"
                                            editorClassName="rdw-storybook-editor"
                                            onEditorStateChange={this.onEditorStateChange}
                                            // value={}
                                            toolbar={{
                                                link: {
                                                    defaultTargetOption: '_blank',
                                                },
                                            }}
                                        ></Editor>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
// export default CampaignPreview
const mapStateToProps = (state) => {
    return {
        campaignId:state.StartCampaignReducer.startCampaignData.id,
        CampaignPreviewData: state.CampaignPreviewGetReducer.CampaignPreviewData,
        CampaignPreviewEmails: state.CampaignPreviewGetReducer.CampaignPreviewData && state.CampaignPreviewGetReducer.CampaignPreviewData.campEmail,
        CampaignPreviewBody: state.CampaignPreviewGetReducer.CampaignPreviewData && state.CampaignPreviewGetReducer.CampaignPreviewData.campEmail
    }
}
const mapDispatchToProps = dispatch => ({
    PreviewCampaignAction: (recipientId)=> { dispatch(PreviewCampaignAction(recipientId)) },
    PreviewUpdateCampaignAction: campaignPreviewUpdateData => { dispatch(PreviewUpdateCampaignAction(campaignPreviewUpdateData)) },
})
export default connect(mapStateToProps, mapDispatchToProps)(CampaignPreview)

