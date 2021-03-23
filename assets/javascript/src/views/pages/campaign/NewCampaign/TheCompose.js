import React, { Component } from "react";
import {
  Row,
  Button,
  Input,
  Col,
  Form,
} from "reactstrap";
import { connect } from "react-redux";
import { CampaignComposeAction } from "../../../../redux/action/CampaignAction";
import ReactQuill from "react-quill";
import FollowUpPanel from "./components/FollowUpPanel";
import DripPanel from "./components/DripPanel";
import { campaignCompose } from "../../../../redux/action/CampaignActions";
import { formatHeader } from "../../../../utils/Utils";

class TheCompose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      email_body: "",
      followUpList: [],
      dripList: [],
    };
  }

  onAddFollowUp = () => {
    this.setState((state) => {
      const index = state.followUpList.length;
      let newFollowUp = { index, subject: "Re: ", email_body: "Hi", waitDays: 1 };
      const followUpList = state.followUpList.concat(newFollowUp);
      return {
        ...state,
        followUpList,
      };
    });
  };

  onDeleteFollowUp = (index) => {
    this.setState((state) => {
      const followUpList = state.followUpList.filter((item, i) => i != index);
      return {
        ...state,
        followUpList,
      };
    });
  };

  onAddDrip = () => {
    this.setState((state) => {
      const index = state.dripList.length;
      let newFollowUp = { index, subject: "Re: ", email_body: "Hi", waitDays: 1 };
      const dripList = state.dripList.concat(newFollowUp);
      return {
        ...state,
        dripList,
      };
    });
  };

  onDeleteDrip = (index) => {
    this.setState((state) => {
      const dripList = state.dripList.filter((item, i) => i != index);
      return {
        ...state,
        dripList,
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      email_subject: this.state.subject,
      email_body: this.state.email_body,
      follow_up: this.state.followUpList,
      drips: this.state.dripList,
    };
    this.props.campaignCompose(data);
    // call parent method
    this.props.onNext();
  };

  onPrev = () => {
    // call parent method
    this.props.onPrev();
  };

  getDNDSource = () => {
    const { campaign: {first_row} } = this.props;
    return (
      <div className="d-flex flex-wrap mt-2">
        {
          Object.keys(first_row || {}).filter(field => !!field).map((field, index) => {
            return (
              <div className="keyword-item text-danger px-1 mr-2 my-1" key={`${index}`} draggable="true" onDragStart={(e) => {
                const dataTransfer = e.dataTransfer;
                dataTransfer.setData('text/html', `<span class="keyword-item p-1 mr-2 my-1">{{${field}}}</span>`);
              }}>
                <i className="fas fa-bars text-danger mr-2"></i>
                { formatHeader(field) }
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    const { onPrev, onNext } = this.props;

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <h2 className="text-center my-4">
                Compose the emails in this campaign
              </h2>
            </Col>
          </Row>
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

          <Row className="mt-5">
            <Col>
              {this.state.followUpList.map((followUp, index) => (
                <>
                  <FollowUpPanel
                    index={index}
                    onDelete={this.onDeleteFollowUp}
                    data={followUp}
                    key={index}
                  />
                  <div className="px-3">{this.getDNDSource()}</div>
                </>
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
                <>
                  <DripPanel
                    index={index}
                    onDelete={this.onDeleteDrip}
                    data={drip}
                    key={index}
                  />
                  <div className="px-3">{this.getDNDSource()}</div>
                </>
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

          {/* Buttons */}
          <Row className="my-3">
            <Col className="text-left">
              {onPrev && (
                <Button color="primary" type="button" outline onClick={this.onPrev}>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  {" "}PREV
                </Button>
              )}
            </Col>
            <Col className="text-right">
              {onNext && (
                <Button color="danger" type="submit">
                  NEXT <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
});

export default connect(mapStateToProps, { campaignCompose })(
  TheCompose
);
