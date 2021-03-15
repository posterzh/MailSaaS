import React, { useEffect, useState } from "react";
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
import { initial } from "lodash";

const initialCalendar = {
  check_state: 5,
  start_time: "09:00",
  end_time: "17:00",
  time_zone: "NewYork",
  max_emails_per_day: 20,
  minutes_between_sends: 12,
  min_emails_to_send: 1,
  max_emails_to_send: 1,
};

function SendingCalendar({
  mailAccounts,
  sendingCalendars,
  getMailAccounts,
  getSendingCalendars,
  addSendingCalendar,
  updateSendingCalendar,
  deleteSendingCalendar,
}) {
  const [currentCalendar, setCurrentCalendar] = useState(null);
  const [currentMailAccount, setCurrentMailAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getMailAccounts();
    getSendingCalendars();
  }, []);

  useEffect(() => {
    if (mailAccounts.length > 0) {
      setCurrentMailAccount(mailAccounts[0].id);
    }
  }, [mailAccounts]);

  useEffect(() => {
    if (currentMailAccount) {
      let calendar = sendingCalendars.find(
        (item) => item.mail_account == currentMailAccount
      );
      if (!calendar) {
        calendar = initialCalendar;
      }

      setCurrentCalendar(calendar);
    }
  }, [currentMailAccount, sendingCalendars]);

  const saveCalendar = (calendar) => {
    // save
    setCurrentCalendar(calendar);

    //
    setIsEditing(false);
  };

  // console.log("current mail account : ", currentMailAccount);
  // console.log("current calendar : ", currentCalendar);

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
              <label className="form-control-label" htmlFor="mail_account_id">
                Mail account
              </label>
              <Input
                type="select"
                onChange={(e) => setCurrentMailAccount(e.target.value)}
              >
                {mailAccounts.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.email}
                  </option>
                ))}
              </Input>
            </FormGroup>

            {!isEditing && (
              <ShowCalendar
                calendar={currentCalendar}
                startEditing={() => setIsEditing(true)}
              />
            )}
            {isEditing && (
              <EditCalendar
                calendar={currentCalendar}
                saveEditing={saveCalendar}
                cancelEditing={() => setIsEditing(false)}
              />
            )}
          </Col>
        </Row>
      </PageContainer>
    </>
  );
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
