import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CardBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    CardTitle
} from 'reactstrap'
import { ProspectActionData, ProspectUnsubscribeAction } from '../../../redux/action/ProspectsAction'
import ProspectOnclick from './ProspectOnclick'
import { OnclickProspectActionData, deleteProspectAction } from '../../../redux/action/ProspectsAction'
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../TableContent";


const SpanStyles = {
    paddingRight: "10px",
    paddingLeft: "10px",
    color: "white",
    fontSize: "25px",
    cursor: 'pointer'
};
const Span = {
    paddingRight: "20px",
    paddingLeft: "20px",
    color: "white",
    fontSize: "25px",
    borderRight: "1px dashed",
    marginRight: "10px"
};

class Prospects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dd1: false,
            value: 'Any',
            searchEmail: "",
            showProspect: false,
            isSelectionBar: false,
            selectedId: [],
            id: '',
            selected: 'total'
        };
    }
    dropdownToggle = () => {
        this.setState({
            dd1: !this.state.dd1
        });
    }
    toggle = (id) => {
        this.setState({
            showProspect: !this.state.showProspect,
            id: id
        })
    }
    showSelectionBar = (id) => {
        const { selectedId } = this.state
        this.setState({
            isSelectionBar: true,
        })

        if (selectedId.length === 0) {
            selectedId.push(id)
            return
        }
        for (let index = 0; index < selectedId.length; index++) {
            if (id === selectedId[index]) {
                let array = selectedId.filter(e => e != id)
                this.setState({
                    selectedId: array
                })
                return
            }
        }
        selectedId.push(id)
    }
    ProspectDelete = (data) => {
        let id = this.state.selectedId;
        this.props.deleteProspectData(id)
        // this.state.selectedId.length = 0;
        this.setState({
            isSelectionBar: false,
            checked: false
        })
        alert("deleted")
    }
    unsubscribeProspect = () => {
        this.props.unsubscribeProspectAction(this.state.selectedId)
        this.setState({
            isSelectionBar: false,
            selectedId: []
        })
        alert("unsubscribed")
    }
    componentDidMount() {
        this.props.ProspectActionData(this.props);
    }
    paginationCallback(value) {
        console.log("value : ", value)
    }
    getSelectedRecords(value) {
        console.log("return=" + value);
    }
    actionCallback(type, item) {
        console.log("item = ", item, " , type : ", type);
    }
    render() {
        const { showProspect, isSelectionBar, selectedId } = this.state;
        const { prospectData, propData } = this.props;
        const tableTitle = [
            {
                key: 'email',
                value: 'Email',
            },
            {
                key: 'name',
                value: 'Name',
            },
            {
                key: 'created',
                value: 'Created',
            },
            {
                key: 'status',
                value: 'Status',
            },
            {
                key: 'campaign',
                value: 'Campaign',
            },
            {
                key: 'sent',
                value: 'Sent',
            },
            {
                key: 'engaged',
                value: 'Engaged',
            },
            {
                key: 'tasks',
                value: 'Tasks',
            },
        ];
        const tableData = [
            {
                email: 'ajju@gmail.com',
                name: 'Azazul',
                created: '10-10-2020',
                status: 'Passed',
                campaign: '1458',
                sent: '10',
                engaged: '9',
                tasks: '8'
            },
            {
                email: 'janak@gmail.com',
                name: 'Azazul',
                created: '10-10-2020',
                status: 'Passed',
                campaign: '1458',
                sent: '10',
                engaged: '2',
                tasks: '8'
            },
            {
                email: 'ajju@gmail.com',
                name: 'janak',
                created: '10-10-2020',
                status: 'Passed',
                campaign: '1458',
                sent: '10',
                engaged: '2',
                tasks: '8'
            }
        ];
        const filters = [
            {
                key: 'email',
                options: ['janak@gmail.com', 'ajajul@gmail.com', 'mikin@gmail.com', 'ajju@gmail.com']
            },
            {
                key: 'name',
                options: ['janak', 'ajajul', 'mikin']
            }
        ];
        const actionMenus = [
            {
                key: 'view',
                name: 'View'
            },
            {
                key: 'edit',
                name: 'Edit'
            },
            {
                key: 'delete',
                name: 'Delete'
            }
        ]
        return (
            <div className="prospect-main-container">
                <PageHeader
                    current="Prospects"
                    parent="Prospects"
                    showStatus={false}
                />
                <PageContainer title={false} showHelper={false}>
                    <Row>
                        <Col sm="12" md="3">
                            <Form>
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="exampleFormControlSelect1"
                                    >
                                        Teammate
                                    </label>
                                    <Input id="exampleFormControlSelect1" className="form-control-sm" type="select" defaultValue="any">
                                        <option value="any">Any</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'total' }) }}>
                            <Card className={this.state.selected === 'total' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>120</div>
                                            <div>Total</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'in-campaign' }) }}>
                            <Card className={this.state.selected === 'in-campaign' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>94</div>
                                            <div>In Campaign</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'engaged' }) }}>
                            <Card className={this.state.selected === 'engaged' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>9</div>
                                            <div>Engaged</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'leads' }) }}>
                            <Card className={this.state.selected === 'leads' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>13</div>
                                            <div>Leads</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'bounces' }) }}>
                            <Card className={this.state.selected === 'bounces' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>2</div>
                                            <div>Bounces</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'unsubscribes' }) }}>
                            <Card className={this.state.selected === 'unsubscribes' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>18</div>
                                            <div>Unsubscribes</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Tables
                            titles={tableTitle} // required
                            tablePropsData={tableData}   // required
                            showAction={true}    // optional
                            actionMenus={actionMenus}   // optional for showing menus of row.
                            actionCallback={this.actionCallback}        // get call back for action select of row.
                            showSelect={true}    // optional
                            selectedCallback={this.getSelectedRecords}      // get call back for select object.
                            showPagination={true}   // optional
                            paginationCallback={this.paginationCallback}     // get callback of page change.
                            filters={filters}   // optional to enable filter
                            searchKeys={['email', 'name']}  // optional to enable search
                        />
                    </Row>
                </PageContainer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("propData: state.OnclickProspectsReducer.prospectOnclickData &&state.OnclickProspectsReducer.prospectOnclickData", state.OnclickProspectsReducer.prospectOnclickData && state.OnclickProspectsReducer.prospectOnclickData)
    return {
        prospectData: state.ProspectsGetReducer.prospectData,
        id: state.ProspectsGetReducer.prospectData,
        propData: state.OnclickProspectsReducer.prospectOnclickData && state.OnclickProspectsReducer.prospectOnclickData
    }
}
const mapDispatchToProps = dispatch => ({
    ProspectActionData: prospectData => {
        dispatch(ProspectActionData(prospectData))
    },
    unsubscribeProspectAction: id => {
        dispatch(ProspectUnsubscribeAction(id))
    },
    OnclickProspectActionData: id => { dispatch(OnclickProspectActionData(id)) },
    deleteProspectData: id => { dispatch(deleteProspectAction(id)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(Prospects)
