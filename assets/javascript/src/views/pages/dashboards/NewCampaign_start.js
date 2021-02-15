import React from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Form, Input } from 'reactstrap';
import { StartCampaignAction } from "../../../redux/action/CampaignAction";
import { MailGetDataAction } from '../../../redux/action/MailSenderAction';
import { MailAccount } from '../../../views/pages/MailAccount/MailAccount'
import SMTP from '../../../views/pages/MailAccount/SMTP'

class NewCampaign_start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            from_address: '',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this.props.MailGetDataAction();
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            from_address: this.state.from_address
        }
        this.props.StartCampaignAction(data)
    }
    render() {
        const { mailGetData } = this.props;
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
                                            <input type='text' name='title' value={this.state.title} onChange={this.handleChange} className='start_input' autoComplete="off" required></input></div>
                                    </Row>
                                    <Row className='mt-5'>
                                        <div style={{ width: '100%' }}><label >From Address</label><br></br>
                                            <Input type="select" name='from_address' onChange={this.handleChange} id="exampleSelect" >
                                                {
                                                    mailGetData && mailGetData.map((item, index) => {
                                                        return <option value={item.id}>{item.email}</option>
                                                    })
                                                }
                                            </Input>
                                        </div>
                                    </Row>
                                    <Row className='mt-5'>
                                        <Col style={{ display: "flex", justifyContent: "center" }}>
                                            <button type='submit' className='btn startBtn'> Next <i className="fa fa-arrow-right" aria-hidden="true"></i>
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
        mailGetData: state.MailGetDataReducer.mailGetData
    };
};
const mapDispatchToProps = dispatch => ({
    StartCampaignAction: data => { dispatch(StartCampaignAction(data)) },
    MailGetDataAction: mailGetData => { dispatch(MailGetDataAction(mailGetData)) },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign_start)
