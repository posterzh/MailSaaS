import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Nav,
  Form,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

import {
  RecipientAction,
  StartCampaignAction,
} from "../../../../redux/action/CampaignAction";
import Csvfile from "./components/csvfile";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CampaignsHeader from "./components/CampaignsHeader";

class CampaignRecipients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      csvFile: "",
      email: [],
      options: [],
      campaign:
        this.props.history.location.state &&
        this.props.history.location.state.id,
    };
  }
  handleChange = (e) => {
    this.setState({
      csvFile: e.target.files[0],
      show: true,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.state.options.length = 0;
    if (!this.state.email && !this.state.csvFile) {
      alert("Fill option 1 or 2");
      return false;
    } else if (this.state.csvFile && !this.state.email) {
      let temp = 1;
      this.state.options.push(temp);
    } else if (this.state.email && !this.state.csvFile) {
      let temp = 2;
      this.state.options.push(temp);
    } else if (this.state.csvFile && this.state.email) {
      let temp1 = 1;
      let temp2 = 2;
      this.state.options.push(temp1, temp2);
    } else {
      return false;
    }
    const recipientData = {
      csvfile_op1: this.state.csvFile,
      option: `[${this.state.options}]`,
      email: `["${this.state.email}"]`,
      campaign: this.state.campaign,
    };
    console.log(this.state.csvFile, "file");
    this.props.RecipientAction(recipientData);
  };

  render() {
    const { show } = this.state;
    console.log(this.props.location, this.props.campaignDetails, "recipient");
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
                <CampaignsHeader active="RECIPIENT" />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 className="text-center my-4">
                  Drop in your first list of recipients
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>OPTION #1</span>
              </Col>
              <Col md={8}>
                <span className="csv_logo">
                  <i className="fa fa-file" aria-hidden="true"></i>
                </span>
                <span className="csv_logo_text">Drop a CSV file here</span>
                <div className="choose_option">
                  <Input
                    type="file"
                    name="csvFile"
                    value={this.state.value}
                    onChange={this.handleChange}
                  ></Input>
                </div>
                <Row>
                  <span>
                    Campaigns are limited to 5k recipients; uploads to 1MB.
                  </span>
                </Row>
              </Col>
            </Row>
            <Row className="my-4">
              <Col md={4}>
                <span>OPTION #2</span>
              </Col>
              <Col md={8}>
                <span className="textarea">
                  <textarea
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => {
                      this.setState({
                        show: true,
                        email: e.target.value,
                      });
                    }}
                    placeholder="type here"
                  ></textarea>
                  {show && <Button className="btn startBtn">IMPORT</Button>}
                </span>
              </Col>
            </Row>
          </Form>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    campaignDetails: state.StartCampaignReducer.startCampaignData.id,
    mailGetData: state.MailGetDataReducer.mailGetData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  RecipientAction: (recipientData) => {
    dispatch(RecipientAction(recipientData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignRecipients);
