import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import "./ScrollTo.css";
export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    console.log(isHovering);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="top-to-btm">
      {" "}
      {showTopBtn ? (
        <>
          <button
            className="btn btn-md float-end btn-info icon-position"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={(e) => goToTop(e)}
          >
            <i className="bi bi-chevron-up"></i>
          </button>
          {/* <div className="float-end mr-1">
            {isHovering && <span>Go to Top</span>}
          </div> */}
        </>
      ) : (
        <></>
      )}{" "}
    </div>
  );
};

export const scrollToSection = (elementName: any) => {
  const yOffset = -70;
  const el = document.querySelector(`#${elementName}`);
  const y = el!.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

export const generateBreadcrumbs = (items: string[]) => {
  return (
    <Breadcrumb className="breadseparator breadcrumb-item">
      {items.map((crumbs, index) => (
        <Breadcrumb.Item
          className="font-weight-bolder"
          key={index}
          onClick={() => scrollToSection(crumbs)}
        >
          {crumbs}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
