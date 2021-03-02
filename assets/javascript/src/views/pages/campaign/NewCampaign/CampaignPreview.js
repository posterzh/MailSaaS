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
import { connect } from "react-redux";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CampaignsHeader from "./components/CampaignsHeader";

class CampaignPreview extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };
  componentDidMount() {
    console.log(
      this.props.history.location.state && this.props.history.location.state.id,
      "preview"
    );
    let id =
      this.props.history.location.state && this.props.history.location.state.id;
    this.props.PreviewCampaignAction(id);
  }
  render() {
    const { editorState } = this.state;
    const { CampaignEmail, CampaignFollowUp } = this.props;
    console.log(editorState, "preview");
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
                    <CampaignsHeader color="secondary" activeItem="PREVIEW" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h1 className="text-center my-4">
                      Preview and personalize each email
                    </h1>
                  </Col>
                </Row>

                <Row>
                  <Col md={8} className="mx-auto">
                    <div className="my-3">
                      <span className="mx-2 text-primary">
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span class="text-dark">You sound like a human</span>
                    </div>

                    <div className="my-3">
                      <span className="mx-2 text-primary">
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span class="text-dark">Your signature looks good</span>
                    </div>

                    <div className="my-3">
                      <span className="mx-2 text-primary">
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span class="text-dark">
                        Your call-to-action is clear
                      </span>
                    </div>

                    <div className="my-3">
                      <span className="mx-2 text-primary">
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span class="text-dark">
                        You‘ve sent a test email and checked it on your phone
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col className="d-flex align-items-center justify-content-center">
                    <Link
                      to={{
                        pathname: "/app/admin/CampaignOptions",
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

              <Container>
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

                    {/* <div style={{ backgroundColor: "#005aac", color: "white" }}>
                                    <ul>
                                        {
                                            console.log(this.props.CampaignPreviewEmails && this.props.CampaignPreviewEmails.map((e, i) => e.email)),
                                            console.log(this.props.CampaignPreviewEmails && this.props.CampaignPreviewEmails.map((e, i) => e.email_body))
                                        }
                                    </ul>
                                </div> */}
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  {this.props.CampaignPreviewEmails &&
                    this.props.CampaignPreviewEmails.map((item, index) => {
                      return (
                        <div>
                          <Col md={11} className="mx-auto">
                            <Row className="mt-3">
                              <div>
                                <i
                                  className="fa fa-envelope-o"
                                  aria-hidden="true"
                                ></i>
                                <label style={{ marginLeft: "5px" }}>
                                  Initial campaign email
                                </label>
                              </div>
                              <div className="grand_parent">
                                <div className="input_field">
                                  <Input
                                    type="email"
                                    className="in"
                                    placeholder="Subject"
                                    key={index}
                                    value={item.subject}
                                    onChange={() => {}}
                                  />
                                  <div className="mt-3">
                                    <a
                                      href=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        alert("msg");
                                      }}
                                    >
                                      <span>
                                        <i
                                          className="fa fa-question-circle-o"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </Row>
                            <Row className="mt-5 mb-5">
                              <div className="Editor_div">
                                <Editor
                                  className="editorDiv"
                                  readOnly
                                  // mention={{
                                  //     separator: ' ',
                                  //     trigger: '@',
                                  //     suggestions: [
                                  //         { text: 'APPLE', value: 'apple', url: 'apple' },
                                  //         { text: 'BANANA', value: 'banana', url: 'banana' },
                                  //         { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                                  //         { text: 'DURIAN', value: 'durian', url: 'durian' },
                                  //         { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                                  //         { text: 'FIG', value: 'fig', url: 'fig' },
                                  //         { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                                  //         { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                                  //     ],
                                  // }}
                                  placeholder={item.email_body}
                                  editorState={editorState}
                                  value={item.email_body}
                                  defaultContentState={"etertretertert"}
                                  currentState={item.email_body}
                                  toolbarClassName="rdw-storybook-toolbar"
                                  wrapperClassName="rdw-storybook-wrapper"
                                  editorClassName="rdw-storybook-editor"
                                  initialEditorState={editorState}
                                  onEditorStateChange={this.onEditorStateChange}
                                  toolbar={{
                                    link: {
                                      defaultTargetOption: "_blank",
                                    },
                                  }}
                                />
                              </div>
                            </Row>
                            <Row className="mb-3 ">
                              {this.props.CampaignFollowUp &&
                                this.props.CampaignFollowUp.map(
                                  (item, index) => {
                                    return (
                                      <div>
                                        <Col md={11} className="alignRight">
                                          <Row>
                                            <h1 className="display-6">
                                              Follow-ups &nbsp;
                                              <a
                                                href=""
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  alert("msg");
                                                }}
                                              >
                                                <span>
                                                  <i
                                                    className="QuestionCircle"
                                                    className="fa fa-question-circle-o"
                                                    aria-hidden="true"
                                                  ></i>
                                                </span>
                                              </a>
                                            </h1>
                                          </Row>
                                          <Row>
                                            <p style={{ fontSize: "14px" }}>
                                              Follow-ups are stopped when a
                                              recipient becomes a lead.{" "}
                                              <a href="">
                                                Learn how to customize Lead
                                                Catcher.
                                              </a>
                                            </p>
                                          </Row>
                                          <Row>
                                            <Col md={2} className="WaitDiv">
                                              <label className="filter_app_new">
                                                Wait X days
                                              </label>
                                              <br></br>
                                              <input
                                                value={item.waitDays}
                                                type="number"
                                                className="WaitInput"
                                              ></input>
                                            </Col>
                                          </Row>
                                          <Row className="mt-3 ">
                                            <label className="filter_app_new">
                                              Reply Chain
                                            </label>
                                            <br></br>
                                            <div className="select_div">
                                              <Input
                                                value={item.subject}
                                                type="text"
                                                className="in"
                                                name="subject"
                                                placeholder="Subject"
                                              />
                                            </div>
                                          </Row>
                                          <Row className="mt-3">
                                            <div className="Editor_div">
                                              <div
                                                style={{ padding: 0 }}
                                                className="btn"
                                              >
                                                <i
                                                  style={{ padding: 5 }}
                                                  className="fa"
                                                >
                                                  &#xf014;
                                                </i>
                                                DELETE
                                              </div>
                                              <Editor
                                                placeholder={item.email_body}
                                                className="editorDiv"
                                                onChange={this.handleChangeBody}
                                                editorState={editorState}
                                                toolbarClassName="rdw-storybook-toolbar"
                                                wrapperClassName="rdw-storybook-wrapper"
                                                editorClassName="rdw-storybook-editor"
                                                value={item.email_body}
                                                onEditorStateChange={
                                                  this.onEditorStateChange
                                                }
                                                toolbar={{
                                                  link: {
                                                    defaultTargetOption:
                                                      "_blank",
                                                  },
                                                }}
                                              />
                                            </div>
                                          </Row>
                                        </Col>
                                      </div>
                                    );
                                  }
                                )}
                            </Row>
                            {/* ============================================================================================================== */}
                            <Row>
                              {this.props.CampaignDrip &&
                                this.props.CampaignDrip.map((item, index) => {
                                  return (
                                    <div>
                                      <Col md={11} className="alignRight">
                                        <Row>
                                          <h1 className="display-6">
                                            Drips &nbsp;
                                            <a
                                              href=""
                                              onClick={(e) => {
                                                e.preventDefault();
                                                alert("msg");
                                              }}
                                            >
                                              <span>
                                                <i
                                                  className="QuestionCircle"
                                                  class="fa fa-question-circle-o"
                                                  aria-hidden="true"
                                                ></i>
                                              </span>
                                            </a>
                                          </h1>
                                        </Row>
                                        <Row>
                                          <p style={{ fontSize: "14px" }}>
                                            Unlike follow-ups, drips keep
                                            sending even after a recipient
                                            becomes a lead.
                                            <a href="">
                                              Learn how to customize Lead
                                              Catcher.
                                            </a>
                                          </p>
                                        </Row>
                                        <Row>
                                          <Col md={2} className="WaitDiv">
                                            <label className="filter_app_new">
                                              Wait X days
                                            </label>
                                            <br></br>
                                            <input
                                              key={index}
                                              value={item.waitDays}
                                              type="number"
                                              className="WaitInput"
                                            ></input>
                                          </Col>
                                        </Row>
                                        <Row>
                                          {" "}
                                          <p style={{ fontSize: "14px" }}>
                                            {" "}
                                            Drips don't wait on follow-ups. This
                                            counts days from your initial
                                            message.
                                          </p>
                                        </Row>
                                        <Row>
                                          <div className="grand_parent">
                                            <div className="input_field">
                                              <Input
                                                type="text"
                                                key={index}
                                                value={item.subject}
                                                className="in"
                                                placeholder="Subject"
                                                required
                                              />
                                              <div className="mt-3">
                                                <a
                                                  href=""
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    alert("msg");
                                                  }}
                                                >
                                                  <span>
                                                    <i
                                                      className="fa fa-question-circle-o"
                                                      aria-hidden="true"
                                                    ></i>
                                                  </span>
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </Row>
                                        <Row className="mt-3">
                                          <div className="Editor_div">
                                            <div
                                              style={{ padding: 0 }}
                                              className="btn"
                                              onClick={this.onDeleteList}
                                            >
                                              <i
                                                style={{ padding: 5 }}
                                                className="fa"
                                              >
                                                &#xf014;
                                              </i>
                                              DELETE
                                            </div>
                                            <Editor
                                              onChange={this.handleChangeBody}
                                              className="editorDiv"
                                              editorState={editorState}
                                              toolbarClassName="rdw-storybook-toolbar"
                                              wrapperClassName="rdw-storybook-wrapper"
                                              editorClassName="rdw-storybook-editor"
                                              value={item.email_body}
                                              onEditorStateChange={
                                                this.onEditorStateChange
                                              }
                                              toolbar={{
                                                link: {
                                                  defaultTargetOption: "_blank",
                                                },
                                              }}
                                            />
                                          </div>
                                        </Row>
                                      </Col>
                                    </div>
                                  );
                                })}
                            </Row>
                            {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                            <Row className="mb-3">
                              {this.props.CampaignOnClick &&
                                this.props.CampaignOnClick.map(
                                  (item, index) => {
                                    return (
                                      <div>
                                        <Col md={11} className="alignRight">
                                          <Row>
                                            <h1 className="display-6">
                                              On Link Clicks &nbsp;
                                              <a
                                                href=""
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  alert("msg");
                                                }}
                                              >
                                                <span>
                                                  <i
                                                    className="QuestionCircle"
                                                    class="fa fa-question-circle-o"
                                                    aria-hidden="true"
                                                  ></i>
                                                </span>
                                              </a>
                                            </h1>
                                          </Row>
                                          <Row>
                                            <p style={{ fontSize: "14px" }}>
                                              These emails are sent when a
                                              recipient clicks a link in one of
                                              your sent messages.
                                            </p>
                                          </Row>
                                          <Row>
                                            <Col md={4}>
                                              <label className="filter_app_new">
                                                Wait X days
                                              </label>
                                              <br></br>
                                              <input
                                                value={item.waitDays}
                                                type="number"
                                              ></input>
                                            </Col>
                                            <Col md={8}>
                                              <Input
                                                type="text"
                                                value={item.url}
                                                className="in mt-3"
                                                style={{
                                                  borderBottom: "1px solid",
                                                }}
                                                placeholder="Clicked link url must exactly match:"
                                                required
                                              />
                                            </Col>
                                          </Row>
                                          <Row className="mt-3">
                                            <div className="grand_parent">
                                              <div className="input_field">
                                                <Input
                                                  type="text"
                                                  onChange={this.handleSubject}
                                                  value={item.subject}
                                                  className="in"
                                                  placeholder="Subject"
                                                  required
                                                />
                                                <div className="mt-3">
                                                  <a
                                                    href=""
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      alert("msg");
                                                    }}
                                                  >
                                                    <span>
                                                      <i
                                                        className="fa fa-question-circle-o"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </span>
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </Row>
                                          <Row className="mt-3">
                                            <div className="Editor_div">
                                              <div
                                                style={{ padding: 0 }}
                                                className="btn"
                                                onClick={this.onDeleteList}
                                              >
                                                <i
                                                  style={{ padding: 5 }}
                                                  className="fa"
                                                >
                                                  &#xf014;
                                                </i>
                                                DELETE
                                              </div>
                                              <Editor
                                                value={this.state.body}
                                                onChange={this.handleChangeBody}
                                                className="editorDiv"
                                                editorState={editorState}
                                                toolbarClassName="rdw-storybook-toolbar"
                                                wrapperClassName="rdw-storybook-wrapper"
                                                editorClassName="rdw-storybook-editor"
                                                toolbar={item.email_body}
                                                onEditorStateChange={
                                                  this.onEditorStateChange
                                                }
                                                toolbar={{
                                                  link: {
                                                    defaultTargetOption:
                                                      "_blank",
                                                  },
                                                }}
                                              />
                                            </div>
                                          </Row>
                                        </Col>
                                      </div>
                                    );
                                  }
                                )}
                            </Row>
                          </Col>
                        </div>
                      );
                    })}
                </Row>
              </Container>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(
    "-----------------------------------))))))",
    state.CampaignPreviewGetReducer.CampaignPreviewData.follow_up
  );
  return {
    campaignId: state.StartCampaignReducer.startCampaignData.id,
    CampaignPreviewData: state.CampaignPreviewGetReducer.CampaignPreviewData,
    CampaignPreviewEmails:
      state.CampaignPreviewGetReducer.CampaignPreviewData &&
      state.CampaignPreviewGetReducer.CampaignPreviewData.campEmail,
    CampaignFollowUp:
      state.CampaignPreviewGetReducer.CampaignPreviewData &&
      state.CampaignPreviewGetReducer.CampaignPreviewData.follow_up,
    CampaignDrip:
      state.CampaignPreviewGetReducer.CampaignPreviewData &&
      state.CampaignPreviewGetReducer.CampaignPreviewData.drip,
    CampaignOnClick:
      state.CampaignPreviewGetReducer.CampaignPreviewData &&
      state.CampaignPreviewGetReducer.CampaignPreviewData.onLinkClick,
  };
};
const mapDispatchToProps = (dispatch) => ({
  PreviewCampaignAction: (recipientId) => {
    dispatch(PreviewCampaignAction(recipientId));
  },
  PreviewUpdateCampaignAction: (campaignPreviewUpdateData) => {
    dispatch(PreviewUpdateCampaignAction(campaignPreviewUpdateData));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignPreview);
