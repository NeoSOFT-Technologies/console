import React from "react";
import { useAppSelector } from "../../../../../../../store/hooks";
import GlobalRateLimit from "../../../../common-settings/global-limit/GlobalRateLimit";
import Policies from "./policies/Policies";
import PolicyList from "./policy-list/PolicyList";

export default function ApplyPolicy() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  return (
    <div>
      <PolicyList />
      {state.data.form.Policies?.length > 0 ? (
        <>
          <GlobalRateLimit
            message={" is being set by each policy"}
            current="globalKey-applyPolicy"
          />
          {/* <GlobalLimit
            isDisabled={true}
            msg={" is being set by each policy"}
            // policyId="e9420aa1-eec5-4dfc-8ddf-2bc989a9a47f"
          /> */}
          <Policies />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
