import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Nav,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { Link, Route } from "react-router-dom";

import { StartCampaignAction } from "../../../../redux/action/CampaignAction";
import { MailGetDataAction } from "../../../../redux/action/MailSenderAction";
import NewCampaignHeader from "./components/CampaignsHeader";

import AdminNavbar from "../../../../components/Navbars/AdminNavbar";
import CardsHeader from "../../../../components/Headers/CardsHeader";
import CampaignsHeader from "./components/CampaignsHeader";

class CampaignStart extends React.Component {
  constructor(props) {
    super(props);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var now = new Date();
    var thisMonth = months[now.getMonth()];
    const date = thisMonth + " " + now.getDate() + " Outreach";
    this.state = {
      title: date,
      from_address: "",
      mailsExist: null,
    };
  }
  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    this.props.MailGetDataAction();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      from_address: this.state.from_address,
    };
    this.props.StartCampaignAction(data);
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.mailGetData &&
      props.mailGetData[0] &&
      props.mailGetData[0].id &&
      !state.mailsExist
    ) {
      console.log("Call");
      return {
        from_address: props.mailGetData && props.mailGetData[0].id,
        mailsExist: true,
      };
    }
    if (props.mailGetData && !props.mailGetData.length) {
      alert("Please go to create mail account");
      return {
        mailsExist: false,
      };
    }
    return null;
  }

  // componentWillReceiveProps(preProps, nextProps) {
  //   console.log({
  //     preProps,
  //     nextProps,
  //   });
  // }
  render() {
    const { mailGetData } = this.props;
    console.log("from_address", this.state.from_address);
    const { mailsExist } = this.state;
    return (
      <>
        <AdminNavbar />
        <CardsHeader name="New Campaign" parentName="Campaign" />

        <Container fluid className="mt--5">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h2 className="mx-auto mb-0 text-center display-2">
                    New Campaign
                  </h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={8} className="mx-auto">
                      <Form onSubmit={this.handleSubmit}>
                        <Row>
                          <Col>
                            <CampaignsHeader active="START" />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h1 className="text-center my-4">
                              Let's get started
                            </h1>
                          </Col>
                        </Row>
                        <Row>
                          <div style={{ width: "100%" }}>
                            {" "}
                            <label>Title (for your team's eyes only)</label>
                            <br></br>
                            <input
                              type="text"
                              name="title"
                              value={this.state.title}
                              onChange={this.handleChange}
                              className="start_input"
                              autoComplete="off"
                              placeholder={this.state.date}
                              required
                            ></input>
                          </div>
                        </Row>
                        <Row>
                          <div style={{ width: "100%" }}>
                            <label>From Address</label>
                            <br></br>
                            <Input
                              required
                              type="select"
                              name="from_address"
                              value={this.state.from_address}
                              onChange={this.handleChange}
                              id="exampleSelect"
                            >
                              <option value={""}>Select</option>
                              {mailGetData &&
                                mailGetData.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.email}
                                    </option>
                                  );
                                })}
                            </Input>
                          </div>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              color="primary"
                              type="button"
                              type="submit"
                              disabled={!mailsExist}
                              className="my-3"
                            >
                              NEXT&nbsp;
                              <i
                                className="fa fa-arrow-right"
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("------------------------->",state.MailGetDataReducer.mailGetData&&state.MailGetDataReducer.mailGetData.map((e,i)=> e.email[0].id))
  return {
    mailGetData:
      state.MailGetDataReducer.mailGetData &&
      state.MailGetDataReducer.mailGetData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  StartCampaignAction: (data) => {
    dispatch(StartCampaignAction(data));
  },
  MailGetDataAction: (mailGetData) => {
    dispatch(MailGetDataAction(mailGetData));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignStart);
