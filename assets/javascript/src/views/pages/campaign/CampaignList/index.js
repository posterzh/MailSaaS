import React, { Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  CampaignTableAction,
  CampaignSaveAction,
  CampaignOverviewAction,
} from "../../../../redux/action/CampaignAction";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import Tables from "../../../../components/Tables";
import { campaignListTable } from "../../../../components/TableHeader";
import { toggleTopLoader, toastOnError, messages } from '../../../../utils/Utils';
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
    const CampId =
      this.props.history.location.state && this.props.history.location.state;
    console.log("campID", CampId);
    this.props.CampaignTableAction();

    // Get API data
    try {
      toggleTopLoader(true);
      const { data } = await axios.get("/campaign/list/");

      const assigned = data.map(item => item.assigned);
      const { filters } = this.state;
      filters.forEach(item => {
        if (item.key === 'assigned') {
          item.options = [...assigned];
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
  // handleCheck = (e) => {
  //   let tables = this.props.Tables.CampaignTableData
  //   tables.forEach(table => {
  //     if (table.value === e.target.value)
  //       table.isChecked = e.target.checked
  //   })
  //   this.setState({ tables: tables })
  // }
  // toggleModal = ()=> {
  //   this.setState({
  //     exampleModal: !this.state.exampleModal
  //   });
  // };

  render() {
    const { show, hide, checked, exampleModal, data, filters } = this.state;
    const actionMenus = [
      {
        key: 'view',
        name: 'View'
      },
      {
        key: 'edit',
        name: 'Edit'
      }
    ];
    return (
      <>
        <PageHeader
          current="Campaign List"
          parent="Campaign"
          showStatus={false}
        />

        <PageContainer title="Campaign List" showHelper={true}>
          {/* <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <InputGroup
                    className={classnames("input-group-merge", {
                      focused: this.state.phoneNumber,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-globe-americas" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Phone number"
                      type="text"
                      onFocus={(e) => {}}
                      onBlur={(e) => {}}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fas fa-phone" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  color="primary"
                  type="button"
                  type="submit"
                  className="my-3"
                >
                  NEXT&nbsp;
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </Button>
              </Col>
            </Row>
          </Form> */}
          <Row>
            <Tables
              titles={campaignListTable} // required
              tablePropsData={data}   // required
              onDetail={this.showDetails}
              actionMenus={actionMenus}   // optional for showing menus of row.
              actionCallback={this.actionCallback}        // get call back for action select of row.
              showSelect={true}    // optional
              selectedCallback={this.getSelectedRecords}      // get call back for select object.
              showPagination={false}   // optional
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
const mapDispatchToProps = (dispatch) => ({
  CampaignTableAction: (mailGetData) => {
    dispatch(CampaignTableAction(mailGetData));
  },
  CampaignSaveAction: (saveData) => {
    dispatch(CampaignSaveAction(saveData));
  },
  CampaignOverviewAction: (id) => {
    dispatch(CampaignOverviewAction(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
