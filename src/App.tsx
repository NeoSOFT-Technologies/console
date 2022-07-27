import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import withRouter from "./WithRouter";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { ScrollToTop } from "./components/scroll-to/ScrollTo";
import Sidebar from "./components/sidebar/Sidebar";
import { RootState } from "./store";
import { IUserDataState } from "./types/index";
interface IState {
  isFullPageLayout: boolean;
  fullPageLayoutRoutes: string[];
}
interface IProperty {
  user: IUserDataState;
  router: {
    location: Location;
    navigate: typeof Navigate;
    params: string;
  };
}
class App extends Component<IProperty, IState> {
  state: IState = {
    isFullPageLayout: true,
    fullPageLayoutRoutes: [
      "/login-page",
      "/error-pages/error-404",
      "/error-pages/error-500",
      "/error-pages/error-401",
      "/error",
    ],
  };

  componentDidMount() {
    this.onRouteChanged();
  }

  render() {
    const navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : "";
    const sidebarComponent = !this.state.isFullPageLayout ? (
      this.props.user.loading ? (
        ""
      ) : this.props.user.data ? (
        <Sidebar />
      ) : (
        <Navigate to="/login-page" />
      )
    ) : (
      ""
    );
    const footerComponent = !this.state.isFullPageLayout ? <Footer /> : "";
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              {!this.state.fullPageLayoutRoutes.includes(
                this.props.router.location.pathname
              ) && <Breadcrumbs />}
              <AppRoutes />
              <ScrollToTop />
            </div>
            {footerComponent}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(previousProperties: IProperty) {
    if (this.props.router.location !== previousProperties.router.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    for (const fullPageLayoutRoute of this.state.fullPageLayoutRoutes) {
      if (this.props.router.location.pathname === fullPageLayoutRoute) {
        this.setState({
          isFullPageLayout: true,
        });
        document
          ?.querySelector(".page-body-wrapper")
          ?.classList.add("full-page-wrapper");
        break;
      } else {
        this.setState({
          isFullPageLayout: false,
        });
        document
          ?.querySelector(".page-body-wrapper")
          ?.classList.remove("full-page-wrapper");
      }
    }
  }
}
const mapStateToProperties = (state: RootState) => ({
  user: state.userData,
});
export default connect(mapStateToProperties)(withRouter(App));
