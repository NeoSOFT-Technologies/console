import React from "react";
import { useAppSelector } from "../../../../../../../store/hooks";
import GlobalRateLimit from "../../../../common-settings/global-limit/GlobalRateLimit";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";

export default function ChooseApi() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  // console.log("parent states", state.data.form);

  return (
    <div>
      <AccessList />
      {/* <GlobalLimit
        isDisabled={false}
        msg={""}
        // policyId="e9420aa1-eec5-4dfc-8ddf-2bc989a9a47f"
      /> */}
      <GlobalRateLimit keystate={state} current="key" />
      {state.data.form.AccessRights?.length! > 0 ? <ApiAccess /> : <></>}
    </div>
  );
}
