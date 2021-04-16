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
  Spinner
} from "reactstrap";
import { CSVReader } from 'react-papaparse';
import Tables from "../../../../../components/Tables";

const tableTitle = [
  {
    key: 'campaign_title',
    value: 'CAMPAIGN',
  },
  {
    key: 'created',
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
    key: 'clicked',
    value: 'CLICKS',
  },
  {
    key: 'replies',
    value: 'REPLIES',
  },
];

const initialData = [];

export class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialData
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data != prevProps.data) {
      if (this.props.data) {
        this.setState({ data: this.props.data });
      } else {
        this.setState({ data: initialData });
      }
    }
  }

  render() {
    let { data } = this.state;
    let { isLoading } = this.props;

    data = data.map((item) => {
      item.status = item.sent > 0 ? 'Contacted' : 'Not contacted'
      return item;
    });

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.close} size="xl">
        <Form onSubmit={this.handleSubmit}>
          <Card className="no-shadow">
            <CardHeader className="pb-0">
              <h2>Campaigns</h2>
            </CardHeader>
            <CardBody className="pt-4 pb-0 d-flex">

              {
                isLoading &&
                <Spinner color="primary" className="m-auto" />
              }
              {
                isLoading ||
                <Tables
                  titles={tableTitle} // required
                  tablePropsData={data}   // required
                />
              }
            </CardBody>
          </Card>
        </Form>
      </Modal>
    );
  }
}

export default DetailModal;
