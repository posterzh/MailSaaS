import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

export class AppsandCrm extends Component {
  render() {
    return (
      <>
        <PageHeader
          current="Apps & CRMs"
          parent="Extension"
          showStatus={false}
        />

        <PageContainer title="Apps & CRMs">
          <span className="display-4">INSTALLED APPS</span>
          <hr className="mt-2 mb-2" />
          <Container fluid>
            <Row className="mt-5 mb-5">
              <Col lg={3} md={4} sm={12}>
                <Card>
                  <CardBody>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-center-img"
                      src={STATIC_FILES.slack}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="h3 title">
                        <span className="d-block mb-1">SALESFORCE</span>
                        <small className="h4 font-weight-light text-muted">
                          Track activities and update lead statuses when actions
                          are taken in MailSaaS.
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button>ADD</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <span className="display-4">NATIVE INTEGRATIONS</span>
          <hr className="mt-2 mb-2" />
          <Container fluid>
            <Row className="mt-5">
              <Col lg={3} md={4} sm={12}>
                <Card>
                  <CardBody>
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover rounded-center-img"
                      src={STATIC_FILES.sales_force}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="h3 title">
                        <span className="d-block mb-1">SALESFORCE</span>
                        <small className="h4 font-weight-light text-muted">
                          Track activities and update lead statuses when actions
                          are taken in MailSaaS.
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button>ADD</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={3} md={4} sm={12}>
                <Card>
                  <CardBody>
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover rounded-center-img"
                      src={STATIC_FILES.slack}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="h3 title">
                        <span className="d-block mb-1">SLACK</span>
                        <small className="h4 font-weight-light text-muted">
                          Post messages to your channels when you receive a new
                          reply or lead.
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button>ADD</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={3} md={4} sm={12}>
                <Card>
                  <CardBody>
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover rounded-center-img"
                      src={STATIC_FILES.pipe_drive}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="h3 title">
                        <span className="d-block mb-1">PIPEDRIVE</span>
                        <small className="h4 font-weight-light text-muted">
                          Move deals through your stages, track activities, and
                          update lead statuses.
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button>ADD</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </PageContainer>
      </>
    );
  }
}
export default AppsandCrm;
