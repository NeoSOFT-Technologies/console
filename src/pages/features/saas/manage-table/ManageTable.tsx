import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dialog from "../../../../components/dialogbox/Dialog";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "./style.css";
// const data = [
//   {
//     id: 1,
//     user: "mangesh",
//     tableName: "Demo1",
//   },
//   {
//     id: 2,
//     user: "mangesh",
//     tableName: "Demo2",
//   },
//   {
//     id: 3,
//     user: "mangesh",
//     tableName: "Demo3",
//   },
// ];
export default function ManageTables() {
  const dispatch = useAppDispatch();
  const allTableData = useAppSelector((state) => state.getTableState);
  // const [tenantId, setTenantId] = useState("");
  const getallTableData = (e: SyntheticEvent<HTMLDivElement>) => {
    console.log("llllllllllllllllllll");
    alert("calling onload");
    e.preventDefault();
    dispatch(getTables("1"));
    console.log("+++++++++++++++++++++");
  };
  useEffect(() => {}, [allTableData.data, allTableData.error]);

  const [tables, setTables] = useState(allTableData);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    // Update
    nameProduct: "",
  });
  const idProductRef = useRef();
  const handleDialog = (
    message: string,
    isLoading: boolean,
    nameProduct: string
  ) => {
    setDialog({
      message,
      isLoading,
      // Update
      nameProduct,
    });
  };

  const handleDelete = (tableName: any) => {
    // Update
    //  const index = data.findIndex((p) => p.id === id);

    handleDialog("Are you sure you want to delete?", true, tableName);
    idProductRef.current = tableName;
  };
  // const handleEdit = (id: any) => {
  //   const index = data.findIndex((p) => p.id === id);
  //   handleDialog("Are you sure you want to edit?", true, data[index].tableName);
  //   idProductRef.current = id;
  // };

  const areUSureDelete = (choose: boolean) => {
    if (choose) {
      setTables(tables.filter((p: any) => p !== idProductRef.current));
      handleDialog("", false, "");
    } else {
      handleDialog("", false, "");
    }
  };

  return (
    <div className="createbody" onLoad={getallTableData}>
      <div className="text-nowrap bd-highlight m-4">
        <h5>Table Details</h5>
      </div>
      {allTableData.data !== undefined && (
        <>
          <div className="card m-4">
            <div className="card-body table-responsive">
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
                  {allTableData.data.map((val, index) => (
                    <tr key={`row${index}`}>
                      <td>{index + 1}</td>
                      <td>{"mangesh"}</td>
                      <td className="">
                        {val}
                        <span className="m-4">
                          <i className="bi bi-info-circle-fill"></i>
                        </span>
                      </td>
                      <td className="text-align-middle">
                        <i className="bi bi-pencil-square"></i>
                      </td>
                      <td
                        className="text-danger"
                        onClick={() => handleDelete(val)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {dialog.isLoading && (
                <Dialog onDialog={areUSureDelete} message={dialog.message} />
              )}
            </div>
          </div>
          <Button className="m-4">
            <Link to={"saas/manageTable/addTable"}> Add New</Link>
          </Button>
        </>
      )}
    </div>
  );
}
