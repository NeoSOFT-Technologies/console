import React from "react";
import { Accordion } from "react-bootstrap";
import { useAppSelector } from "../../../../../../../store/hooks";
import GlobalLimit from "../../../../../common-settings/global-limit/GlobalLimit";

export default function Policies() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  return (
    <>
      <fieldset className="border p-2">
        <legend className="float-none w-auto p-2">Policies</legend>
        {state.data.form.Policies !== null &&
        state.data.form.Policies.length > 0 &&
        Array.isArray(state.data.form.Policies) ? (
          (state.data.form.Policies as any[]).map(
            (data: any, index: number) => {
              // const { policies } = data;
              return (
                <div key={index}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Policy Name</Accordion.Header>
                      <Accordion.Body>
                        <GlobalLimit
                          isDisabled={true}
                          msg={""}
                          policyId={data}
                          index={index}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              );
            }
          )
        ) : (
          <></>
        )}{" "}
      </fieldset>
    </>
  );
}
