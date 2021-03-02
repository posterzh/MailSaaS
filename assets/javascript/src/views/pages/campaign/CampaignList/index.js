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

class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      hide: true,
      data: [],
      checked: false,
      exampleModal: false,

      phoneNumber: "123", // Example
    };
  }
  componentDidMount() {
    const CampId =
      this.props.history.location.state && this.props.history.location.state;
    console.log("campID", CampId);
    this.props.CampaignTableAction();
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
    const { show, hide, checked, exampleModal } = this.state;
    const { Tables, CampaignOverviewAction } = this.props;

    return (
      <>
        <PageHeader
          current="Campaign List"
          parent="Campaign"
          showStatus={false}
        />

        <PageContainer title="Campaign List">
          <Form onSubmit={this.handleSubmit}>
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
          </Form>
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
