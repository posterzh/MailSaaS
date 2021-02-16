import React from 'react';
import { Container, Row, Col, Input} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class FollowUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            Waitdays: 0,
            replyChain:this.props.normalSubject,
            body:'',
            subjectOfFollowUp:'',
            newSubject:''
            // arra:[],
        }
        // console.log('FollowUpPage',this.state.arra.push(props.followUpPageObject));
    }
   componentDidMount(){
    Object.assign(this.props.followUpPageObject,{'subject':this.state.replyChain})

   }
    handleChangeWaitDays = (event) =>{
        this.setState({
            Waitdays: event.target.value
        },()=>{console.log('wait',this.state.Waitdays)})
        Object.assign(this.props.followUpPageObject,{"waitDays": event.target.value});
        // console.log('geet:',this.state.arra.push(this.props.followUpPageObject));
    }

    handleChangeReplyChain = (event) => {
        console.log(event.target.value,"mydata")
        if (this.props.normalSubject===event.target.value) {
            this.setState({
                subjectOfFollowUp:'',
                replyChain: event.target.value
            })
        Object.assign(this.props.followUpPageObject,{'subject':event.target.value})
        } else {
            this.setState({
                replyChain: event.target.value
            })  
        }
        
    }
    
    handleFollowSubject =(event) =>{
        console.log("hiii")
        this.setState({
            subjectOfFollowUp: event.target.value
        })
        Object.assign(this.props.followUpPageObject,{'subject':event.target.value})
    }

    handleChangeBody = (event) => {
        this.setState({
            body: event.blocks[0].text
        },()=>{
            console.log('handleChangeBody:',this.state.body);
        })
        Object.assign(this.props.followUpPageObject,{'email_body':this.state.body})
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState },()=>{})
    }

    render() {
        const { editorState } = this.state;
        console.log(this.props.followUpPageObject,"dsd")
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
                                    <input value={this.state.Waitdays} onChange={this.handleChangeWaitDays} type='number' className='WaitInput'></input>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <label className='filter_app_new'>Reply Chain</label><br></br>
                                <div className='select_div'>
                                    <select  defaultValue={this.props.normalSubject}  name="subject"  value={this.state.replyChain} onChange={this.handleChangeReplyChain} className='filter_select_prospect'>
                                        <option value={this.props.normalSubject}>{this.props.normalSubject}</option>
                                        <option placeholder="---New Email---" value="new-email">---New Email---</option>
                                    </select>
                                    {
                                        this.state.replyChain==='new-email' &&
                                        <Input onChange={this.handleFollowSubject} type='email' className='in' name='subject' value={this.state.SubjectOfFollowUp} placeholder='Subject' />
                                    }
                                </div>
                            </Row>
                            <Row className='mt-3'>
                                <div className='Editor_div'>
                                    <div className='btn' onClick={this.onDeleteList}>Delete</div>
                                    <Editor
                                        className='editorDiv'
                                        onChange={this.handleChangeBody}
                                        value={this.state.body}
                                        editorState={editorState}
                                        toolbarClassName="rdw-storybook-toolbar"
                                        wrapperClassName="rdw-storybook-wrapper"
                                        editorClassName="rdw-storybook-editor"
                                        onEditorStateChange={this.onEditorStateChange}
                                        toolbar={{
                                            link: {
                                                defaultTargetOption: '_blank',
                                                name:"niu"
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
