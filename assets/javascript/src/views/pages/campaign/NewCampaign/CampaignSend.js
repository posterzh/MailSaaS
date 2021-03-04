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
  createCampaign = (e) => {
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
          showStatus={false}
        />

        <PageContainer title="New Campaign">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <CampaignsHeader color="secondary" activeItem="SEND" />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 className="text-center my-4">
                  Are you ready to create your campaign?
                </h2>
              </Col>
            </Row>

            <Row className="my-3">
              <Col md={2} className="d-flex flex-column mx-auto">
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

                <div className="my-2">
                  <Button
                    color="default"
                    type="button"
                    className="w-100"
                    onClick={this.campaignPause}
                  >
                    Pause Campaign
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={7} className="mx-auto">
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
                        <h4>{sendData && sendData.from_address}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <h4>Full name :</h4>
                      </Col>
                      <Col md={9}>
                        <h4>{sendData && sendData.full_name}</h4>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={7} className="mx-auto">
                <Card>
                  <CardHeader>
                    <h2 className="mb-0">Recipients</h2>
                  </CardHeader>
                  <CardBody>
                    <span>
                      1 recipient will be sent this campaign immediately
                    </span>
                    <Row>
                      <ul>
                        {sendData &&
                          sendData.recipients.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={7} className="mx-auto">
                <Card>
                  <CardHeader>
                    <h2 className="mb-0">Messages</h2>
                  </CardHeader>
                  <CardBody>
                    <span>Initial campaign email :</span>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.campEamil.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                    <span>Follow-up campaign email :</span>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.follow_up.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                    <span>Drip campaign email :</span>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.drip.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                    <span>OnLinkClick campaign email :</span>
                    <Row style={{ fontSize: 14 }}>
                      <ul>
                        {sendData &&
                          sendData.onLinkClick.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                      </ul>
                    </Row>
                  </CardBody>
                </Card>
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
