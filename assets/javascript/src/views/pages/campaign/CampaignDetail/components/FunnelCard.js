import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  CardTitle,
  Input
} from "reactstrap";

class FunnelCard extends Component {
  render() {
    return (
      <Card className="card-stats mb-0">
        <CardBody className="p-1 square-box-60">
          <div className="dummy"></div>
          <div className="content d-flex flex-column justify-content-around align-items-center mx-0">
            <span className="h2 font-weight-bold mb-0">
              { this.props.count || 0 }
            </span>
            <CardTitle
              tag="h5"
              className="text-uppercase text-muted mb-0"
            >
              { this.props.text || '' }
            </CardTitle>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default FunnelCard;
