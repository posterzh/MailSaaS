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
import { StartCampaignAction } from "../../../../redux/action/CampaignAction";
import { MailGetDataAction } from "../../../../redux/action/MailSenderAction";

class TheStart extends React.Component {
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
    };
  }

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
        <Row>
          <Col>
            <h2 className="text-center my-4">Let's get started</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <label className="form-control-label" htmlFor="inputTitle">
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
              <label className="form-control-label" htmlFor="selectFromAddress">
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
                <option value="1">alextest123@gmail.com</option>

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
export default connect(mapStateToProps, mapDispatchToProps)(TheStart);
