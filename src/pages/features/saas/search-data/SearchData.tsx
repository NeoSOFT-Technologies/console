import React, { useEffect, useState } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";

import Form from "react-bootstrap/Form";

import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  resetSearchDataWithQueryField,
  searchDataWithQueryField,
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

  const [checkDisable, setCheckDisable] = useState(false);

  const [tenantId, setTenantId] = useState("");
  const [tableName, setTableName] = useState("");
  const [queryField, setQueryField] = useState("*");
  const [searchTerm, setSearchTerm] = useState("*");
  const [pageSize, setPageSize] = useState("5");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [startRecord, setStartRecord] = useState("0");
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [msg, setMsg] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterdata, setFilterData] = useState<any[]>();
  const params: ITableSchema = {
    tenantId,
    tableName,
  };

  const getSearchData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    setMsg(true);
    const initialState: ISearchDataWithQueryField = {
      queryField,
      searchTerm,
      startRecord: "0",
      pageSize,
      orderBy,
      order,
      requestParams: params,
    };
    dispatch(searchDataWithQueryField(initialState));
  };

  const nextpage = () => {
    const nextindex =
      Number.parseInt(startRecord) + Number.parseInt(pageSize) - 1;
    setStartRecord(nextindex.toString());

    const initialState: ISearchDataWithQueryField = {
      queryField,
      searchTerm,
      startRecord: nextindex.toString(),
      pageSize,
      orderBy,
      order,
      requestParams: params,
    };
    dispatch(searchDataWithQueryField(initialState));
  };

  const prevpage = () => {
    setCheckDisable(false);
    let nextindex =
      Number.parseInt(startRecord) - Number.parseInt(pageSize) + 1;
    if (nextindex < 0) {
      nextindex = 0;
    }
    setStartRecord(nextindex.toString());

    const initialState: ISearchDataWithQueryField = {
      queryField,
      searchTerm,
      startRecord: nextindex.toString(),
      pageSize,
      orderBy,
      order,
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
      if (searchData.data.length !== Number.parseInt(pageSize)) {
        setCheckDisable(true);
      }
    }

    // if (tableHeader.length > 0) ToastAlert("Data Fetch sucessfuly ", "success");
  }, [searchData.data, searchData.error]);

  useEffect(() => {
    const newTableColList: ITableColumnData[] = [];
    dispatch(setTableColNames(newTableColList));
    dispatch(getTables(tenantId));
  }, [tenantId]);

  useEffect(() => {
    console.log(tableColName);
    dispatch(getTableSchema({ tableName, tenantId }));
  }, [tableName]);
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
        if (val[xyz].toString().includes(search)) {
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
        <div className="mb-4 mt-3">
          <br></br>
          <h4 className="text-center  mb-5">Search Data</h4>

          <Form onSubmit={getSearchData}>
            <Row className="ml-3 mr-3">
              <Col lg="2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>User :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User"
                    value={tenantId}
                    className="text-center"
                    required
                    onChange={(e) => setTenantId(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Table Name :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center"
                    required
                    onChange={(e) => setTableName(e.target.value)}
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
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Query Field :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center"
                    required
                    onChange={(e) => setQueryField(e.target.value)}
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
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Search Field :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search Field Value"
                    value={searchTerm}
                    className="text-center"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>No Of Records :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center"
                    onChange={(e) => setPageSize(e.target.value)}
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
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Order By :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center"
                    required
                    onChange={(e) => setOrderBy(e.target.value)}
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
              <Col lg="2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Order by :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center"
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <div className="col-md-12 mt-5 text-center table-responsive">
                <Button
                  variant="btn btn-dark btn-lg pl-5 pr-5 "
                  type="submit"
                  disabled={searchData.loading}
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
                  <h4 className=" text-center  mb-5 mt-5 ">Table Details:</h4>
                  <div className="form-outline mt-5 mb-4 pr-6">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Search "
                      aria-label="Search"
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        searchFilterValue(e.target.value);
                      }}
                    />
                  </div>
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
                            searchData?.data?.length < Number.parseInt(pageSize)
                          ) {
                            return (
                              <tr key={`row${index}`}>
                                <td>{index + 1}</td>
                                {tableHeader.map((h, i) => (
                                  <td key={i}>{val[h].toString()}</td>
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
                                  <td key={i}>{val[h].toString()}</td>
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
                              <td key={i}>{val[h].toString()}</td>
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
                </>
              ) : (
                <h2> {msg && "No Data "}</h2>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
