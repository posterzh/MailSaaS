import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { getMailAccounts } from "../../../../redux/action/MailAccountsActions";

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
    this.state = {
      activeTab: 0,
    };

    this.tabs = ["START", "RECIPIENT", "COMPOSE", "PREVIEW", "OPTIONS", "SEND"];
  }

  componentDidMount() {
    this.props.getMailAccounts();
  }

  onChangeTab = (tabId) => {
    this.setState({ activeTab: tabId });
  };

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
    const { campaign } = this.props;
    return (
      <>
        <PageHeader
          current="New Campaign"
          parent="Campaign"
          showStatus={false}
        />

        <PageContainer title={activeTab == 0? "New Campaign": campaign.title}>
          <Row>
            <Col md={8} className="mx-auto">
              <Row>
                <Col className="new-campaign-header">
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
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign
});

export default connect(mapStateToProps, {getMailAccounts})(CampaignStart);
