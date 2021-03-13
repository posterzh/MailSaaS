import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  ButtonGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { connect } from "react-redux";
import {
  CampaignCreateAction,
  CampaignSaveAction,
} from "../../../../redux/action/CampaignAction";

import { parseCSVRow } from './components/csvfile';

import { campaignSend } from "../../../../redux/action/CampaignActions";

export class TheSend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createCampaign = (e) => {
    e.preventDefault();
  };

  onPrev = () => {
    // call parent method
    this.props.onPrev();
  };

  render() {
    const { onPrev, campaign } = this.props;
    return (
      <>
        <Row>
          <Col>
            <h2 className="text-center my-4">
              Are you ready to create your campaign?
            </h2>
          </Col>
        </Row>

        <Row className="my-3">
          <Col md={4} className="d-flex flex-column mx-auto">
            <div className="my-2">
              <Button
                color="danger"
                type="button"
                className="w-100"
                onClick={this.createCampaign}
              >
                Create Campaign
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mx-auto">
            <Card>
              <CardHeader>
                <h2 className="mb-0">From address</h2>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={3}>
                    <h4>Sending account :</h4>
                  </Col>
                  <Col md={9}>
                    <h4>{campaign.from_address}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <h4>Full name :</h4>
                  </Col>
                  <Col md={9}>
                    <h4>{campaign.full_name}</h4>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto p-0">
            <Card>
              <CardHeader>
                <h2 className="mb-0">Recipients</h2>
              </CardHeader>
              <CardBody>
                {
                  <ul>
                    {campaign.first_row && parseCSVRow(campaign.first_row).map((e, i) => (
                        <li key={i}>{e.value}: {campaign.first_row[e.key]}</li>
                      ))}
                  </ul>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="mx-auto">
            <Card>
              <CardHeader>
                <h2 className="mb-0">Messages</h2>
              </CardHeader>
              <CardBody>
                <span>Initial campaign email :</span>
                <Row style={{ fontSize: 14 }}>
                  <ul>
                    {campaign.normal &&
                      Object.keys(campaign.normal).map((key, index) => {
                        return <li key={index}>{campaign.normal[key]}</li>;
                      })}
                  </ul>
                </Row>
                <span>Follow-up campaign email :</span>
                <Row style={{ fontSize: 14 }}>
                  <ul>
                    {campaign.follow_up &&
                      campaign.follow_up.map((item) => {
                        return Object.keys(item).map((key, index) => {
                          return <li key={index}>{item[key]}</li>;
                        });
                      })}
                  </ul>
                </Row>
                <span>Drip campaign email :</span>
                <Row style={{ fontSize: 14 }}>
                  <ul>
                    {campaign.drips &&
                      campaign.drips.map((item) => {
                        Object.keys(item).map((key, index) => {
                          return <li key={index}>{item[key]}</li>;
                        });
                      })}
                  </ul>
                </Row>
              </CardBody>
            </Card>
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
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
});

export default connect(mapStateToProps, campaignSend)(TheSend);
