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

ChartJS.register(ArcElement, Tooltip, Legend);

const RiskCategoryReport = () => {
  const riskCategoryFilters = useSelector(
    (state) => state.riskCategory.filters
  );
  const [chartData, setChartData] = useState(null);

  const pieChartDataSet = {
    data: [8000, 35000, 24000, 87000],
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
  }, [riskCategoryFilters]);
  return (
    <Row>
      <Col span={24} style={{ marginBottom: "10px" }}>
        <span style={{ color: "#545454", fontSize: "20px", fontWeight: 500 }}>
          Risk Category Report
        </span>
      </Col>
      <Col span={12}>
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
                    position: "top",
                    // onClick:function(event,itemLegend) {
                    //     console.log(itemLegend);
                    //     return event;
                    // }
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
        <Row align="center">
          <Col span={12}>
            <div className="legen-wrapper">
              <Row align="middle">
                <div className="legend-circle"></div>
                <div className="legend-text">{DATA_EXFILTRATION}</div>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div className="legen-wrapper">
              <Row align="middle">
                <div className="legend-circle"></div>
                <div className="legend-text">{INSIDER_THREATS}</div>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div className="legen-wrapper">
              <Row align="middle">
                <div className="legend-circle"></div>
                <div className="legend-text">{COMPROMISED_USERS}</div>
              </Row>
            </div>
          </Col>
          <Col span={12}>
            <div className="legen-wrapper">
              <Row align="middle">
                <div className="legend-circle"></div>
                <div className="legend-text">{COMPROMISED_ENDPOINTS}</div>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RiskCategoryReport;
