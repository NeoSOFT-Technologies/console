import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { RootState } from "../../../../store";
import {
  getAllDeletedTables,
  setDeletedTableData,
} from "../../../../store/features/saas/manage-table/get-all-deleted-tables/slice";
import {
  getDeletedTableByTenant,
  setDeletedTableList,
} from "../../../../store/features/saas/manage-table/get-deleted-table/slice";
import {
  restoreTable,
  restoreTableReset,
} from "../../../../store/features/saas/manage-table/restore-table/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  IPagination,
  ITableSchema,
  IGetDeleteTableByTenant,
} from "../../../../types/saas";

function RestoreTable() {
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );
  const pageDisabled = "page-item disabled";
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const allDeleteTableData = useAppSelector(
    (state) => state.getAllDeleteTableState
  );

  const restoredTableData = useAppSelector(
    (state) => state.restoreTableSchemaState
  );

  const TableData = useAppSelector((state) => state.getDelTableByTenantState);
  const [restoredTableRecord, setRestoredTableRecord] = useState({
    tenantId: "",
    tableName: "",
  });
  const tenantDetaile = useAppSelector((state) => state.userData);
  const [tenantId, setTenantId] = useState("");
  const [show, setShow] = useState(false);
  const [table, settable] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (obj: ITableSchema) => {
    settable(obj.tableName);
    setTenantId(obj.tenantId);
    setShow(true);
  };
  const id = tenantDetaile.data?.tenantId?.toString();
  const dataLength = allDeleteTableData.data?.dataSize;
  const dataSize = TableData.data?.dataSize;
  useEffect(() => {
    const pageParameters: IPagination = {
      pageNumber: currentPage.toString(),
      pageSize: "6",
    };
    if (authenticationState.data === "tenant") {
      const parameters: IGetDeleteTableByTenant = {
        tenantId: id,
        pageNumber: pageParameters.pageNumber,
        pageSize: pageParameters.pageSize,
      };
      dispatch(getDeletedTableByTenant(parameters));
    } else {
      dispatch(getAllDeletedTables(pageParameters));
    }
    return () => {
      dispatch(restoreTableReset());
    };
  }, []);

  useEffect(() => {
    if (!restoredTableData.loading && restoredTableData.error) {
      navigate("/error", { state: restoredTableData.error });
    }
    if (
      !restoredTableData.loading &&
      !restoredTableData.error &&
      restoredTableData?.data
    ) {
      if (authenticationState.data === "tenant") {
        const newTableList = TableData.data?.tableList.filter((obj) => {
          return (
            obj.tableName !== restoredTableRecord.tableName ||
            obj.tenantId !== restoredTableRecord.tenantId
          );
        });
        console.log(newTableList);
        dispatch(setDeletedTableList({ dataSize, tableList: newTableList }));

        ToastAlert("Table Deleted successfully ", "success");
      } else {
        const newTableList = allDeleteTableData.data?.tableList.filter(
          (obj) => {
            return (
              obj.tenantId !== restoredTableRecord.tenantId ||
              obj.tableName !== restoredTableRecord.tableName
            );
          }
        );
        dispatch(
          setDeletedTableData({ dataSize: dataLength, tableList: newTableList })
        );
        ToastAlert("Table restored successfully ", "success");
      }
    }
  }, [restoredTableData.loading]);

  const restoreDeletedTable = (obj: ITableSchema) => {
    dispatch(restoreTable(obj));
    setRestoredTableRecord({ ...obj });
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
      pageSize: "6",
    };
    if (authenticationState.data === "tenant") {
      const parameters: IGetDeleteTableByTenant = {
        tenantId: id,
        pageNumber: pageParameters.pageNumber,
        pageSize: pageParameters.pageSize,
      };
      dispatch(getDeletedTableByTenant(parameters));
    } else {
      dispatch(getAllDeletedTables(pageParameters));
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
        tenantId: id,
        pageNumber: pageParameters.pageNumber,
        pageSize: pageParameters.pageSize,
      };
      dispatch(getDeletedTableByTenant(parameters));
    } else {
      dispatch(getAllDeletedTables(pageParameters));
    }
  };
  function getNextPageStatus(currentPages: number) {
    if (
      allDeleteTableData.data &&
      allDeleteTableData.data.dataSize - currentPage * 6 <= 0
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
  function paginationRestore(currentpage: number) {
    return (
      <>
        <li className={getPrevPageStatus(currentpage)}>
          <a className="page-link " onClick={() => prevpage(currentpage)}>
            Previous
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link">{currentpage}</a>
        </li>
        <li className={getNextPageStatus(currentpage)}>
          <a className="page-link " onClick={() => nextpage(currentpage)}>
            Next
          </a>
        </li>
      </>
    );
  }
  function itrateTable(val: ITableSchema) {
    return (
      <>
        <td>{val.tableName}</td>
        <td
          className="text-align-middle text-primary"
          onClick={() => handleShow(val)}
          data-testid="restore-table-btn"
        >
          <i className="bi bi-bootstrap-reboot"></i>
        </td>
      </>
    );
  }
  function paginationCommon(currentpage: number) {
    return (
      <nav
        aria-label="Page navigation example "
        className="d-flex justify-content-center"
      >
        <ul className="pagination ">{paginationRestore(currentpage)}</ul>
      </nav>
    );
  }
  function nodata() {
    return <h2>No Data</h2>;
  }
  function checkData() {
    return allDeleteTableData.data?.tableList !== undefined &&
      allDeleteTableData.data.tableList.length > 0 ? (
      <>
        <Table bordered className="text-center">
          <thead>
            <tr id="test">
              <th>SR.NO.</th>
              <th>User</th>
              <th>Table Name</th>
              <th>Restore</th>
            </tr>
          </thead>
          <tbody>
            {allDeleteTableData.data.tableList.map((val, index) => (
              <tr key={index + 6 * (currentPage - 1) + 1}>
                {currentPage !== 1 ? (
                  <td>{index + 6 * (currentPage - 1) + 1}</td>
                ) : (
                  <td>{index + currentPage}</td>
                )}
                <td>{val.tenantName}</td>
                {itrateTable(val)}
              </tr>
            ))}
          </tbody>
        </Table>

        {paginationCommon(currentPage)}
      </>
    ) : (
      <>{nodata()}</>
    );
  }
  function checkForTenant() {
    return TableData.data?.tableList !== undefined &&
      TableData.data.tableList.length > 0 &&
      id !== undefined ? (
      <>
        <Table bordered className="text-center">
          <thead>
            <tr>
              <th>SR.NO.</th>
              <th>Table Name</th>
              <th>Restore</th>
            </tr>
          </thead>
          <tbody>
            {TableData.data.tableList.map((val, index) => (
              <tr key={index + 6 * (currentPage - 1) + 1}>
                {currentPage !== 1 ? (
                  <td>{index + 6 * (currentPage - 1) + 1}</td>
                ) : (
                  <td>{index + currentPage}</td>
                )}
                {itrateTable(val)}
              </tr>
            ))}
          </tbody>
        </Table>
        {paginationCommon(currentPage)}
      </>
    ) : (
      <>{nodata()}</>
    );
  }
  return (
    <div className="createbody card">
      <div className="card-body table-responsive">
        {authenticationState.data !== "tenant" ? (
          <>
            <h4 className=" text-center pt-3 mt-3 ">Restore Table Details</h4>

            {checkData()}
          </>
        ) : (
          <>
            <h4 className=" text-center mb-4">Restore Table Details</h4>
            {checkForTenant()}
          </>
        )}
      </div>

      <Modal
        show={show}
        data={{ table, tenantId }}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Restore Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to restore <b>{table}</b> table?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              restoreDeletedTable({
                tenantId,
                tableName: table,
                tenantName: "",
              })
            }
          >
            Yes, Restore
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default RestoreTable;
