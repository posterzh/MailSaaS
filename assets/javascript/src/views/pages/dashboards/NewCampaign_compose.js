import React, { Component } from 'react'
import {
    Container,
    Row,
    Button, Input, Col, Form
} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import FollowUpPage from './FollowUpPage';
import Drips from './Drips'
import LinkClicksPage from './LinkClicksPage'
export default class Compose extends Component {
    constructor() {
        super();
        this.state = {
            subject: '',
            editorName: '',
            editorState: EditorState.createEmpty(),
            inputListFollow: [],
            inputListDrips: [],
            inputListLinkClick: [],
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onAddBtnClickFollow = () => {
        const inputListFollow = this.state.inputListFollow;
        this.setState({
            inputListFollow: inputListFollow.concat(<FollowUpPage key={inputListFollow.length} />)
        }, () => { });
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
        this.setState({ editorName: e.blocks[0].text })
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <div className='main-view'>
                    <Form onSubmit={this.handleSubmit}>
                        <Container>
                            <Row>
                                <Col md='10' className='mx-auto'>
                                    <Row className="composeemail_heading">
                                        Compose the emails in this campaign
                                </Row>
                                    <Row className="mt-5">
                                        <div><button className='EditTest'><i class="fa fa-plus-circle" aria-hidden="true"></i> A/B TEST</button>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='grand_parent'>
                                            <div className='input_field'>
                                                <Input type='email' className='in' name='subject' value={this.state.subject} onChange={this.handleChange} placeholder='Subject' required />
                                                <div className='mt-3'>
                                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                                        <span><i class="fa fa-question-circle-o" aria-hidden="true"></i></span>
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
                                                name='editorName'
                                                value={this.state.editorName}
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
                                                <i class='fa fa-plus'></i> &nbsp;ADD FOLLOW-UP<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {this.state.inputListDrips}
                                    </Row>
                                    <Row>
                                        <Col className='mt-3'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickDrips}>
                                                <i class='fa fa-plus'></i> &nbsp;ADD DRIP<br />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {this.state.inputListLinkClick}
                                    </Row>
                                    <Row>
                                        <Col className='mt-3 mb-5'>
                                            <div className='Add_follow_up' onClick={this.onAddBtnClickLinkClick}>
                                                <i class='fa fa-plus'></i> &nbsp;ADD ON CLICK<br />
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