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
import ConnectMailAccountModal from "./components/NewMailAccountModal";
import { connect } from "react-redux";
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../TableContent";
import { getMailAccounts } from "../../../redux/action/MailAccountsActions";

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

class MailAccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.props.getMailAccounts();
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
    const { isModalOpen } = this.state;
    const { mailAccounts } = this.props;

    console.log("Mail Accounts : ", mailAccounts);

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

const mapStateToProps = (state) => ({
  mailAccounts: state.mailAccounts,
});

const mapDispatchToProps = {
  getMailAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(MailAccountList);
