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

import {
  CampaignPeopleAction,
  unsubscribeRecipientAction,
  CampaignCreateLeadAction,
} from "../../../../redux/action/CampaignAction";
import { filterRecipients } from "../../../../redux/action/ProspectsAction";
import { connect } from "react-redux";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";
import LinkClick from "./components/LeadClick";
import ImportContactsModal from "./components/ImportContactsModal";
import RecipientDetailModal from "./components/RecipientDetailModal";
import CSVDownloadModal from "./components/CSVDownloadModal";
import { recipientsFilters as recipientsInitialFilters, recipientsTable } from "../../../../components/TableHeader";
import Tables from "../../../../components/Tables";

const SpanStyles = {
  paddingRight: "10px",
  paddingLeft: "10px",
  color: "white",
  fontSize: "25px",
  cursor: "pointer",
};

const Span = {
  paddingRight: "20px",
  paddingLeft: "20px",
  color: "white",
  fontSize: "25px",
  borderRight: "1px dashed",
  marginRight: "10px",
};

class CampaignDetailRecipients extends Component {
  constructor() {
    super();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var now = new Date();
    var thisMonth = months[now.getMonth()];
    const date = thisMonth + " " + now.getDate() + " Outreach";
    this.state = {
      isSelectionBar: true,
      selectedId: [],
      isUnsubscribe: false,
      date: date,
      showModal: false,
      id: "",
      email: "",
      full_name: "",
      created_date_time: "",

      recipientDetailItem: null,
      recipientsFilters: recipientsInitialFilters,
      importContactsModal: false,
      recipientDetailModal: false,
      downloadCSVModal: false,
    };
  }

  componentDidMount() {
    let id =
      this.props.history.location.state && this.props.history.location.state.id;
    this.props.CampaignPeopleAction(this.props.id);
    this.props.filterRecipients({ campaign: this.props.id });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipients !== this.props.recipients) {
      const getUniqueArray = (array, field) => array.map(x => x[field]).filter((v, i, a) => a.indexOf(v) === i);
      const emailOptions = getUniqueArray(nextProps.recipients, 'email')
      const nameOptions = getUniqueArray(nextProps.recipients, 'name')
      this.setState({
        recipientsFilters: [
          {
            key: 'email',
            options: emailOptions
          },
          {
            key: 'name',
            options: nameOptions
          }
        ]
      })
    }
  }

  showSelectionBar = (id, isUnsubscribe) => {
    const { selectedId } = this.state;
    this.setState({
      isSelectionBar: true,
      isUnsubscribe,
    });

    if (selectedId.length === 0) {
      selectedId.push(id);
      return;
    }
    for (let index = 0; index < selectedId.length; index++) {
      if (id === selectedId[index]) {
        let array = selectedId.filter((e) => e != id);
        this.setState(
          {
            selectedId: array,
          },
          () => {
            console.log(array, "select");
          }
        );
        return;
      }
    }
    selectedId.push(id);
  };

  toggle = (id, email, full_name, created_date_time) => {
    this.setState({
      showModal: !this.state.showModal,
      id: id,
      email: email,
      full_name: full_name,
      created_date_time: created_date_time,
    });
  };

  unsubscribeRecipient = () => {
    let data = this.state.selectedId;
    let id =
      this.props.history.location.state && this.props.history.location.state.id;
    this.props.RecipientUnsubscribe(data, id);
    this.state.selectedId = 0;
  };

  CreateLead = () => {
    this.setState({ showModal: false });
    this.props.CampaignCreateLeadAction(this.props.id);
  };

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

  render() {
    const { getData } = this.props;
    const {
      isSelectionBar,
      selectedId,
      isUnsubscribe,
      date,
      showModal,
    } = this.state;
    const { id, title } = this.props;
    const campTitle = title ? title : "Date Outreach";

    const { importContactsModal, recipientDetailModal } = this.state;
    const { recipientsFilters } = this.state;
    const { recipients } = this.props;

    return (
      <>
        <PageHeader
          current={campTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campTitle} showHelper={true}>
          <div
            className={`selection-bar ${isSelectionBar && selectedId.length > 0 ? "_block" : " "
              }`}
          >
            <span
              style={SpanStyles}
              onClick={() => {
                this.setState({ isSelectionBar: false });
                selectedId.length = 0;
              }}
            >
              <i className="fa fa-close" aria-hidden="true"></i>
            </span>
            <span style={Span}>{selectedId.length} selected</span>
            <div>
              <span style={SpanStyles}>
                <i className="fas fa-minus-circle"></i>
              </span>
              {!isUnsubscribe ? (
                <span onClick={this.unsubscribeRecipient} style={SpanStyles}>
                  Unsubscribe
                </span>
              ) : (
                <span onClick={this.delete} style={SpanStyles}>
                  delete
                </span>
              )}
            </div>
          </div>
          <Row>
            <DetailHeader activeItem="RECIPIENTS" id={id} />
          </Row>
          {/* <Row>
            <Col md={12} className="align-right">
              <div className="w-h-25">
                <Button color="danger" type="button" size="sm">ADD RECIPIENTS</Button>
                <div className="child ml-3">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      alert("msg");
                    }}
                  >
                    <span className="font_icon">
                      <i
                        className="fa fa-download"
                      ></i>
                    </span>
                  </a>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row className="mt-4">
            <Tables
              titles={recipientsTable} // required
              tablePropsData={recipients}   // required
              showSelect={true}
              showPagination={true}   // optional
              filters={recipientsFilters}   // optional to enable filter
              onClick={this.showRecipientDetailModal}
              searchKeys={['email', 'name']}  // optional to enable search
            />
          </Row>

          <Button
            className="btn-icon btn-2 rounded-circle fixed-bottom-right-btn mr-6"
            color="secondary"
            type="button"
            style={{ zIndex: 5 }}
            onClick={(e) => {
              e.preventDefault();
              this.showDownloadCSVModal();
            }}
          >
            <span className="btn-inner--icon">
              <i className="fa fa-download" />
            </span>
          </Button>

          <Button
            className="btn-icon btn-2 rounded-circle fixed-bottom-right-btn"
            color="info"
            type="button"
            style={{ zIndex: 5 }}
            onClick={(e) => {
              e.preventDefault();
              this.showImportContactsModal();
            }}
          >
            <span className="btn-inner--icon">
              <i className="fa fa-plus" />
            </span>
          </Button>

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

          <div>
            <Modal isOpen={showModal} toggle={this.toggle}>
              <ModalHeader>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <span>Choose an export</span>{" "}
                  <span
                    onClick={() =>
                      this.toggle(this.setState({ showModal: !showModal }))
                    }
                  >
                    &times;
                  </span>
                </div>
              </ModalHeader>
              <ModalBody toggle={this.toggle}>
                <LinkClick
                  id={this.state.id}
                  email={this.state.email}
                  full_name={this.state.full_name}
                  time={this.state.created_date_time}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.CreateLead}>
                  Create
                </Button>
                <Button
                  color="secondary"
                  onClick={() =>
                    this.toggle(this.setState({ showModal: !showModal }))
                  }
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(
    "state.CampaignPeopleReducer && state.CampaignPeopleReducer.campaignPeopleData",
    state.CampaignPeopleReducer &&
    state.CampaignPeopleReducer.campaignPeopleData
  );
  return {
    id: state.campaignDetails.id,
    title: state.campaignDetails.title,
    campaignOverviewData: state.CampaignOverviewReducer.CampaignOverviewData,
    getData:
      state.CampaignPeopleReducer &&
      state.CampaignPeopleReducer.campaignPeopleData,
    recipients: state.prospects.recipients,
  };
};
const mapDispatchToProps = (dispatch) => ({
  CampaignPeopleAction: (id) => dispatch(CampaignPeopleAction(id)),
  RecipientUnsubscribe: (data, id) => {
    dispatch(unsubscribeRecipientAction(data, id));
  },
  CampaignCreateLeadAction: (id) => dispatch(CampaignCreateLeadAction(id)),
  filterRecipients: (filter) => dispatch(filterRecipients(filter)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetailRecipients);
