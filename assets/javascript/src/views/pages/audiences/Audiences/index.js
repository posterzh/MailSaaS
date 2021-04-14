import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
  FormGroup,
  CardTitle
} from 'reactstrap'
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import Tables from "../../../../components/Tables";
import ImportContactsModal from "./components/ImportContactsModal"
import DetailModal from "./components/DetailModal"
import {
  filterRecipients,
} from "../../../../redux/action/ProspectsAction";
import { showNotification } from "../../../../utils/Utils";

const tableTitle = [
  {
    key: 'email',
    value: 'Email',
  },
  {
    key: 'status',
    value: 'STATUS'
  },
  {
    key: 'sent_count',
    value: 'Sent',
  },
  {
    key: 'open_count',
    value: 'Open',
  },
  {
    key: 'click_count',
    value: 'Click',
  },
  {
    key: 'reply_count',
    value: 'Reply',
  },
  {
    key: 'lead_count',
    value: 'Lead',
  },
];

let filters = [
  {
    key: 'status',
    options: []
  }
];

class Prospects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'total',
      detailItem: null,
      importContactsModal: false,
      detailModal: false,
    };
  }

  componentDidMount() {
    this.props.filterRecipients({ unsubscribe: false });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipients !== this.props.recipients) {
      const getUniqueArray = (array, field) => array.map(x => x[field]).filter((v, i, a) => a.indexOf(v) === i);
      filters[0].options = getUniqueArray(nextProps.recipients, 'status');
    }
  }

  paginationCallback = (value) => {
    console.log("value : ", value)
  }

  selectedCallback = (value) => {
    console.log("return=" + value);
  }

  importContacts = () => {
    this.showImportContactsModal();
  }

  showImportContactsModal = () => {
    this.setState({ importContactsModal: true });
  }

  closeImportContactsModal = () => {
    this.setState({ importContactsModal: false });
  }

  showDetailModal = (item) => {
    this.setState({ detailItem: item });

    this.setState({ detailModal: true });
  }

  closeDetailModal = () => {
    this.setState({ detailModal: false });
  }

  onTotalClick = (e) => {
    e.preventDefault();
    this.setState({ selected: 'total' })
    this.props.filterRecipients({ unsubscribe: false });
  }

  onInCampaignClick = (e) => {
    e.preventDefault();
    // this.setState({ selected: 'in-campaign' })
    // this.props.filterRecipients({ unsubscribe: false });
    showNotification("warning", "Coming soon...", "This feature will be implemented in the future version");
  }

  onEngagedClick = (e) => {
    e.preventDefault();
    // this.setState({ selected: 'engaged' })
    // this.props.filterRecipients({ engaged: true });
    showNotification("warning", "Coming soon...", "This feature will be implemented in the future version");
  }

  onLeadsClick = (e) => {
    e.preventDefault();
    // this.setState({ selected: 'leads' })
    // this.props.filterRecipients({ leads: true });
    showNotification("warning", "Coming soon...", "This feature will be implemented in the future version");
  }

  onBouncesClick = (e) => {
    e.preventDefault();
    // this.setState({ selected: 'bounces' })
    // this.props.filterRecipients({ bounces: true });
    showNotification("warning", "Coming soon...", "This feature will be implemented in the future version");
  }

  onUnsubscribesClick = (e) => {
    e.preventDefault();
    // this.setState({ selected: 'unsubscribes' })
    // this.props.filterRecipients({ unsubscribe: true });
    showNotification("warning", "Coming soon...", "This feature will be implemented in the future version");
  }

  render() {
    const { importContactsModal, detailModal } = this.state;
    const { recipients, counts } = this.props;

    recipients.map((item) => {
      item.status = item.sent_count > 0 ? "Contacted" : "Not contacted";
    });

    return (
      <div className="prospect-main-container">
        <PageHeader
          current="Prospects"
          parent="Prospects"
          showStatus={false}
        />
        <PageContainer title={"Audiences"} showHelper={true}>
          <Row>
            <Tables
              titles={tableTitle} // required
              tablePropsData={recipients}   // required
              showPagination={true}   // optional
              selectedCallback={this.selectedCallback}      // get call back for select object.
              paginationCallback={this.paginationCallback}     // get callback of page change.
              onClick={this.showDetailModal}
              filters={filters}   // optional to enable filter
              searchKeys={['email', 'name']}  // optional to enable search
            />
          </Row>

          <Row>
            <Col md={4}></Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
          </Row>

          <ImportContactsModal
            isOpen={importContactsModal}
            // data={this.state.editItem}
            close={this.closeImportContactsModal}
          // create={this.createMailAccount}
          // update={this.updateMailAccount}
          />

          <DetailModal
            isOpen={detailModal}
            data={this.state.detailItem}
            close={this.closeDetailModal}
          />
        </PageContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recipients: state.prospects.recipients,
  counts: state.prospects.counts,
});

export default connect(mapStateToProps, {
  filterRecipients,
})(Prospects);
