import React, { Component } from "react";
// nodejs library that concatenates classes
import {
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import Tables from "../../../../components/Tables";
import { campaignListTable } from "../../../../components/TableHeader";
import { toggleTopLoader, toastOnError, messages, showNotification } from '../../../../utils/Utils';
import axios from '../../../../utils/axios';

class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      hide: true,
      checked: false,
      exampleModal: false,

      phoneNumber: "123", // Example

      data: [],
      filters: [{
        key: 'assigned',
        options: []
      }]
    };
  }
  async componentDidMount() {
    // Get API data
    try {
      toggleTopLoader(true);
      const { data } = await axios.get("/campaign/list/");

      const assigned = data.map(item => {
        item['control'] = item.campaign_status ? "play" : "pause";
        return item.assigned
      });
      const { filters } = this.state;
      filters.forEach(item => {
        if (item.key === 'assigned') {
          item.options = [...new Set(assigned)];
        }
      })

      this.setState({
        data,
        filters: filters
      })
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }
  allCheck = (e) => {
    const table = this.props.Tables.CampaignTableData;
    for (let i = 0; i < table.length; i++) {
      this.setState({
        checked: !this.state.checked,
        exampleModal: !this.state.exampleModal,
      });
    }
  };
  singleCheck(index) {
    let tables = this.props.Tables.CampaignTableData.slice();
    tables[index].checked = !tables[index].checked;
    this.setState({
      checked: tables,
    });
  }

  showDetails = (item) => {
    this.props.history.push(`/app/admin/campaign/${item.id}/details-overview`);
  }

  createCampaign = () => {
    this.props.history.push("/app/admin/campaign/create");
  }

  actionCallback = () => {

  }

  controlCallback = () => {
    showNotification('warning', 'Campaign action is clicked', 'Not implemented yet. Ready for next version.');
  }

  paginationCallback = () => {

  }

  getSelectedRecords = () => {

  }

  render() {
    const { data, filters } = this.state;
    
    return (
      <>
        <PageHeader
          current="Campaigns"
          parent="Campaign"
          showStatus={false}
        />

        <PageContainer title="Campaigns" showHelper={true} newButton="New Campaign" newAction={this.createCampaign}>
          <Row>
            <Tables
              titles={campaignListTable} // required
              tablePropsData={data}   // required
              onClick={this.showDetails}
              actionCallback={this.actionCallback}        // get call back for action select of row.
              showSelect={true}    // optional
              selectedCallback={this.getSelectedRecords}      // get call back for select object.
              showControl={true}   // optional
              controlCallback={this.controlCallback}
              showPagination={true}   // optional
              paginationCallback={this.paginationCallback}     // get callback of page change.
              filters={filters}   // optional to enable filter
              searchKeys={['title']}  // optional to enable search
            />
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Tables: state.CampaignTableReducer,
  };
};

export default connect(mapStateToProps)(CampaignList);
