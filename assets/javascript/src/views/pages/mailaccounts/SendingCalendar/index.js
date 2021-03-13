import React, { Component } from "react";
import { Container, Row, Col, Text, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import ShowCalendar from "./components/ShowCalendar";
import EditCalendar from "./components/EditCalendar";
import { getMailAccounts } from "../../../../redux/action/MailAccountsActions";
import {
  getSendingCalendars,
  addSendingCalendar,
  updateSendingCalendar,
  deleteSendingCalendar,
} from "../../../../redux/action/SendingCalendarActions";
import MailAccounts from "../MailAccounts";

export class SendingCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      mail_account: null,
    };
  }

  componentDidMount() {
    this.props.getMailAccounts();
    // this.props.getSendingCalendars();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
    const { mailAccounts, sendingCalendars } = this.props;

    console.log("mailAccounts : ", mailAccounts);
    console.log("sendingCalendars : ", sendingCalendars);

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
              <FormGroup className="mb-2">
                <label className="form-control-label" htmlFor="mail_account">
                  Mail account
                </label>
                <Input
                  id="mail_account"
                  name="mail_account"
                  type="select"
                  onChange={this.handleChange}
                >
                  {mailAccounts.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.email}
                    </option>
                  ))}
                </Input>
              </FormGroup>

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
const mapStateToProps = (state) => ({
  mailAccounts: state.mailAccounts.mailAccounts,
  sendingCalendars: state.sendingCalendars.sendingCalendars,
});

export default connect(mapStateToProps, {
  getMailAccounts,

  getSendingCalendars,
  addSendingCalendar,
  updateSendingCalendar,
  deleteSendingCalendar,
})(SendingCalendar);
