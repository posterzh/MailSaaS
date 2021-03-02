import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Alert,
} from "reactstrap";

import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

class Billing extends Component {
  render() {
    const receipts = [
      {
        date: "Feb 11, 2021",
        amount: "$51.00",
      },
      {
        date: "Jan 11, 2021",
        amount: "$60.00",
      },
    ];

    return (
      <>
        <PageHeader
          current="Billing"
          parent="Team settings"
          showStatus={false}
        />

        <PageContainer title="Billing">
          <Container>
            <Row className="mt-3">
              <Col md="6" sm="12" className="mobile-p-0">
                <Card>
                  <CardHeader>
                    <h3 className="mb-0 text-success">ACTIVE PLAN</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-2">
                      <small className="text-info">Renews On</small>
                      <p className="text-muted">Feb 11, 2021</p>
                    </div>
                    <div className="mb-2">
                      <small className="text-info">Plan type</small>
                      <p className="text-muted">Monthly Email Outreach</p>
                    </div>
                    <div className="mb-2">
                      <small className="text-info">Renews On</small>
                      <p className="text-muted">Feb 11, 2021</p>
                    </div>
                  </CardBody>
                  <Alert
                    className="d-flex justify-content-between align-items-center"
                    color="default"
                  >
                    <span>Total monthly price</span>
                    <b>$51.00</b>
                  </Alert>
                  <CardFooter className="bg-transparent">
                    <Button
                      color="info"
                      type="submit"
                      className="text-uppercase"
                    >
                      Upgrade
                    </Button>
                    <Button
                      color="secondary"
                      type="submit"
                      className="text-uppercase small-mobile-ml-0 small-mobile-mt-1"
                    >
                      change
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="mt-3">
              <Col md="8" sm="12" className="mobile-p-0">
                <h1 className="mt-5 mb-3">RECEIPTS</h1>
                <p>Edit the company information that shows on your receipts.</p>
                <Table
                  className="align-items-center table-flush"
                  responsive
                  hover
                >
                  <thead className="thead-light">
                    <tr>
                      <th></th>
                      <th>INVOICE DATE</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts &&
                      receipts.map((receipt, index) => (
                        <tr key={index}>
                          <td>
                            <Button color="secondary" outline type="button">
                              VIEW
                            </Button>
                          </td>
                          <td>{receipt.date}</td>
                          <td>{receipt.amount}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </PageContainer>
      </>
    );
  }
}

export default Billing;
