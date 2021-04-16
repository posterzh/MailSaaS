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
import { formatHeader } from "../../../../../utils/Utils";
import { campaignUpdate } from "../../../../../redux/action/CampaignActions";
import FollowUpPanel from "../../NewCampaign/components/FollowUpPanel";
import DripPanel from "../../NewCampaign/components/DripPanel";
import { showNotification } from "../../../../../utils/Utils"

class SequenceEditPanel extends Component {
  constructor(props) {
    super(props);

    const { detailsSequence: { emails } } = props;

    const main = emails ? emails.find(e => e.email_type === 0) : undefined;
    const followups = emails ? emails.filter(e => e.email_type == 1) : [];
    const drips = emails ? emails.filter(e => e.email_type == 2) : [];

    this.state = {
      main: main,
      followups: followups,
      drips: drips,
    }
  }

  _emailBodyQuill = {
    ref: null
  }

  componentDidMount() {

  }

  onAddFollowUp = () => {
    const { id } = this.props;
    this.setState((state) => {
      let newFollowUp = {
        campaign: id,
        email_subject: "Re: ",
        email_body: "Hi",
        wait_days: 1,
        is_deleted: false,
        email_type: 1
      };
      const followups = state.followups.concat(newFollowUp);
      return {
        ...state,
        followups,
      };
    });
  };

  onDeleteFollowUp = (index) => {
    this.setState((state) => {
      const followups = state.followups.map((item, i) => {
        if (index == i) {
          item.is_deleted = true
        }
        return item;
      });
      return {
        ...state,
        followups,
      };
    });
  };

  onAddDrip = () => {
    const { id } = this.props;
    this.setState((state) => {
      let newFollowUp = {
        campaign: id,
        email_subject: "Re: ",
        email_body: "Hi",
        wait_days: 1,
        is_deleted: false,
        email_type: 2
      };
      const drips = state.drips.concat(newFollowUp);
      return {
        ...state,
        drips,
      };
    });
  };

  onDeleteDrip = (index) => {
    this.setState((state) => {
      const drips = state.drips.map((item, i) => {
        if (index == i) {
          item.is_deleted = true
        }
        return item;
      });
      return {
        ...state,
        drips,
      };
    });
  };

  onSave = async () => {
    const main = this.state.main;
    const followups = this.state.followups
      .filter(followup => followup.id !== undefined || followup.is_deleted === false)
      .map((followup, index) => { followup.email_order = index; followup.ref = null; return followup; });
    const drips = this.state.drips
      .filter(drip => drip.id !== undefined || drip.is_deleted === false)
      .map((drip, index) => { drip.email_order = index; drip.ref = null; return drip; });
    const emails = [main].concat(followups).concat(drips);

    if (!main.email_subject) {
      showNotification("danger", "The email subject should not be empty.");
      return false;
    }

    if (!main.email_body) {
      showNotification("danger", "The email body should not be empty.");
      return false;
    }

    for (let followup of followups) {
      if (!followup.email_subject) {
        showNotification("danger", "The email subject should not be empty.");
        return false;
      }

      if (!followup.email_body) {
        showNotification("danger", "The email body should not be empty.");
        return false;
      }

      if (followup.wait_days <= 0) {
        showNotification("danger", "The wait days should be greater than 0.")
        return false;
      }
    }

    for (let drip of drips) {
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

    await this.props.campaignUpdate(emails);
    this.props.onSave();
  }

  onCancel = () => {
    this.props.onCancel();
  }

  getDNDSource = (panelItem) => {
    const { detailsSequence } = this.props;

    return (
      <div className="d-flex flex-wrap mt-2">
        {
          (detailsSequence.csv_fields || '').split(",").map((field, index) => {
            return (
              <div className="keyword-item text-danger px-1 mr-2 my-1" key={`template ${index}`} draggable="true" onDragStart={(e) => {
                const dataTransfer = e.dataTransfer;
                dataTransfer.setData('text/html', `<span class="keyword-item p-1 mr-2 my-1">{{${field}}}</span>`);
              }} onDoubleClick={() => {
                const { ref: _quillRef } = panelItem;
                if (_quillRef) {
                  const currentLen = _quillRef.getEditor().getLength();
                  _quillRef.getEditor().insertText(currentLen - 1, `{{${field}}}`)
                }
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
    return (
      <Row>
        <Col md={8} className="mx-auto">
          <Row className="my-3">
            <Col className="text-right">
              <Button color="danger" type="button" size="sm" onClick={this.onSave}>
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
          <Form>
            <Row>
              <Col>
                {this.state.main &&
                  <Input
                    type="text"
                    className="form-control"
                    name="email_subject"
                    defaultValue={this.state.main.email_subject}
                    onChange={(e) => {
                      const { main } = this.state;
                      main.email_subject = e.target.value;
                      this.setState({
                        ...this.state,
                        main
                      });
                    }}
                    placeholder="Subject"
                    required
                  />
                }
              </Col>
            </Row>
            <Row>
              <Col>
                {this.state.main &&
                  <ReactQuill
                    ref={ref => this._emailBodyQuill['ref'] = ref}
                    defaultValue={this.state.main.email_body}
                    onChange={(value) => {
                      const { main } = this.state;
                      main.email_body = value;
                      this.setState({
                        ...this.state,
                        main
                      });
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
                }
              </Col>
            </Row>

            {this.getDNDSource(this._emailBodyQuill)}

            <Row className="mt-3">
              <Col>
                {this.state.followups
                  .map((followup, index) => (
                    !followup.is_deleted &&
                    <div key={"follow" + index}>
                      <FollowUpPanel
                        index={index}
                        onDelete={this.onDeleteFollowUp}
                        data={followup}
                      />
                      <div className="px-3">{this.getDNDSource(followup)}</div>
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
                {this.state.drips
                  .map((drip, index) => (
                    !drip.is_deleted &&
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
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.campaignDetails.id,
  title: state.campaignDetails.title,
  detailsSequence: state.campaignDetails.detailsSequence,
});

export default connect(mapStateToProps, {
  campaignUpdate,
})(SequenceEditPanel);
