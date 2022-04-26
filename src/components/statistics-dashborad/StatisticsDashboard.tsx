import React from "react";
import { useNavigate } from "react-router-dom";
import { circle } from "../../resources/tenant/constants";
import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import "./statisticsDashboard.scss";
interface IConditions {
  data: string;
  loading: boolean;
  error?: string | null;
}

export default function StatisticsDashboard() {
  const navigate = useNavigate();
  const loginType: IConditions = useAppSelector(
    (state: RootState) => state.loginType
  );
  return (
    <div>
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img src={circle} className="card-img-absolute" alt="circle" />

              <h2
                className="mb-5 pointer"
                onClick={() => navigate(`/tenant/${loginType.data}/dashboard`)}
              >
                Tenant{" "}
                <i className="bi bi-person-circle mdi-24px float-right"></i>
              </h2>
              <h6 className="card-text">
                Tenant <i className="bi bi-chevron-right"></i> dashboard
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img src={circle} className="card-img-absolute" alt="circle" />
              <h2
                className="mb-5 pointer"
                onClick={() => navigate(`/gateway/dashboard`)}
              >
                Gateway <i className="bi bi-key-fill mdi-24px float-right"></i>
              </h2>
              <h6 className="card-text">
                Gateway <i className="bi bi-chevron-right"></i> dashboard
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img src={circle} className="card-img-absolute" alt="circle" />

              <h2 className="mb-5 pointer">
                Saas{" "}
                <i className="bi bi-cloud-plus-fill mdi-24px float-right"></i>
              </h2>
              <h6 className="card-text">
                Saas <i className="bi bi-chevron-right"></i> dashboard
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
