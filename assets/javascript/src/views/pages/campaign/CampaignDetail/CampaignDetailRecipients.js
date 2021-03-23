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
import { connect } from "react-redux";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";
import LinkClick from "./components/LeadClick";
import {recipientsFilters, recipientsTable} from "../../../../components/TableHeader";
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
    };
  }
  componentDidMount() {
    let id =
      this.props.history.location.state && this.props.history.location.state.id;
    this.props.CampaignPeopleAction(this.props.id);
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
    const tableBody = [{
      'email': 'xxx@test.com',
      'name': 'xxx',
      'created_date_time': '02/22/2021',
      'updated_date_time': '02/25/2021'
    }];
    
    return (  
      <>
        <PageHeader
          current={campTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campTitle} showHelper={true}>
          <div
            className={`selection-bar ${
              isSelectionBar && selectedId.length > 0 ? "_block" : " "
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
            <DetailHeader activeItem="RECIPIENTS" id={id}/>
          </Row>
          <Row>
            {/* <Col md={1} className="Recipients_details">
              <a href="#">
                <h1>1</h1>
                <span>LISTS</span>
              </a>
            </Col>
            <Col md={1} className="Recipients_details">
              <a href="#">
                <h1>1</h1>
                <span>WON</span>
              </a>
            </Col> */}
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
          </Row>
          <Row>
						<Tables
							titles={recipientsTable} // required
							tablePropsData={tableBody}   // required
							showSelect={true}    // optional
							showPagination={true}   // optional
							filters={recipientsFilters}   // optional to enable filter
							searchKeys={['email']}  // optional to enable search
						/>
					</Row>

          <Row>
            
            {/* <Table responsive hover className="prospect_table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th></th>
                  <th>EMAIL</th>
                  <th>NAME</th>
                  <th>ADDED ON</th>
                  <th>SENT ON</th>
                </tr>
              </thead>
              <tbody>
                {getData &&
                  getData.map((item, index) => (
                    <tr
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.toggle(
                          item.id,
                          item.email,
                          item.full_name,
                          item.created_date_time
                        )
                      }
                    >
                      <td>
                        <input
                          onChange={() =>
                            this.showSelectionBar(item.id, item.unsubscribe)
                          }
                          type="checkbox"
                        />
                      </td>
                      <td>
                        <span>
                          {item.unsubscribe ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-pause"></i>
                          )}
                        </span>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.full_name}</td>
                      <td>{item.created_date_time.substring(5, 10)}</td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </Table> */}
          </Row>
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
  };
};
const mapDispatchToProps = (dispatch) => ({
  CampaignPeopleAction: (id) => dispatch(CampaignPeopleAction(id)),
  RecipientUnsubscribe: (data, id) => {
    dispatch(unsubscribeRecipientAction(data, id));
  },
  CampaignCreateLeadAction: (id) => dispatch(CampaignCreateLeadAction(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetailRecipients);
