import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export default function TableList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selector = useAppSelector((state) => state.getTableState);
  //  const [url, setUrl] = useState(`manage/table/?tenantId=${1}`);

  //   const [checkactive, setCheckactive] = useState({
  //     btn1: true,
  //   });

  useEffect(() => {
    dispatch(getTables("1"));
    console.log(selector);
  }, []);

  useEffect(() => {
    console.log(selector);
  }, [selector.data, selector.loading]);

  //   const NavigateTable = (value: any) => {
  //     navigate(`/saas/demoManageTable/${value._cells[0].data}`, {
  //       state: {
  //         index: value._cells[0].data,
  //         tenantId: value._cells[1].data,
  //         tableName: value._cells[2].data,
  //       },
  //     });
  //   };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-around">
            <h2
            //   className={
            //     // checkactive.btn1
            //     //   ? "text-success  card-title"
            //     //   : "text-danger card-title"
            //   }
            >
              Table List
            </h2>
          </div>
          <div className="table-reponsive">
            {/* <RenderTableList
              headings={headings}
              action1={action1}
              action2={action2}
              searchBy={"tableName"}
              url={url}
            /> */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SR.NO.</th>
                  <th>User</th>
                  <th>Table Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {selector &&
                  selector.data?.map((val, index) => (
                    <tr key={index}>
                      <td> {index + 1}</td>
                      <td>{"table"}</td>
                      <td>{val}</td>
                      <td>
                        <i
                          onClick={() =>
                            navigate("/saas/searchData", { state: val })
                          }
                          className="bi bi-pencil-square"
                        ></i>
                      </td>
                      <td>
                        <i className="bi bi-trash-fill"></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
