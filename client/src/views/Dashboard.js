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
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
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
  const [Data, setData] = useState([[[]], [[]]]);
  let history=useHistory();
  // const [bigChartData, setbigChartData] = React.useState("data1");
  // const setBgChartData = (name) => {
  //   setbigChartData(name);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/home`);
      setData(result.data);
      console.log(Data);
    };
    fetchData();

  }, [])


  function createGainerRowData(gainerData) {
    return (
      <tr>
        <td>{gainerData[0]}</td>
        <td>{gainerData[1]}</td>

        <td className="text-center">
        {gainerData[2]} % &nbsp;
          <Button className="btn-icon" color="success" size="sm">
            <i className="fa fa-arrow-up"></i>
          </Button>
        </td>
      </tr>
    )
  }
  function createLoserRowData(loserData) {
    return (
      <tr>
        <td>{loserData[0]}</td>
        <td>{loserData[1]}</td>

        <td className="text-center">
        {loserData[2]} % &nbsp;
          <Button className="btn-icon" color="danger" size="sm">
            <i className="fa fa-arrow-down"></i>
          </Button>
        </td>
      </tr>
    )
  }

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

                    {Data[0].map(createGainerRowData)}
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
                    {Data[1].map(createLoserRowData)}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        
        <Row>
        
          <Col xs="6" md="3">
            
            <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/paddy")}>
              <CardImg top src={require("assets/img/rice_svg.png").default} alt="..." />
              <CardBody>
                <CardText>RICE</CardText>
              </CardBody>
            </Card>
          </Col>

          <Col xs="6" md="3">
            <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/wheat")}>
              <CardImg top src={require("assets/img/wheat_svg.png").default} alt="..." />
              <CardBody>
                <CardText>WHEAT</CardText>
              </CardBody>
            </Card>
          </Col>

          <Col xs="6" md="3">
            <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/millet")}>
              <CardImg top src={require("assets/img/millet_svg.png").default} alt="..." />
              <CardBody>
                <CardText>MILLET</CardText>
              </CardBody>
            </Card>
          </Col>


          <Col xs="6" md="3">
          <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/maize")}>
              <CardImg top src={require("assets/img/maize_svg.png").default} alt="..." />
              <CardBody>
                <CardText>MAIZE</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="6" md="3">
          <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/sugarcane")}>
              <CardImg top src={require("assets/img/sugarcane_svg.jpg").default} alt="..." />
              <CardBody>
                <CardText>SUGARCANE</CardText>
              </CardBody>
            </Card>
          </Col>

          <Col xs="6" md="3">
          <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/groundnut")}>
              <CardImg top src={require("assets/img/groundnut_svg.png").default} alt="..." />
              <CardBody>
                <CardText>GROUNDNUT</CardText>
              </CardBody>
            </Card>
          </Col>

          <Col xs="6" md="3">
          <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/cotton")}>
              <CardImg top src={require("assets/img/cotton_svg.png").default} alt="..." />
              <CardBody>
                <CardText>COTTON</CardText>
              </CardBody>
            </Card>
          </Col>


          <Col xs="6" md="3">
          <Card className="bg-dark text-white text-center" onClick={() => history.push("/admin/cropDetails/tea")}>
              <CardImg top src={require("assets/img/tea_svg.jpg").default} alt="..." />
              <CardBody>
                <CardText>TEA</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
