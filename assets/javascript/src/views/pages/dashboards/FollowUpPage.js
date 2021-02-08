import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class FollowUpPage extends React.Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),

        }
    }
    // onDeleteList=()=>{
    // }

    onEditorStateChange = (editorState) => {
        console.log('editorState', editorState.getCurrentContent())
        this.setState({ editorState })
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
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
                                    <div className='btn' onClick={this.onDeleteList}>Delete</div>
                                    <Editor
                                        className='editorDiv'
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
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
