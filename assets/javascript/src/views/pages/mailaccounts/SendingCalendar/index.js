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
import ShowCalendar from "./components/ShowCalendar";
import EditCalendar from "./components/EditCalendar";
export class SendingCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  startEditing = () => {
    this.setState({ isEditing: true });
  };

  saveEditing = (calendar) => {
    // save

    // Close editing
    this.setState({ isEditing: false });
  };

  cancelEditing = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { isEditing } = this.state;

    return (
      <>
        <PageHeader
          current="Sending Calendar"
          parent="Mail Accounts"
          showStatus={false}
        />
        <PageContainer title="Sending Calendar">
          <Row>
            <Col md={5} className="mx-auto">
              {!isEditing && <ShowCalendar startEditing={this.startEditing} />}
              {isEditing && (
                <EditCalendar
                  saveEditing={this.saveEditing}
                  cancelEditing={this.cancelEditing}
                />
              )}
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {};

export default SendingCalendar;
