import React, { Component } from 'react'
import { Container, Row, Col, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, Card } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import CardFooter from 'reactstrap/lib/CardFooter'
import CardHeader from 'reactstrap/lib/CardHeader'

export class SendindCalender extends Component {
  render() {
    return (
      <div>
        <div className='campaign_navbar' >
          <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>SendingCalendar</h1>
          <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
        </div>
        <div>
          <Container style={{ marginLeft: "0px" }}>
            <Row>
              <Col md="3">
                <Card>
                  <CardHeader style={{ border: "none" }}>

                    <select className='scalender_filter_select'>
                      <option value='one'>unassigned</option>
                      <option value='two'>unassigned1</option>
                      <option value='three'>unassigned1</option>

                    </select>

                  </CardHeader>
                  <CardBody>

                    <div style={{ backgroundColor: "#ddd", width: "100%" }}>
                      <span className="su">Su</span>
                      <span className="mo">Mo</span>
                      <span className="tu">Tu</span>
                      <span className="we">We</span>
                      <span className="th">Th</span>
                      <span className="fr">Fr</span>
                      <span className="sa">sa</span>
                    </div>

                    <div style={{ fontSize: "12px" }}>
                      6:00 AM to 7:00 PM (Asia/Calcutta) <br />
                      Send no more than 50 emails per day<br />
                      Space emails out over the day<br />
                      Pause 120 minutes between sends<br />
                      Send at least 3 emails at a time<br />
                      Send at most 10 emails at a time<br />

                    </div>
                    <div>
                      <span style={{ fontSize: "10px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></span>
                      <span style={{ fontSize: "10px" }}>about these settings</span>
                    </div>
                  </CardBody>
                  <CardFooter >
                    <Button className="b1">Edit Rules</Button>
                  </CardFooter>

                </Card>
              </Col>
            </Row>
          </Container>
          {/* <div>
          <p>This is an estimate. Actual times may change by recipient actions, pending changes, etc. </p>
          </div> */}

          <div className="calender_box" style={{ backgroundColor: "transparant", width: "100%", display: "flex", flexDirection: "row" }}>
            <div className="su_box">
              <p>january 19</p>
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

        </div>

      </div>
    )
  }
}

export default SendindCalender
