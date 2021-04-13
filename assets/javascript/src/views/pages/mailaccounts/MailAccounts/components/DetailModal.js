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
import classnames from "classnames";

const initialState = {
  email_provider: "SMTP",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  smtp_host: "",
  smtp_port: "",
  smtp_username: "",
  smtp_password: "",
  use_smtp_ssl: false,
  imap_host: "",
  imap_port: "",
  imap_username: "",
  imap_password: "",
  use_imap_ssl: false,
};

export default class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    if (this.props.data != prevProps.data) {
      if (this.props.data) {
        this.setState({ ...this.props.data });
      } else {
        this.setState({ ...initialState });
      }
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let mailAccount = Object.assign({}, this.state);

    if (this.state.id) {
      console.log("update:", this.state);
      this.props.update(mailAccount);
    } else {
      console.log("create:", this.state);
      this.props.create(mailAccount);
    }
  };

  render() {
    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.props.close} size="lg">
          <Form onSubmit={this.handleSubmit}>
            <Card className="no-shadow">
              <CardHeader className="pb-0">
                <h2>Connect a mail account</h2>
              </CardHeader>
              <CardBody className="pt-3 pb-0">
                <Row>
                  <Col>
                    <Nav pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.email_provider == "SMTP",
                          })}
                          onClick={() => {
                            this.setState({ email_provider: "SMTP" });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="btn-inner--icon mr-2">
                            <i className="fas fa-envelope" />
                          </span>
                          <span className="btn-inner--text">SMTP</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.email_provider == "Google",
                          })}
                          onClick={() => {
                            this.setState({ email_provider: "Google" });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="btn-inner--icon mr-2">
                            <i className="fab fa-google" />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.email_provider == "Microsoft",
                          })}
                          onClick={() => {
                            this.setState({ email_provider: "Microsoft" });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="btn-inner--icon mr-2">
                            <i className="fab fa-microsoft" />
                          </span>
                          <span className="btn-inner--text">Microsoft</span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <Row className="mt-3">
                      <Col md={6}>
                        <FormGroup className="mb-2">
                          <label className="form-control-label" htmlFor="email">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            className="form-control-sm"
                            onChange={this.handleChange}
                            value={this.state.email}
                          />
                        </FormGroup>

                        {this.state.email_provider == "Google" && (
                          <>
                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="password"
                              >
                                Password
                              </label>
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control-sm"
                                onChange={this.handleChange}
                                value={this.state.password}
                              />
                            </FormGroup>

                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="smtp_password"
                              >
                                App Password
                              </label>
                              <Input
                                id="smtp_password"
                                name="smtp_password"
                                type="password"
                                className="form-control-sm"
                                onChange={this.handleChange}
                                value={this.state.smtp_password}
                              />
                            </FormGroup>
                          </>
                        )}

                        {this.state.email_provider == "Microsoft" && (
                          <>
                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="password"
                              >
                                Password
                              </label>
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control-sm"
                                onChange={this.handleChange}
                                value={this.state.password}
                              />
                            </FormGroup>
                          </>
                        )}

                        <FormGroup className="mb-2">
                          <label
                            className="form-control-label"
                            htmlFor="first_name"
                          >
                            First Name
                          </label>
                          <Input
                            id="first_name"
                            name="first_name"
                            type="text"
                            className="form-control-sm"
                            onChange={this.handleChange}
                            value={this.state.first_name}
                          />
                        </FormGroup>

                        <FormGroup className="mb-2">
                          <label
                            className="form-control-label"
                            htmlFor="last_name"
                          >
                            Last Name
                          </label>
                          <Input
                            id="last_name"
                            name="last_name"
                            type="text"
                            className="form-control-sm"
                            onChange={this.handleChange}
                            value={this.state.last_name}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        {this.state.email_provider == "SMTP" && (
                          <>
                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="smtp_username"
                              >
                                SMTP User Name
                              </label>
                              <Input
                                id="smtp_username"
                                name="smtp_username"
                                type="text"
                                className="form-control-sm"
                                onChange={this.handleChange}
                                value={this.state.smtp_username}
                              />
                            </FormGroup>

                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="smtp_password"
                              >
                                SMTP Password
                              </label>
                              <Input
                                id="smtp_password"
                                name="smtp_password"
                                type="password"
                                className="form-control-sm"
                                onChange={this.handleChange}
                                value={this.state.smtp_password}
                              />
                            </FormGroup>

                            <Row>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="smtp_host"
                                  >
                                    SMTP Host
                                  </label>
                                  <Input
                                    id="smtp_host"
                                    name="smtp_host"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                    value={this.state.smtp_host}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="smtp_port"
                                  >
                                    SMTP Port
                                  </label>
                                  <Input
                                    id="smtp_port"
                                    name="smtp_port"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                    value={this.state.smtp_port}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                id="use_smtp_ssl"
                                name="use_smtp_ssl"
                                type="checkbox"
                                checked={this.state.use_smtp_ssl}
                                onChange={(e) => {
                                  this.handleChange({
                                    target: {
                                      name: e.target.name,
                                      value: e.target.checked,
                                    },
                                  });
                                }}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="use_smtp_ssl"
                              >
                                Use SMTP SSL/TLS
                              </label>
                            </div>

                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="imap_username"
                              >
                                IMAP User Name
                              </label>
                              <Input
                                id="imap_username"
                                name="imap_username"
                                type="text"
                                className="form-control-sm"
                                onChange={this.handleChange}
                                value={this.state.imap_username}
                              />
                            </FormGroup>

                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="imap_password"
                              >
                                IMAP Password
                              </label>
                              <Input
                                id="imap_password"
                                name="imap_password"
                                type="password"
                                className="form-control-sm"
                                onChange={this.handleChange}
                                value={this.state.imap_password}
                              />
                            </FormGroup>

                            <Row>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="imap_host"
                                  >
                                    IMAP Host
                                  </label>
                                  <Input
                                    id="imap_host"
                                    name="imap_host"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                    value={this.state.imap_host}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="imap_port"
                                  >
                                    IMAP Port
                                  </label>
                                  <Input
                                    id="imap_port"
                                    name="imap_port"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                    value={this.state.imap_port}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                id="use_imap_ssl"
                                name="use_imap_ssl"
                                type="checkbox"
                                checked={this.state.use_imap_ssl}
                                onChange={(e) => {
                                  this.handleChange({
                                    target: {
                                      name: e.target.name,
                                      value: e.target.checked,
                                    },
                                  });
                                }}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="use_imap_ssl"
                              >
                                Use IMAP SSL/TLS
                              </label>
                            </div>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-2">
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
