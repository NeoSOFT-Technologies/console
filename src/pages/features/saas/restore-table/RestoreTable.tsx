import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { getAllDeletedTables } from "../../../../store/features/saas/manage-table/get-all-deleted-tables/slice";
import { restoreTable } from "../../../../store/features/saas/manage-table/restore-table/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IPagination, ITableSchema } from "../../../../types/saas";

function RestoreTable() {
  const dispatch = useAppDispatch();
  const allTableData = useAppSelector((state) => state.getAllDeleteTableState);

  const pageParameters: IPagination = {
    pageNumber: "1",
    pageSize: "10",
  };

  useEffect(() => {
    dispatch(getAllDeletedTables(pageParameters));
  }, []);
  const restoreDeletedTable = (obj: ITableSchema) => {
    dispatch(restoreTable(obj));
    ToastAlert("Table Deleted successfully ", "success");
  };
  return (
    <div className="createbody">
      <div className="text-nowrap bd-highlight m-4">
        <h5>Table Details</h5>
      </div>
      <div className="card m-4">
        <div className="card-body table-responsive">
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
              {allTableData.data?.map((val, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.tenantId}</td>
                  <td className="">
                    {val.tableName}
                    <span className="m-4">
                      <i className="bi bi-info-circle-fill"></i>
                    </span>
                  </td>
                  <td
                    className="text-align-middle"
                    onClick={() => restoreDeletedTable(val)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* <Modal
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
        data={table}
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
            onClick={() => navigate("/saas/editTables")}
          >
            Yes,Edit
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
export default RestoreTable;
