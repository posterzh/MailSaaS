import React from "react";
import * as _ from "lodash";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";
import { Link } from "react-router-dom";

const actionToggleDefaultPositiveLabel = 'Yes';
const actionToggleDefaultNegativeLabel = 'No';
const actionToggleDefaultTheme = 'default';

/**
 * 
 * @param {title} param0 : Titles of table  @Required
 *      @example = [
                {
                    key: 'email',
                    value: 'Email',
                },
                {
                    key: 'name',
                    value: 'Name',
                },
              ];
        @default = []
 * @param {tablePropsData} param1 : Table data to show  @Required
 *      @example = [
            {
                email: 'ajju@gmail.com',
                name: 'Azazul',
            },
            {
                email: 'janak@gmail.com',
                name: 'Azazul',
            },
            {
                email: 'ajju@gmail.com',
                name: 'janak',
            }
        ];
        @default = []
 * @param {showAction} param2 : To sow action menues on last @Optional
        @example = true | false
        @default = false
 * @param {actionMenus} param3 : All action list that show in action menu @Required if @param {showAction} is true
        @example = [
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
        @default = []
 * @param {actionCallback} param4 : This is callback function to call given funtion on click of menu @params (type, item)
        @default = null
 * @param {showSelect} param5 : To show select check box on start in table.
 *      @example = true | false
 *      @default = false
 * @param {selectedCallback} param6 : This is callback funciton to call given funciton on selct | deseldct of checkbox @params ([item])
 *      @default = null
 * @param {showPagination} param7 : To show pagination in table.
 *      @example = true | false
 *      @default = false
 * @param {paginationCallback} param8 : This is callback funciton to call given funciton on change of page @params (page, type)
 *      @default = false
 * @param {perpageRecords} param9 : Prepage record setup
 *      @example = 10 
 *      @default = 10
 * @param {acitvePage} param10 : Active page on pagination.
 *      @default = 1
 * @param {totalPages} param11 : Total records for pagination setting.
 *      @default = null
 * @param {filters} param12 : Show and manage filter of tables.
 *      @example = [
            {
                key: 'email',   // for which field should filter
                options: ['ajajul@gmail.com', 'mikin@gmail.com', 'ajju@gmail.com']  // values for option in filter
            },
            {
                key: 'name',
                options: ['ajajul', 'mikin'] 
            }
        ]
        @default = []
 * @param {searchKeys} param13 : Show and manage search in table.
        @example = ['email', 'name']   // in which fields we apply search.
        @default = []
 * @param {actions} param14 : Action fields to show. This doesn't include edit/delete actions
        @example = [{
          key: 'warm_enabled',      // data field
          type: 'toggle',           // action compoment type. i.e. 'toggle' => toggle button
          theme: 'warning',         // argon color theme values: default, success, info, danger, warning, ...
          labelPositive: 'On',
          labelNegative: 'Off',
          disabled: false
        }]
        @default = []
 * @param {onChange} param15 : Data change event handler
        @param = 
          field         // changed field
          value         // new value
          record        // changed record
          recordIndex   // record index
        @default = null
 */
function Tables({
  titles = [],
  tablePropsData = [],
  showAction = false,
  actionMenus = [],
  actionCallback = null,
  showSelect = false,
  selectedCallback = null,
  showControl = false,
  controlCallback = null,
  showPagination = false,
  paginationCallback = null,
  perpageRecords = 10,
  paginationCnt = 10,
  activePage = 1,
  totalPages = null,
  filters = [],
  searchKeys = [],
  actions = [],
  onChange = null,
  onClick = null,
  onDetail = null,
  onEdit = null,
  onDelete = null,
}) {
  const [sort, setSort] = React.useState(null);
  const [sortType, setSortType] = React.useState("asc");
  const [tableData, setTableData] = React.useState(tablePropsData);
  const [noData, setNoData] = React.useState(false);
  // const [recordLimit, setRecordLimit] = React.useState(perpageRecords);    // for future use.
  const [active, setActive] = React.useState(activePage);
  const [selectAll, setSelectAll] = React.useState(false);
  const [filterParams, setfilterParams] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  const sortData = (item) => {
    let data = [];
    if (sort === item.key) {
      if (sortType === "asc") {
        data = _.orderBy(tableData, [item.key], ["desc"]);
        setSortType("desc");
      } else {
        data = _.orderBy(tableData, [item.key], ["asc"]);
        setSortType("asc");
      }
    } else {
      data = _.orderBy(tableData, [item.key], ["asc"]);
      setSortType("asc");
    }
    setTableData(data);
    setSort(item.key);
  };

  const pageChange = (page, type) => {
    setActive(page);
    paginationCallback && paginationCallback(page, type);
  };

  const pagePrev = (page, type) => {
    if (page < 0) page = 0;
    setActive(page + 1);
    setCurrentPage(page);
  };

  const pageNext = (page, maxLength) => {
    if (page > maxLength) page = maxLength;
    setActive(page + 1);
    setCurrentPage(page);
  };

  const menuClicked = (type, item) => {
    actionCallback && actionCallback(type, item);
  };

  const pagination = () => {
    const total_records = totalPages ? totalPages : tableData.length;
    let pages = Array.from(
      Array(parseInt(total_records / perpageRecords)).keys()
    );
    if (
      parseInt(total_records / perpageRecords) <
      total_records / perpageRecords
    ) {
      pages = Array.from(
        Array(parseInt(total_records / perpageRecords) + 1).keys()
      );
    }
    return (
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        <PaginationItem className={currentPage < paginationCnt ? "disabled" : ""}>
          <PaginationLink onClick={(e) => pagePrev(currentPage - paginationCnt)} tabIndex="-1">
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {pages.slice(currentPage, currentPage + paginationCnt).map((item, index) => {
          const currentIndex = currentPage + index + 1;
          return (
            <PaginationItem
              key={"page" + (currentIndex)}
              className={currentIndex === active ? "active" : ""}
            >
              <PaginationLink onClick={(e) => pageChange(currentIndex)}>
                {currentIndex}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem className={currentPage + paginationCnt > pages.length ? "disabled" : ""}>
          <PaginationLink onClick={(e) => pageNext(currentPage + paginationCnt, pages.length)}>
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  };

  const selectRecord = (e, index) => {
    let data = [...tableData];
    data[index].selected = e.target.checked;
    setTableData(data);
    if (
      _.filter(data, (item) => {
        return item.selected;
      }).length === data.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
    selectedCallback && selectedCallback([data[index]]);
  };

  const selectAllRecord = (e) => {
    let data = [...tableData];
    if (e.target.checked) {
      _.forEach(data, (item) => {
        item.selected = true;
      });
      setSelectAll(true);
    } else {
      _.forEach(data, (item) => {
        item.selected = false;
      });
      setSelectAll(false);
    }
    setTableData(data);
    selectedCallback && selectedCallback(data);
  };

  const changeFilter = (e, type) => {
    let data = [...tablePropsData];
    const filterkeys = { ...filterParams };
    filterkeys[type] = e.target.value;

    setfilterParams(filterkeys);
    _.forEach(filterkeys, (value, key) => {
      data = _.filter(data, (item) => {
        return (item[key] || '').includes(value);
      });
    });
    setTableData(data);
  };

  const searchFilter = (e) => {
    let data = [...tablePropsData];
    let is_available = false;

    data = _.filter(data, (item) => {
      is_available = false;
      _.forEach(searchKeys, (key) => {
        if ((item[key] || '').includes(e.target.value)) {
          is_available = true;
        }
      });
      return is_available;
    });
    setTableData(data);
  };

  React.useEffect(() => {
    if (tableData.length == 0 && !noData) {
      if (tablePropsData.length == 0) {
        setNoData(true);
      }
      if (showSelect) {
        _.forEach(tablePropsData, (item) => {
          item.selected = false;
        });
      }
    }

    setTableData(tablePropsData);
  }, [tablePropsData]);

  return (
    <>
      <Container fluid>
        <Row>
          <div className="col">
            <Card>
              {searchKeys.length > 0 && filters.length > 0 && (
                <CardHeader>
                  <Form onSubmit={e => { e.preventDefault(); }}>
                    <Row>
                      {searchKeys.length > 0 && (
                        <Col md="3" sm="12" key="search">
                          <FormGroup>
                            <label
                              className="form-control-label text-capitalize"
                              htmlFor="exampleFormControlInput1"
                            >
                              Search
                            </label>
                            <Row>
                              <Col>
                                <Input
                                  type="text"
                                  className="form-control-sm"
                                  onChange={searchFilter}
                                  placeholder="search"
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      )}
                      {filters.length > 0 &&
                        filters.map((item) => {
                          return (
                            <Col md="3" sm="12" key={"filter-" + item.key}>
                              <FormGroup>
                                <label
                                  className="form-control-label text-capitalize"
                                  htmlFor="exampleFormControlInput1"
                                >
                                  {item.label || item.key}
                                </label>
                                <Row>
                                  <Col>
                                    <Input
                                      className="form-control-sm"
                                      type="select"
                                      key={"filter-" + item.key}
                                      onChange={(e) =>
                                        changeFilter(e, item.key)
                                      }
                                      defaultValue=""
                                    >
                                      <option value="">All</option>
                                      {item.options.map((option, index) => {
                                        return (
                                          <option value={option} key={'option-' + index}>
                                            {option}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          );
                        })}
                    </Row>
                  </Form>
                </CardHeader>
              )}
              <CardBody className="p-0">
                <Table className="align-items-center table-flush custom-table" hover responsive>
                  <thead className="thead-light">
                    <tr>
                      {showSelect && (
                        <th key="header-select">
                          <div className="custom-control custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="table-check-all"
                              type="checkbox"
                              checked={selectAll}
                              onChange={(e) => {
                                selectAllRecord(e);
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="table-check-all"
                            />
                          </div>
                        </th>
                      )}
                      {showControl && (
                        <th key="header-control">
                        </th>
                      )}
                      {titles.map((item, index) => {
                        return (
                          <th
                            className="sort"
                            onClick={() => sortData(item)}
                            key={"header-" + item.key}
                            data-sort="name"
                            scope="col"
                          >
                            {item.value}
                          </th>
                        );
                      })}
                      {showAction && <th scope="col" key="header-actions" />}
                      <th />
                    </tr>
                  </thead>
                  <tbody className="list">
                    {tableData && tableData
                      .slice((active - 1) * perpageRecords, active * perpageRecords)
                      .map((data, index) => {
                        return (
                          <tr key={"table-items" + index} onClick={(e) => onClick && onClick(data)}>
                            {showSelect && (
                              <td key={"header-select-" + index}>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    className="custom-control-input"
                                    id={"table-check-all" + index}
                                    type="checkbox"
                                    checked={data.selected}
                                    onChange={(e) => { selectRecord(e, index); }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={"table-check-all" + index}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </td>
                            )}
                            {showControl && (
                              <td key="header-control">
                                {data.control &&
                                  <>
                                    <Badge id={`action${index}`} color={data.control == "play" ? "success" : "danger"}
                                      onClick={(e) => {
                                        e.stopPropagation(); controlCallback(data, index);
                                      }}
                                    >
                                      <i className={`fa fa-${data.control}`}></i>
                                    </Badge>
                                    <UncontrolledTooltip
                                      delay={0}
                                      placement="bottom"
                                      target={`action${index}`}
                                    >
                                      {data.tooltip}
                                    </UncontrolledTooltip>
                                  </>
                                }
                              </td>
                            )}
                            {titles.map((item) => {
                              return (
                                <td
                                  className="sort"
                                  key={item.key + index}
                                  scope="col"
                                >
                                  {item.link ? <Link to={item.link.replace('{{id}}', data[item.id])}>{data[item.key]}</Link> : data[item.key]}
                                </td>
                              );
                            })}
                            <td className="table-actions">
                              {
                                onEdit &&
                                <>
                                  <span
                                    className="table-action"
                                    id={`edit${index}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onEdit(data);
                                    }}
                                  >
                                    <i className="fas fa-edit" />
                                  </span>
                                  <UncontrolledTooltip
                                    delay={0}
                                    target={`edit${index}`}
                                  >
                                    Edit
                                </UncontrolledTooltip>
                                </>
                              }
                              {
                                onDelete &&
                                <>
                                  <Badge
                                    // className="table-action table-action-delete"
                                    color="danger"
                                    // style={{color: '#f80031'}}
                                    id={`delete${index}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      onDelete(data);
                                    }}
                                  >
                                    <i className="fas fa-trash" />
                                  </Badge>
                                </>
                              }
                              {
                                onDetail &&
                                <>
                                  <span
                                    className="table-action table-action-detail"
                                    id={`detail${index}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onDetail(data);
                                    }}
                                  >
                                    <i className="fas fa-info-circle" />
                                  </span>
                                  <UncontrolledTooltip
                                    delay={0}
                                    target={`detail${index}`}
                                  >
                                    Detail
                                </UncontrolledTooltip>
                                </>
                              }
                              {
                                actions.map((item, _index) => {
                                  if (item.type === 'toggle') {
                                    const labelPositive = item.labelPositive || actionToggleDefaultPositiveLabel;
                                    const labelNegative = item.labelNegative || actionToggleDefaultNegativeLabel;
                                    const theme = `custom-toggle-${item.theme || actionToggleDefaultTheme}`
                                    return (
                                      <label key={item.type + _index} className={`custom-toggle ${theme} mr-1`}>
                                        <input checked={!!data[item.key]} disabled={!!item.disabled} type="checkbox" onChange={(e) => {
                                          !onChange || onChange(item.key, e.target.checked, data, index);
                                        }} />
                                        <span
                                          className="custom-toggle-slider rounded-circle"
                                          data-label-off={labelNegative}
                                          data-label-on={labelPositive}
                                        />
                                      </label>
                                    )
                                  } else {
                                    return null;
                                  }
                                })
                              }
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </CardBody>

              {showPagination && (
                <CardFooter className="py-4">
                  <nav aria-label="...">{pagination()}</nav>
                </CardFooter>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Tables;
