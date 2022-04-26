import React from "react";
import { ToastAlert } from "../../../../../../../components/toast-alert/toast-alert";
import { getApiById } from "../../../../../../../store/features/gateway/api/update/slice";
import { setForm } from "../../../../../../../store/features/gateway/policy/create/slice";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../store/hooks";
import ApiAccessList from "../../../../common-settings/api-access-List/ApiAccessList";

export default function AccessList() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  const dispatch = useAppDispatch();

  const handleAddClick = async (Id: string) => {
    const data = state.data.form.APIs?.some((x) => x?.Id === Id);

    if (!data) {
      const selectedApi = await dispatch(getApiById(Id));
      if (
        selectedApi.payload.Data.ApiId === Id &&
        selectedApi.payload.Data.AuthType !== "keyless"
      ) {
        const listV: string[] = [];
        for (const element of selectedApi.payload.Data.Versions) {
          listV.push(element.Name);
        }

        const list = [
          ...state.data.form.APIs,
          {
            Id: selectedApi.payload.Data.ApiId,
            Name: selectedApi.payload.Data.Name,
            Versions: listV,
            AllowedUrls: [],
            Limit: {
              rate: 0,
              per: 0,
              throttle_interval: 0,
              throttle_retry_limit: 0,
              max_query_depth: 0,
              quota_max: 0,
              quota_renews: 0,
              quota_remaining: 0,
              quota_renewal_rate: 0,
              set_by_policy: false,
            },
          },
        ];
        dispatch(setForm({ ...state.data.form, APIs: list }));
      } else {
        window.alert(
          "Rate limits, throttling, quota settings and path-based permissions have no effect on Open (Keyless) API ...."
        );
      }
    } else {
      ToastAlert("Already select...", "error");
    }
  };
  return (
    <>
      <div>
        <div className="card mb-3">
          <div className="align-items-center justify-content-around">
            <div className="accordion" id="listAccordionSetting">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#AccessListcollapseOne"
                    aria-expanded="true"
                    aria-controls="AccessListcollapseOne"
                  >
                    Add API Access Rights
                  </button>
                </h2>
                <div
                  id="AccessListcollapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#listAccordionSetting"
                >
                  <div className="accordion-body">
                    <ApiAccessList
                      state={state}
                      handleAddClick={handleAddClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
