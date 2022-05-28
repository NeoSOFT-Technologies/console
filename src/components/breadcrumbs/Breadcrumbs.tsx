import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import "./Breadcrumbs.scss";
export default function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bread, setBread] = useState<string[]>([]);

  useEffect(() => {
    let tmp = location.pathname.split("/");
    tmp = tmp.slice(1);
    setBread([...tmp]);
  }, [location]);

  const takeMeBack = (i: number) => {
    const temp = bread.slice(0, i + 1);
    const path = "/" + temp.join("/");
    navigate(path);
  };

  return (
    <Breadcrumb>
      {bread.map((crumbs, index) => (
        <Breadcrumb.Item
          key={index}
          active={index === bread.length - 1}
          onClick={() => takeMeBack(index)}
        >
          {crumbs}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
