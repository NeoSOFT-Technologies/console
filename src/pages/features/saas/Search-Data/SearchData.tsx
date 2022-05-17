import React, { useEffect, useState } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

import Spinner from "../../../../components/loader/Loader";
import {
  // resetSearchDataWithQueryField,
  searchDataWithQueryField,
} from "../../../../store/features/saas/search-data/with-query-field/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  ISearchDataWithQueryField,
  ITableSchema,
} from "../../../../types/saas/index";
import "./style.css";
import { ToastAlert } from "./../../../../components/toast-alert/toast-alert";

export default function GetSearchData() {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector(
    (state) => state.searchDataWithQueryFieldState
  );

  const [tenantId, setTenantId] = useState("");
  const [tableName, setTableName] = useState("");
  const [queryField, setQueryField] = useState("*");
  const [searchTerm, setSearchTerm] = useState("*");
  const [pageSize, setPageSize] = useState("5");
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const params: ITableSchema = {
    tenantId,
    tableName,
  };

  const initialState: ISearchDataWithQueryField = {
    queryField,
    searchTerm,
    startRecord: "0",
    pageSize,
    orderBy,
    order,
    requestParams: params,
  };
  const getSearchData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    dispatch(searchDataWithQueryField(initialState));
  };

  useEffect(() => {
    let keys: string[] = [];
    if (
      searchData !== undefined &&
      searchData.data !== undefined &&
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
    // return () => {
    //   dispatch(resetSearchDataWithQueryField());
    // };
  }, [searchData.data, searchData.error]);
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
                  <Form.Control
                    type="text"
                    placeholder="Table Name"
                    value={tableName}
                    className="text-center"
                    onChange={(e) => setTableName(e.target.value)}
                  />
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
            <hr></hr>
            <div className="card-body table-responsive ">
              <h4 className="mb-5">Table Details</h4>
              {searchData.data !== undefined && (
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
                          <td key={i}>{JSON.stringify(val[h])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
            <Pagination className="d-flex justify-content-center">
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>

              <Pagination.Next />
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
}
