import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
// import React, { Component } from 'react'
import { CampaignOverviewAction } from "../../../../../redux/action/CampaignAction";
import { connect } from "react-redux";

class OverviewSummery extends Component {
  render() {
    const { overviewSummary, mailAccounts } = this.props;
    console.log(overviewSummary);
    return (
      <div>
        <Container fluid>
          <Row>
            <label>
              <h1 className="display-4">FUNNEL</h1>
              <span>
                <a href="#" className="explain_number">
                  <i className="fa fa-question-circle-o" aria-hidden="true"></i>{" "}
                  Explain these numbers
                </a>
              </span>
            </label>
          </Row>
          <Row>
            <div className="draw_div">
              <div className="circle"></div>
            </div>
            <div className="draw_div">
              <div className="line_div"></div>
            </div>
          </Row>
          <Row></Row>

          <Row className="overview_div">
            <Col>
              <Row>
                <div className="good_test">
                  <h3>GOOD TEST</h3>{" "}
                </div>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="good_test_div">
                    <div className=" text_purple">
                      <span className="btn_heading">0</span>
                      <br></br>
                      <span className="good_btn_span">
                        0%<br></br>OPENED
                      </span>
                    </div>
                    <div className="text_leaf">
                      <span className="btn_heading">0</span>
                      <br></br>
                      <span className="good_btn_span">
                        0%<br></br>OPENED
                      </span>
                    </div>
                    <div className="text_green">
                      <span className="btn_heading">0</span>
                      <br></br>
                      <span className="good_btn_span">
                        0%<br></br>OPENED
                      </span>
                    </div>
                    <div className="text_lime">
                      <span className="btn_heading">0</span>
                      <br></br>
                      <span className="good_btn_span">
                        0%<br></br>OPENED
                      </span>
                    </div>
                    <div className="text_warning">
                      <span className="btn_heading">0</span>
                      <br></br>
                      <span className="good_btn_span">
                        0%<br></br>OPENED
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <button className="btn-primary text-left w-100 d-block ">
                  items
                </button>
              </Row>
            </Col>
          </Row>
          <Row>
            <div className="draw_div">
              <div className="line_div_second"></div>
            </div>
            <div className="draw_div">
              <div className="circle">
              </div>
            </div>
            <div className="draw_div">
              <div className="line_div_second"></div>
            </div>
          </Row>
          <Row className="overview_div">
            <Col>
              <Row>
                <div className="good_test">
                  <h3>FOLLOW UP</h3>{" "}
                </div>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="good_test_div">
                    <div className=" text_purple">
                      <span className="btn_heading">
                        {overviewSummary.openCount}
                      </span>
                      <br></br>
                      <span className="good_btn_span">
                        {overviewSummary.openPer}
                        %<br></br>OPENED
                      </span>
                    </div>
                    <div className="text_leaf">
                      <span className="btn_heading">0</span>
                      <br></br>
                      <span className="good_btn_span">
                        0%<br></br>CLICKED
                      </span>
                    </div>
                    <div className="text_green">
                      <span className="btn_heading">
                        {overviewSummary.replyCount}
                      </span>
                      <br></br>
                      <span className="good_btn_span">
                        {overviewSummary.replyPer}
                        %<br></br>REPLIED
                      </span>
                    </div>
                    <div className="text_lime">
                      <span className="btn_heading">0</span>
                      <br></br>
                      <span className="good_btn_span">
                        0%<br></br>BOUNCED
                      </span>
                    </div>
                    <div className="text_warning">
                      <span className="btn_heading">
                        {overviewSummary.unsubscribeCount}
                      </span>
                      <br></br>
                      <span className="good_btn_span">
                        {overviewSummary.unsubscribePer}
                        %<br></br>UNSUBSCRIBED
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="pending_div">{/* 5 pending */}</div>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5">
            <h1 className="display-4">TOTALS</h1>
          </Row>
          <Row className="mt-2">
            <div className="w_h-100">
              <div className="w-14">
                <h1>
                  {overviewSummary.recipientCount}
                </h1>
                <span className="over_sapn">RECIPIENT</span>
              </div>
              <div className="w-14">
                <h1>6</h1>
                <span className="over_sapn">IN CAMPAIGN</span>
              </div>
              <div className="w-14">
                <h1>6</h1>
                <span className="over_sapn">ENGAGED</span>
              </div>
              <div className="w-14">
                <h1>6</h1>
                <span className="over_sapn">LEADS</span>
              </div>
              <div className="w-14">
                <h1>6</h1>
                <span className="over_sapn">BOUNCES</span>
              </div>
              <div className="w-14">
                <h1>6</h1>
                <span className="over_sapn">UNSUBSCRIBES</span>
              </div>
              <div className="w-14">
                <h1>6</h1>
                <span className="over_sapn">UNSUBSCRIBES</span>
              </div>
            </div>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <Table className="table" hover responsive>
                <thead>
                  {" "}
                  <tr>
                    <th colSpan="2">SUMMARY</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  <tr>
                    <td>8</td>
                    <td>Recipients</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <Table hover responsive>
                <thead>
                  {" "}
                  <tr>
                    <th colSpan="2">REPLIES</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  <tr>
                    <td>8</td>
                    <td>Recipients</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <Table hover responsive>
                <thead>
                  {" "}
                  <tr>
                    <th colSpan="2">LEADS</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  <tr>
                    <td>
                      {overviewSummary.ignoredLeadCount}
                    </td>
                    <td>Recipients</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// export default OverviewSummery
const mapStateToProps = (state) => ({
  overviewSummary: state.campaignDetails.overviewSummary
});

export default connect(mapStateToProps)(OverviewSummery);
