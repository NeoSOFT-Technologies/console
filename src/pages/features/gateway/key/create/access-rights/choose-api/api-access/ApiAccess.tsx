import React from "react";
import { useParams } from "react-router-dom";
import {
  setForms,
  setFormErrors,
  keystate,
} from "../../../../../../../../store/features/gateway/key/create/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";
import { IPropsHelper } from "../../../../../common-settings/global-limit/rate-limit-helper";
import PathBased from "../../../../../common-settings/path-based-permission/PathBased";

export default function ApiAccess() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  const apistate = useAppSelector((RootState) => RootState.updateApiState);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const requiredParameters: IPropsHelper = {
    form: state.data.form as any,
    formProp: state.data.form.AccessRights as any,
    errors: state.data.errors as any,
    errorProp: state.data.errors?.PerApiLimit as any,
    prevState: keystate,
    propName: "AccessRights",
    setForm: setForms,
    setFormError: setFormErrors,
    index: 0,
    dispatch,
    id,
  };
  //
  return (
    <>
      <fieldset className="border p-2">
        <legend className="float-none w-auto p-2">API Access</legend>
        {state.data.form.AccessRights !== undefined &&
        (state.data.form.AccessRights?.length as number) > 0 &&
        Array.isArray(state.data.form.AccessRights) ? (
          (state.data.form.AccessRights as any[]).map(
            (data: any, index: number) => {
              requiredParameters.index = index;
              //
              return (
                <div key={index}>
                  <PathBased
                    requiredInterface={{ ...requiredParameters, index }}
                    state={state}
                    apistate={apistate}
                    apidata={data[index]}
                    indexdata={index}
                    current="key"
                    setForm={setForms}
                    setFormError={setFormErrors}
                  />
                </div>
              );
            }
          )
        ) : (
          <></>
        )}
      </fieldset>
    </>
  );
}
