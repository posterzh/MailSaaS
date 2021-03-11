import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  FormGroup,
  CardTitle,
  Modal,
  ModalHeader,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { connect } from "react-redux";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CalendarCard from "./components/CalendarCard";

const calendars = [1, 2, 3, 4];

export class SendingCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <PageHeader
          current="Sending Calendar"
          parent="Mail Accounts"
          showStatus={false}
        />
        <PageContainer title="Sending Calendar">
          <Row>
            {calendars.map((item, index) => {
              return (
                <Col sm={4} md={4} lg={4}>
                  <CalendarCard key={index} />
                </Col>
              );
            })}
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {};

export default SendingCalendar;
