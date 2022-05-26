import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  deleteTable,
  deleteTableReset,
} from "../../../../store/features/saas/manage-table/delete-table/slice";
import {
  getAllTables,
  setTableData,
} from "../../../../store/features/saas/manage-table/get-all-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IPagination, ITableSchema } from "../../../../types/saas";
import "./style.css";

export default function ManageTables() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tenantId, setTenantId] = useState("");
  const [deletedTableRecord, setDeletedTableRecord] = useState({
    tenantId: "",
    tableName: "",
  });
  const allTableData = useAppSelector((state) => state.getAllTableState);
  const deleteTableData = useAppSelector(
    (state) => state.deleteTableSchemaState
  );

  const [show, setShow] = useState(false);
  const [table, settable] = useState("");

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
      pageNumber: currentPage.toString(),
      pageSize: "5",
    };
    dispatch(getAllTables(pageParameters));
    return () => {
      dispatch(deleteTableReset());
    };
  }, []);

  useEffect(() => {
    if (!deleteTableData.loading && deleteTableData.error) {
      navigate("/error", { state: deleteTableData.error });
    }
    if (
      !deleteTableData.loading &&
      !deleteTableData.error &&
      deleteTableData?.data
    ) {
      const newTableList = allTableData.data?.filter((obj) => {
        return (
          obj.tenantId !== deletedTableRecord.tenantId ||
          obj.tableName !== deletedTableRecord.tableName
        );
      });
      dispatch(setTableData(newTableList));
      ToastAlert("Table Deleted successfully ", "success");
    }
  }, [deleteTableData.loading]);

  const deleteTables = (obj: ITableSchema) => {
    dispatch(deleteTable(obj));
    setDeletedTableRecord({ ...obj });
    handleClose();
  };

  const prevpage = (currentPage1: number) => {
    if (currentPage1 <= 1) {
      setCurrentPage(1);
    } else {
      --currentPage1;
      setCurrentPage(currentPage1);
    }

    const pageParameters: IPagination = {
      pageNumber: (currentPage - 1).toString(),
      pageSize: "5",
    };

    dispatch(getAllTables(pageParameters));
  };

  const nextpage = (currentPage1: number) => {
    if (currentPage1 <= 10) {
      ++currentPage1;

      setCurrentPage(currentPage1);
    } else {
      setCurrentPage(currentPage1);
    }

    const pageParameters: IPagination = {
      pageNumber: (currentPage + 1).toString(),
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
          {allTableData.data !== undefined && allTableData.data.length > 0 ? (
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
                        className="text-align-middle  text-primary"
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
                </tbody>
              </Table>
              <nav aria-label="Page navigation example">
                <ul className="pagination ">
                  {currentPage !== 1 ? (
                    <li className="page-item">
                      <a
                        className="page-link "
                        onClick={() => prevpage(currentPage)}
                      >
                        Previous
                      </a>
                    </li>
                  ) : (
                    <li className="page-item disabled">
                      <a
                        className="page-link "
                        onClick={() => prevpage(currentPage)}
                      >
                        Previous
                      </a>
                    </li>
                  )}
                  <li className="page-item active">
                    <a className="page-link">{currentPage}</a>
                  </li>
                  <li className="page-item  ">
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
          ) : (
            <>
              <h2>No Data</h2>
              <nav aria-label="Page navigation example">
                <ul className="pagination ">
                  {currentPage !== 1 ? (
                    <li className="page-item">
                      <a
                        className="page-link "
                        onClick={() => prevpage(currentPage)}
                      >
                        Previous
                      </a>
                    </li>
                  ) : (
                    <li className="page-item disabled">
                      <a
                        className="page-link "
                        onClick={() => prevpage(currentPage)}
                      >
                        Previous
                      </a>
                    </li>
                  )}
                  <li className="page-item active">
                    <a className="page-link">{currentPage}</a>
                  </li>
                  <li className="page-item  disabled">
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
          )}
        </div>
      </div>

      <Button
        onClick={() => navigate("/saas/addTable")}
        className="m-4 btn-success"
      >
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
                state: { tableName: table, tenantId },
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
