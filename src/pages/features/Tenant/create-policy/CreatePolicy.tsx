import React, { useEffect, useState } from "react";
import { Container, Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  regexForDescription,
  regexForPolicyName,
} from "../../../../resources/constants";
import { RootState } from "../../../../store";
import { getTenantRoles } from "../../../../store/features/admin/tenant-roles/slice";
import { createNewPolicy } from "../../../../store/features/tenant/create-policy/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ITenantRolesState, IUserDataState } from "../../../../types";
import {
  ICreatePolicyErrors,
  ICreatePolicyFormData,
} from "../../../../types/create-policy.types";

function CreatePolicy() {
  const dispatch = useAppDispatch();
  const rolesList: ITenantRolesState = useAppSelector(
    (state: RootState) => state.rolesList
  );
  const tenantData: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );
  const [formData, setFormData] = useState<ICreatePolicyFormData>({
    tenantName: "",
    policyName: "",
    description: "",
    roles: [],
  });
  const [error, setError] = useState<ICreatePolicyErrors>({
    policyName: "",
    description: "",
    roles: "",
  });
  useEffect(() => {
    if (tenantData.data?.tenantName) {
      setFormData({ ...formData, tenantName: tenantData.data.tenantName });
    }

    dispatch(getTenantRoles());
  }, []);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFormData({
        ...formData,
        roles: [...formData.roles, event.target.value],
      });
    } else {
      formData.roles.splice(formData.roles.indexOf(event.target.value), 1);
      setFormData({ ...formData, roles: [...formData.roles] });
    }
  };
  const removeRole = (role: string) => {
    const temp = formData.roles.filter(function (value) {
      return value !== role;
    });
    console.log(temp);
    setFormData({ ...formData, roles: [...temp] });
  };
  const handleValidate = () => {
    const validate = true;
    return validate;
  };
  const handelFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (handleValidate()) {
      if (
        formData.policyName !== "" &&
        formData.description !== "" &&
        formData.roles.length > 0
      ) {
        console.log(formData);
        dispatch(createNewPolicy(formData));
        ToastAlert("Policy Created Successfully", "success");
        // navigate("/login");
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    } else {
      ToastAlert("Please Enter Valid Details", "warning");
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "policyName":
        setError({
          ...error,
          [name]: regexForPolicyName.test(value)
            ? ""
            : "Enter a valid Policy Name ",
        });
        break;

      case "description":
        setError({
          ...error,
          [name]: regexForDescription.test(value)
            ? ""
            : "description should only consist Alphabets Max 100",
        });
        break;
      default:
        break;
    }
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      {rolesList.loading || tenantData.loading ? (
        <Spinner />
      ) : (
        rolesList.data &&
        tenantData.data && (
          <Container className="mt-3 w-75 bg-white p-4">
            <h1 className="text-center text-dark pb-3">Create Realm Policy</h1>
            <Form onSubmit={(e) => handelFormSubmit(e)}>
              <Form.Group>
                <Form.Label>Policy name</Form.Label>
                <Form.Control
                  name="policyName"
                  type="text"
                  onChange={handleInputChange}
                  isInvalid={!!error.policyName}
                  isValid={!!(!error.policyName && formData.policyName)}
                  placeholder="Policy name"
                />
                <Form.Control.Feedback type="invalid">
                  {error.policyName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  onChange={handleInputChange}
                  isInvalid={!!error.description}
                  isValid={!!(!error.description && formData.description)}
                  placeholder="Discription"
                />
                <Form.Control.Feedback type="invalid">
                  {error.description}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="title">Roles:</div>
              <Row>
                <Col xs={12} sm={6} md={4} lg={4}>
                  {" "}
                  <Dropdown autoClose="outside" className="w-100">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Select Roles for the user
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {rolesList?.data?.map((items, index) => (
                        <Dropdown.Item
                          key={index}
                          as={Form.Label}
                          htmlFor={items}
                        >
                          <Form.Check
                            type="checkbox"
                            label={items}
                            id={items}
                            value={items}
                            checked={formData.roles.includes(items)}
                            onChange={handleCheck}
                          />
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="my-2">
                    <Button
                      type="submit"
                      variant="success"
                      data-testid="submit-button"
                    >
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      variant="danger"
                      data-testid="cancel-button"
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
                <Col xs={12} sm={6} md={8} lg={8}>
                  {formData.roles.length > 0 &&
                    formData.roles.map((val: string, i: number) => (
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
            </Form>
          </Container>
        )
      )}
    </div>
  );
}
export default CreatePolicy;
