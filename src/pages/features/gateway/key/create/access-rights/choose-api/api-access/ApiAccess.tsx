import React from "react";
import { useAppSelector } from "../../../../../../../store/hooks";
import PathBased from "../../../../../common-settings/path-based-permission/PathBased";

export default function ApiAccess() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  const apistate = useAppSelector((RootState) => RootState.updateApiState);
  // console.log("states", state.data.form);
  return (
    <>
      <fieldset className="border p-2">
        <legend className="float-none w-auto p-2">API Access</legend>
        {state.data.form.AccessRights !== null &&
        state.data.form.AccessRights?.length! > 0 &&
        Array.isArray(state.data.form.AccessRights) ? (
          (state.data.form.AccessRights as any[]).map(
            (data: any, index: number) => {
              // console.log("apiacessIndex", index, data);
              return (
                <div key={index}>
                  <PathBased
                    state={state}
                    apistate={apistate}
                    apidata={data[index]}
                    indexdata={index}
                    current="key"
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
