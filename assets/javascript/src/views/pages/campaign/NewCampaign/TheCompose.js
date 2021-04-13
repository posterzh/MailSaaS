import React, { Component } from "react";
import {
  Row,
  Button,
  Input,
  Col,
  Form
} from "reactstrap";
import { connect } from "react-redux";
import { campaignCompose } from "../../../../redux/action/CampaignActions";
import { formatHeader, showNotification } from "../../../../utils/Utils";
import ReactQuill from "react-quill";
import FollowUpPanel from "./components/FollowUpPanel";
import DripPanel from "./components/DripPanel";

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

  _emailBodyQuill = {
    ref: null
  }

  onAddFollowUp = () => {
    this.setState((state) => {
      const index = state.followUpList.length;
      let newFollowUp = { index, email_subject: "Re: ", email_body: "Hi", wait_days: 1 };
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
      let newFollowUp = { index, email_subject: "Re: ", email_body: "Hi", wait_days: 1 };
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

    const follow_ups = this.state.followUpList.map(item => {
      const dup = {
        ...item
      }
      delete dup['ref'];
      return dup;
    });
    const drips = this.state.dripList.map(item => {
      const dup = {
        ...item
      }
      delete dup['ref'];
      return dup;
    });

    let data = {
      email_subject: this.state.subject,
      email_body: this.state.email_body,
      follow_up: follow_ups,
      drips: drips,
    };

    if (!data.email_subject) {
      showNotification("danger", "The email subject should not be empty.");
      return false;
    }

    if (!data.email_body) {
      showNotification("danger", "The email body should not be empty.");
      return false;
    }

    for (let follow_up of data.follow_up) {
      if (!follow_up.email_subject) {
        showNotification("danger", "The email subject should not be empty.");
        return false;
      }

      if (!follow_up.email_body) {
        showNotification("danger", "The email body should not be empty.");
        return false;
      }

      if (follow_up.wait_days <= 0) {
        showNotification("danger", "The wait days should be greater than 0.")
        return false;
      }
    }

    for (let drip of data.drips) {
      if (!drip.email_subject) {
        showNotification("danger", "The email subject should not be empty.");
        return false;
      }

      if (!drip.email_body) {
        showNotification("danger", "The email body should not be empty.");
        return false;
      }

      if (drip.wait_days <= 0) {
        showNotification("danger", "The wait days should be greater than 0.");
        return false;
      }
    }

    this.props.campaignCompose(data);
    // call parent method
    this.props.onNext();
  };

  onPrev = () => {
    // call parent method
    this.props.onPrev();
  };

  getDNDSource = (panelItem) => {
    const { campaign: {first_row} } = this.props;
    return (
      <div className="d-flex flex-wrap mt-2">
        {
          Object.keys(first_row || {}).filter(field => !!field).map((field, index) => {
            return (
              <div className="keyword-item text-danger px-1 mr-2 my-1" key={`template ${index}`} draggable="true" onDragStart={(e) => {
                const dataTransfer = e.dataTransfer;
                dataTransfer.setData('text/html', `<span class="keyword-item p-1 mr-2 my-1">{{${field}}}</span>`);
                dataTransfer.setData('text', `{{${field}}}`);
              }} onDoubleClick={() => {
                const { ref: _quillRef } = panelItem;
                if (_quillRef) {
                  const currentLen = _quillRef.getEditor().getLength();
                  _quillRef.getEditor().insertText(currentLen - 1, `{{${field}}}`)
                }
              }}>
                <i className="fas fa-bars text-danger mr-1"></i>
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
                ref={ref => this._emailBodyQuill['ref'] = ref}
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

          {this.getDNDSource(this._emailBodyQuill)}

          <Row className="mt-3">
            <Col>
              {this.state.followUpList.map((followUp, index) => (
                <div key={"follow" + index}>
                  <FollowUpPanel
                    index={index}
                    onDelete={this.onDeleteFollowUp}
                    data={followUp}
                  />
                  <div className="px-3">{this.getDNDSource(followUp)}</div>
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
                  <div className="px-3">{this.getDNDSource(drip)}</div>
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
