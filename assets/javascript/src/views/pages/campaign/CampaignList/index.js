import React, { Component } from "react";
// nodejs library that concatenates classes
import {
  Row,
  Col,
} from "reactstrap";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import Tables from "../../../../components/Tables";
import { campaignListTable } from "../../../../components/TableHeader";
import { toggleTopLoader, toastOnError, messages, toastOnSuccess } from '../../../../utils/Utils';
import axios from '../../../../utils/axios';

class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        item['control'] = item.campaign_status ? "pause" : "play";
        item['tooltip'] = item.campaign_status ? "click to pause" : "click to start";
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
  
  showDetails = (item) => {
    this.props.history.push(`/app/admin/campaign/${item.id}/details-overview`);
  }

  createCampaign = () => {
    this.props.history.push("/app/admin/campaign/create");
  }

  actionCallback = () => {

  }

  controlCallback = (e, index) => {
    if (!e) return;

    toggleTopLoader(true);
    axios
      .post(`/campaign/update-status/${e.id}`, {status: e.control == 'play'})
      .then((response) => {
        toastOnSuccess("Updated successfully!");
        if (response.data.success) {
          const items = this.state.data;
          items[index].control = items[index].control == "play" ? "pause" : "play";
          items[index].tooltip = items[index].control == "play" ? "click to start" : "click to pause";
          this.setState({data: items});
        }
      })
      .catch((error) => {
        toastOnError(error);
      })
      .finally(() => {
        toggleTopLoader(false);
      });
  }

  paginationCallback = () => {

  }

  onDelete = (data) => {
    console.log(data);
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
              showControl={true}   // optional
              controlCallback={this.controlCallback}
              showPagination={true}   // optional
              paginationCallback={this.paginationCallback}     // get callback of page change.
              filters={filters}   // optional to enable filter
              searchKeys={['title']}  // optional to enable search
              onDelete = {this.onDelete}
            />
          </Row>
        </PageContainer>
      </>
    );
  }
}

export default CampaignList;
