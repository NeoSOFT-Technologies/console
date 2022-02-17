import React, { Component } from "react";

export class Spinner extends Component {
  render() {
    return (
      <div className="spinner-wrapper">
        <div className="donut"></div>
      </div>
    );
  }
}

export default Spinner;
