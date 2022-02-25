import React, { Component } from "react";
import withRouter from "./WithRouter";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Navbar from "./shared/Navbar";
import SettingsPanel from "./shared/SettingsPanel";
import Footer from "./shared/Footer";
// import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import AdminSidebar from "./shared/AdminSidebar";
import TenantSidebar from "./shared/TenantSidebar";
import { connect } from "react-redux";

class App extends Component {
  state = "";
  componentDidMount() {
    this.onRouteChanged();
  }

  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : "";
    let sidebarComponent = !this.state.isFullPageLayout ? (
      this.props.user != null && this.props.user.type == "tenant" ? (
        <TenantSidebar />
      ) : (
        <AdminSidebar />
      )
    ) : (
      ""
    );
    let SettingsPanelComponent = !this.state.isFullPageLayout ? (
      <SettingsPanel />
    ) : (
      ""
    );
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : "";
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes />
              {SettingsPanelComponent}
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.location !== prevProps.router.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    // const { i18n } = this.props;
    // const body = document.querySelector("body");
    // if (this.props.location.pathname === "/layout/RtlLayout") {
    //   body.classList.add("rtl");
    //   i18n.changeLanguage("ar");
    // } else {
    //   body.classList.remove("rtl");
    //   i18n.changeLanguage("en");
    // }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      "/login-page",
      "/registration-page",
      "/user-pages/lockscreen",
      "/error-pages/error-404",
      "/error-pages/error-500",
      "/general-pages/landing-page",
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      console.log(this.props.router.location.pathname);
      if (this.props.router.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        this.setState({
          isFullPageLayout: false,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  }
}
App.propTypes = {
  location: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.setUserData,
});
export default connect(mapStateToProps)(withRouter(App));
