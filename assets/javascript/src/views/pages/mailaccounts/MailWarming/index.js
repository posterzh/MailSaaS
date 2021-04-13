import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import Tables from "../../../../components/Tables";
import {
  getMailAccounts
} from "../../../../redux/action/MailAccountsActions";
import {
  getWarmings,
  updateWarmings,
} from "../../../../redux/action/WarmingActions";

import { toastOnError, toastOnSuccess, toggleTopLoader } from "../../../../utils/Utils";

const tableTitle = [
  {
    key: "email_provider",
    value: "Email Provider",
  },
  {
    key: "email",
    value: "Email",
  },
  {
    key: "first_name",
    value: "First Name",
  },
  {
    key: "last_name",
    value: "Last Name",
  },
];

const actions = [{
  key: 'warming_enabled',
  type: 'toggle',
  theme: 'warning',
  labelPositive: 'On',
  labelNegative: 'Off',
  disabled: false
}]

class WarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const mail_accounts = await this.props.getMailAccounts();
    const warmings = await this.props.getWarmings();
    this.setState({
      data: [...mail_accounts.map(item => {
        const warming = warmings.filter(warm_item => warm_item.mail_account_id == item.id);
        if (warming) {
          return {
            ...warming[0],
            ...item
          }
        }
        return item;
      })]
    })
  }

  async onTblValChange(field, value, record, recordIndex) {
    const { data } = this.state;
    if (field === 'warming_enabled') {
      const account_changed = data.filter(item => item.id === record.id);
      if (!account_changed.length) {
        return;
      }
      const origin_value = account_changed[0][field];
      account_changed[0][field] = value;
      this.setState({
        data: [...data]
      })

      // Call API
      try {
        const response = await this.props.updateWarmings(account_changed[0].id, {
          warming_enabled: value
        })
        if (response.success) {
          toastOnSuccess("Updated successfully!");
        } else {
          throw response.message || "Failed to update warming setting!";
        }
      } catch (e) {
        toastOnError(e);
        account_changed[0][field] = origin_value;
        this.setState({
          data: [...data]
        })
      }
    }
  }

  render() {
    const { data } = this.state;

    return (
      <>
        <PageHeader
          current="Mail Warming"
          parent="Mail Accounts"
          showStatus={false}
        />
        <PageContainer title="Email Warming">
          <div className="px-3">
            <h3 className="mb-1">
              Automatically send and reply emails from MailSaaS community to warm up your email account.
            </h3>
            <p>
              Note: By enabling this feature, you will automatically be sending emails and replying other members
            </p>
          </div>
          
          <div className="px-3 mt-2 mb-4">
            <h2 className="mb-2">
              Choose how warm you want your email account to be
            </h2>
            <div className="section-round-border">
              <Row className="mx-0">
                <Col sm="6">
                  <FormGroup className="mt-2 mb-3">
                    <label
                      className="form-control-label"
                      htmlFor="warmNumberPerDay"
                    >
                      Number of warm-up email per day after ramp-up
                    </label>
                    <Input
                      id="warmNumberPerDay"
                      placeholder=""
                      type="number"
                      value={20}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup className="mt-2 mb-3">
                    <label
                      className="form-control-label"
                      htmlFor="warmIncPerDay"
                    >
                      Ramp-up increment value per day
                    </label>
                    <Input
                      id="warmIncPerDay"
                      placeholder=""
                      type="number"
                      value={3}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </div>

          <Row>
            <Tables
              titles={tableTitle} // required
              tablePropsData={data} // required
              showPagination={true} // optional
              actions={actions}
              onChange={this.onTblValChange.bind(this)}
            />
          </Row>
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  mailAccounts: state.mailAccounts.mailAccounts,
});

export default connect(mapStateToProps, {
  getMailAccounts,
  getWarmings,
  updateWarmings,
})(WarmList);
