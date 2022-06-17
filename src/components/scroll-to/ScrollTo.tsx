import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import "./ScrollTo.css";
export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
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
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="top-to-btm">
      {" "}
      {showTopBtn ? (
        // <button className="btn btn-light float-center" onClick={goToTop}>
        <>
          <h4
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className="bi bi-arrow-up-square cursor-pointer float-end"
            onClick={goToTop}
          ></h4>
          <div className="float-end">{isHovering && <h5>Go to Top</h5>}</div>
        </>
      ) : (
        // </button>
        <></>
      )}{" "}
    </div>
  );
};

export const scrollToSection = (elementName: any) => {
  console.log(window.pageYOffset);
  const yOffset = -70;
  const el = document.querySelector(`#${elementName}`);
  const y = el!.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

export const generateBreadcrumbs = (items: string[]) => {
  // const bread = useRef<Element>();
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
