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

const initialState = {

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

  render() {
    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.props.close} size="lg">
          <Form onSubmit={this.handleSubmit}>
            <Card className="no-shadow">
              <CardHeader className="pb-0">
                <h2>Import Contacts</h2>
              </CardHeader>
              <CardBody className="pt-0 pb-0">
                <Row>
                  <Col>
                    <Row className="mt-3">
                      <Col>
                        <FormGroup className="mb-2">
                          <label className="form-control-label" htmlFor="email">
                            Option 1
                          </label>
                          <CSVReader
                            // onDrop={this.handleOnDrop}
                            // onError={this.handleOnError}
                            // addRemoveButton
                            // onRemoveFile={this.handleOnRemoveFile}
                            config={{
                              header: true
                            }}
                            style={{
                              dropFile: {
                                width: 300,
                                height: 100,
                                background: '#eeeeee',
                              }
                            }}
                          >
                            <span>Drop CSV file here or click to upload.</span>
                          </CSVReader>
                        </FormGroup>

                        <FormGroup className="mb-2">
                          <label
                            className="form-control-label"
                            htmlFor="first_name"
                          >
                            Option 2
                          </label>
                          <Input
                            type="textarea"
                            className="form-control-sm"
                          />
                        </FormGroup>

                        <FormGroup className="mb-2">
                          <label
                            className="form-control-label"
                            htmlFor="last_name"
                          >
                            Option 3
                          </label>
                          <Button type="button" color="primary" block>
                            Import from app
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={2}>
                    <Button type="submit" color="danger" block>
                      Ok
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
