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
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
export default class ConnectMailAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  onSelectTab(activeTab) {
    this.setState({
      activeTab,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connecting a mail account...");

    this.props.toggle();
  };

  render() {
    const { activeTab } = this.state;

    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="lg">
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
                    {/* <TabContent activeTab={activeTab}>
                        <TabPane tabId={0}>
                          <Row>
                            <Col>
                              <p className="my-5">SMTP</p>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId={1}>
                          <Row>
                            <Col>
                              <p className="my-5">Google</p>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId={2}>
                          <Row>
                            <Col>
                              <p className="my-5">Microsoft</p>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent> */}

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
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                id="chkSMTPSSL"
                                name="chkSMTPSSL"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="chkSMTPSSL"
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
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <div className="custom-control custom-checkbox mb-3">
                              <input
                                className="custom-control-input"
                                id="chkIMAPSSL"
                                name="chkIMAPSSL"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="chkIMAPSSL"
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
                    <Button type="button" onClick={this.props.toggle}>
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
