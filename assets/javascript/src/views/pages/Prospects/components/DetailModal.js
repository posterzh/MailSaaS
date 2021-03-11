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
import Tables from "../../../../components/Tables";

const initialState = {

};

export class ImportContactsModal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    // if (this.props.data != prevProps.data) {
    //   if (this.props.data) {
    //     this.setState({ ...this.props.data });
    //   } else {
    //     this.setState({ ...initialState });
    //   }
    // }
  }

  render() {
    const tableTitle = [
			{
				key: 'campaign',
				value: 'CAMPAIGN',
			},
			{
				key: 'added',
				value: 'ADDED',
			},
			{
				key: 'status',
				value: 'STATUS',
			},
			{
				key: 'sent',
				value: 'SENT',
			},
			{
				key: 'opens',
				value: 'OPENS',
			},
			{
				key: 'clicks',
				value: 'CLICKS',
			},
			{
				key: 'replies',
				value: 'REPLIES',
			},
		];
		const tableData = [
			{
				campaign: 'January 20 Outreach',
				added: 'Jan 20, 2021',
				status: 'Unsubscribed',
				sent: '0',
				opens: '0',
				clicks: '0',
				replies: '0',
			},
		];

    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.props.close} size="lg">
          <Form onSubmit={this.handleSubmit}>
            <Card className="no-shadow">
              <CardHeader className="pb-0">
                <h2>Campaigns</h2>
              </CardHeader>
              <CardBody className="pt-4 pb-0">
                <Row>
                  <Col md="2" sm="4" className="sidenav-toggler">
                    <Card className="bg-light">
                      <CardBody className="text-center p-3">
                        <CardTitle className="m-0">
                          <h3 className="text-white heading m-0">
                            <div>1</div>
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
                            <div>0</div>
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
                            <div>0</div>
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
                            <div>0</div>
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
                            <div>0</div>
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
                            <div>0</div>
                            <div>LEADS</div>
                          </h3>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Tables
                    titles={tableTitle} // required
                    tablePropsData={tableData}   // required
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

export default ImportContactsModal;
