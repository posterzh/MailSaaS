// import React, { Component } from 'react'

// export class Compose extends Component {
//     render() {
//         return (
//             <div>
//                 <h2>compose page</h2>
                
//             </div>
//         )
//     }
// }

// export default Compose

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
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import Container from 'reactstrap/lib/Container';
export default class Compose extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }
    onEditorStateChange = (editorState) => {
        console.log('editorState', editorState.getCurrentContent())
        this.setState({ editorState })
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
               
                <div className='main-view'>
                    <Container>
                        <Row>
                            <Col md='10' className='mx-auto'>
                                <Row  className="composeemail_heading"> 
                                Compose the emails in this campaign
                                    </Row>
                                <Row className="mt-5">
                                    <div><button className='EditTest'><i class="fa fa-plus-circle" aria-hidden="true"></i> A/B TEST</button>
                                    </div>
                                </Row>
                                {/* <Row><label className='filter_app_new'>Subject</label></Row> */}
                                <Row>
                                    <div className='grand_parent'>
                                        <div className='input_field'>
                                            <Input type='email' className='in' placeholder='Subject' />
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
                                            editorState={editorState}
                                            toolbarClassName="rdw-storybook-toolbar"
                                            wrapperClassName="rdw-storybook-wrapper"
                                            editorClassName="rdw-storybook-editor"
                                            onEditorStateChange={this.onEditorStateChange}
                                            toolbar={{
                                                link: {
                                                    defaultTargetOption: '_blank',
                                                },
                                            }}
                                        />
                                        {/* <textarea
                                    readOnly
                                    className="rdw-storybook-textarea"
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                /> */}
                                    </div>
                                </Row>
                                <Row className='mt-5'>
                                    <Container fluid>
                                        <Row>
                                            <Col md='11' className='alignRight'>
                                                <Row>
                                                    <h1 className='display-6'>Follow-ups &nbsp;<a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                                        <span><i className='QuestionCircle' class="fa fa-question-circle-o" aria-hidden="true"></i></span>
                                                    </a></h1>
                                                </Row>
                                                <Row>
                                                    <p style={{ fontSize: '14px' }}>Follow-ups are stopped when a recipient becomes a lead. <a href=''>Learn how to customize Lead Catcher.</a></p>
                                                </Row>
                                                <Row>
                                                    <Col md='2' className='WaitDiv'>
                                                        <label className='filter_app_new'>Wait X days</label><br></br>
                                                        <input type='number' className='WaitInput'></input>
                                                    </Col>
                                                </Row>
                                                <Row className='mt-3'>
                                                    <label className='filter_app_new'>Reply Chain</label><br></br>
                                                    <div className='select_div'>
                                                        <select className='filter_select_prospect'>
                                                            <option value='one'>--New Email--</option>
                                                            <option>Re:hello all</option>
                                                        </select>
                                                    </div>
                                                </Row>
                                                <Row className='mt-3'>
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
                                                            editorState={editorState}
                                                            toolbarClassName="rdw-storybook-toolbar"
                                                            wrapperClassName="rdw-storybook-wrapper"
                                                            editorClassName="rdw-storybook-editor"
                                                            onEditorStateChange={this.onEditorStateChange}
                                                            toolbar={{
                                                                link: {
                                                                    defaultTargetOption: '_blank',
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </Row></Col>
                                        </Row>
                                    </Container>
                                </Row>
                                <Row>
                                    <Col className='mt-3'>
                                        <div className='Add_follow_up'>
                                            <i class='fa fa-plus'></i> &nbsp;ADD FOLLOW-UP<br />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mt-3'>
                                        <div className='Add_follow_up'>
                                            <i class='fa fa-plus'></i> &nbsp;ADD DRIP<br />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mt-3'>
                                        <div className='Add_follow_up'>
                                            <i class='fa fa-plus'></i> &nbsp;ADD ON CLICK<br />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}