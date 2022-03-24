import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  COMPROMISED_ENDPOINTS,
  COMPROMISED_USERS,
  DATA_EXFILTRATION,
  INSIDER_THREATS,
} from "../../utils/constants";
import { Col, Row } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import AssignmentData from "../../utils/assignment-data.json";

ChartJS.register(ArcElement, Tooltip, Legend);

const RiskCategoryReport = () => {
  const riskCategoryFilters = useSelector(
    (state) => state.riskCategory.filters
  );
  const timelineFilter = useSelector(
    (state) => state.timelineFilter.selectedFilter
  );
  const [chartData, setChartData] = useState(null);

  const pieChartDataSet = {
    data: AssignmentData.defaultReport.piedata[timelineFilter],
    backgroundColor: ["#2B4F81", "#4981CE", "#7EB6FF", "#CAE1FF"],
    // borderColor: ["#2B4F81", "#4981CE", "#7EB6FF", "#CAE1FF"],
    // borderWidth: 5,
  };

  useEffect(() => {
    const selectedRiskFilters = riskCategoryFilters.filter(
      (item) => item.selected
    );
    let chartLabels;
    if (selectedRiskFilters.length > 0) {
      chartLabels = riskCategoryFilters
        .filter((item) => item.selected === true)
        .map((item) => item.label);
    } else {
      chartLabels = riskCategoryFilters.map((item) => item.label);
    }
    setChartData({
      labels: chartLabels,
      datasets: [
        {
          data:
            selectedRiskFilters.length === 0
              ? pieChartDataSet.data
              : pieChartDataSet.data.slice(0, chartLabels.length),
          backgroundColor:
            selectedRiskFilters.length === 0
              ? pieChartDataSet.backgroundColor
              : pieChartDataSet.backgroundColor.slice(0, chartLabels.length),
        },
      ],
    });
  }, [riskCategoryFilters, timelineFilter]);
  return (
    <Row>
      <Col span={24} style={{ marginBottom: "10px" }}>
        <span style={{ color: "#545454", fontSize: "20px", fontWeight: 500 }}>
          Risk Category Report
        </span>
      </Col>
      <Col span={8}>
        <div
          style={{
            width: "300px",
          }}
        >
          {chartData && (
            <Doughnut
              options={{
                plugins: {
                  responsive: true,
                  legend: {
                    display: false,
                  },
                  animation: {
                    animateScale: true,
                    animateRotate: true,
                  },
                },
                elements: {
                  arc: {
                    borderWidth: 5,
                    borderColor: "#f0f2f5",
                  },
                },
              }}
              data={chartData}
            />
          )}
        </div>
      </Col>
      <Col span={12}>
        <Row align="middle" justify="center" style={{ height: "100%" }}>
          {riskCategoryFilters.map((item, index) => {
            const selectedFiltersLength = riskCategoryFilters.filter(
              (item) => item.selected
            ).length;
            return (
              (!selectedFiltersLength || item.selected) && (
                <Col span={12} key={item.label}>
                  <div className="legend-wrapper">
                    {/* <div>{JSON.stringify(chartData)}</div> */}
                    <div style={{ paddingLeft: "15px" }}>
                      <h2
                        style={{
                          color: chartData
                            ? chartData.datasets[0].backgroundColor[index]
                            : "#000",
                        }}
                      >
                        {chartData && chartData.datasets[0].data[index]}{" "}
                        <span
                          style={{
                            display: "inline-block",
                            color: index % 2 == 0 ? "green" : "red",
                            marginTop: "5px",
                            transform:
                              index % 2 === 0
                                ? "rotate(45deg)"
                                : "rotate(135deg)",
                          }}
                        >
                          &#8593;
                        </span>
                        <span style={{ fontSize: "14px", color: "#000" }}>
                          {Math.floor(Math.random() * 20 + Math.random() * 10)}%
                        </span>
                      </h2>
                    </div>
                    <Row align="middle">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundColor:
                            pieChartDataSet.backgroundColor[index],
                        }}
                      ></div>
                      <div className="legend-text">{item.label}</div>
                    </Row>
                  </div>
                </Col>
              )
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default RiskCategoryReport;
