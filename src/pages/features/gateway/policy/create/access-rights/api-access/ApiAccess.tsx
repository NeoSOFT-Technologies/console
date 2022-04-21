import React from "react";
import { useAppSelector } from "../../../../../../store/hooks";
import PathBased from "../../../../common-settings/path-based-permission/PathBased";
// import GlobalLimit from "../../../../common-settings-policy/global-limit/GlobalLimit";
// import PathBased from "../../../../common-settings/path-based-permission/PathBased";

export default function ApiAccess() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  const apistate = useAppSelector((RootState) => RootState.updateApiState);
  // console.log("states", state);
  return (
    <>
      <fieldset className="border p-2">
        <legend className="float-none w-auto p-2">API Access</legend>
        {state.data.form.ApIs !== null &&
        state.data.form.ApIs?.length > 0 &&
        Array.isArray(state.data.form.ApIs) ? (
          (state.data.form.ApIs as any[]).map((data: any, index: number) => {
            // const { apIs } = data;
            return (
              <div key={index}>
                <PathBased
                  policystate={state}
                  apistate={apistate}
                  apidata={data[index]}
                  indexdata={index}
                  current="policy"
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </fieldset>
    </>
  );
}
