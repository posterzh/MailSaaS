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
import { getDetialsSequence } from "../../../../../redux/action/CampaignDetailsActions";
import FollowUpPanel from "../../NewCampaign/components/FollowUpPanel";
import DripPanel from "../../NewCampaign/components/DripPanel";

class SequenceEditPanel extends Component {
  constructor(props) {
    super(props);

    const { detailsSequence: { followups, drips } } = props;

    this.state = {
      followUpList: followups,
      dripList: drips,
    }
  }

  componentDidMount() {
    
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
    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.campaignDetails.id,
  title: state.campaignDetails.title,
  detailsSequence: state.campaignDetails.detailsSequence,
});

export default connect(mapStateToProps)(SequenceEditPanel);
