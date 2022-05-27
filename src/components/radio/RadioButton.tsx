import React from "react";
import "./RadioButton.scss";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
interface IProps {
  list?: string[] | null;
  formData: string[];
  title: string;
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeRole: () => void;
}

export default function RadioButton(props: IProps) {
  const { list, formData, title, handleCheck, removeRole } = props;
  return (
    <div>
      <Row>
        <Col xs={12} sm={6} md={4} lg={4}>
          {" "}
          <Dropdown autoClose="outside" className="w-100">
            <Dropdown.Toggle
              variant="success"
              // id="dropdown-basic"
              data-testid="dropdown-toggle"
              className="dynamic-w"
            >
              select {title} for user
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {list?.map((items, index) => (
                <Dropdown.Item
                  key={index}
                  as={Form.Label}
                  htmlFor={items}
                  data-testid="dropdown-items"
                >
                  <Form.Check
                    name="radiobutton"
                    type="radio"
                    label={items}
                    id={items}
                    value={items}
                    onChange={handleCheck}
                    data-testid="role-item"
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} sm={6} md={8} lg={8}>
          {formData.length > 0 &&
            formData.map((val, i) => (
              <span className="roles" key={i} data-testid="form-data-list">
                {val}{" "}
                <i
                  className="bi bi-x-circle"
                  onClick={() => removeRole()}
                  data-testid="form-data-role-item"
                ></i>
              </span>
            ))}
        </Col>
      </Row>
    </div>
  );
}
