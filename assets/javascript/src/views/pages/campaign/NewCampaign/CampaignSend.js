import React, { Component } from "react";
import { Form, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  CampaignCreateAction,
  CampaignSaveAction,
} from "../../../../redux/action/CampaignAction";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CampaignsHeader from "./components/CampaignsHeader";

export class CampaignSend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const CampId =
      this.props.history.location.state && this.props.history.location.state.id;
    this.props.CampaignCreateAction(CampId);
    console.log("mounting in Send", CampId);
  }
  campaignStart = (e) => {
    e.preventDefault();
    this.props.CampaignSaveAction(
      true,
      this.props.history.location.state && this.props.history.location.state.id
    );
  };
  campaignPause = (e) => {
    e.preventDefault();
    this.props.CampaignSaveAction(
      false,
      this.props.history.location.state && this.props.history.location.state.id
    );
  };
  render() {
    const { sendData } = this.props;
    return (
      <>
        <PageHeader
          current="New Campaign"
          parent="Campaign"
          showStatus={true}
        />

        <PageContainer title="New Campaign">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <CampaignsHeader active="SEND" />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 className="text-center my-4">
                  Are you ready to start your campaign?
                </h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Button className="startBtn mx-auto" onClick={this.campaignStart}>
                START CAMPAIGN
              </Button>
            </Row>
            <Row className="mt-3">
              <Button className="btn mx-auto" onClick={this.campaignPause}>
                Pause Campaign
              </Button>
            </Row>
            <Row
              className="mt-5 mb-4 w-50 mx-auto"
              style={{ borderBottom: "1px solid #ddd" }}
            ></Row>
            <Row>
              <Col
                md={6}
                className="mx-auto"
                style={{
                  background: "white",
                  boxShadow:
                    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                }}
              >
                <div style={{ margin: "17px 0px 24px 24px" }}>
                  <div className="dv1">
                    <Row>
                      <h1>From address</h1>
                    </Row>
                    <Row
                      style={{ color: "navy", fontWeight: "bold" }}
                      className="mt-2"
                    >
                      Sending account
                    </Row>
                    <Row>{sendData && sendData.from_address}</Row>
                    <Row
                      className="mt-3"
                      style={{ color: "navy", fontWeight: "bold" }}
                    >
                      Full Name
                    </Row>
                    <Row>{sendData && sendData.full_name}</Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col
                md={6}
                className="mx-auto"
                style={{
                  background: "white",
                  boxShadow:
                    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                }}
              >
                <div style={{ margin: "17px 0px 24px 24px" }}>
                  <div className="dv1">
                    <Row>
                      <h1>Recipients</h1>
                    </Row>
                    <Row className="mt-5" style={{ fontSize: 12 }}>
                      1 recipient will be sent this campaign immediately
                    </Row>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.recipients.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5 mb-5">
              <Col
                md={6}
                className="mx-auto"
                style={{
                  background: "white",
                  boxShadow:
                    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                }}
              >
                <div style={{ margin: "17px 0px 24px 24px" }}>
                  <div className="dv1">
                    <Row>
                      <h1>Messages</h1>
                    </Row>
                    <Row className="mt-3" style={{ fontSize: "12px" }}>
                      Initial campaign email
                    </Row>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.campEamil.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                    <Row className="mt-3" style={{ fontSize: "12px" }}>
                      Follow-up campaign email
                    </Row>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.follow_up.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                    <Row className="mt-3" style={{ fontSize: "12px" }}>
                      Drip campaign email
                    </Row>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.drip.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                    <Row className="mt-3" style={{ fontSize: "12px" }}>
                      OnLinkClick campaign email
                    </Row>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.onLinkClick.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(
    "sendData",
    state.CampaignCreateReducer && state.CampaignCreateReducer.sendData
  );
  return {
    sendData:
      state.CampaignCreateReducer && state.CampaignCreateReducer.sendData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  CampaignCreateAction: (CampId) => {
    dispatch(CampaignCreateAction(CampId));
  },
  CampaignSaveAction: (saveData, CampId) => {
    dispatch(CampaignSaveAction(saveData, CampId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignSend);
