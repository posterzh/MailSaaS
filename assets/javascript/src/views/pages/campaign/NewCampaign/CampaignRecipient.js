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
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import Dropzone from "dropzone";
import { CSVReader } from 'react-papaparse';
import { Link } from "react-router-dom";
import {
  RecipientAction,
  StartCampaignAction,
} from "../../../../redux/action/CampaignAction";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CampaignsHeader from "./components/CampaignsHeader";

Dropzone.autoDiscover = false;

class CampaignRecipient extends Component {
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

  componentDidMount() {
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light

    // let currentMultipleFile = undefined;
    // new Dropzone(document.getElementById("dropzone-multiple"), {
    //   url: "https://",
    //   dictDefaultMessage: "Drop a CSV file here (or choose one)",
    //   thumbnailWidth: null,
    //   thumbnailHeight: null,
    //   previewsContainer: document.getElementsByClassName(
    //     "dz-preview-multiple"
    //   )[0],
    //   previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
    //     .innerHTML,
    //   maxFiles: 1,
    //   acceptedFiles: ".csv",
    //   init: function () {
    //     this.on("addedfile", function (file) {
    //       if (currentMultipleFile) {
    //         this.removeFile(currentMultipleFile);
    //       }
    //       currentMultipleFile = file;
    //       console.log(file);
    //     });
    //   },
    // });
    // document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
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

  handleOnDrop = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  }

  render() {
    const { show } = this.state;
    console.log(this.props.location, this.props.campaignDetails, "recipient");
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
                    <CampaignsHeader color="secondary" activeItem="RECIPIENT" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2 className="text-center my-4">
                      Drop in your first list of recipients
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        <CSVReader
                          onDrop={this.handleOnDrop}
                          onError={this.handleOnError}
                          addRemoveButton
                          onRemoveFile={this.handleOnRemoveFile}
                          style={{
                            dropFile: {
                              width: 300,
                              height: 100,
                              background: '#e0e0e0',
                            }
                          }}
                        >
                          <span>Drop CSV file here or click to upload.</span>
                        </CSVReader>
                        <Row>
                          <Col>
                            <h3 className="text-left mt-4">Map CSV Columns</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} className="mx-auto ">
                            <Card>
                              <h4 className="text-center my-3">Special Columns</h4>
                              <div className="custom-control custom-checkbox mb-3">
                                <input
                                  className="custom-control-input"
                                  id="1"
                                  type="checkbox"
                                  name="trackopen"
                                  onChange={this.handleChange}
                                />
                                <label className="custom-control-label" htmlFor="1">
                                  Email
                                </label>
                              </div>

                              <div className="custom-control custom-checkbox mb-3">
                                <input
                                  className="custom-control-input"
                                  id="4"
                                  type="checkbox"
                                  name="schedulesend"
                                  onChange={this.handleChange}
                                  required
                                />
                                <label className="custom-control-label" htmlFor="4">
                                  Full Name
                                </label>
                              </div>
                            </Card>
                          </Col>
                          <Col md={5} className="mx-auto">
                            <h4 className="text-center my-3">Text Replacement Columns</h4>
                            <Card>
                              <div className="custom-control custom-checkbox mb-3">
                                <input
                                  className="custom-control-input"
                                  id="1"
                                  type="checkbox"
                                  name="trackopen"
                                  onChange={this.handleChange}
                                />
                                <label className="custom-control-label" htmlFor="1">
                                  Email
                                </label>
                              </div>

                              <div className="custom-control custom-checkbox mb-3">
                                <input
                                  className="custom-control-input"
                                  id="4"
                                  type="checkbox"
                                  name="schedulesend"
                                  onChange={this.handleChange}
                                  required
                                />
                                <label className="custom-control-label" htmlFor="4">
                                  Full Name
                                </label>
                              </div>
                            </Card>
                          </Col>
                        </Row>
                        
                        {/* <div
                          className="dropzone dropzone-multiple"
                          id="dropzone-multiple"
                        >
                          <div className="fallback">
                            <div className="custom-file">
                              <input
                                className="custom-file-input"
                                id="customFileUploadMultiple"
                                multiple="multiple"
                                type="file"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFileUploadMultiple"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                          <ListGroup
                            className=" dz-preview dz-preview-multiple list-group-lg"
                            flush
                          >
                            <ListGroupItem className=" px-0">
                              <Row className=" align-items-center">
                                <Col className=" col-auto">
                                  <div className=" avatar">
                                    <img
                                      alt=""
                                      className=" avatar-img rounded"
                                      data-dz-thumbnail
                                      src="/static/images/img/csv_icon.jpg"
                                    />
                                  </div>
                                </Col>
                                <div className=" col ml--3">
                                  <h4 className=" mb-1" data-dz-name></h4>
                                  <p
                                    className=" small text-muted mb-0"
                                    data-dz-size
                                  ></p>
                                </div>
                                <Col className=" col-auto">
                                  <Button
                                    size="sm"
                                    color="danger"
                                    data-dz-remove
                                  >
                                    <i className="fas fa-trash" />
                                  </Button>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          </ListGroup>
                        </div> */}
                      </CardBody>
                    </Card>
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
                        pathname: "/app/admin/CampaignCompose",
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
    campaignDetails: state.StartCampaignReducer.startCampaignData.id,
    mailGetData: state.MailGetDataReducer.mailGetData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  RecipientAction: (recipientData) => {
    dispatch(RecipientAction(recipientData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignRecipient);
