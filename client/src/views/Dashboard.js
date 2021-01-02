/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  return (
    <>
      <div className="content">


        <Row>

          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Top Gainers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Crop Name</th>
                      <th>Price/Quintal(Rs)</th>

                      <th className="text-center">Indicator</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>Arhar</td>
                      <td>2345</td>

                      <td className="text-center">
                        <Button className="btn-icon" color="success" size="sm">
                          <i className="fa fa-arrow-up"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Bajra</td>
                      <td>1176</td>

                      <td className="text-center">
                        <Button className="btn-icon" color="success" size="sm">
                          <i className="fa fa-arrow-up"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Paddy</td>
                      <td>3245</td>

                      <td className="text-center">
                        <Button className="btn-icon" color="success" size="sm">
                          <i className="fa fa-arrow-up"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Top Losers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Crop Name</th>
                      <th>Price/Quintal(Rs)</th>

                      <th className="text-center">Indicator</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Udad</td>
                      <td>1176</td>

                      <td className="text-center">
                        <Button className="btn-icon" color="danger" size="sm">
                          <i className="fa fa-arrow-down"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Wheat</td>
                      <td>1854</td>

                      <td className="text-center">
                        <Button className="btn-icon" color="danger" size="sm">
                          <i className="fa fa-arrow-down"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Barley</td>
                      <td>2011</td>

                      <td className="text-center">
                        <Button className="btn-icon" color="danger" size="sm">
                          <i className="fa fa-arrow-down"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
