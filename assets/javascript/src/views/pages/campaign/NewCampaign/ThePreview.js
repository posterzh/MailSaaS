import React, { Component } from "react";
import {
  Form,
  Container,
  Row,
  Nav,
  Input,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { Link, Route } from "react-router-dom";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { PreviewCampaignAction } from "../../../../redux/action/CampaignAction";
import ReactQuill from "react-quill";
import FollowUpPanel from "./components/FollowUpPanel";
import DripPanel from "./components/DripPanel";
import { connect } from "react-redux";

class ThePreview extends Component {
  constructor() {
    super();
  }

  onPrev = () => {
    // call parent method
    this.props.onPrev();
  };

  onNext = () => {
    // call parent method
    this.props.onNext();
  };

  render() {
    const { onPrev, onNext, campaign } = this.props;
    return (
      <>
        <Row>
          <Col>
            <h3 className="text-center my-4">
              Preview and personalize each email
            </h3>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <h3 className="text-warning"></h3>
          </Col>
        </Row>

        {/* <Container>
          <Row className="mt-3">
            <Col md={12} className="mx-auto">
              <div style={{ backgroundColor: "#005aac", color: "white" }}>
                {
                  <ul>
                    {this.props.CampaignPreviewEmails &&
                      this.props.CampaignPreviewEmails.map((e, i) => (
                        <li style={{ color: "white" }}>{e.email}</li>
                      ))}
                  </ul>
                }
              </div>
            </Col>
          </Row>
        </Container> */}
        <Container>
        <Row>
            <Col>
              <Input
                type="text"
                className="in"
                name="subject"
                value={campaign.normal.subject}
                placeholder="Subject"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ReactQuill
                theme="snow"
                className="Quill_div"
                value={campaign.normal.email_body}
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

          <Row className="mt-5">
            <Col>
              {campaign.followUpList && campaign.followUpList.map((followUp, index) => (
                <FollowUpPanel
                  index={index}
                  data={followUp}
                  key={index}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              {campaign.dripList && campaign.dripList.map((drip, index) => (
                <DripPanel
                  index={index}
                  data={drip}
                  key={index}
                />
              ))}
            </Col>
          </Row>
        </Container>

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
              <Button color="danger" type="button" onClick={this.onNext}>
                NEXT <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </Button>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  campaign: state.campaign,
});

export default connect(mapStateToProps)(ThePreview);
