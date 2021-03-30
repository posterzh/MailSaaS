// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
//   Form,
//   FormGroup,
//   Input,
//   Button,
//   Badge,
//   Card,
//   CardHeader,
//   CardBody
// } from "reactstrap";

// class SequenceEditPanel extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//   }

//   componentDidMount() {

//   }

//   render() {
//     return (
//       <>
//         <Row className="my-3">
//           <Col className="text-right">
//             <Button color="danger" type="submit" size="sm">
//               &nbsp;&nbsp;
//             <i className="fa fa-save" aria-hidden="true"></i>
//             &nbsp;Save&nbsp;&nbsp;
//           </Button>
//             <Button color="primary" type="button" size="sm" outline onClick={this.onCancel}>
//               <i className="fa fa-times" aria-hidden="true"></i>
//             &nbsp;Cancel
//             </Button>
//           </Col>
//         </Row>
//         <Form onSubmit={this.handleSubmit}>
//           <Row>
//             <Col>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="subject"
//                 value={this.state.subject}
//                 onChange={(e) => {
//                   this.setState({ subject: e.target.value });
//                 }}
//                 placeholder="Subject"
//                 required
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <ReactQuill
//                 onChange={(value) => {
//                   this.setState({ email_body: value });
//                 }}
//                 theme="snow"
//                 className="Quill_div"
//                 modules={{
//                   toolbar: [
//                     ["bold", "italic"],
//                     ["link", "blockquote", "code", "image"],
//                     [
//                       {
//                         list: "ordered",
//                       },
//                       {
//                         list: "bullet",
//                       },
//                     ],
//                   ],
//                 }}
//               />
//             </Col>
//           </Row>

//           {this.getDNDSource()}

//           <Row className="mt-3">
//             <Col>
//               {this.state.followUpList.map((followUp, index) => (
//                 <div key={"follow" + index}>
//                   <FollowUpPanel
//                     index={index}
//                     onDelete={this.onDeleteFollowUp}
//                     data={followUp}
//                   />
//                   <div className="px-3">{this.getDNDSource()}</div>
//                 </div>
//               ))}
//             </Col>
//           </Row>

//           <Row>
//             <Col className="mt-3">
//               <Button
//                 color="default"
//                 outline
//                 type="button"
//                 block
//                 onClick={this.onAddFollowUp}
//               >
//                 <i className="fa fa-plus"></i> &nbsp;ADD FOLLOW-UP
//             </Button>
//             </Col>
//           </Row>

//           <Row>
//             <Col>
//               {this.state.dripList.map((drip, index) => (
//                 <div key={"drip" + index}>
//                   <DripPanel
//                     index={index}
//                     onDelete={this.onDeleteDrip}
//                     data={drip}
//                   />
//                   <div className="px-3">{this.getDNDSource()}</div>
//                 </div>
//               ))}
//             </Col>
//           </Row>

//           <Row>
//             <Col className="mt-3">
//               <Button
//                 color="default"
//                 outline
//                 type="button"
//                 block
//                 onClick={this.onAddDrip}
//               >
//                 <i className="fa fa-plus"></i> &nbsp;ADD DRIP
//             </Button>
//             </Col>
//           </Row>
//         </Form>
//       </>
//     );
//   }
// }

// export default SequenceEditPanel;