import React, { Component } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Input,
  Form,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { CSVReader } from 'react-papaparse';
import Tables from "../../../../../components/Tables";
import { showNotification } from "../../../../../utils/Utils";

const initialState = {
  show: false,
  csvFile: null,
  first_row: null,
  csvFields: null,
  csvMappingContent: {
    title: [],
    data: [],
  }
};

export class ImportContactsModal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    // if (this.props.data != prevProps.data) {
    //   if (this.props.data) {
    //     this.setState({ ...this.props.data });
    //   } else {
    //     this.setState({ ...initialState });
    //   }
    // }
  }

  handleSubmit = () => {
    this.props.close();
    showNotification("warning", "Coming soon...", "This feature will be implemented in the future version");
  }

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

  render() {
    const { show, csvMappingContent } = this.state;

    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.props.close} size="lg">
          <Form onSubmit={this.handleSubmit}>
            <Card className="no-shadow">
              <CardHeader className="pb-0">
                <h2>Import Contacts</h2>
              </CardHeader>
              <CardBody className="pt-0 pb-0">
                <Row className="mt-3">
                  <Col>
                    <FormGroup className="mb-2">
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
                    </FormGroup>
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
                <Row className="mt-4">
                  <Col md={2}>
                    <Button type="button" onClick={this.handleSubmit} color="danger" block>
                      OK
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button type="button" onClick={this.props.close}>
                      CANCEL
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Modal>
      </>
    );
  }
}

export default ImportContactsModal;
