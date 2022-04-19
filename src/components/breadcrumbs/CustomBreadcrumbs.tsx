import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation } from "react-router-dom";

export default function CustomBreadcrumbs() {
  const location = useLocation();
  const [bread, setBread] = useState<string[]>([]);

  useEffect(() => {
    let tmp = location.pathname.split("/");
    tmp = tmp.slice(1);
    setBread([...tmp]);
  }, [location]);

  return (
    <Breadcrumb>
      {bread.map((crumbs, index) => (
        <Breadcrumb.Item key={index} onClick={() => {}}>
          {crumbs}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
