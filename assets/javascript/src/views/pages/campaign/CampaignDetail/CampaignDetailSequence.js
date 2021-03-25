import React, { Component } from "react";
import { connect } from "react-redux";
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
  Form,
  FormGroup,
  Input,
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";
import { getDetialsSequence } from "../../../../redux/action/CampaignDetailsActions";

class CampaignDetailSequence extends Component {
  componentDidMount() {
    this.props.getDetialsSequence(this.props.id);
  }

  render() {
    const { id, title, detailsSequence } = this.props;
    const campTitle = title ? title : "Date Outreach";
    return (
      <>
        <PageHeader
          current={campTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campTitle} showHelper={true}>
          <Row>
            <DetailHeader activeItem="SEQUENCE" id={id} />
          </Row>
          <Row className="my-3">
            <Col md={12} className="mx-auto text-right">
              <Button type="button" color="danger" className="mx-auto" size="sm">
                EDIT SEQUENCE
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="bg-transparent py-2">
                  <h3 className="mb-0">Initial campaign email</h3>
                </CardHeader>
                <CardBody className="py-2">
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    <div className="timeline-block mb-1">
                      <span className="timeline-step badge-success">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <div className="timeline-content full-max-w">
                        <h5 className="mb-0">{detailsSequence.email_subject}</h5>
                        <p className="text-sm mt-1 mb-0" dangerouslySetInnerHTML={{ __html: detailsSequence.email_body }}>
                        </p>
                        <div className="mt-3" style={{position: "absolute", top: -12, right: 0}}>
                          <Badge color="danger" pill>
                            <i className="fa fa-pause"></i>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card>
                <CardHeader className="bg-transparent py-2">
                  <h3 className="mb-0">Follow-Ups</h3>
                </CardHeader>
                <CardBody className="py-2">
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    {detailsSequence.followups && (
                      detailsSequence.followups.map(followup => (
                        <div className="timeline-block mb-1">
                          <span className="timeline-step badge-success">
                            <i className="fa fa-reply"></i>
                          </span>
                          <div className="timeline-content">
                            <small className="text-muted font-weight-bold">
                              Wait {followup.waitDays} days
                            </small>
                            <h5 className="mt-3 mb-0">{followup.subject}</h5>
                            <p className="text-sm mt-1 mb-0" dangerouslySetInnerHTML={{ __html: followup.email_body }}>
                            </p>
                            <div className="mt-3" style={{}}>
                              <Badge color="danger" pill style={{position: "absolute", top: 6, right: 0}}>
                                <i className="fa fa-pause"></i>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader className="bg-transparent py-2">
                  <h3 className="mb-0">Drips</h3>
                </CardHeader>
                <CardBody className="py-2">
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    {detailsSequence.drips && (
                      detailsSequence.drips.map(drip => (
                        <div className="timeline-block mb-1">
                          <span className="timeline-step badge-success">
                            <i className="fas fa-stopwatch"></i>
                          </span>
                          <div className="timeline-content">
                            <small className="text-muted font-weight-bold">
                              Wait {drip.waitDays} days
                            </small>
                            <h5 className="mt-3 mb-0">{drip.subject}</h5>
                            <p className="text-sm mt-1 mb-0" dangerouslySetInnerHTML={{ __html: drip.email_body }}>
                            </p>
                            <div className="mt-3">
                              <Badge color="success" pill style={{position: "absolute", top: 6, right: 0}}>
                                <i className="fa fa-play"></i>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader className="bg-transparent py-2">
                  <h3 className="mb-0">Initial campaign email</h3>
                </CardHeader>
                <CardBody className="py-2">
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    <div className="timeline-block">
                      <span className="timeline-step badge-success">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <div className="timeline-content full-max-w">
                        <h5 className="mb-0">Test Campaign Subject</h5>
                        <p className="text-sm mt-1 mb-0">
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                        <div className="mt-3">
                          <Badge color="danger" pill>
                            <i className="fa fa-pause"></i>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card>
                <CardHeader className="bg-transparent py-2">
                  <h3 className="mb-0">Follow-Ups</h3>
                </CardHeader>
                <CardBody className="py-2">
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    <div className="timeline-block">
                      <span className="timeline-step badge-success">
                        <i className="fa fa-reply"></i>
                      </span>
                      <div className="timeline-content">
                        <small className="text-muted font-weight-bold">
                          Wait 4 days
                        </small>
                        <h5 className="mt-3 mb-0">Test Follow up</h5>
                        <p className="text-sm mt-1 mb-0">
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                        <div className="mt-3">
                          <Badge color="danger" pill>
                            <i className="fa fa-pause"></i>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-block">
                      <span className="timeline-step badge-danger">
                        <i className="fa fa-reply"></i>
                      </span>
                      <div className="timeline-content">
                        <small className="text-muted font-weight-bold">
                          Wait 3 days
                        </small>
                        <h5 className="mt-3 mb-0">RE: follow up email test</h5>
                        <p className="text-sm mt-1 mb-0">
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                        <div className="mt-3">
                          <Badge color="success" pill>
                            <i className="fa fa-play"></i>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-block">
                      <span className="timeline-step badge-danger">
                        <i className="fa fa-reply"></i>
                      </span>
                      <div className="timeline-content">
                        <small className="text-muted font-weight-bold">
                          Wait 3 days
                        </small>
                        <h5 className="mt-3 mb-0">RE: follow up email test</h5>
                        <p className="text-sm mt-1 mb-0">
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                        <div className="mt-3">
                          <Badge color="danger" pill>
                            <i className="fa fa-play"></i>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader className="bg-transparent py-2">
                  <h3 className="mb-0">Drips</h3>
                </CardHeader>
                <CardBody className="py-2">
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    <div className="timeline-block">
                      <span className="timeline-step badge-success">
                        <i className="fas fa-stopwatch"></i>
                      </span>
                      <div className="timeline-content">
                        <small className="text-muted font-weight-bold">
                          Wait 4 days
                        </small>
                        <h5 className="mt-3 mb-0">Test Drip email subject</h5>
                        <p className="text-sm mt-1 mb-0">
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                        <div className="mt-3">
                          <Badge color="success" pill>
                            <i className="fa fa-play"></i>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-block">
                      <span className="timeline-step badge-danger">
                        <i className="fas fa-stopwatch"></i>
                      </span>
                      <div className="timeline-content">
                        <small className="text-muted font-weight-bold">
                          Wait 3 days
                        </small>
                        <h5 className="mt-3 mb-0">Drip email subject2</h5>
                        <p className="text-sm mt-1 mb-0">
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                        <div className="mt-3">
                          <Badge color="danger" pill>
                            <i className="fa fa-pause"></i>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          {/* <Row className="mt-4">
            <div className="Sequence_div">
              <span>
                {" "}
                <a href="">
                  <i className="fa fa-envelope"></i> &nbsp;Initial campaign
                  email
                </a>
              </span>
              <br></br>
              <span style={{ lineHeight: "1.4" }}>Hello all</span>
              <p>this is a pera graph</p>
            </div>
          </Row>
          <Row>
            <div className="sequence_draw_div">
              <div className="line_div"></div>
            </div>
            <div className="sequence_draw_div">
              <div className="sequence_circle"></div>
            </div>
            <div className="sequence_draw_div">
              <div className="line_div"></div>
            </div>
          </Row>
          <Row className="mb-5">
            <div className="Sequence_div">
              <span>
                {" "}
                <a href="">
                  <i className="fa fa-reply"></i> &nbsp;follow up
                </a>
              </span>
              <br></br>
              <span style={{ lineHeight: "1.4" }}>Hello all</span>
              <p>this is a pera graph</p>
            </div>
          </Row> */}
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.campaignDetails.id,
  title: state.campaignDetails.title,
  detailsSequence: state.campaignDetails.detailsSequence,
});

export default connect(mapStateToProps, {
  getDetialsSequence
})(CampaignDetailSequence);
