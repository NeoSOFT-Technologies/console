import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  getAllDeletedTables,
  setDeletedTableData,
} from "../../../../store/features/saas/manage-table/get-all-deleted-tables/slice";
import {
  restoreTable,
  restoreTableReset,
} from "../../../../store/features/saas/manage-table/restore-table/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IPagination, ITableSchema } from "../../../../types/saas";

function RestoreTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const allDeleteTableData = useAppSelector(
    (state) => state.getAllDeleteTableState
  );

  const restoredTableData = useAppSelector(
    (state) => state.restoreTableSchemaState
  );

  const [restoredTableRecord, setRestoredTableRecord] = useState({
    tenantId: "",
    tableName: "",
  });

  const [tenantId, setTenantId] = useState("");
  const [show, setShow] = useState(false);
  const [table, settable] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (obj: ITableSchema) => {
    settable(obj.tableName);
    setTenantId(obj.tenantId);
    setShow(true);
  };

  useEffect(() => {
    const pageParameters: IPagination = {
      pageNumber: currentPage.toString(),
      pageSize: "6",
    };
    dispatch(getAllDeletedTables(pageParameters));
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
      const newTableList = allDeleteTableData.data?.filter((obj) => {
        return (
          obj.tenantId !== restoredTableRecord.tenantId ||
          obj.tableName !== restoredTableRecord.tableName
        );
      });
      dispatch(setDeletedTableData(newTableList));
      ToastAlert("Table restored successfully ", "success");
    }
  }, [restoredTableData.loading]);

  const restoreDeletedTable = (obj: ITableSchema) => {
    dispatch(restoreTable(obj));
    setRestoredTableRecord({ ...obj });
    handleClose();
    // ToastAlert("Table Restored successfully ", "success");
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

    dispatch(getAllDeletedTables(pageParameters));
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
      pageSize: "6",
    };

    dispatch(getAllDeletedTables(pageParameters));
  };
  return (
    <div className="createbody">
      <div className="text-nowrap bd-highlight m-4">
        <h5>Table Details</h5>
      </div>
      <div className="card m-4">
        <div className="card-body table-responsive">
          {allDeleteTableData.data !== undefined &&
          allDeleteTableData.data.length > 0 ? (
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
                  {allDeleteTableData.data?.map((val, index) => (
                    <tr key={index + currentPage * (currentPage + 1) + 1}>
                      {currentPage !== 1 ? (
                        <td>{index + currentPage * (currentPage + 1) + 1}</td>
                      ) : (
                        <td>{index + currentPage}</td>
                      )}
                      <td>{val.tenantId}</td>
                      <td>{val.tableName}</td>
                      <td
                        className="text-align-middle text-primary"
                        onClick={() => handleShow(val)}
                        data-testid="restore-table-btn"
                      >
                        <i className="bi bi-bootstrap-reboot"></i>
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
            onClick={() => restoreDeletedTable({ tenantId, tableName: table })}
          >
            Yes, Restore
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default RestoreTable;
