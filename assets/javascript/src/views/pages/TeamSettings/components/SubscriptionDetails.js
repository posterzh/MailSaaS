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
import {
  formatHeader,
  toggleTopLoader,
  toastOnSuccess,
  toastOnError,
  messages,
} from "../../../../utils/Utils";
import axios from "../../../../utils/axios";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const SubscriptionDetails = (props) => {
  const stripe = useStripe();

  const [subscription, setSubscription] = useState(null);

  const handleUpgrade = async () => {
    console.log("manage billing...");
  };

  const handleError = async (errorMessage) => {
    console.log(errorMessage);

    toastOnError(errorMessage);
  };

  useEffect(async () => {
    try {
      toggleTopLoader(true);

      const { data } = await axios.get(
        "/subscriptions/api/subscription-details/"
      );

      console.log("subscription-details: ", data);
      setSubscription(data);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }, []);

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col md="6" sm="12" className="mobile-p-0">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <h3 className="mx-auto text-center">
                      You're subscribed to a plan. Thanks for the support!
                    </h3>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    {subscription && (
                      <>
                        <div>
                          <span className="h5 surtitle mt-5">
                            Current Subscription
                          </span>
                          <span className="d-block h2 ml-4">
                            {subscription.friendly_payment_amount} / month
                          </span>
                        </div>
                        <div>
                          <span className="h5 surtitle mt-5">Quantity</span>
                          <span className="d-block ml-4 text">
                            {subscription.quantity} User
                          </span>
                        </div>
                        <div>
                          <span className="h5 surtitle mt-5">Auto-Renew</span>
                          <span className="d-block ml-4 text">Every month</span>
                        </div>
                        <div>
                          <span className="h5 surtitle mt-5">Since</span>
                          <span className="d-block ml-4 text">
                            {subscription.start_date}
                          </span>
                        </div>
                        <div>
                          <span className="h5 surtitle mt-5">Next payment</span>
                          <span className="d-block ml-4 text">
                            {subscription.friendly_payment_amount} on{" "}
                            {subscription.current_period_end}
                          </span>
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="bg-transparent">
                <Button
                  color="primary"
                  className="text-uppercase"
                  onClick={handleUpgrade}
                  disabled={!stripe}
                  outline
                >
                  Manage billing
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SubscriptionDetails;
