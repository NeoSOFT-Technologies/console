import React, { useState } from "react";
import { Link } from "react-router-dom";
import { host } from "../../config/URL";

export default function Register() {
  const [inputDetails, setInputDetails] = useState({
    username: "",
    email: "",
    country: "",
    password: "",
  });
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={`${host}./images/logo.svg`} alt="logo" />
              </div>
              <h4>New here?</h4>
              <h6 className="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
              <form className="pt-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="username"
                    placeholder="Username"
                    onChange={(e) =>
                      setInputDetails({
                        ...inputDetails,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setInputDetails({
                        ...inputDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="country"
                    onChange={(e) =>
                      setInputDetails({
                        ...inputDetails,
                        country: e.target.value,
                      })
                    }
                  >
                    <option value="United States of America">
                      United States of America
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="Argentina">Argentina</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setInputDetails({
                        ...inputDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        id="checkTerms"
                        className="form-check-input"
                      />
                      <i className="input-helper"></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <Link
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    to="/dashboard"
                  >
                    SIGN UP
                  </Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/login-page" className="text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//Tennat
// tennant name,description,email,password
//Admin User
