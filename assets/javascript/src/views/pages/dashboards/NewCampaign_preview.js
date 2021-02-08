// import React, { Component } from 'react'
// import { Container, Row, Col } from "reactstrap"
// import Button from 'reactstrap/lib/Button'
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// // import Container from 'reactstrap/lib/Container'

// export class Preview extends Component {
//     render() {
//         return (
//             <div >
//                 <Container>
//                     <Row>
//                         <Col md="6" className="mx-auto">
//                             <Row className="preview_email">Preview and personalize each email</Row>
//                             <Row className="beforehitting_next">Before hitting next, make sure:</Row>
//                             <Row style={{ display: "flex", justifyContent: "center" }}>
//                                 {/* <Col md="6" className="mx-auto"> */}
//                                 <Row className="condition_container">
//                                     <Row >
//                                         <div style={{ display: "flex", flexDirection: "row" }} >
//                                             <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
//                                             <div className="condition">You sound like a human</div>
//                                         </div>
//                                     </Row>
//                                     <Row>
//                                         <div style={{ display: "flex", flexDirection: "row" }} >
//                                             <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
//                                             <div className="condition">Your signature looks good</div>
//                                         </div>
//                                     </Row>
//                                     <Row>
//                                         <div style={{ display: "flex", flexDirection: "row" }} >
//                                             <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
//                                             <div className="condition">Your signature looks good</div>
//                                         </div>
//                                     </Row>
//                                     <Row>
//                                         <div style={{ display: "flex", flexDirection: "row" }} >
//                                             <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
//                                             <div className="condition">Your call-to-action is clear</div>
//                                         </div>
//                                     </Row>
//                                     <Row>
//                                         <div style={{ display: "flex", flexDirection: "row" }} >
//                                             <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
//                                             <div className="condition">You‘ve sent a test email and checked it on your phone</div>
//                                         </div>
//                                     </Row>
//                                 </Row>
//                                 {/* </Col> */}
//                             </Row>
//                             <Row className='mt-5'>
//                                 <Col style={{display:"flex",justifyContent:"center"}}><button className='btn startBtn'>Next <i class="fa fa-arrow-right" aria-hidden="true"></i></button></Col>
//                             </Row>
//                             <Row style={{ display: "flex", justifyContent: "center" }}>Edits are saved as you switch recipents or hit "Next".</Row>
//                         </Col>





//                         

//                     </Row>
//                 </Container>
//                 <Container style={{ border: "1px solid" }}>
//                     {/* <Col style={{border:"1px solid"}}> */}
//                     <Row  className="recipientshow">
//                         {/* <div > */}
//                         <div className="recipientmail">
//                             dsf@gmail.com
//                             </div>
//                         <div  className="number of mails">
//                             1 of 1 recipient
//                                 </div>
//                                 {/* </div> */}
//                                 {/* <div>
//                         <div className="search_recipientbox" >
//                             <input type="text" placeholder="Search reci[ients"></input>
//                             <div className="search_icon">search icon</div>
//                         </div>
//                         <div className="swipeicon_container">
//                             <div  className="leftswipe_icon">left</div>
//                             <div  className="rightswipe_icon">right</div>
//                         </div>
//                         </div> */}
//                     </Row>
//                     {/* <Row >bdjasbdskajdbajskdkjaskjs
//                             </Row> */}
//                     {/* </Col> */}
//                 </Container>

//             </div>
//         )
//     }
// }

// export default Preview

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
export default class Preview extends Component {
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
                        <Container>
                            <Row>
                                <Col md="6" className="mx-auto">
                                    <Row className="preview_email">Preview and personalize each email</Row>
                                    <Row className="beforehitting_next">Before hitting next, make sure:</Row>
                                    <Row style={{ display: "flex", justifyContent: "center" }}>
                                        {/* <Col md="6" className="mx-auto"> */}
                                        <Row className="condition_container">
                                            <Row >
                                                <div style={{ display: "flex", flexDirection: "row" }} >
                                                    <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                                                    <div className="condition">You sound like a human</div>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div style={{ display: "flex", flexDirection: "row" }} >
                                                    <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                                                    <div className="condition">Your signature looks good</div>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div style={{ display: "flex", flexDirection: "row" }} >
                                                    <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                                                    <div className="condition">Your signature looks good</div>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div style={{ display: "flex", flexDirection: "row" }} >
                                                    <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                                                    <div className="condition">Your call-to-action is clear</div>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div style={{ display: "flex", flexDirection: "row" }} >
                                                    <div className="rightcheck_icon"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                                                    <div className="condition">You‘ve sent a test email and checked it on your phone</div>
                                                </div>
                                            </Row>
                                        </Row><Col>
                                {/* <div>
                                <div style={{border:"1px solid",background:"red"}}>
                                    bhh
                                    </div>
                                    <div>
                                        nasbdkjbqwd
                                        </div>
                                        </div> */}
                                </Col>
                                        {/* </Col> */}
                                    </Row>
                                    <Row className='mt-5'>
                                        <Col style={{ display: "flex", justifyContent: "center" }}><button className='btn startBtn'>Next <i class="fa fa-arrow-right" aria-hidden="true"></i></button></Col>
                                    </Row>
                                    {/* <Row style={{ display: "flex", justifyContent: "center" }}>Edits are saved as you switch recipents or hit "Next".</Row> */}
                                </Col>
                            </Row>
                        </Container>
                        {/* <Container>
                            <Row  classNmae="mt-5" style={{border:"1px solid"}}>
                                <Col md="11">
                                 sdfgn
                                 </Col>  
                            </Row>
                            </Container> */}
                        <Container>
                        <Row>
                            <Col md='11' className='mx-auto'>
                                
                            <Row className='mt-3'>
                                    <div><i class="fa fa-envelope-o" aria-hidden="true"></i><label style={{marginLeft:"5px"}}>Initial campaign email</label></div>
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