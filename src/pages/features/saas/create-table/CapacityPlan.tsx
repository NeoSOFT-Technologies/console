import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { capacityPlans } from "../../../../store/features/saas/manage-table/get-capacity-plans/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export default function GetTables() {
  const dispatch = useAppDispatch();
  const capacityData = useAppSelector((state) => state.capacityPlansState);

  // const [tableHeader] = useState<string[]>([]);

  const getCapacityData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    console.log("table data", capacityData.data);
    dispatch(capacityPlans());
  };
  useEffect(() => {
    console.log(capacityData.data);
  }, [capacityData.data, capacityData.error]);

  return (
    <Form onSubmit={getCapacityData}>
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
          {capacityData.data !== undefined && (
            <>
              {capacityData.data.map(
                (
                  val:
                    | {
                        sku:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        name:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        replicas:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        shards:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      }
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <tr key={`row${index}`}>
                    {val !== null && val !== undefined && (
                      <>
                        <td key={index}>{val.sku}</td>
                        <td key={index}>{val.name}</td>
                        <td key={index}>{val.replicas}</td>
                        <td key={index}>{val.shards}</td>
                      </>
                    )}
                  </tr>
                )
              )}
            </>
          )}
        </tbody>
      </Table>
    </Form>
  );
}
