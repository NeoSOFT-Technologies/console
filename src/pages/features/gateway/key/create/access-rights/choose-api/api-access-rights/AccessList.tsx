import React from "react";
import { Accordion } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import { getApiById } from "../../../../../../../../store/features/gateway/api/update/slice";
import {
  setFormErrors,
  setForms,
} from "../../../../../../../../store/features/gateway/key/create/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";
import ApiAccessList from "../../../../../common-settings/api-access-List/ApiAccessList";

export default function AccessList() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  const dispatch = useAppDispatch();
  // let selectedAuthType = "";
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
        // selectedAuthType = selectedApi.payload.Data.AuthType;
        const listV: string[] = [];
        for (const element of selectedApi.payload.Data.Versions) {
          listV.push(element.Name);
        }
        const list = [
          ...state.data.form.AccessRights,
          {
            ApiId: selectedApi.payload.Data.ApiId,
            ApiName: selectedApi.payload.Data.Name,
            Versions: [], // listV,
            MasterVersions: listV,
            AuthType: selectedApi.payload.Data.AuthType,
            isRateLimitDisabled: selectedApi.payload.Data.RateLimit.IsDisabled,
            isQuotaDisbaled: selectedApi.payload.Data.IsQuotaDisabled,
            AllowedUrls: [],
            Limit: {
              Rate: 0,
              Per: 0,
              Throttle_interval: -1,
              Throttle_retry_limit: -1,
              Max_query_depth: -1,
              Quota_max: -1,
              Quota_renews: -1,
              Quota_remaining: -1,
              Quota_renewal_rate: -1,
            },
          },
        ];
        console.log("list access", list);
        dispatch(setForms({ ...state.data.form, AccessRights: list }));
        const error = [...state.data.errors?.PerApiLimit!];
        const perapierror = {
          ApiId: selectedApi.payload.Data.ApiId,
          Per: "",
          Rate: "",
          Quota: "",
          Expires: "",
          QuotaRenewalRate: "",
          ThrottleInterval: "",
          ThrottleRetries: "",
        };
        error.push(perapierror);
        dispatch(
          setFormErrors({
            ...state.data.errors,
            PerApiLimit: error,
          })
        );
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
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add API Access Rights</Accordion.Header>
              <Accordion.Body data-testid="accesslist">
                <ApiAccessList
                  state={state}
                  handleAddClick={handleAddClick}
                  // selectedAuthType={selectedAuthType}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
}
