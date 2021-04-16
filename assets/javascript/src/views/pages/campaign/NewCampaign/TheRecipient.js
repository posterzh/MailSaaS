import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Modal
} from "reactstrap";
import Dropzone from "dropzone";
import { CSVReader } from "react-papaparse";
import Tables from "../../../../components/Tables";
import { showNotification } from "../../../../utils/Utils";
import { campaignRecipient } from "../../../../redux/action/CampaignActions";
import { toggleTopLoader, toastOnError, toastOnSuccess } from '../../../../utils/Utils';
import axios from '../../../../utils/axios';

Dropzone.autoDiscover = false;

class TheRecipient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      csvFile: null,
      tmpFile: null,
      first_row: null,
      csvFields: null,
      csvMappingContent: {
        title: [],
        data: [],
      },
      duplicates: {
        title: [],
        data: []
      },
      isOpen: false
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

    // if (!e) return;
    // const formData = new FormData();
    // formData.append('csvfile', payload.csvfile);
    // toggleTopLoader(true);
    // axios
    //   .post("/campaign/check-recipients", formData)
    //   .then((response) => {
    //     if (response.success) {
    //       if (response.result.length > 0) {
    //         this.setState({isOpen: true});
    //       } else {
    //         this.props.campaignRecipient(recipientData);
    //         this.props.onNext();
    //       }
    //     } else {

    //     }
    //     history.push("/app/admin/campaign/list");
    //   })
    //   .catch((error) => {
    //     toastOnError(error);
    //   })
    //   .finally(() => {
    //     toggleTopLoader(false);
    //   });    
  };

  handleOnDrop = async (data, file) => {
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
        (key.toLowerCase().indexOf("name") > -1 || 
          key.toLowerCase().indexOf("first") > -1 || 
          key.toLowerCase().indexOf("last") > -1 || 
          key.toLowerCase().indexOf("mail") > -1
        )
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

    const duplication = await this.checkDuplication(file);
    if (duplication && duplication.length > 0) {
      this.setState({
        duplicates: {
          title: [{key: 'email', value: 'email'}],
          data: duplication
        },
        isOpen: true,
        tmpFile: file,
        csvFile: null
      });
    } else {
      this.setState({
        tmpFile: file,
        csvFile: file
      });
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
      },
      duplicates: {
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
      isOpen: false
    });
  };

  setCSVFile = () => {
    const f = this.state.tmpFile;
    this.setState({
      csvFile: f,
      isOpen: false
    });
  }

  onPrev = () => {
    // call parent method
    this.props.onPrev();
  };

  checkDuplication = (csvfile) => {
    const formData = new FormData();
    formData.append('csvfile', csvfile);
    toggleTopLoader(true);
    return axios
      .post("/campaign/check-recipients", formData)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          return data.result;
        } else {
          return false;
        }
      })
      .catch((error) => {
        toastOnError({'error': error});
      })
      .finally(() => {
        toggleTopLoader(false);
      });   
  }

  render() {
    const { onPrev, onNext } = this.props;
    const { show, csvMappingContent, duplicates } = this.state;

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
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.isOpen}
          toggle={this.state.close}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Duplicated Recipients
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.state.close}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {duplicates.title.length > 0 &&
              duplicates.data.length > 0 && (
                <Tables
                  titles={duplicates.title} // required
                  tablePropsData={duplicates.data} // required
                />
              )}
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={this.handleOnRemoveFile}
            >
              Cancel
            </Button>
            <Button color="danger" type="button" onClick={this.setCSVFile}>
              Continue
            </Button>
          </div>
        </Modal>
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
