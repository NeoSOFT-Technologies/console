import React from "react";
import { Container, Table } from "react-bootstrap";

function RestoreTable() {
  return (
    <Container>
      <div className="text-nowrap bd-highlight">
        <h5>Restore Table</h5>
      </div>
      <div className="border rounded m-4 p-4">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr text-center>
              <th>SR.NO.</th>
              <th>User</th>
              <th>Table Name</th>
              <th>Restore</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td className="d-flex justify-content-around">Otto</td>
              <td className="text-primary">
                <i className="bi bi-bootstrap-reboot"></i>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td className="d-flex justify-content-around">Thornton</td>
              <td className="text-primary">
                <i className="bi bi-bootstrap-reboot"></i>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td className="d-flex justify-content-around">Mangesh</td>
              <td className="text-primary">
                <i className="bi bi-bootstrap-reboot"></i>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
export default RestoreTable;
