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
      csvFields: null,
      csvMappingContent: {
        title: [],
        data: [],
      }
    };
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
      csv_fields: this.state.csvFields
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
    const fields = Object.keys(firstRow || {}).filter(key => !!key).map((key) => {
      if (
        key &&
        (key.toLowerCase().indexOf("name") > -1 || key.toLowerCase().indexOf("email") > -1)
      ) {
        tableHeaders.push({
          key: key,
          value: key,
        });
      }
      return key;
    });

    if (fields.indexOf("email") == -1 && fields.indexOf("Email") == -1) {
      showNotification("warning", "Invalid CSV uploading", "CSV file should contain 'email' column.");
      return;
    }

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
      csvFields: fields.join(',')
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
