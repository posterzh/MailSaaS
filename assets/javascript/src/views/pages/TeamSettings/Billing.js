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
import SubscriptionDetails from "./components/SubscriptionDetails";
import UpgradeSubscription from "./components/UpgradeSubscription";

const Billing = (props) => {
  const [stripeApiKey, setStripeApiKey] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);

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

      const { data } = await axios.get("/subscriptions/api/stripe-info/");
      console.log("stripe-info: ", data);

      // setStripeApiKey(data.stripe_api_key);
      setStripePromise(loadStripe(data.stripe_api_key));

      setHasActiveSubscription(data.has_active_subscription);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }, []);

  return (
    <>
      <PageHeader current="Billing" parent="Team settings" showStatus={false} />

      <PageContainer title="Billing">
        <Container>
          <Row>
            {stripePromise && (
              <Elements stripe={stripePromise}>
                {hasActiveSubscription === true && <SubscriptionDetails />}
                {hasActiveSubscription === false && <UpgradeSubscription />}
              </Elements>
            )}
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
};

export default Billing;
