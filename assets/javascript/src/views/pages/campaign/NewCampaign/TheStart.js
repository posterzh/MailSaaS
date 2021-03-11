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
  campaignStart
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
      from_address: "",
      mailsExist: null,
    };
  }

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
    this.props.campaignStart(data);
    this.props.onNext();
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

  // saveState = () => {
  //   console.log("saving start state ...");

  //   const payload = {
  //     title: this.state.title,
  //     fromAddress: this.state.from_address,
  //   };

  //   this.props.campaignStart(payload);
  // };

  // onPrev = () => {
  //   this.props.onPrev();
  // };

  // onNext = () => {
  //   this.saveState();
  //   // call parent method
  //   this.props.onNext();
  // };

  render() {
    const { onPrev, onNext } = this.props;

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
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
                  required
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
                  required
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
            <Col className="text-left">
              {onPrev && (
                <Button color="primary" type="button" outline onClick={this.onPrev}>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  {" "}PREV
                </Button>
              )}
            </Col>
            <Col className="text-right">
              {onNext && (
                <Button color="danger" type="submit">
                  NEXT <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  campaign: state.campaign,
});
export default connect(mapStateToProps, { campaignStart })(
  TheStart
);
