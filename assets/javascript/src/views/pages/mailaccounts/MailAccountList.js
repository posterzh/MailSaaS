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

          <ConnectMailAccountModal isOpen={modal} close={this.closeModal} />
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  mailAccounts: state.mailAccounts,
});

export default connect(mapStateToProps, { getMailAccounts })(MailAccountList);
