/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import * as _ from "lodash";

// reactstrap components
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";
// core components

function Tables({ titles = [], showAction=false, showSelect=false, tablePropsData=[] , paginationCallback=null, perpageRecords=10, acitvePage=1}) {
    const [sort, setSort] = React.useState(null);
    const [sortType, setSortType] = React.useState('asc');
    const [tableData, setTableData] = React.useState([]);
    const [noData, setNoData] = React.useState(false);
    const [recordLimit, setRecordLimit] = React.useState(perpageRecords);
    const [acitve, setActive] = React.useState(acitvePage);

    const sortData = (item) => {
        let data = [];
        if (sort === item.key) {
            if (sortType === 'asc') {
                data = _.orderBy(tableData, [item.key], ['desc']);
                setSortType('desc');
            } else {
                data = _.orderBy(tableData, [item.key], ['asc']);
                setSortType('asc');
            }
        } else {
            data = _.orderBy(tableData, [item.key], ['asc']);
            setSortType('asc');
        }
        setTableData(data);
        setSort(item.key);
    }

    const pageChange = (page) => {

    }

    const pagination = () => {
        const total_records = tableData.length;
        let pages = Array.from(Array(parseInt(total_records/perpageRecords)).keys());
        if (parseInt(total_records/perpageRecords) < (total_records/perpageRecords)) {
            pages = Array.from(Array(parseInt(total_records/perpageRecords) + 1).keys());
        }
        return (
            <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
            >
                <PaginationItem className="disabled">
                    <PaginationLink
                        href="#pablo"
                        onClick={(e) => pageChange(1)}
                        tabIndex="-1"
                    >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                    </PaginationLink>
                </PaginationItem>
                {
                    pages.map((item, index) => {
                        return (
                            <PaginationItem key={"page" + (index+1)} className={(index+1) === acitve ? "active" : ""}>
                                <PaginationLink
                                    onClick={(e) => pageChange(index+1)}
                                >
                                    {index+1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })
                }
                <PaginationItem>
                    <PaginationLink
                        href="#pablo"
                        onClick={(e) => pageChange(pages.length)}
                    >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        )
    }
    
    const selectRecord = (e, index) => {
        console.log('99999999999999999999999999999999999')
        let data = tableData;
        data[index].selected = e.target.checked;
        setTableData(data)
        console.log(data)
    }

    const selectAllRecord = (e) => {
        let data = tableData;
        if (e.target.checked) {
            _.forEach(data, (item) => {
                item.selected = true;
            })
        } else {
            _.forEach(data, (item) => {
                item.selected = false;
            })
        }
    }

    React.useEffect(()=> {
        if (tableData.length == 0 && !noData) {
            if (tablePropsData.length == 0) {
                setNoData(true)
            }
            if (showSelect) {
                _.forEach(tablePropsData, (item) => {
                    item.selected = false;
                })
            }
            setTableData(tablePropsData);
        }
    }, [tableData])

    return (
        <>
            <Container fluid>
                <Row>
                    <div className="col">
                        <Card>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        { showSelect &&
                                            <th key="header-select">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="table-check-all"
                                                        type="checkbox"
                                                        onClick={(e)=>{selectAllRecord(e)}}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="table-check-all"
                                                    />
                                                </div>
                                            </th>
                                        }
                                        {
                                            titles.map((item, index) => {
                                                return (
                                                    <th className="sort" onClick={() => sortData(item)} key={"header-" + item.key} data-sort="name" scope="col">
                                                        {item.value}
                                                    </th>
                                                )
                                            })
                                        }
                                        { showAction &&<th scope="col" key="header-actions"/> }
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    {
                                        tableData.map((data, index) => {
                                            return (
                                                <tr key={"table-items" + index}>
                                                    { showSelect &&
                                                        <th key={"header-select-" + index}>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    className="custom-control-input"
                                                                    id={"table-check-all" + index}
                                                                    type="checkbox"
                                                                    
                                                                    onChange={(e)=>{selectRecord(e, index)}}
                                                                    
                                                                />
                                                                {console.log(data.selected)}
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor={"table-check-all" + index}
                                                                />
                                                            </div>
                                                        </th>
                                                    }
                                                    {
                                                        titles.map((item) => {
                                                            // console.log(data[item.key], item.key);
                                                            return (
                                                                <th className="sort" onClick={() => sortData(item)} key={"header-" + item.key + index} data-sort="name" scope="col">
                                                                    {data[item.key]}
                                                                </th>
                                                            )
                                                        })
                                                    }
                                                    { showAction &&
                                                        <td className="text-right" key={"header-actions" + index}>
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className="btn-icon-only text-light"
                                                                    color=""
                                                                    role="button"
                                                                    size="sm"
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </DropdownToggle>
                                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                                    <DropdownItem
                                                                        href="#pablo"
                                                                        onClick={(e) => e.preventDefault()}
                                                                    >
                                                                        Action
                                                                    </DropdownItem>
                                                                    <DropdownItem
                                                                        href="#pablo"
                                                                        onClick={(e) => e.preventDefault()}
                                                                    >
                                                                        Another action
                                                                    </DropdownItem>
                                                                    <DropdownItem
                                                                        href="#pablo"
                                                                        onClick={(e) => e.preventDefault()}
                                                                    >
                                                                        Something else here
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    {pagination()}
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Tables;
