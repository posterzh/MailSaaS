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
import Summary from "./FunnelCard";
import { connect } from "react-redux";
import FunnelCard from "./FunnelCard";

class OverviewSummery extends Component {
  componentDidMount() {

  }

  render() {
    let { overviewSummary: { funnel, totals } } = this.props;

    funnel = funnel || [];
    totals = totals || [];

    const initial_funnel = funnel.filter((item) => item.email_type === 0);
    const followup_funnel = funnel.filter((item) => item.email_type === 1);
    const drip_funnel = funnel.filter((item) => item.email_type === 2);

    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <label>
                <h1 className="display-4">FUNNEL</h1>
              </label>
              <div style={{ position: 'absolute', top: 20, right: 20 }}>
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
                <div className="funnel-item-header px-4 pt-3 mb-2 d-flex">
                  <span className="m-auto">INITIAL EMAIL</span>
                </div>
                <CardBody className="pt-0 pb-3">
                  <Row>
                    <Badge className="ml-2" color="danger" pill>
                      {initial_funnel.length > 0 ? initial_funnel[0].recipient_count : 0} Recipients
                    </Badge>
                  </Row>
                  <Row className="py-2">
                    <Col className="detail-item px-1 px-md-2">
                      <FunnelCard count={initial_funnel.length > 0 ? initial_funnel[0].opened_count : 0} text={"OPENED"} />
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <FunnelCard count={initial_funnel.length > 0 ? initial_funnel[0].clicked_count : 0} text={"CLICKED"} />
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <FunnelCard count={initial_funnel.length > 0 ? initial_funnel[0].replied_count : 0} text={"REPLIED"} />
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <FunnelCard count={initial_funnel.length > 0 ? initial_funnel[0].bounced_count : 0} text={"BOUNCED"} />
                    </Col>
                    <Col className="detail-item px-1 px-md-2">
                      <FunnelCard count={0} text={"UNSUBSCRIBED"} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="card-summary-funnel mb-0 mt-3">
                <div className="funnel-item-header px-4 pt-3 mb-2 d-flex">
                  <span className="m-auto">FOLLOW UP</span>
                </div>
                <CardBody className="pt-0 pb-3">
                  {followup_funnel.map((item, index) => (
                    <div key={`item_${index}`}>
                      <Row>
                        <Badge className="ml-2" color="danger" pill>
                          {item.recipient_count} Recipients
                        </Badge>
                      </Row>
                      <Row className="py-2">
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.opened_count} text={"OPENED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.clicked_count} text={"CLICKED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.replied_count} text={"REPLIED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.bounced_count} text={"BOUNCED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={0} text={"UNSUBSCRIBED"} />
                        </Col>
                      </Row>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="card-summary-funnel mb-0 mt-3">
                <div className="funnel-item-header px-4 pt-3 mb-2 d-flex">
                  <span className="m-auto">DRIP</span>
                </div>
                <CardBody className="pt-0 pb-2">
                  {drip_funnel.map((item, index) => (
                    <div key={`item_${index}`}>
                      <Row>
                        <Badge className="ml-2" color="danger" pill>
                          {item.recipient_count} Recipients
                        </Badge>
                      </Row>
                      <Row className="py-2">
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.opened_count} text={"OPENED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.clicked_count} text={"CLICKED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.replied_count} text={"REPLIED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={item.bounced_count} text={"BOUNCED"} />
                        </Col>
                        <Col className="detail-item px-1 px-md-2">
                          <FunnelCard count={0} text={"UNSUBSCRIBED"} />
                        </Col>
                      </Row>
                    </div>
                  ))}
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
                  {totals.recipient_count}
                </h1>
                <span className="over_sapn">RECIPIENT</span>
              </div>
              <div className="w-14">
                <h1>{totals.in_campaign_count}</h1>
                <span className="over_sapn">IN CAMPAIGN</span>
              </div>
              <div className="w-14">
                <h1>{totals.opened_count}</h1>
                <span className="over_sapn">OPENED</span>
              </div>
              <div className="w-14">
                <h1>{totals.clicked_count}</h1>
                <span className="over_sapn">CLICKED</span>
              </div>
              <div className="w-14">
                <h1>{totals.replied_count}</h1>
                <span className="over_sapn">REPLIED</span>
              </div>
              <div className="w-14">
                <h1>{totals.bounced_count}</h1>
                <span className="over_sapn">BOUNCES</span>
              </div>
              <div className="w-14">
                <h1>{0}</h1>
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
                    <td>{0}</td>
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
