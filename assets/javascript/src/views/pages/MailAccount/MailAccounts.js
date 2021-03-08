import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import ConnectMailAccountModal from "./components/ConnectMailAccountModal";
import { connect } from "react-redux";
import {
  MailSenderAction,
  MailGetDataAction,
  MailAccountDeleteAction,
  MailAccountUpdate,
} from "../../../redux/action/MailSenderAction";
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../TableContent";

const tableTitle = [
  {
    key: "email",
    value: "Email",
  },
  {
    key: "name",
    value: "Name",
  },
  {
    key: "created",
    value: "Created",
  },
  {
    key: "status",
    value: "Status",
  },
  {
    key: "campaign",
    value: "Campaign",
  },
  {
    key: "sent",
    value: "Sent",
  },
  {
    key: "engaged",
    value: "Engaged",
  },
  {
    key: "tasks",
    value: "Tasks",
  },
];

const tableData = [
  {
    email: "ajju@gmail.com",
    name: "Azazul",
    created: "10-10-2020",
    status: "Passed",
    campaign: "1458",
    sent: "10",
    engaged: "9",
    tasks: "8",
  },
  {
    email: "janak@gmail.com",
    name: "Azazul",
    created: "10-10-2020",
    status: "Passed",
    campaign: "1458",
    sent: "10",
    engaged: "2",
    tasks: "8",
  },
  {
    email: "ajju@gmail.com",
    name: "janak",
    created: "10-10-2020",
    status: "Passed",
    campaign: "1458",
    sent: "10",
    engaged: "2",
    tasks: "8",
  },
];

class MailAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.props.MailGetDataAction();
  }

  // Close modal
  closeModal = () => {
    this.setState({ modal: false });
  };

  // Connect mail account
  connectMailAccount = (mailAccount) => {
    console.log("Connecting mail account : ", mailAccount);

    // Close modal
    this.setState({ modal: false });
  };

  handleAction = (e) => {
    this.setState({
      modal: !this.state.modal,
      hide: false,
      flag: false,
    });
    const mailData = {
      email: this.state.emailAddress,
      full_name: this.state.FullName,
      smtp_port: this.state.smtpPort,
      smtp_host: this.state.smtpHost,
      smtp_password: this.state.smtpPassword,
      smtp_username: this.state.emailAddress,
      imap_port: this.state.imapPort,
      imap_host: this.state.imapHost,
      imap_password: this.state.imapPassword,
      imap_username: this.state.emailAddress,
    };
    if (this.state.flag) {
      mailData.user = this.state.user;
      this.props.MailAccountUpdate(mailData, this.state.accountId);
    } else {
      this.props.MailSenderAction(mailData);
    }
  };

  deleteMailAccount = (id) => {
    this.props.MailAccountDelete(id);
  };

  render() {
    const { mailGetData } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <PageHeader
          current="Mail Accounts"
          parent="Mail Accounts"
          showStatus={true}
        />
        <PageContainer title="Mail Accounts">
          <Row className="justify-content-end">
            <Button
              onClick={(e) => {
                e.preventDefault(), this.setState({ modal: true });
              }}
              className="btn-icon"
              color="danger"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="fa fa-plus" />
              </span>
            </Button>
          </Row>

          <Row>
            <Tables
              titles={tableTitle} // required
              tablePropsData={tableData} // required
              showPagination={true} // optional
            />
          </Row>

          <ConnectMailAccountModal
            isOpen={isModalOpen}
            close={this.closeModal}
            connectMailAccount={this.connectMailAccount}
          />
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(
    "**************mailgetdata************",
    state.MailGetDataReducer.mailGetData
  );
  return {
    mailGetData: state.MailGetDataReducer.mailGetData,
    mailAccountId: state.MailGetDataReducer.mailAccountId,
  };
};
const mapDispatchToProps = (dispatch) => ({
  MailSenderAction: (mailData) => {
    dispatch(MailSenderAction(mailData));
  },
  MailGetDataAction: () => {
    dispatch(MailGetDataAction());
  },
  MailAccountDelete: (id) => {
    dispatch(MailAccountDeleteAction(id));
  },
  MailAccountUpdate: (data, id) => {
    dispatch(MailAccountUpdate(data, id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MailAccounts);
