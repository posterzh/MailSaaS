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

const UpgradeSubscription = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [teammateProduct, setTeammateProduct] = useState(null);
  const [paymentMetadata, setPaymentMetadata] = useState(null);
  const [subscriptionUrls, setSubscriptionUrls] = useState(null);
  const [currencyAmount, setCurrencyAmount] = useState("-");
  const [submissionPending, setSubmissionPending] = useState(false);

  const handleUpgrade = async () => {
    console.log("upgrading...");
    setSubmissionPending(true);

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("createPaymentMethod: ", result);

    const { error, paymentMethod } = result;

    try {
      await handlePaymentMethodCreated(error, paymentMethod);
    } catch (e) {
      handleError(
        "Sorry, there was an unexpected error processing your payment. Please contact us for support."
      );

      console.log(e);

      setSubmissionPending(false);
    }
  };

  const handlePaymentMethodCreated = async (error, paymentMethod) => {
    if (error) {
      handleError(error.message);
      setSubmissionPending(false);
    } else {
      const paymentParams = { ...paymentMetadata };
      paymentParams.plan_id = teammateProduct.monthly_plan.id;
      paymentParams.payment_method = paymentMethod.id;

      const { data: result } = await axios.post(
        subscriptionUrls.create_customer,
        paymentParams
      );
      console.log("create_customer result: ", result);

      if (result.error) {
        handleError(result.error.message);
        setSubmissionPending(false);
      } else {
        const subscription = result.subscription;
        const { latest_invoice } = subscription;
        const { payment_intent } = latest_invoice;
        if (payment_intent) {
          const { client_secret, status } = payment_intent;
          if (status === "requires_action") {
            // trigger 3D-secure workflow
            stripe.confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                // The card was declined (i.e. insufficient funds, card has expired, etc)
                handleError(result.error.message);
                setSubmissionPending(false);
              } else {
                handleSubscriptionSuccess();
              }
            });
          } else {
            // No additional information was needed
            handleSubscriptionSuccess();
          }
        } else if (subscription.pending_setup_intent) {
          const { client_secret, status } = subscription.pending_setup_intent;
          if (status === "requires_action") {
            stripe.confirmCardSetup(client_secret).then(function (result) {
              if (result.error) {
                handleError(result.error.message);
                setSubmissionPending(false);
              } else {
                handleSubscriptionSuccess();
              }
            });
          }
        } else {
          handleSubscriptionSuccess();
        }
      }
    }
  };

  const handleError = async (errorMessage) => {
    console.log(errorMessage);

    toastOnError(errorMessage);
  };

  const handleSubscriptionSuccess = async () => {
    setSubmissionPending(false);
    // location.href = subscriptionSuccessUrl;

    toastOnSuccess("Subscribed successfully!");
  };

  useEffect(async () => {
    try {
      toggleTopLoader(true);

      const { data } = await axios.get(
        "/subscriptions/api/upgrade-subscription/"
      );
      console.log("upgrade-subscription: ", data);

      setTeammateProduct(data.teammate_product);
      setPaymentMetadata(data.payment_metadata);
      setSubscriptionUrls(data.subscription_urls);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }, []);

  useEffect(() => {
    if (teammateProduct) {
      setCurrencyAmount(teammateProduct.monthly_plan.currency_amount);
    }
  }, [teammateProduct]);

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col lg="5" md="6" sm="12" className="mobile-p-0">
            <Card>
              <CardBody>
                <Row className="mt-3">
                  <Col>
                    <span className="h5 surtitle">Plan</span>
                    <span className="d-block h2 ml-4">
                      {currencyAmount} / month
                    </span>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <span className="h5 surtitle">Features</span>
                    <span className="d-block mt-2 ml-4 text">
                      <i className="fa fa-check"></i> 1 User
                    </span>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col>
                    <CardElement className="w-100" />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="bg-transparent">
                <Button
                  color="primary"
                  className="text-uppercase"
                  onClick={handleUpgrade}
                  disabled={!stripe && !submissionPending}
                >
                  Upgrade
                </Button>
                <span className="text-sm d-block mt-3">
                  Your card will be charged {currencyAmount} for your first
                  month.
                </span>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpgradeSubscription;
