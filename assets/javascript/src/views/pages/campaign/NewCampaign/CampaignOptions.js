// file for option pick in campaign
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Nav,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { CampaignOptionAction } from "../../../../redux/action/CampaignAction";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CampaignsHeader from "./components/CampaignsHeader";

class CampaignOptions extends Component {
  constructor() {
    super();
    this.state = {
      trackopen: true,
      tracklinkclicks: true,
      schedulesend: false,
      termsandlaws: false,
      date: "",
      time: "",
      show: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: !event.target.defaultChecked,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  handleDate = (event) => {
    this.setState(
      {
        date: event.target.value,
      },
      () => {
        console.log(this.state.date, "date");
      }
    );
  };
  handleTime = (event) => {
    this.setState(
      {
        time: event.target.value,
      },
      () => {
        console.log(this.state.time, "time");
      }
    );
  };
  handleSubmit = (event) => {
    console.log("option.js");
    event.preventDefault();
    console.log(this.state);
    const optionData = {
      campaign:
        this.props.history.location.state &&
        this.props.history.location.state.id,
      track_Opens: this.state.trackopen,
      track_LinkClick: this.state.tracklinkclicks,
      schedule_send: this.state.schedulesend,
      schedule_date: this.state.date,
      schedule_time: `${this.state.time}${":00"}`,
      terms_and_laws: this.state.termsandlaws,
    };
    this.props.CampaignOptionAction(optionData);
  };
  render() {
    return (
      <>
        <PageHeader
          current="New Campaign"
          parent="Campaign"
          showStatus={false}
        />

        <PageContainer title="New Campaign">
          <Row>
            <Col md={8} className="mx-auto">
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col>
                    <CampaignsHeader color="secondary" activeItem="OPTIONS" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2 className="text-center my-4">
                      Tweak how your campaign will be sent
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col md={8} className="mx-auto">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        className="custom-control-input"
                        id="1"
                        type="checkbox"
                        value={this.state.trackopen}
                        name="trackopen"
                        onChange={this.handleChange}
                      />
                      <label className="custom-control-label" htmlFor="1">
                        Track opens
                      </label>
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        className="custom-control-input"
                        id="4"
                        type="checkbox"
                        value={this.state.schedulesend}
                        name="schedulesend"
                        onChange={this.handleChange}
                        required
                      />
                      <label className="custom-control-label" htmlFor="4">
                        I'll obey pertinent laws and I've read the
                        <a href="www.google.com"> important notes.</a>
                      </label>
                    </div>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col className="d-flex align-items-center justify-content-center">
                    <Link
                      to={{
                        pathname: "/app/admin/CampaignSend",
                        state: {
                          id:
                            this.props.history.location.state &&
                            this.props.history.location.state.id,
                        },
                      }}
                    >
                      <Button color="danger" type="button" type="submit">
                        NEXT{" "}
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // startCampaignId: state.StartCampaignReducer.startCampaignData && state.StartCampaignReducer.startCampaignData.id
  };
};
const mapDispatchToProps = (dispatch) => ({
  CampaignOptionAction: (optionData) => {
    dispatch(CampaignOptionAction(optionData));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignOptions);
