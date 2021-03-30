import React, { Component } from 'react'
import LeadCatchermodel from "./components/LeadCatchermodel"
import { connect } from 'react-redux'
import { CampaignLeadViewAction, CampaignOverviewAction } from "../../../redux/action/CampaignAction";
import { Container, Row, Col, Input, Modal, ModalHeader, ModalBody, Table } from 'reactstrap'
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../../../components/Tables";
import { toggleTopLoader, toastOnError, messages } from '../../../utils/Utils';
import axios from '../../../utils/axios';

class LeadCatcher extends Component {
  constructor() {
    super()
    this.state = {
      modal: false,
      data: []
    }
  }
  showDetails = () => {
    console.log("asdfasdfasd")
  }
  async componentDidMount() {
    // this.props.CampaignLeadViewAction()
    try {
      toggleTopLoader(true);
      const { data } = await axios.get("/campaign/leads/");
      if (data.success) {
        this.setState({
          data: data.res
        })
      }
      console.log(data.res);
      
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }
  render() {
    const tableTitle = [
      {
        key: 'email',
        value: 'Email',
      },
      {
        key: 'campaign_title',
        value: 'Campaign',
      },
      {
        key: 'assigned_name',
        value: 'Assigned',
      },
      {
        key: 'lead_status',
        value: 'Lead Status',
      }
    ];
    const filters = [
      {
        key: 'status',
        options: ['Open', 'Ignored', 'Won', 'Lost']
      }
    ];
    return (
      <>
        <PageHeader
          current="Leads"
          parent="Campaign"
          showStatus={false}
        />
        <PageContainer title="Leads" showHelper={true}>
          <Container fluid>
            <Row>
              <Tables
                titles={tableTitle} // required
                tablePropsData={this.state.data}   // required
                showAction={true}    // optional
                showSelect={true}    // optional
                showPagination={true}   // optional
                filters={filters}   // optional to enable filter
                searchKeys={['email', 'campaign_title']}  // optional to enable search
                onClick={this.showDetails}
              />
            </Row>
          </Container>
        </PageContainer>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("state", state.LeadViewReducer && state.LeadViewReducer.leadViewData)
  return {
    leadData: state.LeadViewReducer && state.LeadViewReducer.leadViewData
  };
};
const mapDispatchToProps = (dispatch) => ({
  // CampaignLeadGetAction:()=>dispatch(CampaignLeadGetAction)
  CampaignLeadViewAction: () => dispatch(CampaignLeadViewAction())

});
export default connect(mapStateToProps, mapDispatchToProps)(LeadCatcher)
