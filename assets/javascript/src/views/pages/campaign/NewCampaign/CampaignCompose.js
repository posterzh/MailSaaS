import React, { Component } from "react";
import {
  Container,
  Row,
  Button,
  Input,
  Col,
  Form,
  Nav,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import FollowUpPage from "./components/FollowUpPage";
import Drips from "./components/Drips";
import LinkClicksPage from "./components/LinkClicksPage";
import { connect } from "react-redux";
import { CampaignComposeAction } from "../../../../redux/action/CampaignAction";
import ReactQuill from "react-quill";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CampaignsHeader from "./components/CampaignsHeader";

class CampaignCompose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      email_body: "",
      inputListFollow: [],
      inputListDrips: [],
      dataObj: {},
      arra: [],
      followUpData: [],
      dripData: [],
      onClickData: [],
      dripPageObject: {},
      normalData: {},
      isOpen: false,
    };
    this.counter = 0;
  }

  handleSubject = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    Object.assign(this.state.normalData, { subject: e.target.value });
  };

  onAddBtnClickFollow = () => {
    const inputListFollow = this.state.inputListFollow;
    this.counter = this.counter + 1;
    this.state.counter === 0
      ? null
      : this.state.followUpData.push(this.state.dataObj);
    this.setState({
      dataObj: {},
      inputListFollow: inputListFollow.concat(
        <FollowUpPage
          onDeleteList={this.onDeleteList}
          msgBody={this.state.msgBody}
          followUpPageObject={this.state.dataObj}
          normalSubject={this.state.subject}
          id={this.counter}
        />
      ),
    });
  };
  onAddBtnClickDrips = () => {
    const inputListDrips = this.state.inputListDrips;
    this.counter = this.counter + 1;
    this.state.counter === 0
      ? null
      : this.state.dripData.push(this.state.dataObj);
    this.setState({
      dataObj: {},
      inputListDrips: inputListDrips.concat(
        <Drips
          dripPageObject={this.state.dataObj}
          key={this.counter}
          onDeleteList={this.onDeleteList}
        />
      ),
    });
  };

  onChange = (e) => {
    this.setState({ msgBody: e.blocks[0].text });
  };

  handleEmailBody = (value) => {
    this.setState({
      email_body: value,
      isOpen: false,
    });
    Object.assign(this.state.normalData, { email_body: value });
  };

  onDeleteList = (e) => {
    var array = [...this.state.inputListFollow];
    let index = e - 1;
    let a = this.state.inputListFollow.keys();
    console.log(e, "onDeleteList()");
    //     const newList = array.filter((item,i) => i !== index);
    //     this.setState({
    //         inputListFollow:newList
    //     })
    //    this.counter=0
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email_body === "") {
      this.setState({
        isOpen: true,
      });
    } else {
      Object.assign(this.state.normalData, {
        campaign:
          this.props.history.location.state &&
          this.props.history.location.state.id,
      });
      let data = {
        normal: this.state.normalData,
        follow_up: this.state.followUpData,
        drips: this.state.dripData,
      };
      this.props.CampaignComposeAction(data);
    }
  };

  render() {
    const { inputListFollow } = this.state;

    console.log(inputListFollow, "compose");
    return (
      <>
        <PageHeader
          current="New Campaign"
          parent="Campaign"
          showStatus={true}
        />

        <PageContainer title="New Campaign">
          <Row>
            <Col md={8} className="mx-auto">
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col>
                    <CampaignsHeader color="secondary" activeItem="COMPOSE" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h1 className="text-center my-4">
                      Compose the emails in this campaign
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input
                      type="text"
                      className="in"
                      name="subject"
                      value={this.state.subject}
                      onChange={this.handleSubject}
                      placeholder="Subject"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ReactQuill
                      value={this.state.email_body}
                      onChange={this.handleEmailBody}
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

                <Row className="mt-5">
                  <Col>{this.state.inputListFollow}</Col>
                </Row>

                <Row>
                  <Col className="mt-3">
                    <Button
                      color="default"
                      outline
                      type="button"
                      block
                      onClick={this.onAddBtnClickFollow}
                    >
                      <i className="fa fa-plus"></i> &nbsp;ADD FOLLOW-UP
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col>{this.state.inputListDrips}</Col>
                </Row>

                <Row>
                  <Col className="mt-3">
                    <Button
                      color="default"
                      outline
                      type="button"
                      block
                      onClick={this.onAddBtnClickDrips}
                    >
                      <i className="fa fa-plus"></i> &nbsp;ADD DRIP
                    </Button>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col className="d-flex align-items-center justify-content-center">
                    <Button color="danger" type="button" type="submit">
                      NEXT{" "}
                      <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </Button>
                    {/* <Link
                      to={{
                        pathname: "/app/admin/CampaignPreview",
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
                    </Link> */}
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
    // campaign: state.StartCampaignReducer.startCampaignData && state.StartCampaignReducer.startCampaignData.id,
    // mailGetData: state.MailGetDataReducer.mailGetData
  };
};
const mapDispatchToProps = (dispatch) => ({
  CampaignComposeAction: (data) => dispatch(CampaignComposeAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignCompose);
