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
import {
  campaignStart,
  campaignCompose,
} from "../../../../redux/action/CampaignActions";

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
    // this.props.MailGetDataAction();
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

  saveState = () => {
    console.log("saving start state ...");

    const payload = {
      title: this.state.title,
      fromAddress: this.state.from_address,
    };

    this.props.campaignStart(payload);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.hasFocus && !this.props.hasFocus) {
      this.saveState();
    }
  }

  onPrev = () => {
    // some validation

    // call parent method
    this.props.onPrev();
  };

  onNext = () => {
    // some validation
    console.log("Start : validation success");

    // call parent method
    this.props.onNext();
  };

  render() {
    const { onPrev, onNext } = this.props;

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

        {/* Buttons */}
        <Row className="my-3">
          <Col className="d-flex align-items-center justify-content-center">
            {onPrev && (
              <Button color="primary" type="button" onClick={this.onPrev}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                PREV{" "}
              </Button>
            )}
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            {onNext && (
              <Button color="danger" type="button" onClick={this.onNext}>
                NEXT <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </Button>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  campaign: state.campaign,
});
export default connect(mapStateToProps, { campaignStart, campaignCompose })(
  TheStart
);
