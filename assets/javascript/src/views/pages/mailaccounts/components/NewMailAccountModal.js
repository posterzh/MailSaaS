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
export default class NewMailAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,

      emailProvider: "SMTP",
      email: "",
      firstName: "",
      lastName: "",
      SMTPUserName: "",
      SMTPPassword: "",
      SMTPHost: "",
      SMTPPort: "",
      useSMTPSSL: false,
      IMAPUserName: "",
      IMAPPassword: "",
      IMAPHost: "",
      IMAPPort: "",
      useIMAPSSL: false,
    };
  }

  onSelectTab(activeTab) {
    this.setState({
      activeTab,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let mailAccount = Object.assign({}, this.state);
    delete mailAccount.activeTab;

    this.props.connectMailAccount(mailAccount);
  };

  render() {
    const { activeTab } = this.state;

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
                            active: activeTab === 0,
                          })}
                          onClick={() => {
                            this.onSelectTab(0);
                            this.setState({ emailProvider: "SMTP" });
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
                            active: activeTab === 1,
                          })}
                          onClick={() => {
                            this.onSelectTab(1);
                            this.setState({ emailProvider: "Google" });
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
                            active: activeTab === 2,
                          })}
                          onClick={() => {
                            this.onSelectTab(2);
                            this.setState({ emailProvider: "Microsoft" });
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
                          />
                        </FormGroup>

                        <FormGroup className="mb-2">
                          <label
                            className="form-control-label"
                            htmlFor="firstName"
                          >
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control-sm"
                            onChange={this.handleChange}
                          />
                        </FormGroup>

                        <FormGroup className="mb-2">
                          <label
                            className="form-control-label"
                            htmlFor="lastName"
                          >
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control-sm"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        {this.state.activeTab == 0 && (
                          <>
                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="SMTPUserName"
                              >
                                SMTP User Name
                              </label>
                              <Input
                                id="SMTPUserName"
                                name="SMTPUserName"
                                type="text"
                                className="form-control-sm"
                                onChange={this.handleChange}
                              />
                            </FormGroup>

                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="SMTPPassword"
                              >
                                SMTP Password
                              </label>
                              <Input
                                id="SMTPPassword"
                                name="SMTPPassword"
                                type="text"
                                className="form-control-sm"
                                onChange={this.handleChange}
                              />
                            </FormGroup>

                            <Row>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="SMTPHost"
                                  >
                                    SMTP Host
                                  </label>
                                  <Input
                                    id="SMTPHost"
                                    name="SMTPHost"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="SMTPPort"
                                  >
                                    SMTP Port
                                  </label>
                                  <Input
                                    id="SMTPPort"
                                    name="SMTPPort"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                id="useSMTPSSL"
                                name="useSMTPSSL"
                                type="checkbox"
                                onChange={this.handleChange}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="useSMTPSSL"
                              >
                                Use SMTP SSL/TLS
                              </label>
                            </div>

                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="IMAPUserName"
                              >
                                IMAP User Name
                              </label>
                              <Input
                                id="IMAPUserName"
                                name="IMAPUserName"
                                type="text"
                                className="form-control-sm"
                                onChange={this.handleChange}
                              />
                            </FormGroup>

                            <FormGroup className="mb-2">
                              <label
                                className="form-control-label"
                                htmlFor="IMAPPassword"
                              >
                                IMAP Password
                              </label>
                              <Input
                                id="IMAPPassword"
                                name="IMAPPassword"
                                type="text"
                                className="form-control-sm"
                                onChange={this.handleChange}
                              />
                            </FormGroup>

                            <Row>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="IMAPHost"
                                  >
                                    IMAP Host
                                  </label>
                                  <Input
                                    id="IMAPHost"
                                    name="IMAPHost"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup className="mb-2">
                                  <label
                                    className="form-control-label"
                                    htmlFor="IMAPPort"
                                  >
                                    IMAP Port
                                  </label>
                                  <Input
                                    id="IMAPPort"
                                    name="IMAPPort"
                                    type="text"
                                    className="form-control-sm"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                id="useIMAPSSL"
                                name="useIMAPSSL"
                                type="checkbox"
                                onChange={this.handleChange}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="useIMAPSSL"
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
