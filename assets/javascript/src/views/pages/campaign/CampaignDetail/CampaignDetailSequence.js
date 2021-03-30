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
import ReactQuill from "react-quill";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";
import PreviewPanelList from "./components/PreviewPanelList";
import MainPreviewPanel from "./components/MainPreviewPanel";
import FollowUpPreviewPanel from "./components/FollowUpPreviewPanel";
import DripPreviewPanel from "./components/DripPreviewPanel";
import FollowUpPanel from "../NewCampaign/components/FollowUpPanel";
import DripPanel from "../NewCampaign/components/DripPanel";
import { getDetialsSequence } from "../../../../redux/action/CampaignDetailsActions";
import { formatHeader } from "../../../../utils/Utils";

class CampaignDetailSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      followUpList: [],
      dripList: [],
    }
  }

  componentDidMount() {
    this.props.getDetialsSequence(this.props.id);
  }

  handleSubmit = () => {

  }

  onEdit = () => {
    const { detailsSequence: { followups, drips } } = this.props;
    this.setState({
      editing: true,
      followUpList: followups,
      dripList: drips,
    })
  }

  onCancel = () => {

  }

  getDNDSource = () => {
    const { detailsSequence } = this.props;

    return (
      <div className="d-flex flex-wrap mt-2">
        {
          detailsSequence.csv_fields.split(",").map((field, index) => {
            return (
              <div className="keyword-item text-danger px-1 mr-2 my-1" key={`template ${index}`} draggable="true" onDragStart={(e) => {
                const dataTransfer = e.dataTransfer;
                dataTransfer.setData('text/html', `<span class="keyword-item p-1 mr-2 my-1">{{${field}}}</span>`);
              }}>
                <i className="fas fa-bars text-danger mr-1"></i>
                { formatHeader(field)}
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    const { editing } = this.state;
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
          {editing
            ?
            <>
              <Row className="my-3">
                <Col className="text-right">
                  <Button color="danger" type="submit" size="sm">
                    &nbsp;&nbsp;
                    <i className="fa fa-save" aria-hidden="true"></i>
                    &nbsp;Save&nbsp;&nbsp;
                  </Button>
                  <Button color="primary" type="button" size="sm" outline onClick={this.onCancel}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                    &nbsp;Cancel
                    </Button>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={this.state.subject}
                      onChange={(e) => {
                        this.setState({ subject: e.target.value });
                      }}
                      placeholder="Subject"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ReactQuill
                      onChange={(value) => {
                        this.setState({ email_body: value });
                      }}
                      theme="snow"
                      className="Quill_div"
                      modules={{
                        toolbar: [
                          ["bold", "italic"],
                          ["link", "blockquote", "code", "image"],
                          [
                            {
                              list: "ordered",
                            },
                            {
                              list: "bullet",
                            },
                          ],
                        ],
                      }}
                    />
                  </Col>
                </Row>

                {this.getDNDSource()}

                <Row className="mt-3">
                  <Col>
                    {this.state.followUpList.map((followUp, index) => (
                      <div key={"follow" + index}>
                        <FollowUpPanel
                          index={index}
                          onDelete={this.onDeleteFollowUp}
                          data={followUp}
                        />
                        <div className="px-3">{this.getDNDSource()}</div>
                      </div>
                    ))}
                  </Col>
                </Row>

                <Row>
                  <Col className="mt-3">
                    <Button
                      color="default"
                      outline
                      type="button"
                      block
                      onClick={this.onAddFollowUp}
                    >
                      <i className="fa fa-plus"></i> &nbsp;ADD FOLLOW-UP
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {this.state.dripList.map((drip, index) => (
                      <div key={"drip" + index}>
                        <DripPanel
                          index={index}
                          onDelete={this.onDeleteDrip}
                          data={drip}
                        />
                        <div className="px-3">{this.getDNDSource()}</div>
                      </div>
                    ))}
                  </Col>
                </Row>

                <Row>
                  <Col className="mt-3">
                    <Button
                      color="default"
                      outline
                      type="button"
                      block
                      onClick={this.onAddDrip}
                    >
                      <i className="fa fa-plus"></i> &nbsp;ADD DRIP
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
            :
            <>
              <Row className="my-3">
                <Col md={12} className="mx-auto text-right">
                  <Button type="button" color="danger" className="mx-auto" size="sm" onClick={this.onEdit}>
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
                      <PreviewPanelList>
                        <MainPreviewPanel subject={detailsSequence.email_subject} body={detailsSequence.email_body} />
                      </PreviewPanelList>
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
                      <PreviewPanelList>
                        {detailsSequence.followups && (
                          detailsSequence.followups.map(followup => (
                            <FollowUpPreviewPanel subject={followup.subject} body={followup.email_body} waitDays={followup.waitDays} />
                          ))
                        )}
                      </PreviewPanelList>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <CardHeader className="bg-transparent py-2">
                      <h3 className="mb-0">Drips</h3>
                    </CardHeader>
                    <CardBody className="py-2">
                      <PreviewPanelList>
                        {detailsSequence.drips && (
                          detailsSequence.drips.map(drip => (
                            <DripPreviewPanel subject={drip.subject} body={drip.email_body} waitDays={drip.waitDays} />
                          ))
                        )}
                      </PreviewPanelList>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          }
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