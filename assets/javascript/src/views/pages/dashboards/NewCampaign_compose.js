import React, { Component } from 'react'
import { Container, Row, Button, Input, Col, Form,Nav } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { Link, Route } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import FollowUpPage from './FollowUpPage';
import Drips from './Drips'
import LinkClicksPage from './LinkClicksPage'
export default class CampaignCompose extends Component {
    constructor() {
        super();
        this.state = {
            subject: '',
            msgBody: '',
            editorState: EditorState.createEmpty(),
            inputListFollow: [],
            inputListDrips: [],
            inputListLinkClick: [],
            followUpPageObject: {},
            arra:[],
            array:[]

        }
        this.counter=0
    }
    componentDidMount(){
        console.log("compose")
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleFolloUpPage = () =>{
        this.setState({
            inputListFollow: this.state.inputListFollow.push(followUpPageObject)
            })
            arra.push(followUpPageObject);
    }
            
            
    onAddBtnClickFollow = () => {
        const inputListFollow = this.state.inputListFollow;
        this.counter=this.counter+1

        this.setState({
            inputListFollow: inputListFollow.concat(<FollowUpPage msgBody={this.state.msgBody}  followUpPageObject={this.state.followUpPageObject} normalSubject={this.state.subject} key={inputListFollow.length} />),
        });
        this.state.counter===0? null:this.state.array.push( this.state.followUpPageObject)
        
    }
    onAddBtnClickDrips = () => {
        const inputListDrips = this.state.inputListDrips;
        this.setState({
            inputListDrips: inputListDrips.concat(<Drips key={inputListDrips.length} />)
        }, () => { });
    }
    onAddBtnClickLinkClick = () => {
        const inputListLinkClick = this.state.inputListLinkClick;
        this.setState({
            inputListLinkClick: inputListLinkClick.concat(<LinkClicksPage key={inputListLinkClick.length} />)
        }, () => { });
    }
    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }
    onChange = (e) => {
        this.setState({ msgBody: e.blocks[0].text })
    }
    render() {
        const { editorState } = this.state;
        console.log(this.state.array,"this.state.array")
        return (
            <div>
                <div className='main-view'>
                    <Form onSubmit={this.handleSubmit}>
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
                            <Row>
                                <Col md='10' className='mx-auto'>
                                    <Row className="composeemail_heading">
                                        Compose the emails in this campaign
                                </Row>
                                    <Row className="mt-5">
                                        <div><button className='EditTest'><i className="fa fa-plus-circle" aria-hidden="true"></i> A/B TEST</button>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='grand_parent'>
                                            <div className='input_field'>
                                                <Input type='text' className='in' name='subject' value={this.state.subject} onChange={this.handleChange} placeholder='Subject' required />
                                                <div className='mt-3'>
                                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                                        <span><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='Editor_div'>
                                            <Editor
                                                className='editorDiv'
                                                editorState={editorState}
                                                toolbarClassName="rdw-storybook-toolbar"
                                                wrapperClassName="rdw-storybook-wrapper"
                                                editorClassName="rdw-storybook-editor"
                                                name='msgBody'
                                                value={this.state.msgBody}
                                                onChange={this.onChange}
                                                onEditorStateChange={this.onEditorStateChange}
                                                required

                                            />
                                        </div>
                                    </Row>
                                    <Row className='mt-5'>
                                        {this.state.inputListFollow}
                                    </Row>

                                    <Row>
                                        <Col className='mt-3'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickFollow}>
                                                <i className='fa fa-plus'></i> &nbsp;ADD FOLLOW-UP<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {this.state.inputListDrips}
                                    </Row>
                                    <Row>
                                        <Col className='mt-3'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickDrips}>
                                                <i className='fa fa-plus'></i> &nbsp;ADD DRIP<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {this.state.inputListLinkClick}
                                    </Row>
                                    <Row>
                                        <Col className='mt-3 mb-5'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickLinkClick}>
                                                <i className='fa fa-plus'></i> &nbsp;ADD ON CLICK<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mx-auto'>
                                        <Col md='3'><Button>CANCLE EDITS</Button></Col>
                                        <Col md='2'><Button className="newcampaign_button btn" type='submit' >NEXT<i className="fa fa-arrow-right" aria-hidden="true"></i></Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
            </div>
        )
    }
}