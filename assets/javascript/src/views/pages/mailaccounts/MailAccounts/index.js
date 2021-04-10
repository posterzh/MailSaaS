import React, { Component } from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import Tables from "../../../../components/Tables";
import {
  getMailAccounts,
  addMailAccount,
  updateMailAccount,
  deleteMailAccount,
} from "../../../../redux/action/MailAccountsActions";
import DetailModal from "./components/DetailModal";
import DeleteModal from "./components/DeleteModal";

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
];

class MailAccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailModal: false,
      deleteModal: false,
      editItem: null,
      deleteItem: null,
    };
  }

  componentDidMount() {
    this.props.getMailAccounts();
  }

  showDetailModal = (item) => {
    console.log(item);

    // Save the item to edit
    if (!item) {
      item = {};
    }
    this.setState({ editItem: item });

    // Show edit
    this.setState({ detailModal: true });
  };

  createMailAccount = (item) => {
    this.props.addMailAccount(item);

    this.closeDetailModal();
  };

  updateMailAccount = (item) => {
    this.props.updateMailAccount(item.id, item);

    this.closeDetailModal();
  };

  closeDetailModal = () => {
    this.setState({ detailModal: false });

    this.setState({ editItem: null });
  };

  showDeleteModal = (item) => {
    // Save the item to delete
    this.setState({ deleteItem: item });

    // Show delete confirmation dialog
    this.setState({ deleteModal: true });
  };

  deleteMailAccount = () => {
    this.props.deleteMailAccount(this.state.deleteItem.id);

    this.closeDeleteModal();
  };

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
    this.setState({ deleteItem: null });
  };

  render() {
    const { detailModal, deleteModal } = this.state;
    const { mailAccounts } = this.props;

    return (
      <>
        <PageHeader
          current="Mail Accounts"
          parent="Mail Accounts"
          showStatus={false}
        />
        <PageContainer
          title="Email Accounts"
          showHelper={true}
          newButton="New Email Accounts"
          newAction={this.showDetailModal}
        >
          <Row>
            <Tables
              titles={tableTitle} // required
              tablePropsData={mailAccounts} // required
              showPagination={true} // optional
              onEdit={this.showDetailModal}
              onDelete={this.showDeleteModal}
            />
          </Row>

          <DetailModal
            isOpen={detailModal}
            data={this.state.editItem}
            close={this.closeDetailModal}
            create={this.createMailAccount}
            update={this.updateMailAccount}
          />

          <DeleteModal
            isOpen={deleteModal}
            close={this.closeDeleteModal}
            delete={this.deleteMailAccount}
          />
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  mailAccounts: state.mailAccounts.mailAccounts,
});

export default connect(mapStateToProps, {
  getMailAccounts,
  addMailAccount,
  updateMailAccount,
  deleteMailAccount,
})(MailAccountList);
