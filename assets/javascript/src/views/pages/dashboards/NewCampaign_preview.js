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
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {PreviewCampaignAction } from '../../../redux/action/CampaignAction'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import Container from 'reactstrap/lib/Container';
class Preview extends Component {
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
    componentDidMount() {
        this.props.PreviewCampaignAction();
        console.log("in js file  PreviewCampaignAction", this.props)
    }


    render() {
        const { editorState } = this.state;
        return (
            <div>

                <div className='main-view'>
                    <Container>
                        <Container>
                            <Row>
                                <Col md="6" className="mx-auto">
                                    <Row className="preview_email">Preview and personalize each email</Row>
                                    <Row className="beforehitting_next">Before hitting next, make sure:</Row>
                                    <Row style={{ display: "flex", justifyContent: "center" }}>
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
                                            <Row className='mt-5'>
                                                <Col style={{ display: "flex", justifyContent: "center" }}><button className='btn startBtn'>Next <i class="fa fa-arrow-right" aria-hidden="true"></i></button></Col>
                                            </Row>
                                            <Row className='mt-4' style={{ display: "flex", justifyContent: "center" }}>Edits are saved as you switch recipents or hit "Next".</Row>
                                        </Row>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col md='12' className='mx-auto'>
                                    <div style={{ backgroundColor: "#005aac", color: "white" }}>
                                        {  
                                         console.log(this.props.CampaignPreviewData,'CampaignPreviewData'),
                                            <p style={{color: 'white'}}>{this.props.CampaignPreviewData && this.props.CampaignPreviewData.campaign.id}</p>
                                            // console.log("cvbnhjmkl;jhgjkl;kljhgfhjkl;lkjhgfhjkljhgfhjklj",this.props.CampaignPreviewData && this.props.CampaignPreviewData.campEamil),
                                            // <p style={{color: 'white'}}>{this.props.CampaignPreviewData && this.props.CampaignPreviewData.campEamil}</p>
                                        }
                                    </div>
                                    <div>
                                        {
                                        //  if( this.props.CampaignPreviewData &&this.props.data.CampaignPreviewData!=null)
                                            //     console.log("item of preview",item)
                                            //     if(item.drip===null)
                                            //     {
                                            //         console.log("not avail")
                                            //     }
                                            //     else{
                                            //         return <p value={index}>{item.drip}</p>
 
                                            //     }
                                                
                                            // })

                                        }
                                        </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col md='11' className='mx-auto'>
                                    <Row className='mt-3'>
                                        <div><i class="fa fa-envelope-o" aria-hidden="true"></i><label style={{ marginLeft: "5px" }}>Initial campaign email</label></div>
                                        <div className='grand_parent'>
                                            <div className='input_field'>
                                                <Input type='email' className='in' placeholder='Subject'value={
                                                    this.props.CampaignPreviewData && this.props.CampaignPreviewData.campaign.id}></Input>
                                                <div className='mt-3'>
                                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                                        <span><i class="fa fa-question-circle-o" aria-hidden="true"></i></span>
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
                    </Container>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // .CampaignPreviewGetReducer.CampaignPreviewData
    console.log("cheking state for previewwwwwwwwwwwwwwwwwwwwwwwww", state.CampaignPreviewGetReducer.CampaignPreviewData);
    return {
        CampaignPreviewData: state.CampaignPreviewGetReducer.CampaignPreviewData
    }
}
const mapDispatchToProps = dispatch => ({
    PreviewCampaignAction: CampaignPreviewData => {
        dispatch(PreviewCampaignAction(CampaignPreviewData))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Preview)