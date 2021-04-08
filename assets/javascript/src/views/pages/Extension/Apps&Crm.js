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
                      src={STATIC_FILES.zapier}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="h3 title">
                        <span className="d-block mb-1">ZAPIER</span>
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
          </PageContainer>
      </>
    );
  }
}
export default AppsandCrm;
