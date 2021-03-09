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
    key: "email_provider",
    value: "Email Provider",
  },
  {
    key: "email",
    value: "Email",
  },
  {
    key: "first_name",
    value: "First Name",
  },
  {
    key: "last_name",
    value: "Last Name",
  },
  {
    key: "smtp_host",
    value: "SMTP Host",
  },
  {
    key: "smtp_port",
    value: "SMTP Port",
  },
  {
    key: "smtp_username",
    value: "SMTP Username",
  },
  {
    key: "smtp_password",
    value: "SMTP Password",
  },
  {
    key: "use_smtp_ssl",
    value: "Use SMTP SSL",
  },
  {
    key: "imap_host",
    value: "IMAP Host",
  },
  {
    key: "imap_port",
    value: "IMAP Port",
  },
  {
    key: "imap_username",
    value: "IMAP Username",
  },
  {
    key: "imap_password",
    value: "IMAP Password",
  },
  {
    key: "use_imap_ssl",
    value: "Use IMAP SSL",
  },
];

class MailAccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidMount() {
    this.props.getMailAccounts();
  }

  // Close modal
  closeModal = () => {
    this.setState({ modal: false });
  };

  deleteMailAccount = (id) => {
    this.props.MailAccountDelete(id);
  };

  render() {
    const { modal } = this.state;
    const { mailAccounts } = this.props;

    console.log("mail accounts: ", mailAccounts);

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
              tablePropsData={mailAccounts} // required
              showPagination={true} // optional
            />
          </Row>

          <ConnectMailAccountModal isOpen={modal} close={this.closeModal} />
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  mailAccounts: state.mailAccounts.mailAccounts,
});

export default connect(mapStateToProps, { getMailAccounts })(MailAccountList);
