import React from "react";
import { useAppSelector } from "../../../../../../store/hooks";
import GlobalRateLimit from "../../../common-settings/global-limit/GlobalRateLimit";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";
import Partitions from "./partitions/Partitions";
export default function AccessRights() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  return (
    <div>
      <div>
        <div>
          <div className="align-items-center">
            <div className="pt-2">
              <AccessList />
              <GlobalRateLimit state={state} current="policy" />
              <Partitions />

              {state.data.form.APIs?.length > 0 ? <ApiAccess /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
