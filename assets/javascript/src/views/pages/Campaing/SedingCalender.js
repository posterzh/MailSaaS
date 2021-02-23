// import React, { Component } from 'react'
// import { Container, Row, Col, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, Card } from 'reactstrap'
// import CardBody from 'reactstrap/lib/CardBody'
// import CardFooter from 'reactstrap/lib/CardFooter'
// import CardHeader from 'reactstrap/lib/CardHeader'
// import { connect } from 'react-redux'
// import { GetScheduleAction } from '../../../redux/action/ScheduleAction'
// export class SendindCalender extends Component {
//   constructor() {
//     super()
//     this.state = {
//       show: true,
//       hide: false,
      
//     }
//   }
//   componentDidMount() {
//     this.props.GetScheduleAction()
//   }
//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
//   render() {
//     const { ScheduleData } = this.props

//     return (
//       <div>
        
//         <div className='campaign_navbar' >
//           <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>SendingCalendar</h1>
//           <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
//         </div>
//         <div>
//         {!this.state.hide &&
//           <Container style={{ marginLeft: "0px" }}>
//             <Row className='mt-3'>
//               <Col md={4}>
//                 <Card>
//                   <CardHeader style={{ border: "none" }}>
//                     <select className='scalender_filter_select'>
//                       <option value='one'>unassigned</option>
//                       <option value='two'>unassigned1</option>
//                       <option value='three'>unassigned1</option>
//                     </select>
//                   </CardHeader>
//                   <CardBody>
//                     <div style={{ backgroundColor: "#ddd", width: "100%", display: 'flex', justifyContent: 'spacebetween' }}>
//                       <span className="su">Su</span>
//                       <span className="mo">Mo</span>
//                       <span className="tu">Tu</span>
//                       <span className="we">We</span>
//                       <span className="th">Th</span>
//                       <span className="fr">Fr</span>
//                       <span className="sa">sa</span>
//                     </div>
//                     <div style={{ fontSize: "12px" }}>
//                       <p className="calender_details">
//                         {ScheduleData && ScheduleData.start_time} to {ScheduleData && ScheduleData.end_time} {ScheduleData && ScheduleData.time_zone}<br />
//                       Send no more than {ScheduleData && ScheduleData.max_email} emails per day<br />
//                       Space emails out over the day<br />
//                       Pause {ScheduleData && ScheduleData.mint_between_sends} minutes between sends<br />
//                       Send at least {ScheduleData && ScheduleData.max_email_send} emails at a time<br />
//                       </p>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: "10px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
//                       <span style={{ fontSize: "10px" }}>about these settings</span>
//                     </div>
//                   </CardBody>
//                   <CardFooter >
//                     <Button className="b1" onClick={(e) => { e.preventDefault(), this.setState({ show: !this.state.show, hide: !this.state.hide }) }}>Edit Rules</Button>
//                   </CardFooter>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>}
//           {!this.state.show && <Container fluid>
//             <Row className='mt-3 mb-5'>
//               <Col md={4} style={{ border: '1px solid #ccc', background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)' }}>
//                 <div style={{ margin: '17px 0px 24px 24px' }}>
//                   <div className='dv1'>
//                     <Row> <label>Mail account</label></Row>
//                     <Row ><input className='teamname-input' type='text' value='developer@externlabs.com'></input></Row>
//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>Blocked out days</label>
//                     </Row>
//                     <Row>
//                       <div style={{ border: '1px solid #ccc', width: '96%' }}>
//                         <span className="su">Su</span>
//                         <span className="mo">Mo</span>
//                         <span className="tu">Tu</span>
//                         <span className="we">We</span>
//                         <span className="th">Th</span>
//                         <span className="fr">Fr</span>
//                         <span className="sa">sa</span>
//                       </div>
//                     </Row>
//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>Start time</label>
//                     </Row>
//                     <Row>
//                       <input className='teamname-input' name='StartTime' value={ScheduleData && ScheduleData.start_time}></input>
//                     </Row>
//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>End time</label>
//                     </Row>
//                     <Row>
//                       <input className='teamname-input' name="EndTime" value={ScheduleData && ScheduleData.end_time}></input>
//                     </Row>
//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>TimeZone</label>
//                       <select className='teamname-input'>
//                         <option>{ScheduleData && ScheduleData.time_zone}</option>
//                       </select>
//                     </Row>

//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <Row>
//                         <Col style={{ display: "flex" }}>
//                           <label>Max emails per day</label>
//                         </Col>
//                       </Row>
//                       <input type='number' className='teamname-input' name='maxEmail' value={ScheduleData && ScheduleData.max_email}></input>
//                     </Row>

//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>Strategy</label>
//                       <select className='teamname-input'>
//                         <option>{ScheduleData && ScheduleData.strategy}</option>
//                       </select>
//                     </Row>
//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>Minutes between sends</label>
//                     </Row>
//                     <Row>
//                       <input type='number' className='teamname-input' value={ScheduleData && ScheduleData.mint_between_sends} ></input>
//                     </Row>
//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>Minimum emils tosend at a time</label>
//                     </Row>
//                     <Row>
//                       <input type='number' className='teamname-input' value={ScheduleData && ScheduleData.max_email_send}></input>
//                     </Row>
//                     <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
//                       <label>Maximum emils to send at a time</label>
//                     </Row>
//                     <Row>
//                       <input type='number' className='teamname-input' value={ScheduleData && ScheduleData.max_email_send}></input>
//                     </Row>
//                     <Row className='mt-5'>
//                       <button className='savebutton' onClick={(e)=>{e.preventDefault(),this.setState({hide:!this.state.hide,show: !this.state.show})}}>save</button>
//                       <button className='savebutton' onClick={(e)=>{e.preventDefault(),this.setState({hide:!this.state.hide,show: !this.state.show})}}>CANCEL</button>
//                     </Row>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </Container>}
         
//       {!this.state.hide&&<div className="calender_box" style={{ backgroundColor: "transparant", width: "100%", display: "flex", flexDirection: "row" }}>
//             <div className="su_box">
//               <p>{ScheduleData && ScheduleData.date}</p>
//             </div>
//             <div className="mo_box">
//               <p>z</p>
//             </div>
//             <div className="tu_box">
//               <p>f</p>
//             </div>
//             <div className="we_box">
//               <p>as</p>
//             </div>
//             <div className="th_box">
//               <p>a</p>
//             </div>
//             <div className="fr_box">
//               <p>w</p>
//             </div>
//             <div className="sa_box">
//               <p>w</p>
//             </div>
//           </div>
//           }
//         </div>  
//       </div>
//     )
//   }
// }
// const mapStateToProps = (state) => { return { ScheduleData: state.ScheduleGetDataReducer.ScheduleGetData } }
// const mapDispatchToProps = dispatch => ({ GetScheduleAction: ScheduleGetData => { dispatch(GetScheduleAction(ScheduleGetData)) }, })
// export default connect(mapStateToProps, mapDispatchToProps)(SendindCalender)


import React, { Component } from 'react'
import { Container, Row, Col,Form, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, Card } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import CardFooter from 'reactstrap/lib/CardFooter'
import CardHeader from 'reactstrap/lib/CardHeader'
import { connect } from 'react-redux'
import { GetScheduleAction,ScheduleUpdateAction } from '../../../redux/action/ScheduleAction'
export class SendindCalender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      hide: false,
      MailAccounts:'',
      BlockDays:'',
      Date:'',
      StartTime:'',
      EndTime:'',
      Timezone:'',
      MaxEmails:'',
      Strategy:'',
      Minutes:'',
      MaxEmailSend:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.GetScheduleAction()
  }
 
  handleChange = (e) => {
    console.log("called")
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit=(e)=>{
    console.log('sending calender.js')
    
    this.props.ScheduleUpdateAction(scheduledataa)
  }
  edit=(ScheduleData)=>{
    console.log(this.props.ScheduleMailAccount,"this.props.ScheduleMailAccount",this.props.ScheduleMaxEmails,"this.props.ScheduleMaxEmails")
    this.setState({
      MailAccounts:ScheduleData.mail_account,
      BlockDays:ScheduleData.block_days,
      Date:ScheduleData.date,
      StartTime:ScheduleData.start_time,
      EndTime:ScheduleData.end_time,
      Timezone:ScheduleData.time_zone,
      MaxEmails:ScheduleData.max_email,
      Strategy:ScheduleData.strategy,
      Minutes:ScheduleData.mint_between_sends,
      MaxEmailSend:ScheduleData.max_email_send,
      show: !this.state.show,
      hide: !this.state.hide 
    })
  }
  render() {
    const { ScheduleData} = this.props
    return (
      <div>
        <div className='campaign_navbar' >
          <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>SendingCalendar</h1>
          <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
        </div>
        <div>
        {!this.state.hide &&
          <Container style={{ marginLeft: "0px" }}>
            <Row className='mt-3'>
              <Col md="4">
                <Card>
                  <CardHeader style={{ border: "none" }}>
                    <select className='scalender_filter_select'>
                      <option value='one'>unassigned</option>
                      <option value='two'>unassigned1</option>
                      <option value='three'>unassigned1</option>
                    </select>
                  </CardHeader>
                  <CardBody>
                    <div style={{ backgroundColor: "#ddd", width: "100%", display: 'flex', justifyContent: 'spacebetween' }}>
                      <span className="su">Su</span>
                      <span className="mo">Mo</span>
                      <span className="tu">Tu</span>
                      <span className="we">We</span>
                      <span className="th">Th</span>
                      <span className="fr">Fr</span>
                      <span className="sa">sa</span>
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      <p className="calender_details">
                        {ScheduleData && ScheduleData.start_time} to {ScheduleData && ScheduleData.end_time} {ScheduleData && ScheduleData.time_zone}<br />
                      Send no more than {ScheduleData && ScheduleData.max_email} emails per day<br />
                      Space emails out over the day<br />
                      Pause {ScheduleData && ScheduleData.mint_between_sends} minutes between sends<br />
                      Send at least {ScheduleData && ScheduleData.max_email_send} emails at a time<br />
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: "10px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                      <span style={{ fontSize: "10px" }}>about these settings</span>
                    </div>
                  </CardBody>
                  <CardFooter >
                    <Button className="b1" onClick={()=>this.edit(ScheduleData) }>Edit Rules</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>}
          {!this.state.show && <Container fluid>
            <Form onSubmit={this.handleSubmit}>
            <Row className='mt-3 mb-5'>
              <Col md='4' style={{ border: '1px solid #ccc', background: 'white', boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)' }}>
                <div style={{ margin: '17px 0px 24px 24px' }}>
                  <div className='dv1'>
                    <Row> <label>Mail account</label></Row>
                    <Row ><input className='teamname-input' type='text' value='developer@externlabs.com'></input></Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Blocked out days</label>
                    </Row>
                    <Row>
                      <div style={{ border: '1px solid #ccc', width: '96%' }}>
                        <span className="su">Su</span>
                        <span className="mo">Mo</span>
                        <span className="tu">Tu</span>
                        <span className="we">We</span>
                        <span className="th">Th</span>
                        <span className="fr">Fr</span>
                        <span className="sa">sa</span>
                      </div>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Start time</label>
                    </Row>
                    <Row>
                      <input className='teamname-input' name='StartTime' onChange={this.handleChange} value={this.state.StartTime}></input>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>End time</label>
                    </Row>
                    <Row>
                      <input className='teamname-input' name="EndTime" onChange={this.handleChange} value={this.state.EndTime}></input>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>TimeZone</label>
                      <select className='teamname-input'>
                        <option>{this.state.Timezone}</option>
                      </select>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <Row>
                        <Col style={{ display: "flex" }}>
                          <label>Max emails per day</label>
                        </Col>
                      </Row>
                      <input type='number' className='teamname-input' name='MaxEmails' onChange={this.handleChange} value={this.state.MaxEmails}></input>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Strategy</label>
                      <select className='teamname-input'>
                        <option>{this.state.Strategy}</option>
                      </select>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Minutes between sends</label>
                    </Row>
                    <Row>
                      <input type='number' className='teamname-input' name='Minutes'onChange={this.handleChange} value={this.state.Minutes} ></input>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Minimum emils tosend at a time</label>
                    </Row>
                    <Row>
                      <input type='number' className='teamname-input' name='MaxEmailSend' onChange={this.handleChange} value={this.state.MaxEmailSend}></input>
                    </Row>
                    <Row className='mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>Maximum emils to send at a time</label>
                    </Row>
                    <Row>
                      <input type='number' className='teamname-input' name='MaxEmailSend' onChange={this.handleChange} value={this.state.MaxEmailSend}></input>
                    </Row>
                    <Row className='mt-5'>
                      <button className='savebutton' type='Submit' onSubmit={this.handleSubmit} onClick={(e)=>{()=>this.edit(ScheduleData),e.preventDefault(),this.setState({hide:!this.state.hide,show: !this.state.show})}}>save</button>
                      <button className='savebutton' onClick={(e)=>{e.preventDefault(),this.setState({hide:!this.state.hide,show: !this.state.show})}}>CANCEL</button>
                      <button type='Submit' onSubmit={this.handleSubmit} >hit me</button>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
         </Form>
          </Container>}
      {!this.state.hide&&<div className="calender_box" style={{ backgroundColor: "transparant", width: "100%", display: "flex", flexDirection: "row" }}>
            <div className="su_box">
              <p>{ScheduleData && ScheduleData.date}</p>
            </div>
            <div className="mo_box">
              <p>z</p>
            </div>
            <div className="tu_box">
              <p>f</p>
            </div>
            <div className="we_box">
              <p>as</p>
            </div>
            <div className="th_box">
              <p>a</p>
            </div>
            <div className="fr_box">
              <p>w</p>
            </div>
            <div className="sa_box">
              <p>w</p>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("data", state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.mail_account)
  // console.log("cheeeeeeeeeeeeeeeeeeeeking",state.ScheduleUpdateReducer.UpdateScheduleData )
   return {
     ScheduleData: state.ScheduleGetDataReducer.ScheduleGetData ,
    //  ScheduleMailAccount:state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.mail_account,
    //  ScheduleBlockDays:state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.block_days,
    //  ScheduleDate:state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.date,
    //  ScheduleStartTime: state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.start_time,
    //  ScheduleEndTime: state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.end_time,
    //  ScheduleTimezone: state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.time_zone,
    //  ScheduleMaxEmails:state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.max_email,
    //  ScheduleStrategy:state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.strategy,
    //  ScheduleMaxMinutesBetweenSend:state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.mint_between_sends,
    //  ScheduleMaxEmailSend:state.ScheduleGetDataReducer.ScheduleGetData &&  state.ScheduleGetDataReducer.ScheduleGetData.max_email_send,
    } }
const mapDispatchToProps = dispatch => ({
   GetScheduleAction: ScheduleGetData =>{dispatch(GetScheduleAction(ScheduleGetData))},
   ScheduleUpdateAction:UpdateScheduleData=>{dispatch(ScheduleUpdateAction(UpdateScheduleData))}
   })
export default connect(mapStateToProps, mapDispatchToProps)(SendindCalender)
