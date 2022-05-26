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
  ITableSchema,
} from "../../../../types/saas/index";
import "./style.css";
import { getTables } from "./../../../../store/features/saas/manage-table/get-tables/slice";

export default function GetSearchData() {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector(
    (state) => state.searchDataWithQueryFieldState
  );
  const tableData = useAppSelector((state) => state.getTableState);
  const [tenantId, setTenantId] = useState("");
  const [tableName, setTableName] = useState("");
  const [queryField, setQueryField] = useState("*");
  const [searchTerm, setSearchTerm] = useState("*");
  const [pageSize, setPageSize] = useState("5");
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [startRecord, setStartRecord] = useState("0");
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [msg, setMsg] = useState(false);
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
    const nextindex = Number.parseInt(startRecord) + Number.parseInt(pageSize);
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
    let nextindex = Number.parseInt(startRecord) - Number.parseInt(pageSize);
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
    }

    // if (tableHeader.length > 0) ToastAlert("Data Fetch sucessfuly ", "success");
  }, [searchData.data, searchData.error]);

  useEffect(() => {
    dispatch(getTables(tenantId));
  }, [tenantId]);

  useEffect(() => {
    return () => {
      dispatch(resetSearchDataWithQueryField());
    };
  }, []);

  return (
    <div>
      <div className="card">
        <div className="mb-4 mt-3">
          <br></br>
          <h4 className="ml-4 mb-4">Search Data</h4>

          <Form onSubmit={getSearchData}>
            <Row className="ml-3 mr-3">
              <Col lg="2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="User"
                    value={tenantId}
                    className="text-center"
                    onChange={(e) => setTenantId(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setTableName(e.target.value)}
                  >
                    <option>Table Name</option>
                    {tableData.data?.map((val, index) => (
                      <option key={`option${index}`} value={val}>
                        {val}
                      </option>
                    ))}
                  </Form.Select>

                  {/* <Form.Control
                    type="text"
                    placeholder="Table Name"
                    value={tableName}
                    className="text-center"
                    onChange={(e) => setTableName(e.target.value)}
                  /> */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Search Field"
                    value={queryField}
                    className="text-center"
                    onChange={(e) => setQueryField(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
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
                  <Form.Control
                    type="text"
                    placeholder="No Of Records"
                    value={pageSize}
                    className="text-center"
                    onChange={(e) => setPageSize(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Order By"
                    value={orderBy}
                    className="text-center"
                    onChange={(e) => setOrderBy(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Asc"
                    value={order}
                    className="text-center"
                    onChange={(e) => setOrder(e.target.value)}
                  />
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
                  <h4 className="mt-5 mb-4">Table Details</h4>
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
                      {searchData.data.map((val, index) => (
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
                        <a className="page-link" onClick={() => prevpage()}>
                          Previous
                        </a>
                      </li>
                      <li className="page-item ">
                        <a className="page-link " onClick={() => nextpage()}>
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </>
              ) : (
                <h2>{msg && "No data "}</h2>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
