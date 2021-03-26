import React from "react";
import {
  Row,
  TabContent,
  TabPane,
  NavLink,
  Nav,
  NavItem,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
  Col,
} from "reactstrap";
import Domainpage from "./components/Domainpage";
import Addresstable from "./components/Addresstable";
import classnames from "classnames";
import { Component } from "react";
import { connect } from "react-redux";
import UnsubscribesModal from "./components/UnsubscribesModal";
import CSVDownloadModal from "./components/CSVDownloadModal";
import DeleteModal from "./components/DeleteModal";

import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";

import {
  getUnsubscribes,
  addUnsubscribeEmails,
  addUnsubscribeCSV,
  deleteUnsubscribeEmails,
} from "../../../../redux/action/UnsubscribeActions";

class Unsubscribes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: undefined,
      activeTab: "addressTab",
      selectedId: [],
      unsubscribeModal: false,
      downloadCSVModal: false,
      deleteModal: false,
      email: "",
    };
  }

  componentDidMount() {
    this.props.getUnsubscribes();
  }

  onSearch = () => {
    this.props.getUnsubscribes(this.state.search);
  }

  unsubscribeEmail = (emailList) => {
    const user = this.props.user;
    this.props.addUnsubscribeEmails(emailList, user);
  };

  unsubscribeCSV = (file) => {
    this.props.addUnsubscribeCSV(file);
  }

  deleteUnsubscribes = (selectedId) => {
    this.props.deleteUnsubscribeEmails(selectedId);
    this.setState({ deleteModal: false });
    this.setState({ selectedId: [] });
  };

  closeUnsubscribeModal = () => {
    this.setState({ unsubscribeModal: false });
  };

  closeDownloadCSVModal = () => {
    this.setState({ downloadCSVModal: false });
  }

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  switchTab = (tab) => {
    if (this.state.activeTab !== tab)
      this.setState({ activeTab: tab, selectedId: [] });
  };

  selectRow = (id, e) => {
    const { selectedId } = this.state;
    let newSelectedId = [...selectedId];
    if (e.target.checked) {
      newSelectedId.push(id);
    } else {
      newSelectedId = newSelectedId.filter((item) => item != id);
    }
    this.setState({ selectedId: newSelectedId });
  };

  selectAll = (e) => {
    let newSelectedId = [];
    if (e.target.checked) {
      if (this.state.activeTab === 'addressTab') {
        newSelectedId = this.props.unsubscribes
          .filter(e => !e['email'].startsWith('*@'))
          .map((item) => item.id);
      } else if (this.state.activeTab === 'domainTab') {
        newSelectedId = this.props.unsubscribes
          .filter(e => e['email'].startsWith('*@'))
          .map((item) => item.id);
      }
    }
    this.setState({ selectedId: newSelectedId });
  };

  render() {
    const { selectedId } = this.state;
    const { unsubscribes } = this.props;

    const unsubscribesAddress = unsubscribes
      .filter(e => !e['email'].startsWith('*@'));
    const unsubscribesDomain = unsubscribes
      .filter(e => e['email'].startsWith('*@'))
      .map(e => ({ ...e, 'domain': e['email'].substring(2) }));
    const selectedUnsubscribes = unsubscribes
      .filter(e => selectedId.includes(e.id));

    return (
      <>
        <PageHeader
          current="Unsubscribes"
          parent="Unsubscribes"
          showStatus={false}
        />
        <PageContainer title="Unsubscribes" showHelper={true} newButton="New Unsubscribes"
          newAction={e => {this.setState({ unsubscribeModal: !this.state.unsubscribeModal });}}>
          <Row>
            <Col lg="5" md="12" sm="12" className="mb-2">
              <InputGroup className="input-group-merge">
                <Input
                  placeholder="Search"
                  name="search"
                  type="search"
                  onChange={this.handleChange} />
                <InputGroupAddon onClick={this.onSearch} addonType="append">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col lg="7" md="12" sm="12">
              <Button
                className="btn-icon btn-2"
                type="button"
                onClick={() => window.location.reload()}
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-refresh" />
                  <span className="btn-inner--text">REFRESH</span>
                </span>
              </Button>
              <Button
                className="btn-icon btn-2 ml-xs-0 mt-xs-1"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ downloadCSVModal: !this.state.downloadCSVModal });
                }}
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-save" />
                </span>
                <span className="btn-inner--text">EXPORT</span>
              </Button>
            </Col>
          </Row>

          <div className="tabs-nav-wrapper mt-5 mb-3">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "addressTab",
                  })}
                  onClick={() => {
                    this.switchTab("addressTab");
                  }}
                >
                  ADDRESS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "domainTab",
                  })}
                  onClick={() => {
                    this.switchTab("domainTab");
                  }}
                >
                  DOMAIN
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="addressTab">
              <Addresstable
                selectAll={this.selectAll}
                selectRow={this.selectRow}
                data={unsubscribesAddress}
                selectedId={selectedId}
              />
            </TabPane>
            <TabPane tabId="domainTab">
              <Domainpage
                selectAll={this.selectAll}
                selectRow={this.selectRow}
                data={unsubscribesDomain}
                selectedId={selectedId}
              />
            </TabPane>
          </TabContent>
          <Button
            className="btn-icon btn-2 rounded-circle fixed-bottom-right-btn mr-6"
            color="danger"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ deleteModal: !this.state.deleteModal });
            }}
          >
            <span className="btn-inner--icon">
              <i className="fa fa-minus" />
            </span>
          </Button>
          <Button
            className="btn-icon btn-2 rounded-circle fixed-bottom-right-btn"
            color="info"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ unsubscribeModal: !this.state.unsubscribeModal });
            }}
          >
            <span className="btn-inner--icon">
              <i className="fa fa-plus" />
            </span>
          </Button>
          <UnsubscribesModal
            isOpen={this.state.unsubscribeModal}
            unsubscribeEmail={this.unsubscribeEmail}
            unsubscribeCSV={this.unsubscribeCSV}
            close={this.closeUnsubscribeModal}
          />
          <CSVDownloadModal
            data={selectedUnsubscribes}
            isOpen={this.state.downloadCSVModal}
            close={this.closeDownloadCSVModal}
          />
          <DeleteModal
            isOpen={this.state.deleteModal}
            close={this.closeDeleteModal}
            delete={() => this.deleteUnsubscribes(this.state.selectedId)}
          />
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    unsubscribes: state.unsubscribes.unsubscribes
  };
};

export default connect(mapStateToProps, {
  getUnsubscribes,
  addUnsubscribeEmails,
  addUnsubscribeCSV,
  deleteUnsubscribeEmails,
})(Unsubscribes);

// const mapStateToProps = (state) => {
//   return {
//     data: state.UnsubscribeReducer.unsubscribeData,
//     loading: state.UnsubscribeReducer.loading,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   fetchUnsbcribed: () => {
//     dispatch(fetchUnsubscribeAction());
//   },
//   deleteUnsubscribeUsers: (data) => {
//     dispatch(deleteUnsubscribeUsersAction(data));
//   },
//   unsubscribeUsersWithCsvAction: (data) => {
//     dispatch(unsubscribeUsersWithCsvAction(data));
//   },
//   unsubscribeUsersWithEmailAction: (data) => {
//     dispatch(unsubscribeUsersWithEmailAction(data));
//   },
// });