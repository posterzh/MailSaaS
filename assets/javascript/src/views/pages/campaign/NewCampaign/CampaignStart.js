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
import CampaignsHeader from "./components/CampaignsHeader";
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
      titleState: '',
      addressState: '',
      from_address: "",
      mailsExist: null,
    };
    
  }

  validateCustomStylesForm = () => {
    if (this.state.title) {
      this.setState({titleState: 'valid'});
    } else {
      this.setState({titleState: 'invalid'});
    }

    if (this.state.from_address) {
      this.setState({addressState: 'valid'});
    } else {
      this.setState({addressState: 'invalid'});
    }
    
  }
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
      console.log("Call");
      return {
        from_address: props.mailGetData && props.mailGetData[0].id,
        mailsExist: true,
      };
    }
    // if (props.mailGetData && !props.mailGetData.length) {
    //   alert("Please go to create mail account");
    //   return {
    //     mailsExist: false,
    //   };
    // }
    return null;
  }

  // componentWillReceiveProps(preProps, nextProps) {
  //   console.log({
  //     preProps,
  //     nextProps,
  //   });
  // }
  render() {
    const { mailGetData } = this.props;
    const { mailsExist } = this.state;
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
              <Form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                <Row>
                  <Col>
                    <CampaignsHeader color="secondary" activeItem="START" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2 className="text-center my-4">Let's get started</h2>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="inputTitle"
                      >
                        Title (for your team's eyes only)
                      </label>
                      <Input
                        id="inputTitle"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder={this.state.title}
                        valid={this.state.titleState === "valid"}
                        invalid={this.state.titleState === "invalid"}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="selectFromAddress"
                      >
                        From Address
                      </label>
                      <Input
                        id="selectFromAddress"
                        type="select"
                        name="from_address"
                        value={this.state.from_address}
                        onChange={this.handleChange}
                        valid={this.state.addressState === "valid"}
                        invalid={this.state.addressState === "invalid"}
                      >
                        <option value="">Select</option>
                        <option value="1">keshavgoyal@externlabs.com</option>

                        {/* {mailGetData &&
                          mailGetData.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.email}
                              </option>
                            );
                          })} */}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col className="d-flex align-items-center justify-content-center">
                    <Button 
                      color="danger" 
                      type="submit"
                      disabled={this.state.title === "" || this.state.from_address === ""}
                      onClick={this.validateCustomStylesForm}
                    >
                      NEXT{" "}
                      <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </Button>

                    {/* <Link
                      to={{
                        pathname: "/app/admin/CampaignRecipient",
                        state: {
                          id:
                            this.props.history.location.state &&
                            this.props.history.location.state.id,
                        },
                      }}
                    >
                      <Button color="danger" type="button" type="submit">
                        NEXT{" "}
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </Button>
                    </Link> */}
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
  // console.log("------------------------->",state.MailGetDataReducer.mailGetData&&state.MailGetDataReducer.mailGetData.map((e,i)=> e.email[0].id))
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
