import React from "react";
import { useParams } from "react-router-dom";
import {
  policystate,
  setForm,
  setFormError,
} from "../../../../../../../store/features/gateway/policy/create/slice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import { IPropsHelper } from "../../../../common-settings/global-limit/rate-limit-helper";

import PathBased from "../../../../common-settings/path-based-permission/PathBased";

export default function ApiAccess() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  const apistate = useAppSelector((RootState) => RootState.updateApiState);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const requiredParameters: IPropsHelper = {
    form: state.data.form!,
    formProp: state.data.form.APIs!,
    errors: state.data.errors!,
    errorProp: state.data.errors?.PerApiLimit!,
    prevState: policystate,
    propName: "APIs",
    setForm,
    setFormError,
    index: 0,
    dispatch,
    id,
    current: "policy",
  };
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
                  requiredInterface={{ ...requiredParameters, index }}
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
