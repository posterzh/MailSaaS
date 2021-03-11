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

class ThePreview extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };
  componentDidMount() {}

  onPrev = () => {
    // some validation

    // call parent method
    this.props.onPrev();
  };

  onNext = () => {
    // some validation

    // call parent method
    this.props.onNext();
  };

  render() {
    const { onPrev, onNext } = this.props;
    const { editorState } = this.state;
    console.log(editorState, "preview");
    return (
      <>
        <Row>
          <Col>
            <h2 className="text-center my-4">
              Preview and personalize each email
            </h2>
          </Col>
        </Row>

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
                          this.props.CampaignFollowUp.map((item, index) => {
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
                                      Follow-ups are stopped when a recipient
                                      becomes a lead.{" "}
                                      <a href="">
                                        Learn how to customize Lead Catcher.
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
                                      Unlike follow-ups, drips keep sending even
                                      after a recipient becomes a lead.
                                      <a href="">
                                        Learn how to customize Lead Catcher.
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
                                      counts days from your initial message.
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
                          this.props.CampaignOnClick.map((item, index) => {
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
                                      These emails are sent when a recipient
                                      clicks a link in one of your sent
                                      messages.
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
                    </Col>
                  </div>
                );
              })}
          </Row>
        </Container>

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
const mapStateToProps = (state) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(ThePreview);
