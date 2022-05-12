import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { searchDataWithQueryField } from "../../../../store/features/saas/search-data/with-query-field/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  ISearchDataWithQueryField,
  ITableSchema,
} from "../../../../types/saas";
import "./style.css";

export default function GetSearchData() {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector(
    (state) => state.searchDataWithQueryFieldState
  );
  const [tenantId, setTenantId] = useState("");
  const params: ITableSchema = {
    tenantId: "101",
    tableName: "Employee",
  };
  const initialState: ISearchDataWithQueryField = {
    queryField: "*",
    searchTerm: "*",
    startRecord: "0",
    pageSize: "5",
    orderBy: "id",
    order: "asc",
    requestParams: params,
  };
  const getSearchData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log(tenantId);
    dispatch(searchDataWithQueryField(initialState));
  };
  useEffect(() => {
    console.log("Use Effect of Search Data " + searchData);
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
                  <Form.Select
                    aria-label="Default select example"
                    className="w-100 pr-3 pt-1 pb-2 text-center rounded  "
                  >
                    <option>User</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-1 pt-1 pb-2  text-center rounded"
                >
                  <option>Table Name</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Search Field"
                    value={tenantId}
                    className="text-center"
                    onChange={(e) => setTenantId(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Search Field Value"
                    value={tenantId}
                    className="text-center"
                    onChange={(e) => setTenantId(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="No Of Records"
                    value={tenantId}
                    className="text-center"
                    onChange={(e) => setTenantId(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-2  text-center rounded"
                >
                  <option>Order By</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Select>
              </Col>
              <Col lg="2">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100  pt-1 pb-2  text-center  rounded"
                >
                  <option>ASC</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Select>
              </Col>

              <div className="col-md-12 mt-5 text-center table-responsive">
                <Button variant="btn btn-dark btn-lg pl-5 pr-5 " type="submit">
                  Search
                </Button>
              </div>
            </Row>
          </Form>
        </div>
        <hr></hr>
        <div className="card-body table-responsive ">
          <h4 className="mb-4">Table Details</h4>

          <div>
            <Table bordered className="text-center ">
              <thead>
                <tr id="test">
                  <th>Sr.No</th>
                  <th>User</th>
                  <th>Table Name</th>
                  <th>ID</th>
                  <th>Titile</th>
                  <th>category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Product</td>
                  <td>101</td>
                  <td>kids Car</td>
                  <td>games</td>
                  <td>$300</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Product</td>
                  <td>102</td>
                  <td>kids Car</td>
                  <td>plays</td>
                  <td>$400</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>omkar</td>
                  <td>Product</td>
                  <td>103</td>
                  <td>kids bike</td>
                  <td>speed</td>
                  <td>$600</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>shubham</td>
                  <td>Product</td>
                  <td>103</td>
                  <td>kids bike</td>
                  <td>speed</td>
                  <td>$600</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>ravi</td>
                  <td>Product</td>
                  <td>103</td>
                  <td>kids bike</td>
                  <td>speed</td>
                  <td>$600</td>
                </tr>
              </tbody>
            </Table>
            {/* {tableData.data !== undefined && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.data.map((val, index) => (
                    <tr key={`row${index}`}>
                      <td>{index + 1}</td>
                      <td>{val}</td>
                      <td>
                        <i className="bi bi-gear-fill"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )} */}
          </div>
          <div className="table-responsive"></div>
          <Pagination className="d-flex justify-content-center">
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>

            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </div>
  );
}
