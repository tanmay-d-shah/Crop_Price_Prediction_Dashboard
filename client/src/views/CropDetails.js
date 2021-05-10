import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, ButtonGroup, CardTitle, Table, CardImg } from "reactstrap";


function CropDetails() {
    let { cropname } = useParams();



    const [Data, setData] = useState({});
    const [ForecastPrices, setForecastPrices] = useState([]);
    const [ForecastLabels, setForecastLabels] = useState([]);
    const [ForecastChanges, setForecastChanges] = useState([]);
    const [iArray, setiArray] = useState([]);


    useEffect(() => {
        fetchData();

    }, []);

    async function fetchData() {
        const result = await axios(`/commodity/${cropname}`);
        setData(result.data);

    }

    useEffect(() => {
        setForecastPrices(Data["forecast_prices"]);
        setForecastLabels(Data["forecast_labels"]);
        setForecastChanges(Data["forecast_changes"]);

        //setiArray([0,1,2,3,4,5,6,7,8,9,10,11]);
    })




    //specifying chart options
    let chart1_2_options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
        },
        responsive: true,
        scales: {
            yAxes: [
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(29,140,248,0.0)",
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        suggestedMin: 1850,
                        suggestedMax: 2100,
                        padding: 20,
                        fontColor: "#9a9a9a",
                    },
                },
            ],
            xAxes: [
                {
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(29,140,248,0.1)",
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9a9a9a",
                    },
                },
            ],
        },
    };

    //configuring chart
    let chartExample1 = {
        data1: (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

            return {
                labels: ForecastLabels,
                datasets: [
                    {
                        label: "My First dataset",
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: ForecastPrices,
                    },
                ],
            };
        },
        options: chart1_2_options
    }

    function createRowData(row) {
        return (
            <tr>
                <td>{row[0]}</td>
                <td>{row[1]}</td>

                <td className="text-center">
                    {row[2]} % &nbsp;
              <Button className="btn-icon" color="success" size="sm">
                        <i className="fa fa-arrow-up"></i>
                    </Button>
                </td>
            </tr>
        )
    }

    //console.log(Data["crop_profile"]);

    return (
        <>
            <div className="content">

                <Row>

                    <Col lg="6" md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Crop Details</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter text-white" responsive >

                                    <tbody>
                                        <tr>
                                            <th>Crop Name</th>
                                            <td>{(Data["name"] === undefined) ? "" : Data["name"]}</td>
                                        </tr>
                                        <tr>
                                            <th>Current Price</th>
                                            <td>{(Data["current_price"] === undefined) ? "" : Data["current_price"]}</td>
                                        </tr>
                                        <tr>
                                            <th>Prime Locations</th>
                                            <td>{(Data["prime_loc"] === undefined) ? "" : Data["prime_loc"]}</td>
                                        </tr>
                                        <tr>
                                            <th>Export</th>
                                            <td>{(Data["export"] === undefined) ? "" : Data["export"]}</td>
                                        </tr>

                                        <tr>
                                            <th>Type</th>
                                            <td>{(Data["type_c"] === undefined) ? "" : Data["type_c"]}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>



                        </Card>
                    </Col>


                    <Col lg="6" md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Brief Forecast</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter text-white" responsive >

                                    <tbody>
                                        <tr>
                                            <th>Maximum Crop Price Time</th>
                                            <td>{(Data["max_crop"] === undefined) ? "" : Data["max_crop"][0] + " " + Data["max_crop"][1]}</td>
                                            <th>{(Data["max_crop"] === undefined) ? "" : Data["max_crop"][2]} </th>
                                        </tr>

                                        <tr>
                                            <th>Minimum Crop Price Time</th>
                                            <td>{(Data["min_crop"] === undefined) ? "" : Data["min_crop"][0] + " " + Data["min_crop"][1]}</td>
                                            <th>{(Data["min_crop"] === undefined) ? "" : Data["min_crop"][2]} </th>
                                        </tr>

                                        <tr></tr>
                                        <tr></tr>
                                        <tr></tr>
                                    </tbody>
                                </Table>
                            </CardBody>



                        </Card>
                    </Col>
                </Row>

                <Row>

                    <Col lg="6" md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Future Trends</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Month</th>
                                            <th>Price/Quintal(Rs)</th>
                                            <th className="text-center">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {(Data["crop_profile"] === undefined) ? console.log("hello") : Data["crop_profile"].map(createRowData)}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg="6" md="12">
                        <Card className="card-chart">
                            <CardHeader>
                                <Row>
                                    <Col className="text-left" sm="6">
                                        <h5 className="card-category">ForeCast Values</h5>
                                        <CardTitle tag="h2">Forecasted values of {cropname}</CardTitle>
                                    </Col>
                                    <Col sm="6">
                                        <ButtonGroup
                                            className="btn-group-toggle float-right"
                                            data-toggle="buttons"
                                        >
                                            <Button
                                                tag="label"

                                                color="info"
                                                id="0"
                                                size="sm"

                                            >
                                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                    Forecasted Values
                                                </span>
                                                <span className="d-block d-sm-none">
                                                    <i className="tim-icons icon-single-02" />
                                                </span>
                                            </Button>

                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area">
                                    <Line
                                        data={chartExample1["data1"]}
                                        options={chartExample1.options}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </div>


        </>
    )
}

export default CropDetails;