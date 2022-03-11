import React from "react";
import { Link } from "react-router-dom";
import { error401 } from "../../resources/images";
export default function Error401() {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column bg-white">
      <img src={error401} />
      <Link className="text-danger font-weight-heavy" to="/dashboard">
        Back to home
      </Link>
    </div>
  );
}
