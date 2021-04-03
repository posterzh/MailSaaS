import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  CardTitle,
  Input
} from "reactstrap";
// import React, { Component } from 'react'
import { CampaignOverviewAction } from "../../../../../redux/action/CampaignAction";
import { connect } from "react-redux";

class OverviewSummery extends Component {
  render() {
    const { overviewSummary } = this.props;
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <label>
                <h1 className="display-4">FUNNEL</h1>
                <span>
                  <a href="#" className="explain_number">
                    <i className="fa fa-question-circle-o" aria-hidden="true"></i>{" "}
                    Explain these numbers
                  </a>
                </span>
              </label>
              <div style={{position: 'absolute', top: 20, right: 20}}>
                <Input
                  id="selectRecipients"
                  type="select"
                  className="form-control-sm"
                >
                  <option>All</option>
                  <option value="date1">Last 7 days</option>
                  <option value="date2">Last 15 days</option>
                  <option value="date3">Last 30 days</option>
                  <option value="date4">MTD</option>
                  <option value="date5">YTD</option>
                </Input>
              </div>
            </Col>
            
          </Row>

          <Row>
            <Col>
              <Card className="card-summary-funnel mb-0">
                <div className="funnel-item-header px-3 pt-3 align-items-center">
                  <span className="mr-3">Initial campaign email</span>
                  <Badge color="danger" pill>
                    2 Recipients
                  </Badge>
                </div>
                <CardBody className="pt-0 pb-3">
                  <Row>
                    {
                      ["OPENED", "CLICKED", "REPLIED", "BOUNCED", "UNSUBSCRIBED"].map((item, index) => 
                      <Col className="detail-item px-1 px-md-2" key={"summary" + index}>
                        <Card className="card-stats mb-0">
                          <CardBody className="p-1 square-box-60">
                            <div className="dummy"></div>
                            <div className="content d-flex flex-column justify-content-around align-items-center mx-0">
                              {/* <div className="icon icon-sm icon-shape bg-gradient-dark text-white rounded-circle shadow">
                                <span>0%</span>
                              </div> */}
                              <span className="h2 font-weight-bold mb-0">
                                0
                              </span>
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                {item}
                              </CardTitle>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>)
                    }
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="card-summary-funnel mb-0 mt-3">
                <div className="funnel-item-header px-4 pt-3">
                  <span className="mr-3">FOLLOW UP</span>
                  <Badge color="danger" pill>
                    {overviewSummary.recipientCount || 0} Recipients
                  </Badge>
                </div>
                <CardBody className="pt-0 pb-3">
                  <Row>
                    <Col className="detail-item px-1 px-md-2">
                      <Card className="card-stats mb-0">
                        <CardBody className="p-1 square-box-60">
                          <div className="dummy"></div>
                          <div className="content d-flex flex-column justify-content-around align-items-center mx-0">
                            {/* <div className="icon icon-sm icon-shape bg-gradient-dark text-white rounded-circle shadow">
                              <span>{overviewSummary.openPer || 0}%</span>
                            </div> */}
                            <span className="h2 font-weight-bold mb-0">
                              {overviewSummary.openCount || 0}
                            </span>
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              OPENED
                            </CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <Card className="card-stats mb-0">
                        <CardBody className="p-1 square-box-60">
                          <div className="dummy"></div>
                          <div className="content d-flex flex-column justify-content-around align-items-center mx-0">
                            {/* <div className="icon icon-sm icon-shape bg-gradient-dark text-white rounded-circle shadow">
                              <span>0%</span>
                            </div> */}
                            <span className="h2 font-weight-bold mb-0">
                              0
                            </span>
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              CLICKED
                            </CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <Card className="card-stats mb-0">
                        <CardBody className="p-1 square-box-60">
                          <div className="dummy"></div>
                          <div className="content d-flex flex-column justify-content-around align-items-center mx-0">
                            {/* <div className="icon icon-sm icon-shape bg-gradient-dark text-white rounded-circle shadow">
                              <span>{overviewSummary.replyPer || 0}%</span>
                            </div> */}
                            <span className="h2 font-weight-bold mb-0">
                              {overviewSummary.replyCount || 0}
                            </span>
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              REPLIED
                            </CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <Card className="card-stats mb-0">
                        <CardBody className="p-1 square-box-60">
                          <div className="dummy"></div>
                          <div className="content d-flex flex-column justify-content-around align-items-center mx-0">
                            {/* <div className="icon icon-sm icon-shape bg-gradient-dark text-white rounded-circle shadow">
                              <span>0%</span>
                            </div> */}
                            <span className="h2 font-weight-bold mb-0">
                              0
                            </span>
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              BOUNCED
                            </CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <Card className="card-stats mb-0">
                        <CardBody className="p-1 square-box-60">
                          <div className="dummy"></div>
                          <div className="content d-flex flex-column justify-content-around align-items-center mx-0">
                            {/* <div className="icon icon-sm icon-shape bg-gradient-dark text-white rounded-circle shadow">
                              <span>{overviewSummary.unsubscribePer || 0}%</span>
                            </div> */}
                            <span className="h2 font-weight-bold mb-0">
                              {overviewSummary.unsubscribeCount || 0}
                            </span>
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              UNSUBSCRIBED
                            </CardTitle>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h1 className="display-4">TOTALS</h1>
            </Col>
          </Row>
          <Row className="mt-2">
            <div className="w_h-100">
              <div className="w-14">
                <h1>
                  {overviewSummary.recipientCount || 0}
                </h1>
                <span className="over_sapn">RECIPIENT</span>
              </div>
              <div className="w-14">
                <h1>0</h1>
                <span className="over_sapn">IN CAMPAIGN</span>
              </div>
              <div className="w-14">
                <h1>0</h1>
                <span className="over_sapn">ENGAGED</span>
              </div>
              <div className="w-14">
                <h1>0</h1>
                <span className="over_sapn">LEADS</span>
              </div>
              <div className="w-14">
                <h1>0</h1>
                <span className="over_sapn">BOUNCES</span>
              </div>
              <div className="w-14">
                <h1>0</h1>
                <span className="over_sapn">UNSUBSCRIBES</span>
              </div>
              <div className="w-14">
                <h1>0</h1>
                <span className="over_sapn">UNSUBSCRIBES</span>
              </div>
            </div>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <Table className="table" hover responsive>
                <thead>
                  <tr>
                    <th colSpan="2">SUMMARY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0</td>
                    <td>Recipients</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th colSpan="2">REPLIES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0</td>
                    <td>Recipients</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th colSpan="2">LEADS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{overviewSummary.ignoredLeadCount || 0}</td>
                    <td>Ignored</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

// export default OverviewSummery
const mapStateToProps = (state) => ({
  overviewSummary: state.campaignDetails.overviewSummary
});

export default connect(mapStateToProps)(OverviewSummery);
