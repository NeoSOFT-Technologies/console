import React from "react";
import {
  setForm,
  setFormError,
} from "../../../../../../../store/features/gateway/policy/create/slice";

import { useAppSelector } from "../../../../../../../store/hooks";

import PathBased from "../../../../common-settings/path-based-permission/PathBased";

export default function ApiAccess() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  const apistate = useAppSelector((RootState) => RootState.updateApiState);
  return (
    <>
      <fieldset className="border p-2">
        <legend className="float-none w-auto p-2">API Access</legend>
        {state.data.form.APIs !== null &&
        state.data.form.APIs?.length > 0 &&
        Array.isArray(state.data.form.APIs) ? (
          (state.data.form.APIs as any[]).map((data: any, index: number) => {
            return (
              <div key={index}>
                <PathBased
                  policystate={state}
                  apistate={apistate}
                  apidata={data[index]}
                  indexdata={index}
                  current="policy"
                  setForm={setForm}
                  setFormError={setFormError}
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
