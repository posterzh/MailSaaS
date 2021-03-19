import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import {
  CampaignLeadCatcherAction,
  CampaignLeadGetAction,
  CampaignLeadDeleteAction,
  CampaignLeadUpdateAction,
} from "../../../../redux/action/CampaignAction";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";

export class CampaignDetailSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipientsData: "",
      num: "",
      specific_link: null,
      isOpen: false,
      show: false,
      hide: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      show: true,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isOpen: true });
    if (!this.state.recipientsData || !this.state.num) {
      alert("Fill all information");
    }
    var id =
      this.props.history.location.state && this.props.history.location.state.id;
    if (this.props.lead && this.props.lead.campaign) {
      //put
      const updateLeadData = {
        leadcatcher_recipient: this.state.recipientsData,
        of_times: this.state.num,
        specific_link: this.state.specific_link,
      };
      const getId = this.props.lead.id;
      this.props.CampaignLeadUpdateAction(getId, id, updateLeadData);
    } else {
      //post
      const leadData = {
        leadcatcher_recipient: this.state.recipientsData,
        of_times: this.state.num,
        specific_link: this.state.specific_link,
      };
      this.props.CampaignLeadCatcherAction(id, leadData);
    }
  };
  componentDidMount() {
    const id =
      this.props.history.location.state && this.props.history.location.state.id;
    this.props.CampaignLeadGetAction(id);
  }
  // this.props.CampaignLeadUpdateAction(id)
  componentWillReceiveProps(preProps, nextProps) {
    console.log({
      preProps,
      nextProps,
    });
  }
  leadDeleteAction(id) {
    this.props.CampaignLeadDelete(id);
    alert("You want to delete this leadCatcher");
  }
  render() {
    const id =
      this.props.history.location.state && this.props.history.location.state.id;
    const { lead, leadData } = this.props;
    return (
      <>
        <PageHeader
          current="Date Outreach"
          parent="Campaign List"
          showStatus={false}
        />

        <PageContainer title="Date Outreach" showHelper={true}>
          <Row>
            <DetailHeader activeItem="SETTINGS" />
          </Row>

          <Row className="mx-3 my-5">
            <Col md={4}>
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Sending Account</h3>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="selectFromAddress"
                    >
                      From address
                    </label>
                    <Input
                      id="selectFromAddress"
                      type="select"
                      className="form-control-sm"
                    >
                      <option>test@gmail.com</option>
                      <option>admin@gmail.com</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">From name</label>
                    <Input type="text" className="form-control-sm" />
                  </FormGroup>

                  <Row>
                    <Col>
                      <Button color="danger">SAVE</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Lead Catcher</h3>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="selectFromAddress"
                    >
                      Who should leads be assigned to?
                    </label>
                    <Input
                      id="selectFromAddress"
                      type="select"
                      className="form-control-sm"
                    >
                      <option>test@gmail.com</option>
                      <option>admin@gmail.com</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">
                      When does a recipient become a lead?
                    </label>
                    <Input type="text" className="form-control-sm" />
                  </FormGroup>

                  <Row>
                    <Col>
                      <Button color="danger">SAVE </Button>
                    </Col>
                    <Col>
                      <Button color="secondary">CANCEL</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lead: state.LeadGetReducer && state.LeadGetReducer.leadGetData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  CampaignLeadCatcherAction: (id, leadData) => {
    dispatch(CampaignLeadCatcherAction(id, leadData));
  },
  CampaignLeadDelete: (id) => {
    dispatch(CampaignLeadDeleteAction(id));
  },
  CampaignLeadGetAction: (id) => {
    dispatch(CampaignLeadGetAction(id));
  },
  CampaignLeadUpdateAction: (getId, id, updateLeadData) => {
    dispatch(CampaignLeadUpdateAction(getId, id, updateLeadData));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetailSettings);
