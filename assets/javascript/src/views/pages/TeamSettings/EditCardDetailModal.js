import React, { Component } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardBody,
} from "reactstrap";
import classnames from "classnames";

class EditCardModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isOpen, handleClose } = this.props;

    return (
      <Modal isOpen={isOpen}>
        <Card className="bg-gradient-primary mb-0">
          <CardBody>
            <Row className="justify-content-between align-items-center">
              <Col className="col-auto">
                <span className="text-white font-weight-bold mr-3">
                  Edit Card Details
                </span>
              </Col>
            </Row>
            <div className="mt-4">
              <Form className="form-primary" role="form">
                <FormGroup>
                  <InputGroup
                    className={classnames("input-group-alternative mb-3")}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name on card" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup
                    className={classnames("input-group-alternative mb-3")}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-credit-card" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Card number" type="text" />
                  </InputGroup>
                </FormGroup>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-alternative mb-3")}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="MM/YY" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-alternative")}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="CCV" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="success" type="button" className="text-uppercase">
                  Save Card
                </Button>
                <Button
                  className="text-uppercase ml-xs-0"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                  }}
                >
                  cancel
                </Button>
              </Form>
            </div>
          </CardBody>
        </Card>
      </Modal>
    );
  }
}
export default EditCardModal;
