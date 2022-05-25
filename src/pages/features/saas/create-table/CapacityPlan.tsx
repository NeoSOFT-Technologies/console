import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { capacityPlans } from "../../../../store/features/saas/manage-table/get-capacity-plans/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ICapacityPlan } from "../../../../types/saas";

export default function GetTables() {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.capacityPlansState);

  const [sku] = useState("");
  const [name] = useState("");
  const [replicas] = useState("");
  const [shards] = useState("");

  const para1: ICapacityPlan = {
    sku,
    name,
    replicas,
    shards,
  };

  const getTableData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    console.log("asdasdasd", para1);
    dispatch(capacityPlans());
  };
  useEffect(() => {
    console.log("table data", tableData.data);
  }, [tableData.data, tableData.error]);

  return (
    <Form onSubmit={getTableData}>
      {" "}
      <Button variant="btn  btn-success" type="submit" className=" pl-4 pr-4">
        Save
      </Button>
      <Table bordered className="pt-2 createbody text-center">
        <thead>
          <tr id="test">
            <th>Capacity</th>
            <th>Name</th>
            <th>Replicas</th>
            <th>Shards</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ravi</td>
            <td>Mark</td>
            <td>true</td>
            <td>false</td>
          </tr>
        </tbody>
      </Table>
    </Form>
  );
}
