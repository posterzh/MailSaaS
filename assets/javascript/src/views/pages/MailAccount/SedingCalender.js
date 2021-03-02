import React, { Component } from 'react'
import { Container, Row, Col, Form, Input, Button, Card, FormGroup, CardTitle, Modal, ModalHeader, InputGroup, InputGroupAddon } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import CardFooter from 'reactstrap/lib/CardFooter'
import CardHeader from 'reactstrap/lib/CardHeader'
import { connect } from 'react-redux'
import { GetScheduleAction, ScheduleUpdateAction } from '../../../redux/action/ScheduleAction'
import { MailGetDataAction } from '../../../redux/action/MailSenderAction'
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";


export class SendingCalender extends Component {
  constructor(props) {
    super(props)
    var days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Su'];
    this.state = {
      openModel: false,
      show: true,
      hide: false,
      MailAccounts: '',
      BlockDays: [],
      Date: '',
      StartTime: '',
      EndTime: '',
      Timezone: '',
      MaxEmails: '',
      Strategy: '',
      Minutes: '',
      MaxEmailSend: '',
      days: days
    }
    // console.log('))))))))))))===========>',this.state.BlockDaysssssssss)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.GetScheduleAction()
    this.props.MailGetDataAction()
  }

  handleChange = (e) => {
    console.log("called", e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleBlockDays = (data) => {
    console.log(data)
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    const updatedataschedule = {
      mail_account: this.state.MailAccounts,
      block_days: this.state.BlockDays,
      date: this.state.Date,
      start_time: this.state.StartTime,
      end_time: this.state.EndTime,
      time_zone: this.state.Timezone,
      max_email: this.state.MaxEmails,
      strategy: this.state.Strategy,
      mint_between_sends: this.state.Minutes,
      max_email_send: this.state.MaxEmailSend
    }
    this.props.ScheduleUpdateAction(updatedataschedule)
    this.setState({ hide: !this.state.hide, show: !this.state.show })
  }
  edit = (ScheduleData) => {
    this.setState({
      MailAccounts: ScheduleData.mail_account,
      BlockDays: ScheduleData.block_days,
      Date: ScheduleData.date,
      StartTime: ScheduleData.start_time,
      EndTime: ScheduleData.end_time,
      Timezone: ScheduleData.time_zone,
      MaxEmails: ScheduleData.max_email,
      Strategy: ScheduleData.strategy,
      Minutes: ScheduleData.mint_between_sends,
      MaxEmailSend: ScheduleData.max_email_send,
      show: !this.state.show,
      hide: !this.state.hide
    })
  }
  render() {
    const { ScheduleData, mailGetDat } = this.props;
    console.log('ScheduleData', ScheduleData)
    return (
      <div>
        <PageHeader
          current="Sending Calendar"
          parent="Mail Accounts"
          showStatus={false}
        />
        <PageContainer title="Sending Calendar">
          <i onClick={(e)=>{this.setState({openModel:true})}} class="far fa-question-circle fa-2x page-information"></i>
          <Container fluid>
            {!this.state.hide &&
              <Row>
                <Col md="3" sm="0"></Col>
                <Col md="6" sm="12">
                  <Card className="no-shadow">
                    <CardHeader>
                      <Form>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="exampleFormControlInput1"
                          >
                            Mail account
                            </label>
                          <Input type='select' name='selected_mail'>
                            <option>{this.props.mailGetDat && this.props.mailGetDat.map((e, i) => { return e.email })}</option>
                          </Input>
                        </FormGroup>
                      </Form>
                    </CardHeader>
                    <CardBody>
                      <Row className="row-example">
                        {this.state.days.map((item, index) => {
                          return (
                            <Col className="days-col" key={index}>
                              <span>{item}</span>
                            </Col>
                          )
                        })}
                      </Row>
                      <Row>
                        <p className="text-muted mb-0">
                          <span className='calendedata'>
                            {ScheduleData && ScheduleData.start_time}
                          </span> to
                          <span className='calendedata'>
                            {ScheduleData && ScheduleData.end_time} {ScheduleData && ScheduleData.time_zone}
                          </span> Send no more than
                          <span className='calendedata'>
                            {ScheduleData && ScheduleData.max_email}
                          </span> emails per day Space emails out over the day Pause
                          <span className='calendedata'>
                            {ScheduleData && ScheduleData.mint_between_sends}
                          </span> minutes between sends  Send at least
                          <span className='calendedata'>
                            {ScheduleData && ScheduleData.max_email_send}
                          </span> emails at a time
                        </p>
                      </Row>
                      <Row>
                        <p className="text-info mb-0">
                          <i class="far fa-question-circle mr-2"></i>
                          about these settings
                        </p>
                      </Row>
                    </CardBody>
                    <CardFooter >
                      <Button type="button" onClick={() => this.edit(ScheduleData)}>Edit Rules</Button>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="3" sm="0"></Col>
              </Row>
            }
            {!this.state.show &&
              <Row>
                <Col md="3" sm="0"></Col>
                <Col md="6" sm="12">
                  <Form>
                    <Card className="no-shadow">
                      <CardHeader>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="exampleFormControlInput1"
                          >
                            Mail account
                            </label>
                          <Input type='select' name='selected_mail'>
                            <option>{this.props.mailGetDat && this.props.mailGetDat.map((e, i) => { return e.email })}</option>
                          </Input>
                        </FormGroup>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col className="days-col">
                            <FormGroup className="mb-0">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Blocked out days
                              </label>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="row-example">
                          {this.state.days.map((item, index) => {
                            return (
                              <Col className="days-col" key={index}>
                                <span>{item}</span>
                              </Col>
                            )
                          })}
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Start time
                              </label>
                              <Input
                                defaultValue="10:30:00"
                                id="example-time-input"
                                type="time"
                              />
                            </FormGroup>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                End time
                              </label>
                              <Input
                                defaultValue="10:30:00"
                                id="example-time-input"
                                type="time"
                              />
                            </FormGroup>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Timezone
                              </label>
                              <Input name='timezone' type='select' defaultValue='US/Alaska'>
                                <option value="US/Alaska"> US/Alaska </option>
                                <option value="US/Aleutian"> US/Aleutian </option>
                                <option value="US/Arizona"> US/Arizona </option>
                                <option value="US/Central"> US/Central </option>
                                <option value="US/East-Indiana"> US/East-Indiana </option>
                                <option value="US/Eastern"> US/Eastern </option>
                                <option value="US/Hawaii"> US/Hawaii </option>
                                <option value="US/Indiana-Starke"> US/Indiana-Starke </option>
                                <option value="US/Michigan"> US/Michigan </option>
                                <option value="US/Mountain"> US/Mountain </option>
                                <option value="US/Pacific-New"> US/Pacific-New </option>
                                <option value="US/Pacific"> US/Pacific </option>
                                <option value="US/Samoa"> US/Samoa </option>
                                <option value="Africa/Abidjan"> Africa/Abidjan </option>
                                <option value="Africa/Accra"> Africa/Accra </option>
                              </Input>
                            </FormGroup>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Max emails per day
                              </label>
                              <Input
                                defaultValue="20"
                                id="example-number-input"
                                min="1"
                                type="number"
                              />
                            </FormGroup>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Strategy
                              </label>
                              <Input name='strategy' type='select' defaultValue='0'>
                                <option value="0"> Space out over the day </option>
                                <option value="1"> Send as fast as possible </option>
                              </Input>
                            </FormGroup>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Minutes between sends
                              </label>
                              <Input
                                defaultValue="12"
                                id="example-number-input"
                                min="5"
                                type="number"
                              />
                            </FormGroup>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Minutes between sends
                              </label>
                              <Input
                                defaultValue="1"
                                id="example-number-input"
                                min="0"
                                type="number"
                              />
                            </FormGroup>
                            <FormGroup className="row">
                              <label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Maximum emails to send at a time
                              </label>
                              <Input
                                defaultValue="1"
                                id="example-number-input"
                                min="1"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <p className="text-info mb-0">
                            <i class="far fa-question-circle mr-2"></i>
                            about these settings
                          </p>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <Button type='submit' color="success" onSubmit={this.handleSubmit}>Save<i className='fa fa-right-arrow '></i></Button>
                        <Button type="button" onClick={(e) => { e.preventDefault(), this.setState({ hide: !this.state.hide, show: !this.state.show }) }}>CANCEL</Button>
                      </CardFooter>
                    </Card>
                  </Form>
                </Col>
                <Col md="3" sm="0"></Col>
              </Row>
            }
          </Container>
          <Modal isOpen={this.state.openModel} size="lg">
            <Card className="mb-0 pb-2">
              <CardHeader className="text-center pt-4">
                <h2>Make the most out of Mailshake</h2>
              </CardHeader>
              <CardBody className="p-0 pb-4">
                <div className="text-center p-4">
                  <InputGroup>
                    <Input />
                    <InputGroupAddon addonType="append">
                      <Button color="success">Search</Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="pt-4">Not sure exactly what you are looking for? <span className="text-info mb-0">Browse our library for help.</span></p>
                </div>
                <div className="bg-info pt-4 pl-4 pr-4 pb-0">
                  <Row>
                    <Col sm="12" md="4">
                      <Card>
                        <CardBody className="text-center">
                          <i className="fa fa-tv fa-5x"></i>
                          <h3 className="text-info mb-0">
                            Live Training
                          </h3>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="12" md="4">
                      <Card>
                        <CardBody className="text-center">
                          <i className="fa fa-play fa-5x"></i>
                          <h3 className="text-info mb-0">
                            Video Guides
                          </h3>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="12" md="4">
                      <Card>
                        <CardBody className="text-center">
                          <i className="fa fa-file-word fa-5x"></i>
                          <h3 className="text-info mb-0">
                            Getting Started
                          </h3>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </CardBody>
              <CardFooter className="text-right">
                <p>Still need help? <a hhef="#" className="pr-4">Ask an expert</a><Button onClick={(e) => {this.setState({openModel:false})}}>Cancle</Button></p>
              </CardFooter>
            </Card>
          </Modal>
        </PageContainer>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('checking mail data', state.MailGetDataReducer.mailGetData && state.MailGetDataReducer.mailGetData.map((e, i) => { return e.email }))
  return {
    ScheduleData: state.ScheduleGetDataReducer.ScheduleGetData,
    mailGetDat: state.MailGetDataReducer.mailGetData
  }
}
const mapDispatchToProps = dispatch => ({
  GetScheduleAction: ScheduleGetData => { dispatch(GetScheduleAction(ScheduleGetData)) },
  ScheduleUpdateAction: updatedataschedule => { dispatch(ScheduleUpdateAction(updatedataschedule)) },
  MailGetDataAction: () => { dispatch(MailGetDataAction()) }
})
export default connect(mapStateToProps, mapDispatchToProps)(SendingCalender)
