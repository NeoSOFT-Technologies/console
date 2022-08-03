import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../../../../../store";
import { IKeyCreateState } from "../../../../../../../store/features/gateway/key/create";
import { emptyState } from "../../../../../../../store/features/gateway/key/create/payload";
import {
  keystate,
  setFormErrors,
  setForms,
} from "../../../../../../../store/features/gateway/key/create/slice";
import { IPropsHelper } from "../../../../common-settings/global-limit/rate-limit-helper";
import ChooseApi from "./ChooseApi";
const state2 = { ...emptyState };
const state: IKeyCreateState = {
  data: {
    form: {
      KeyName: "",
      SelectedTabIndex: "applyPolicy",
      Per: 0,
      Rate: 0,
      Quota: -1,
      Expires: 0,
      // isInActive: false,
      QuotaRenewalRate: -1,
      ThrottleInterval: -1,
      ThrottleRetries: -1,
      Policies: [],
      PolicyByIds: state2.data.form.PolicyByIds,
      Tags: state2.data.form.Tags,
      AccessRights: state2.data.form.AccessRights,
    },
    errors: state2.data.errors,
  },
  loading: state2.loading,
  error: state2.error,
};
const requiredParameters: IPropsHelper = {
  state,
  form: state.data.form as any,
  formProp: state.data.form.AccessRights as any,
  errors: state.data.errors as any,
  errorProp: state.data.errors?.PerApiLimit || [],
  prevState: keystate,
  propName: "AccessRights",
  setForm: setForms,
  setFormError: setFormErrors,
  index: 0,
  current: "policy",
};
it("Test render of ChooseApi", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ChooseApi requiredParameters={requiredParameters} state={state} />
      </Provider>
    </BrowserRouter>
  );
  expect(screen).toBeDefined();
});
