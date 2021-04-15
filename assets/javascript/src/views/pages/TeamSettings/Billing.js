import React, { useState, useEffect } from "react";
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
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  formatHeader,
  toggleTopLoader,
  toastOnSuccess,
  toastOnError,
  messages,
} from "../../../utils/Utils";
import axios from "../../../utils/axios";

const stripePromise = loadStripe("pk_test_4avw1EQzI75q76v5OZJ0gpXn00znlGWXyl");

const Billing = (props) => {
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);

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

  useEffect(async () => {
    try {
      toggleTopLoader(true);

      const { data } = await axios.get("/subscriptions/api/");
      console.log(data);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  });

  const upgrade = () => {};

  return (
    <>
      <PageHeader current="Billing" parent="Team settings" showStatus={false} />

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
                      <span className="h6 surtitle text-white">Plan type</span>
                      <span className="d-block h3 text-white">
                        Monthly Email Outreach
                      </span>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <span className="h6 surtitle text-white">Renews On</span>
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
                    onClick={upgrade}
                  >
                    Upgrade
                  </Button>
                  <UncontrolledDropdown direction="up" group>
                    <DropdownToggle
                      color="secondary"
                      className="text-uppercase mt-xs-1"
                    >
                      Change
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={(e) => {
                          e.preventDefault();
                          setModal(!modal);
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

        <Elements stripe={stripePromise}>
          <EditCardDetailModal isOpen={modal} handleClose={handleClose} />
        </Elements>
      </PageContainer>
    </>
  );
};

export default Billing;
