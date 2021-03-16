import React, { Component } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  Input,
  Alert,
} from "reactstrap";
import regeneratorRuntime from "regenerator-runtime";

class UnsubscribesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: undefined
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // this.setState({show:!this.state.show})
  }

  onSubmit = (e) => {
    const emails = this.state.emails || '';
    const emailList = emails.split(',');
    this.props.unsubscribeEmail(emailList);
    this.props.close();
  }

  onUpload = async (e) => {
    e.preventDefault();
    
  }

  render() {
    const { loading } = this.props;

    return (
      <Modal isOpen={this.props.isOpen} size="lg">
        <Container className="p-3">
          <ModalBody>
            <h1>Unsubscribe email addresses</h1>
            <Alert className="mb-5 mt-3" color="default">
              <strong>TIP:</strong> Block a whole domain like this:{" "}
              <code>*@example.com</code>
            </Alert>
            <Form>
              <Row>
                <Col
                  md="5"
                  sm="12"
                  className="d-flex flex-column justify-content-between"
                >
                  <Input
                    type="textarea"
                    name="emails"
                    onChange={this.handleChange}
                    placeholder="Email addresses"
                    required
                    rows={3}
                  />
                  <Button
                    type="button"
                    color="info"
                    className="align-self-end mt-2"
                    onClick={this.onSubmit}
                  >
                    Submit
                    </Button>
                </Col>
                <Col md="2" sm="12" className="text-center align-self-center">
                  <strong>or</strong>
                </Col>
                <Col
                  md="5"
                  sm="12"
                  className="d-flex flex-column justify-content-between"
                >
                  <p>
                    Upload a CSV (comma-separated-values) file up to 1MB. It
                    should cont+ain just one column or have a column with the
                    word "email" in it.
                    </p>
                  <Input
                    id="csvFile"
                    type="file"
                    name="csvFile"
                    onChange={this.onUpload}
                    hidden
                  />
                  <label
                    htmlFor="csvFile"
                    className="btn btn-info align-self-end m-0 mt-2"
                  >
                    Upload
                    </label>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                this.props.close();
              }}
            >
              CANCEL
            </Button>
          </ModalFooter>
        </Container>
      </Modal>
    );
  }
}
export default UnsubscribesModal;
