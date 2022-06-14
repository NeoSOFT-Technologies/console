import React, { useEffect, useState } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";

import Form from "react-bootstrap/Form";

import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { getTenantDetails } from "../../../../store/features/saas/input-data/slice";
import {
  resetSearchDataWithQueryField,
  searchDataWithQueryField,
  resetSearchData,
} from "../../../../store/features/saas/search-data/with-query-field/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  ISearchDataWithQueryField,
  ITableColumnData,
  ITableSchema,
} from "../../../../types/saas/index";

import {
  getTableSchema,
  setTableColNames,
} from "./../../../../store/features/saas/manage-table/get-table-schema/slice";
import { getTables } from "./../../../../store/features/saas/manage-table/get-tables/slice";

export default function GetSearchData() {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector(
    (state) => state.searchDataWithQueryFieldState
  );
  const tableData = useAppSelector((state) => state.getTableState);
  const tableColName = useAppSelector((state) => state.getTableSchemaState);
  const tenantDetails = useAppSelector((state) => state.getTenantDetailState);
  const [checkDisable, setCheckDisable] = useState(false);

  const [searchTenant, setSearchTenant] = useState({
    tenantId: "",
    tableName: "",
    queryField: "*",
    searchTerm: "*",
    pageSize: "5",
    orderBy: "",
    order: "asc",
  });
  const [startRecord, setStartRecord] = useState("0");
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [msg, setMsg] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterdata, setFilterData] = useState<any[]>();
  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement> | any
  ) => {
    const { name, value } = event.target;
    const resetData: any[] = [];
    if (name === "tenantId") {
      setMsg(false);
      setSearchTenant({
        ...searchTenant,
        [name]: value,
        tableName: "",
        searchTerm: "*",
        queryField: "",
        pageSize: "5",
        orderBy: "",
        order: "asc",
      });
    } else if (name === "tableName") {
      setMsg(false);
      setSearchTenant({
        ...searchTenant,
        [name]: value,
        searchTerm: "*",
        queryField: "",
        pageSize: "5",
        orderBy: "",
        order: "asc",
      });
    } else {
      setSearchTenant({ ...searchTenant, [name]: value });
    }
    dispatch(resetSearchData(resetData));
  };

  const params: ITableSchema = {
    tenantId: searchTenant.tenantId,
    tableName: searchTenant.tableName,
  };

  const getSearchData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    setStartRecord("0");
    setCheckDisable(false);
    setMsg(true);
    const initialState: ISearchDataWithQueryField = {
      queryField: searchTenant.queryField,
      searchTerm: searchTenant.searchTerm,
      startRecord: "0",
      pageSize: searchTenant.pageSize,
      orderBy: searchTenant.orderBy,
      order: searchTenant.order,
      requestParams: params,
    };

    dispatch(searchDataWithQueryField(initialState));
  };

  const nextpage = () => {
    const nextindex =
      Number.parseInt(startRecord) + Number.parseInt(searchTenant.pageSize) - 1;
    setStartRecord(nextindex?.toString());

    const initialState: ISearchDataWithQueryField = {
      queryField: searchTenant.queryField,
      searchTerm: searchTenant.searchTerm,
      startRecord: nextindex?.toString(),
      pageSize: searchTenant.pageSize,
      orderBy: searchTenant.orderBy,
      order: searchTenant.order,
      requestParams: params,
    };
    dispatch(searchDataWithQueryField(initialState));
  };

  const prevpage = () => {
    setCheckDisable(false);
    let nextindex =
      Number.parseInt(startRecord) - Number.parseInt(searchTenant.pageSize) + 1;
    if (nextindex < 0) {
      nextindex = 0;
    }
    setStartRecord(nextindex?.toString());

    const initialState: ISearchDataWithQueryField = {
      queryField: searchTenant.queryField,
      searchTerm: searchTenant.searchTerm,
      startRecord: nextindex?.toString(),
      pageSize: searchTenant.pageSize,
      orderBy: searchTenant.orderBy,
      order: searchTenant.order,
      requestParams: params,
    };
    dispatch(searchDataWithQueryField(initialState));
  };
  useEffect(() => {
    let keys: string[] = [];
    if (
      searchData !== undefined &&
      searchData.data !== undefined &&
      searchData.data?.length > 0 &&
      searchData.error === undefined &&
      searchData.loading === false
    ) {
      keys = Object.keys(searchData?.data[0]);

      setTableHeader(() => {
        ToastAlert("Data Fetched successfully ", "success");
        return [...keys];
      });
      if (searchData.data.length !== Number.parseInt(searchTenant.pageSize)) {
        setCheckDisable(true);
      }
    }
  }, [searchData.data, searchData.error]);

  useEffect(() => {
    const newTableColList: ITableColumnData[] = [];
    dispatch(setTableColNames(newTableColList));
    if (!searchTenant.tenantId) {
      dispatch(resetSearchDataWithQueryField());
      dispatch(getTenantDetails());
    }
    dispatch(getTables(searchTenant.tenantId));
  }, [searchTenant.tenantId]);
  useEffect(() => {
    dispatch(getTenantDetails());
  }, []);
  useEffect(() => {
    dispatch(
      getTableSchema({
        tableName: searchTenant.tableName,
        tenantId: searchTenant.tenantId,
      })
    );
  }, [searchTenant.tableName]);
  useEffect(() => {
    return () => {
      dispatch(resetSearchDataWithQueryField());
    };
  }, []);
  const searchFilterValue = (search: string) => {
    const results: any[] = [];
    let check = 0;
    // eslint-disable-next-line array-callback-return
    searchData.data?.map((val) => {
      check = 0;
      // eslint-disable-next-line array-callback-return
      tableHeader.map((xyz) => {
        if (val[xyz]?.toString().includes(search)) {
          check = 1;
        }
      });
      if (check === 1) {
        results.push(val);
      }
    });
    setFilterData(results);
  };
  return (
    <div>
      <div className="card">
        <div>
          <h4 className="text-center  pt-4">Search Data</h4>
          <Form onSubmit={getSearchData}>
            <Row className="ml-3 mr-3">
              <Col lg="6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Tenant:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="tenantId"
                    value={searchTenant.tenantId}
                    onChange={(e) => handleInputChange(e)}
                    data-testid="tenant-name-select"
                  >
                    <option value="">Select Tenant</option>
                    {tenantDetails.data?.map((val, index) => (
                      <option key={`option${index}`} value={val.id?.toString()}>
                        {val.tenantName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Table Name :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="tableName"
                    onChange={(e) => handleInputChange(e)}
                    value={searchTenant.tableName}
                    data-testid="table-name-select"
                  >
                    <option value="">Table Name</option>
                    {tableData.data?.map((val, index) => (
                      <option key={`option${index}`} value={val}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="6" className="mt-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Query Field :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="queryField"
                    value={searchTenant.queryField}
                    onChange={(e) => handleInputChange(e)}
                    data-testid="query-field-select"
                  >
                    <option value="">SearchField</option>

                    {tableColName.data?.map((val, index) => (
                      <option key={`option${index}`} value={val.name}>
                        {val.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="6" className="mt-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Search Field :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search Field Value"
                    name="searchTerm"
                    value={searchTenant.searchTerm}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Form.Group>
              </Col>
              <Col lg="6" className="mt-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>No Of Records :</Form.Label>
                  <Form.Select
                    name="pageSize"
                    value={searchTenant.pageSize}
                    aria-label="Default select example"
                    onChange={(e) => handleInputChange(e)}
                    data-testid="record-count-select"
                  >
                    <option value=""> No Of Records</option>
                    <option value="6">5</option>
                    <option value="11">10</option>
                    <option value="26">25</option>
                    <option value="51">50</option>
                    <option value="101">100</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="6" className="mt-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Order By :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="orderBy"
                    value={searchTenant.orderBy}
                    onChange={(e) => handleInputChange(e)}
                    data-testid="order-by-select"
                  >
                    <option value="">Order By</option>
                    {tableColName.data?.map((val, index) => (
                      <option key={`option${index}`} value={val.name}>
                        {val.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="6" className="mt-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Order by :</Form.Label>
                  <Form.Select
                    value={searchTenant.order}
                    name="order"
                    aria-label="Default select example"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <div className="col-md-12 mt-5 text-center table-responsive">
                <Button
                  variant="btn btn-primary btn-lg pl-5 pr-5 "
                  type="submit"
                  disabled={searchData.loading}
                  data-testid="search-btn"
                >
                  Search
                </Button>
              </div>
            </Row>
          </Form>
        </div>
        {searchData.loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <div className="card-body table-responsive ">
              {searchData.data !== undefined && searchData.data.length > 0 ? (
                <>
                  <hr></hr>
                  <h4 className=" text-center   mt-4 mb-3 ">
                    Table Details: {searchTenant.tableName}
                  </h4>
                  <div className=" mb-3">
                    <input
                      type="search"
                      className=" form-control col-3 "
                      placeholder="search "
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        searchFilterValue(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Sr.No</th>
                          {tableHeader.map((val, index) => (
                            <th key={index}>{val}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {searchValue === "" &&
                          // eslint-disable-next-line array-callback-return
                          searchData.data.map((val, index) => {
                            if (
                              searchData &&
                              searchData.data &&
                              searchData?.data?.length <
                                Number.parseInt(searchTenant.pageSize)
                            ) {
                              return (
                                <tr key={`row${index}`}>
                                  <td>{index + 1}</td>
                                  {tableHeader.map((h, i) => (
                                    <td key={i}>{val[h]?.toString()}</td>
                                  ))}
                                </tr>
                              );
                            } else if (
                              searchData &&
                              searchData.data &&
                              index + 1 < searchData?.data?.length
                            ) {
                              return (
                                <tr key={`row${index}`}>
                                  <td>{index + 1}</td>
                                  {tableHeader.map((h, i) => (
                                    <td key={i}>{val[h]?.toString()}</td>
                                  ))}
                                </tr>
                              );
                            }
                          })}
                        {searchValue !== "" &&
                          filterdata &&
                          filterdata?.map((val, index) => (
                            <tr key={`row${index}`}>
                              <td>{index + 1}</td>

                              {tableHeader.map((h, i) => (
                                <td key={i}>{val[h]?.toString()}</td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    <nav
                      aria-label="Page navigation example "
                      className="d-flex w-100 justify-content-center"
                    >
                      <ul className="pagination ">
                        <li className="page-item">
                          <button
                            className={
                              Number.parseInt(startRecord) === 0
                                ? "page-item disable"
                                : "page-link  "
                            }
                            disabled={Number.parseInt(startRecord) === 0}
                            onClick={() => prevpage()}
                          >
                            Previous
                          </button>
                        </li>
                        <li className="page-item ">
                          <button
                            className={
                              checkDisable ? "page-item disable" : "page-link  "
                            }
                            disabled={checkDisable}
                            onClick={() => nextpage()}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </>
              ) : (
                <h2> {msg && "No Data"}</h2>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
