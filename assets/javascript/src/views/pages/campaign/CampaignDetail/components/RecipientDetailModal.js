import React, { Component } from "react";
import {
  Button,
  Container,
  Modal,
  Row,
  Col,
  Input,
  Form,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { CSVReader } from 'react-papaparse';
import Tables from "../../../../../components/Tables";
import { recipientsTable } from "../../../../../components/TableHeader";

const initialState = {

};

export class RecipientDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    if (this.props.data != prevProps.data) {
      if (this.props.data) {
        this.setState({ ...this.props.data });
      } else {
        this.setState({ ...initialState });
      }
    }
  }

  render() {
    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.props.close} size="xl">
          <Form onSubmit={this.handleSubmit}>
            <Card className="no-shadow">
              <CardHeader className="pb-0">
                <h2>Campaigns</h2>
              </CardHeader>
              <CardBody className="pt-4 pb-0">
                {/* <Row>
                  <Col md="2" sm="4" className="sidenav-toggler">
                    <Card className="bg-light">
                      <CardBody className="text-center p-3">
                        <CardTitle className="m-0">
                          <h3 className="text-white heading m-0">
                            <div>{this.state.campaign_count}</div>
                            <div>CAMPS</div>
                          </h3>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="2" sm="4" className="sidenav-toggler">
                    <Card className="bg-light">
                      <CardBody className="text-center p-3">
                        <CardTitle className="m-0">
                          <h3 className="text-white heading m-0">
                            <div>{this.state.sent_count}</div>
                            <div>SENDS</div>
                          </h3>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="2" sm="4" className="sidenav-toggler">
                    <Card className="bg-light">
                      <CardBody className="text-center p-3">
                        <CardTitle className="m-0">
                          <h3 className="text-white heading m-0">
                            <div>{this.state.open_count}</div>
                            <div>OPENS</div>
                          </h3>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="2" sm="4" className="sidenav-toggler">
                    <Card className="bg-light">
                      <CardBody className="text-center p-3">
                        <CardTitle className="m-0">
                          <h3 className="text-white heading m-0">
                            <div>{this.state.click_count}</div>
                            <div>CLICKS</div>
                          </h3>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="2" sm="4" className="sidenav-toggler">
                    <Card className="bg-light">
                      <CardBody className="text-center p-3">
                        <CardTitle className="m-0">
                          <h3 className="text-white heading m-0">
                            <div>{this.state.reply_count}</div>
                            <div>REPLIES</div>
                          </h3>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="2" sm="4" className="sidenav-toggler">
                    <Card className="bg-light">
                      <CardBody className="text-center p-3">
                        <CardTitle className="m-0">
                          <h3 className="text-white heading m-0">
                            <div>{this.state.lead_count}</div>
                            <div>LEADS</div>
                          </h3>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                </Row> */}

                <Row>
                  <Tables
                    titles={recipientsTable} // required
                    tablePropsData={[this.state]}   // required
                  />
                </Row>
              </CardBody>
            </Card>
          </Form>
        </Modal>
      </>
    );
  }
}

export default RecipientDetailModal;
