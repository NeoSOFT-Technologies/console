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
import {
  getTableswithPage,
  setTableData1,
} from "../../../../store/features/saas/manage-table/get-tables-pagination/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  IGetDeleteTableByTenant,
  IPagination,
  ITableSchema,
} from "../../../../types/saas";

export default function ManageTables() {
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );
  const pageDisabled = "page-item disabled";
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
  const TableData = useAppSelector((state) => state.getTablesWithPageState);
  const deleteTableData = useAppSelector(
    (state) => state.deleteTableSchemaState
  );
  const id = tenantDetaile.data?.tenantId?.toString();

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

  const dataLength = allTableData.data?.dataSize;
  const dataSize = TableData.data?.dataSize;
  useEffect(() => {
    const pageParameters: IPagination = {
      pageNumber: currentPage.toString(),
      pageSize: "6",
    };
    if (authenticationState.data === "tenant") {
      const parameters: IGetDeleteTableByTenant = {
        tenantId: id!,
        pageNumber: pageParameters.pageNumber,
        pageSize: pageParameters.pageSize,
      };
      dispatch(getTableswithPage(parameters));
    } else {
      dispatch(getAllTables(pageParameters));
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
      if (authenticationState.data === "tenant") {
        const newTableList = TableData.data?.tableList.filter(
          (obj: { tenantId: string; tableName: string }) => {
            return (
              obj.tenantId !== deletedTableRecord.tenantId ||
              obj.tableName !== deletedTableRecord.tableName
            );
          }
        );

        dispatch(setTableData1({ dataSize, tableList: newTableList }));
        console.log(dataSize);
        ToastAlert("Table Deleted successfully ", "success");
      } else {
        const newTableList = allTableData.data?.tableList.filter(
          (obj: { tenantId: string; tableName: string }) => {
            return (
              obj.tenantId !== deletedTableRecord.tenantId ||
              obj.tableName !== deletedTableRecord.tableName
            );
          }
        );

        dispatch(
          setTableData({ dataSize: dataLength, tableList: newTableList })
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
    if (authenticationState.data === "tenant") {
      const parameters: IGetDeleteTableByTenant = {
        tenantId: id!,
        pageNumber: pageParameters.pageNumber,
        pageSize: pageParameters.pageSize,
      };
      dispatch(getTableswithPage(parameters));
    } else {
      dispatch(getAllTables(pageParameters));
    }
  };

  const nextpage = (currentPage1: number) => {
    currentPage1++;

    setCurrentPage(currentPage1);

    const pageParameters: IPagination = {
      pageNumber: (currentPage + 1).toString(),
      pageSize: "6",
    };
    if (authenticationState.data === "tenant") {
      const parameters: IGetDeleteTableByTenant = {
        tenantId: id!,
        pageNumber: pageParameters.pageNumber,
        pageSize: pageParameters.pageSize,
      };
      dispatch(getTableswithPage(parameters));
    } else {
      dispatch(getAllTables(pageParameters));
    }
  };
  const deleteTables = (obj: ITableSchema) => {
    dispatch(deleteTable(obj));
    setDeletedTableRecord({ ...obj });
    handleClose();
  };
  console.log(TableData.data?.tableList);
  console.log(allTableData.data);

  function getNextPageStatus(currentPages: number) {
    if (
      allTableData.data &&
      allTableData.data.dataSize - currentPages * 6 <= 0
    ) {
      return pageDisabled;
    } else if (
      TableData.data &&
      TableData.data.dataSize - currentPages * 6 <= 0
    ) {
      return pageDisabled;
    } else {
      return "page-item  ";
    }
  }
  function getPrevPageStatus(currentPages: number) {
    return currentPages !== 1 ? "page-item" : pageDisabled;
  }
  function checkData() {
    return allTableData.data && allTableData.data.tableList.length > 0 ? (
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
                    onClick={() => handleEditShow(val.tableName, val.tenantId)}
                    data-testid="edit-table-btn"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </td>
                  <td
                    className="text-danger"
                    data-testid="delete-table-btn"
                    onClick={() => handleShow(val.tableName, val.tenantId)}
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
            <li className={getPrevPageStatus(currentPage)}>
              <a className="page-link " onClick={() => prevpage(currentPage)}>
                Previous
              </a>
            </li>

            <li className="page-item active">
              <a className="page-link">{currentPage}</a>
            </li>
            <li className={getNextPageStatus(currentPage)}>
              <a className="page-link " onClick={() => nextpage(currentPage)}>
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
    );
  }
  function checkForTenant() {
    return TableData.data?.tableList &&
      TableData.data?.tableList.length > 0 &&
      id ? (
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
            {TableData.data?.tableList.map((val, index) => (
              <tr key={index + 6 * (currentPage - 1) + 1}>
                {currentPage !== 1 ? (
                  <td>{index + 6 * (currentPage - 1) + 1}</td>
                ) : (
                  <td>{index + currentPage}</td>
                )}
                <td>{val.tableName}</td>
                <td
                  className="text-align-middle  text-primary"
                  onClick={() => handleEditShow(val.tableName, val.tenantId)}
                  data-testid="edit-table-btn"
                >
                  <i className="bi bi-pencil-square"></i>
                </td>
                <td
                  className="text-danger"
                  data-testid="delete-table-btn"
                  onClick={() => handleShow(val.tableName, val.tenantId)}
                >
                  <i className="bi bi-trash-fill"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center pt-2">
          <ul className="pagination">
            <li className={getPrevPageStatus(currentPage)}>
              <a className="page-link " onClick={() => prevpage(currentPage)}>
                Previous
              </a>
            </li>

            <li className="page-item active">
              <a className="page-link">{currentPage}</a>
            </li>
            <li className={getNextPageStatus(currentPage)}>
              <a className="page-link " onClick={() => nextpage(currentPage)}>
                Next
              </a>
            </li>
          </ul>
        </div>
      </>
    ) : (
      <>
        <h2>No Data Tenant</h2>
      </>
    );
  }
  return (
    <div className="createbody card">
      <div className="card-body table-responsive">
        <h4 className=" text-center mb-4">Table Details</h4>
        {authenticationState.data !== "tenant" ? (
          <>{checkData()}</>
        ) : (
          <>{checkForTenant()}</>
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
            onClick={() => {
              navigate("/saas/manage-table/edit-table", {
                state: { tableName: table, tenantId },
              });
            }}
          >
            Yes, Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
