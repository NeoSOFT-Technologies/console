import React from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
// import { ICreateNewUser } from "../../types";
interface IProps {
  rolesList?: string[] | null;
  formData: string[];
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeRole: (val: any) => void;
}
export default function MultiSelectDropdown(props: IProps) {
  const { rolesList, formData, handleCheck, removeRole } = props;
  return (
    <div>
      <Row>
        <Col xs={12} sm={6} md={4} lg={4}>
          {" "}
          <Dropdown autoClose="outside" className="w-100">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Roles for the user
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {rolesList?.map((items, index) => (
                <Dropdown.Item key={index} as={Form.Label} htmlFor={items}>
                  <Form.Check
                    type="checkbox"
                    label={items}
                    id={items}
                    value={items}
                    checked={formData.includes(items)}
                    onChange={handleCheck}
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} sm={6} md={8} lg={8}>
          {formData.length > 0 &&
            formData.map((val, i) => (
              <span className="roles" key={i}>
                {val}{" "}
                <i
                  className="bi bi-x-circle"
                  onClick={() => removeRole(val)}
                ></i>
              </span>
            ))}
        </Col>
      </Row>
    </div>
  );
}
