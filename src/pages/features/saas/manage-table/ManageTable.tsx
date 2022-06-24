import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { RootState } from "../../../../store";
import {
  deleteTable,
  deleteTableReset,
} from "../../../../store/features/saas/manage-table/delete-table/slice";
import {
  getAllTables,
  setTableData,
} from "../../../../store/features/saas/manage-table/get-all-tables/slice";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IPagination, ITableSchema } from "../../../../types/saas";
// import "./style.css";

export default function ManageTables() {
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [table, settable] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [deletedTableRecord, setDeletedTableRecord] = useState({
    tenantId: "",
    tableName: "",
  });
  const tenantDetaile = useAppSelector((state) => state.userData);
  const allTableData = useAppSelector((state) => state.getAllTableState);
  const TableData = useAppSelector((state) => state.getTableState);

  const id = tenantDetaile.data?.tenantId?.toString();
  const deleteTableData = useAppSelector(
    (state) => state.deleteTableSchemaState
  );

  const handleClose = () => setShow(false);
  const handleShow = (tableName: string, tenantID: string) => {
    settable(tableName);
    setTenantId(tenantID);
    setShow(true);
  };
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (tableName: string, tenantID: string) => {
    settable(tableName);
    setTenantId(tenantID);
    setShowEdit(true);
  };
  const datalength = allTableData.data?.dataSize;

  console.log(tenantDetaile.data?.tenantId);

  useEffect(() => {
    if (authenticationState.data !== "tenant") {
      const pageParameters: IPagination = {
        pageNumber: currentPage.toString(),
        pageSize: "6",
      };
      dispatch(getAllTables(pageParameters));
      console.log(allTableData);
    } else {
      dispatch(getTables(id!));
      console.log(id);
      console.log(TableData);
    }

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
      if (authenticationState.data !== "tenant") {
        const newTableList = allTableData.data?.tableList.filter(
          (obj: { tenantId: string; tableName: string }) => {
            return (
              obj.tenantId !== deletedTableRecord.tenantId ||
              obj.tableName !== deletedTableRecord.tableName
            );
          }
        );

        console.log(newTableList);
        dispatch(
          setTableData({ dataSize: datalength, tableList: newTableList })
        );
        ToastAlert("Table Deleted successfully ", "success");
      } else {
        const newTableList = TableData.data;
        console.log(newTableList);
        dispatch(
          setTableData({ dataSize: datalength, tableList: newTableList })
        );
        ToastAlert("Table Deleted successfully ", "success");
      }
    }
  }, [deleteTableData.loading]);

  const prevpage = (currentPage1: number) => {
    if (currentPage1 <= 1) {
      setCurrentPage(1);
    } else {
      --currentPage1;
      setCurrentPage(currentPage1);
    }

    const pageParameters: IPagination = {
      pageNumber: (currentPage - 1).toString(),
      pageSize: "6",
    };

    dispatch(getAllTables(pageParameters));
  };

  const nextpage = (currentPage1: number) => {
    currentPage1++;

    setCurrentPage(currentPage1);

    const pageParameters: IPagination = {
      pageNumber: (currentPage + 1).toString(),
      pageSize: "6",
    };

    dispatch(getAllTables(pageParameters));
  };
  const deleteTables = (obj: ITableSchema) => {
    dispatch(deleteTable(obj));
    setDeletedTableRecord({ ...obj });
    handleClose();
  };
  console.log(TableData);
  return (
    <div className="createbody card">
      <div className="card-body table-responsive">
        {authenticationState.data !== "tenant" ? (
          <>
            <h4 className=" text-center mb-4">Table Details</h4>

            {allTableData.data?.tableList !== undefined &&
            allTableData.data.tableList.length > 0 ? (
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
                    {allTableData.data.tableList.map(
                      (val: ITableSchema, index: number) => (
                        <tr key={index + 6 * (currentPage - 1) + 1}>
                          {currentPage !== 1 ? (
                            <td>{index + 6 * (currentPage - 1) + 1}</td>
                          ) : (
                            <td>{index + currentPage}</td>
                          )}
                          <td>{val.tenantId}</td>
                          <td>{val.tableName}</td>
                          <td
                            className="text-align-middle  text-primary"
                            onClick={() =>
                              handleEditShow(val.tableName, val.tenantId)
                            }
                            data-testid="edit-table-btn"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </td>
                          <td
                            className="text-danger"
                            data-testid="delete-table-btn"
                            onClick={() =>
                              handleShow(val.tableName, val.tenantId)
                            }
                          >
                            <i className="bi bi-trash-fill"></i>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-center pt-2">
                  <ul className="pagination">
                    <li
                      className={
                        currentPage !== 1 ? "page-item" : "page-item disabled"
                      }
                    >
                      <a
                        className="page-link "
                        onClick={() => prevpage(currentPage)}
                      >
                        Previous
                      </a>
                    </li>

                    <li className="page-item active">
                      <a className="page-link">{currentPage}</a>
                    </li>
                    <li
                      className={
                        allTableData.data !== undefined &&
                        allTableData.data.dataSize - currentPage * 6 <= 0
                          ? "page-item disabled"
                          : "page-item  "
                      }
                    >
                      <a
                        className="page-link "
                        onClick={() => nextpage(currentPage)}
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <h2>No Data</h2>
              </>
            )}
          </>
        ) : (
          <>
            {TableData.data !== undefined &&
            TableData.data.length > 0 &&
            id !== undefined ? (
              <>
                <Table bordered className="text-center">
                  <thead>
                    <tr id="test">
                      <th>SR.NO.</th>
                      <th>Table Name</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TableData.data.map((val, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{val}</td>
                        <td
                          className="text-align-middle  text-primary"
                          onClick={() => handleEditShow(val, id)}
                          data-testid="edit-table-btn"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </td>
                        <td
                          className="text-danger"
                          data-testid="delete-table-btn"
                          onClick={() => handleShow(val, id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <h2>No Data Tenant</h2>
              </>
            )}
          </>
        )}
      </div>
      <div className="text-right">
        <Button
          onClick={() => navigate("/saas/manage-table/add-table")}
          className=" btn-success ml-5 mb-4 mr-4"
        >
          Add New
        </Button>
      </div>

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
              navigate("/saas/manage-table/edit-table", {
                state: { tableName: table, tenantId },
              })
            }
          >
            Yes, Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
