import React, { Component } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardBody,
} from "reactstrap";
import classnames from "classnames";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const EditCardModal = (props) => {
  const { isOpen, handleClose } = props;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <Modal isOpen={isOpen}>
      <Card className="bg-gradient-primary mb-0">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
              Save Card
            </button>
          </form>
        </CardBody>
      </Card>
    </Modal>
  );
};
export default EditCardModal;
