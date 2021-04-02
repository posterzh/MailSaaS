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

class SequenceEditPanel extends Component {
  constructor(props) {
    super(props);

    const { detailsSequence: {email_subject, email_body, emails } } = props;

    const followups = emails.filter(e => e.email_type == 1);
    const drips = emails.filter(e => e.email_type == 2);

    this.state = {
      subject: email_subject,
      email_body: email_body,
      followUpList: followups,
      dripList: drips,
    }
  }

  _emailBodyQuill = {
    ref: null
  }

  componentDidMount() {

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

  onSave = () => {
    let data = {
      email_subject: this.state.subject,
      email_body: this.state.email_body,
      follow_up: this.state.followUpList,
      drips: this.state.dripList,
    };
    this.props.campaignUpdate(data);
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
              <Input
                type="text"
                className="form-control"
                name="subject"
                defaultValue={this.state.subject}
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
                defaultValue={this.state.email_body}
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
