import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { connect } from "react-redux";
import ThePreview from "./ThePreview";
import { campaignSend } from "../../../../redux/action/CampaignActions";

export class TheSend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createCampaign = (e) => {
    e.preventDefault();
    this.props.campaignSend(this.props.campaign);
  };

  onPrev = () => {
    // call parent method
    this.props.onPrev();
  };

  render() {
    const { onPrev, campaign, mailAccounts } = this.props;
    const activeMailaccount = mailAccounts.find((m) => m.id == campaign.from_address);
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
          <Col className="mx-auto p-0">
            <Card>
              <CardHeader>
                <h2 className="mb-0">From address</h2>
              </CardHeader>
              <CardBody>
                {activeMailaccount &&
                <>
                  <Row>
                    <Col md={3}>
                      <h4>Sending account :</h4>
                    </Col>
                    <Col md={9}>
                      <h5>{activeMailaccount.email}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <h4>Full name :</h4>
                    </Col>
                    <Col md={9}>
                      <h5>{activeMailaccount.first_name} {activeMailaccount.last_name}</h5>
                    </Col>
                  </Row>
                </>
              }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto p-0">
            <Card className="mb-0">
              <CardHeader>
                <h2 className="mb-0">Recipients</h2>
              </CardHeader>
              <CardBody className="pb-0">
                { campaign.csvfile && 
                  <p>{campaign.csvfile.name}</p>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ThePreview sendPreview={true} />
        
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
  mailAccounts: state.mailAccounts.mailAccounts,
});

export default connect(mapStateToProps, {campaignSend})(TheSend);
