import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Label, Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { OnclickProspectActionData } from '../../../redux/action/ProspectsAction'
export class ProspectOnclick extends Component {
    componentDidMount() {
        this.props.OnclickProspectActionData(this.props);
    }
    render() {
        const { propData } = this.props;
        return (
            <div>
                <Container fluid className='mt-4'>
                    <Row>
                        <Table responsive hover className='prospect_table'>
                            <thead >
                                <tr>
                                    <th><input type='checkbox' /></th>
                                    <th >EMAIL</th>
                                    <th>NAME</th>
                                    <th>CREATED</th>
                                    <th>STATUS</th>
                                    <th>CAMPAGINS</th>
                                    <th>SENT</th>
                                    <th>TASKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type='checkbox'></input></td>
                                    <td> {propData && propData.prospectOnclickData.email}</td>
                                    <td> {propData && propData.prospectOnclickData.full_name}</td>
                                    <td> {propData && propData.prospectOnclickData.created_date}</td>
                                    <td> {propData && propData.prospectOnclickData.status}</td>
                                    <td> {propData && propData.prospectOnclickData.campaign}</td>
                                    <td> {propData && propData.prospectOnclickData.sent}</td>
                                </tr>
                            </tbody>

                        </Table>
                    </Row>
                </Container>

            </div>
        )
    }
}

// export default ProspectOnclick
const mapStateToProps = (state) => {
    console.log("cheking state for onclick", state.OnclickProspectsReducer)
    return {
        propData: state.OnclickProspectsReducer,
        // id:state.ProspectsGetReducer
        // id:state.OnclickProspectsReducer.prospectOnclickData && state.OnclickProspectsReducer.prospectOnclickData.id
    }
}
const mapDispatchToProps = dispatch => ({
    OnclickProspectActionData: prospectOnclickData => { dispatch(OnclickProspectActionData(prospectOnclickData)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(ProspectOnclick)