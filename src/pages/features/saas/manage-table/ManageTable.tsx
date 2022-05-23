import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { deleteTable } from "../../../../store/features/saas/manage-table/delete-table/slice";
import { getAllTables } from "../../../../store/features/saas/manage-table/get-all-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IPagination, ITableSchema } from "../../../../types/saas";
import "./style.css";

export default function ManageTables() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tenantId, setTenantId] = useState("");
  const allTableData = useAppSelector((state) => state.getAllTableState);

  // const [tenantId, setTenantId] = useState("");
  const [show, setShow] = useState(false);
  const [table, settable] = useState("");
  const page = "1";
  const [currentPage, setCurrentPage] = useState(page);

  const handleClose = () => setShow(false);
  const handleShow = (tableName: string, tenantID: string) => {
    settable(tableName);
    setTenantId(tenantID);
    setShow(true);
  };
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (obj: ITableSchema) => {
    settable(obj.tableName);
    setTenantId(obj.tenantId);
    setShowEdit(true);
  };

  useEffect(() => {
    const pageParameters: IPagination = {
      pageNumber: currentPage,
      pageSize: "5",
    };
    dispatch(getAllTables(pageParameters));
  }, []);
  const deleteTables = (obj: ITableSchema) => {
    dispatch(deleteTable(obj));
    handleClose();
    ToastAlert("Table Deleted successfully ", "success");
  };

  const prevpage = (currentPage1: string) => {
    let pageNum = Number.parseInt(currentPage1);
    if (pageNum <= 1) {
      setCurrentPage("1");
    } else {
      pageNum = pageNum - 1;
      setCurrentPage(pageNum.toString());
    }
    const pageParameters: IPagination = {
      pageNumber: currentPage,
      pageSize: "1",
    };
    dispatch(getAllTables(pageParameters));
  };

  const nextpage = (currentPage1: string) => {
    let pageNum = Number.parseInt(currentPage1);
    if (pageNum < 10) {
      pageNum = pageNum + 1;
      setCurrentPage(pageNum.toString());
    } else {
      setCurrentPage(pageNum.toString());
    }
    const pageParameters: IPagination = {
      pageNumber: currentPage,
      pageSize: "5",
    };
    dispatch(getAllTables(pageParameters));
  };
  return (
    <div className="createbody">
      <div className="text-nowrap bd-highlight m-4">
        <h5>Table Details</h5>
      </div>
      <div className="card m-4">
        <div className="card-body table-responsive">
          <>
            <Table bordered className="text-center">
              <thead>
                <tr id="test">
                  <th>SR.NO.</th>
                  <th>User</th>
                  <th>Table Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allTableData.data?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.tenantId}</td>
                    <td>
                      {val.tableName}
                      <span className="m-4">
                        <i className="bi bi-info-circle-fill"></i>
                      </span>
                    </td>
                    <td
                      className="text-align-middle"
                      onClick={() => handleEditShow(val)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </td>
                    <td
                      className="text-danger"
                      onClick={() => handleShow(val.tableName, val.tenantId)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </td>
                  </tr>
                ))}
                : (<h2>No Data</h2>)
              </tbody>
            </Table>
            <nav aria-label="Page navigation example">
              <ul className="pagination ">
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => prevpage(currentPage)}
                  >
                    Previous
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link">{currentPage}</a>
                </li>
                <li className="page-item ">
                  <a
                    className="page-link "
                    onClick={() => nextpage(currentPage)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </>
        </div>
      </div>

      <Button onClick={() => navigate("/saas/addTable")} className="m-4">
        Add New
      </Button>
      <Modal
        show={show}
        data={table}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{table}</b> table?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteTables({ tenantId, tableName: table })}
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        data={{ table, tenantId }}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to edit <b>{table}</b> table?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleEditClose}>
            No, Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              navigate("/saas/editTables", {
                state: { tableName: table, tenantId: tenantId },
              })
            }
          >
            Yes,Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
