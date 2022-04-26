import React from "react";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import { getApiById } from "../../../../../../../../store/features/gateway/api/update/slice";
import { setForms } from "../../../../../../../../store/features/gateway/key/create/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";
import ApiAccessList from "../../../../../common-settings/api-access-List/ApiAccessList";

export default function AccessList() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  const dispatch = useAppDispatch();

  const handleAddClick = async (Id: string) => {
    const data = state.data.form.AccessRights?.some(
      (x: any) => x?.ApiId === Id
    );
    if (!data) {
      const selectedApi = await dispatch(getApiById(Id));
      // console.log(selectedApi.payload);
      if (
        selectedApi.payload.Data.ApiId === Id &&
        selectedApi.payload.Data.AuthType !== "keyless"
      ) {
        const listV: string[] = [];
        for (const element of selectedApi.payload.Data.Versions) {
          listV.push(element.Name);
        }
        const list = [
          ...state.data.form.AccessRights,
          {
            ApiId: selectedApi.payload.Data.ApiId,
            ApiName: selectedApi.payload.Data.Name,
            Versions: listV,
            AllowedUrls: [],
            Limit: {
              Rate: 0,
              Throttle_interval: 0,
              Throttle_retry_limit: 0,
              Max_query_depth: 0,
              Quota_max: 0,
              Quota_renews: 0,
              Quota_remaining: 0,
              Quota_renewal_rate: 0,
            },
          },
        ];

        dispatch(setForms({ ...state.data.form, AccessRights: list }));
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
          <div>
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
      </div>
    </>
  );
}
