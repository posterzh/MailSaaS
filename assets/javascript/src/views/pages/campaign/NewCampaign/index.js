import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { StartCampaignAction } from "../../../../redux/action/CampaignAction";
import { MailGetDataAction } from "../../../../redux/action/MailSenderAction";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import CampaignTabs from "./components/CampaignTabs";
// Page Components
import TheStart from "./TheStart";
import TheRecipient from "./TheRecipient";
import TheCompose from "./TheCompose";
import ThePreview from "./ThePreview";
import TheOptions from "./TheOptions";
import TheSend from "./TheSend";
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";

class CampaignStart extends React.Component {
  constructor(props) {
    super(props);
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
    const title = thisMonth + " " + now.getDate() + " Outreach";
    this.state = {
      title: title,
      titleState: "",
      addressState: "",
      from_address: "",
      mailsExist: null,
      activeTab: 0,
    };

    this.tabs = ["START", "RECIPIENT", "COMPOSE", "PREVIEW", "OPTIONS", "SEND"];
  }

  onChangeTab = (tabId) => {
    this.setState({ activeTab: tabId });
  };

  // onClickNext = () => {
  //   this.setState((state) => ({
  //     activeTab: (state.activeTab + 1) % 6,
  //   }));
  // };

  validateCustomStylesForm = () => {
    if (this.state.title) {
      this.setState({ titleState: "valid" });
    } else {
      this.setState({ titleState: "invalid" });
    }

    if (this.state.from_address) {
      this.setState({ addressState: "valid" });
    } else {
      this.setState({ addressState: "invalid" });
    }
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    this.props.MailGetDataAction();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      from_address: this.state.from_address,
    };
    console.log(data);
    this.props.StartCampaignAction(data);
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.mailGetData &&
      props.mailGetData[0] &&
      props.mailGetData[0].id &&
      !state.mailsExist
    ) {
      return {
        from_address: props.mailGetData && props.mailGetData[0].id,
        mailsExist: true,
      };
    }
    return null;
  }

  onPrev = () => {
    this.setState((state) => ({
      activeTab: (state.activeTab - 1) % 6,
    }));
  };

  onNext = () => {
    this.setState((state) => ({
      activeTab: (state.activeTab + 1) % 6,
    }));
  };

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <PageHeader
          current="New Campaign"
          parent="Campaign"
          showStatus={false}
        />

        <PageContainer title="New Campaign">
          <Row>
            <Col md={8} className="mx-auto">
              <Form className="needs-validation" noValidate>
                <Row>
                  <Col>
                    <CampaignTabs tabs={this.tabs} activeTab={activeTab} />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId={0}>
                        <TheStart onNext={this.onNext} />
                      </TabPane>
                      <TabPane tabId={1}>
                        <TheRecipient
                          onPrev={this.onPrev}
                          onNext={this.onNext}
                        />
                      </TabPane>
                      <TabPane tabId={2}>
                        <TheCompose onPrev={this.onPrev} onNext={this.onNext} />
                      </TabPane>
                      <TabPane tabId={3}>
                        <ThePreview onPrev={this.onPrev} onNext={this.onNext} />
                      </TabPane>
                      <TabPane tabId={4}>
                        <TheOptions onPrev={this.onPrev} onNext={this.onNext} />
                      </TabPane>
                      <TabPane tabId={5}>
                        <TheSend onPrev={this.onPrev} />
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    mailGetData:
      state.MailGetDataReducer.mailGetData &&
      state.MailGetDataReducer.mailGetData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  StartCampaignAction: (data) => {
    dispatch(StartCampaignAction(data));
  },
  MailGetDataAction: (mailGetData) => {
    dispatch(MailGetDataAction(mailGetData));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignStart);
