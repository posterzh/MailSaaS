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

class UnsubscribesModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      unsubscribeWithEmail,
      unsubscribeWithCsv,
      handleSubmit,
      loading,
    } = this.props;

    return (
      <Modal isOpen={this.props.isOpen} size="lg">
        <Container className="p-3">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <ModalBody>
              <h1>Unsubscribe email addresses</h1>
              <Alert className="mb-5 mt-3" color="default">
                <strong>TIP:</strong> Block a whole domain like this:{" "}
                <code>*@example.com</code>
              </Alert>
              <Form handleSubmit={handleSubmit}>
                <Row>
                  <Col
                    md="5"
                    sm="12"
                    className="d-flex flex-column justify-content-between"
                  >
                    <Input
                      type="textarea"
                      onChange={unsubscribeWithEmail}
                      placeholder="Email addresses"
                      required
                      rows={3}
                    />
                    <Button
                      type="button"
                      color="info"
                      className="align-self-end mt-2"
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
                      onChange={unsubscribeWithCsv}
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
          )}
          <ModalFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                this.props.handleClose();
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
