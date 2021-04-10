import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";


import { getDetailRecipients, updateRecipientStatus } from "../../../../redux/action/CampaignDetailsActions";
import { connect } from "react-redux";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";
import ImportContactsModal from "./components/ImportContactsModal";
import RecipientDetailModal from "./components/RecipientDetailModal";
import CSVDownloadModal from "./components/CSVDownloadModal";
import { recipientsFilters, recipientsTable } from "../../../../components/TableHeader";
import Tables from "../../../../components/Tables";

class CampaignDetailRecipients extends Component {
  constructor() {
    super();
    this.state = {
      recipientDetailItem: null,
      recipientsFilters: recipientsFilters,
      importContactsModal: false,
      recipientDetailModal: false,
      downloadCSVModal: false,
    };
  }

  componentDidMount() {
    this.props.getDetailRecipients(this.props.id);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipients !== this.props.recipients) {
      const getUniqueArray = (array, field) => array.map(x => x[field]).filter((v, i, a) => a.indexOf(v) === i);
      const emailOptions = getUniqueArray(nextProps.recipients, 'email')
      this.setState({
        recipientsFilters: [
          {
            key: 'email',
            options: emailOptions
          },
        ]
      })
    }
  }

  showImportContactsModal = () => {
    this.setState({ importContactsModal: true })
  }

  closeImportContactsModal = () => {
    this.setState({ importContactsModal: false })
  }

  showRecipientDetailModal = (item) => {
    this.setState({ recipientDetailItem: item });

    this.setState({ recipientDetailModal: true });
  }

  closeRecipientDetailModal = () => {
    this.setState({ recipientDetailModal: false })
  }

  showDownloadCSVModal = () => {
    this.setState({ downloadCSVModal: true });
  }

  closeDownloadCSVModal = () => {
    this.setState({ downloadCSVModal: false });
  }

  updateRecipientStatus = (data, index) => {
    this.props.updateRecipientStatus(data.id, !data.recipient_status)
  }

  render() {
    const { id, title } = this.props;
    const campTitle = title ? title : "Date Outreach";

    const { importContactsModal, recipientDetailModal } = this.state;
    const { recipientsFilters } = this.state;
    let { recipients } = this.props;

    recipients = recipients.map(recipient => ({
      ...recipient,
      control: recipient.recipient_status ? "pause" : "play",
      tooltip: recipient.recipient_status ? "click to pause" : "click to start"
    }));

    return (
      <>
        <PageHeader
          current={campTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campTitle} showHelper={true}>
          <Row>
            <DetailHeader activeItem="RECIPIENTS" id={id} />
          </Row>

          <Row className="mx-3">
            <Col md={12}>
              <Row className="my-3">
                <Col md={12} className="mx-auto text-right">
                  <Button type="button" color="danger" className="mx-auto" size="sm" onClick={(e) => {
                    e.preventDefault();
                    this.showImportContactsModal();
                  }}>
                    ADD RECIPIENTS
                  </Button>
                </Col>
              </Row>

              <Tables
                titles={recipientsTable} // required
                tablePropsData={recipients}   // required
                showSelect={true}
                showPagination={true}   // optional
                showControl={true}
                filters={recipientsFilters}   // optional to enable filter
                controlCallback={this.updateRecipientStatus}
                onClick={this.showRecipientDetailModal}
                searchKeys={['email', 'name']}  // optional to enable search
              />
            </Col>
          </Row>

          <ImportContactsModal
            isOpen={importContactsModal}
            // data={this.state.editItem}
            close={this.closeImportContactsModal}
          // create={this.createMailAccount}
          // update={this.updateMailAccount}
          />

          <RecipientDetailModal
            isOpen={recipientDetailModal}
            data={this.state.recipientDetailItem}
            close={this.closeRecipientDetailModal}
          />

          <CSVDownloadModal
            data={recipients}
            isOpen={this.state.downloadCSVModal}
            close={this.closeDownloadCSVModal}
          />

        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    id: state.campaignDetails.id,
    title: state.campaignDetails.title,
    recipients: state.campaignDetails.detailRecipients,
  };
};
export default connect(mapStateToProps, {
  getDetailRecipients,
  updateRecipientStatus,
})(CampaignDetailRecipients);
