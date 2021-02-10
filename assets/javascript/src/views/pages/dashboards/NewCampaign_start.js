import React from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Form, Input } from 'reactstrap';
import { StartCampaignAction } from "../../../redux/action/CampaignAction";

class NewCampaign_start extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            from_address: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)

        const data = {
            title: this.state.title,
            from_address: this.state.from_address
        }
        this.props.StartCampaignAction(data)
    }
    render() {
        return (
            <div>
                <div style={{ height: '100%', width: '100%' }}>
                    <Form onSubmit={this.handleSubmit}>
                        <Container fluid>
                            <Row >
                                <Col md='5' className='mx-auto mt-5'>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }} >
                                        <h1 style={{ fontSize: '30px', textAlign: 'center', color: "#333333" }}> Let's get started</h1>
                                    </Row>
                                    <Row className='mt-5'>
                                        <div style={{ width: '100%' }}> <label>Title (for your team's eyes only)</label><br></br>
                                            <input type='text' name='title' value={this.state.title} onChange={this.handleChange} className='start_input' autoComplete="off"></input></div>
                                    </Row>
                                    <Row className='mt-5'>
                                        <div style={{ width: '100%' }}><label >From Address</label><br></br>
                                            <Input type="select" name="from_address" value={this.state.from_address} onChange={this.handleChange} id="exampleSelect">
                                                <option value="(I'll decide later)">(I'll decide later)</option>
                                                <option value='email'>Email</option>
                                                <option value='Option'>Option</option>
                                                <option></option>
                                            </Input></div>
                                    </Row>
                                    <Row className='mt-5'>
                                        <Col style={{ display: "flex", justifyContent: "center" }}>
                                            <button type='submit' className='btn startBtn'> Next <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                            </button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // token: state.token
    };
};
const mapDispatchToProps = dispatch => ({
    StartCampaignAction: data => {
        dispatch(StartCampaignAction(data));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign_start)
