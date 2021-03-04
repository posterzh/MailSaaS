import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardBody,
  CardFooter,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import EditCardDetailModal from "./EditCardDetailModal";

import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

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
              <Col lg="5" md="6" sm="12" className="mobile-p-0">
                <Card className="bg-gradient-info">
                  <CardBody>
                    <Row className="justify-content-end">
                      <Col className="col-auto">
                        <Badge className="badge-lg" color="success">
                          Active
                        </Badge>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <span className="h6 surtitle text-white">
                          Plan type
                        </span>
                        <span className="d-block h3 text-white">
                          Monthly Email Outreach
                        </span>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <span className="h6 surtitle text-white">
                          Renews On
                        </span>
                        <span className="d-block h3 text-white">
                          Feb 11, 2021
                        </span>
                      </Col>
                      <Col>
                        <span className="h6 surtitle text-white">
                          Number Of Users
                        </span>
                        <span className="d-block h3 text-white">1</span>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="bg-transparent">
                    <Button
                      color="primary"
                      type="submit"
                      className="text-uppercase"
                    >
                      Upgrade
                    </Button>
                    <UncontrolledDropdown direction="up" group>
                      <DropdownToggle color="secondary" className="text-uppercase mt-xs-1">
                      Change
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ modal: !this.state.modal });
                          }}
                        >
                          Change Credit Card, etc.
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Downgrade
                        </DropdownItem>
                        <DropdownItem
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Cancel Subscription
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
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
          <EditCardDetailModal
            isOpen={this.state.modal}
            handleClose={this.handleClose}
          />
        </PageContainer>
      </>
    );
  }
}

export default Billing;
