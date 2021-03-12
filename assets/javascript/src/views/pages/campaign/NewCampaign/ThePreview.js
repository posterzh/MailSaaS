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

  parseCSVRow (row) {
    const tableHeaders = [];
    Object.keys(row).forEach((key) => {
      if (
        key &&
        (key.toLowerCase().indexOf("name") > -1 ||
          key.toLowerCase().indexOf("email") > -1)
      ) {
        tableHeaders.push({
          key: key,
          value: this.formatHeader(key),
        });
      }
    });
    return tableHeaders;
  }

  formatHeader(str) {
    let strArr = str.split(/[\-\_]+/);
    let formatStrArr = strArr.map((s) => {
      if (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
      } else {
        return '';
      }
    });
    return formatStrArr.join(" ");
  }

  render() {
    const { onPrev, onNext, campaign } = this.props;
    console.log(campaign);
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
        <Row className="mt-3">
          <Col md={12} className="mx-auto">
            <Card style={{ backgroundColor: "#005aac", color: "white" }} className="pt-3">
              {
                <ul>
                  {campaign.first_row && this.parseCSVRow(campaign.first_row).map((e, i) => (
                      <li key={i}>{e.value}: {campaign.first_row[e.key]}</li>
                    ))}
                </ul>
              }
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="text"
              className="in"
              name="subject"
              defaultValue={campaign.normal.subject}
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
            {campaign.follow_up && campaign.follow_up.map((followUp, index) => (
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
            {campaign.drips && campaign.drips.map((drip, index) => (
              <DripPanel
                index={index}
                data={drip}
                key={index}
              />
            ))}
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
