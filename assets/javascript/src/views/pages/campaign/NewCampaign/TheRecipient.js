import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import Dropzone from "dropzone";
import { CSVReader } from "react-papaparse";
// import {
//   RecipientAction,
//   StartCampaignAction,
// } from "../../../../redux/action/CampaignAction";

import Tables from "../../../../components/Tables";
import { showNotification } from "../../../../utils/Utils";
import { campaignRecipient } from "../../../../redux/action/CampaignActions";

Dropzone.autoDiscover = false;

class TheRecipient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      csvFile: null,
      first_row: null,
      csvMappingContent: {
        title: [],
        data: [],
      }
    };
  }

  componentDidMount() {
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light
    // let currentMultipleFile = undefined;
    // new Dropzone(document.getElementById("dropzone-multiple"), {
    //   autoProcessQueue: false,
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
    //     });
    //   },
    // });
    // document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.csvFile) {
      showNotification("danger", "Not uploaded CSV", "");
      return false;
    }
    const recipientData = {
      csvfile: this.state.csvFile,
      first_row: this.state.first_row,
    };
    this.props.campaignRecipient(recipientData);
    this.props.onNext();
  };

  handleOnDrop = (data, file) => {
    if (!data || data.length == 0) {
      this.setState({
        csvFile: null,
        show: true,
        first_row: null
      });
      return;
    }

    const firstRow = data[0].data;
    const tableHeaders = [];
    const tableBody = [];
    Object.keys(firstRow).forEach((key) => {
      if (
        key &&
        (key.toLowerCase().indexOf("name") > -1 ||
          key.toLowerCase().indexOf("email") > -1)
      ) {
        tableHeaders.push({
          key: key,
          value: key,
        });
      }
    });

    if (tableHeaders.length > 0) {
      data.forEach((row, index) => {
        if (index > 10) return;
        let obj = {};
        const rowData = row.data;
        tableHeaders.forEach((header) => {
          obj[header.key] = rowData[header.key];
        });
        tableBody.push(obj);
      });
    }

    this.setState({
      csvFile: file,
      csvMappingContent: {
        title: tableHeaders,
        data: tableBody,
      },
      first_row: firstRow,
      show: true,
    });
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
    this.setState({
      csvFile: null,
      show: true,
      csvMappingContent: {
        title: [],
        data: [],
      }
    });
  };

  handleOnRemoveFile = (data) => {
    this.setState({
      csvFile: null,
      show: false,
      csvMappingContent: {
        title: [],
        data: [],
      },
    });
  };

  onPrev = () => {
    // call parent method
    this.props.onPrev();
  };

  render() {
    const { onPrev, onNext } = this.props;
    const { show, csvMappingContent } = this.state;

    return (
      <>
        <Row>
          <Col>
            <h2 className="text-center my-4">
              Drop in your first list of recipients
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVReader
              onDrop={this.handleOnDrop}
              onError={this.handleOnError}
              addRemoveButton
              onRemoveFile={this.handleOnRemoveFile}
              config={{
                header: true,
              }}
              style={{
                dropFile: {
                  width: 300,
                  height: 100,
                  background: "#eeeeee",
                },
              }}
            >
              <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
          </Col>
        </Row>
        {show && (
          <>
            <Row>
              <Col>
                <h3 className="text-left my-4">
                  Map CSV Special Columns
                </h3>
                <span>(top 10 rows and special columns)</span>
              </Col>
            </Row>
            <Row>
              {csvMappingContent.title.length > 0 &&
              csvMappingContent.data.length > 0 ? (
                <Tables
                  titles={csvMappingContent.title} // required
                  tablePropsData={csvMappingContent.data} // required
                />
              ) : (
                <Col>
                  <h4 className="text-center text-warning">
                    Invalid CSV File!
                  </h4>
                </Col>
              )}
            </Row>
          </>
        )}
        {/* <Form onSubmit={this.handleSubmit} 
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
        </Form> */}
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
              <Button color="danger" type="button" onClick={this.handleSubmit}>
                NEXT <i className="fa fa-arrow-right" aria-hidden="true"></i>
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
});

export default connect(mapStateToProps, { campaignRecipient })(
  TheRecipient
);
