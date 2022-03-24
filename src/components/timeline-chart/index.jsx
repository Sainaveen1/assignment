import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  COMPROMISED_ENDPOINTS,
  COMPROMISED_USERS,
  DATA_EXFILTRATION,
  INSIDER_THREATS,
} from "../../utils/constants";
import AssignmentData from "../../utils/assignment-data.json";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TimeLineChart = () => {
  const chartRef = useRef(null);
  const timelineFilter = useSelector(
    (state) => state.timelineFilter.selectedFilter
  );

  const [timeLineLabels, setTimeLineLabels] = useState([]);

  const riskCategoryFilters = useSelector(
    (state) => state.riskCategory.filters
  );

  const intitalDataSets = [
    {
      type: "bar",
      label: DATA_EXFILTRATION,
      data: AssignmentData.defaultReport.items[DATA_EXFILTRATION].slice(
        0,
        timelineFilter
      ),
      backgroundColor: ["#2B4F81"],
    },
    {
      type: "bar",
      label: INSIDER_THREATS,
      data: AssignmentData.defaultReport.items[INSIDER_THREATS].slice(
        0,
        timelineFilter
      ),
      backgroundColor: ["#4981CE"],
    },
    {
      type: "bar",
      label: COMPROMISED_USERS,
      data: AssignmentData.defaultReport.items[COMPROMISED_USERS].slice(
        0,
        timelineFilter
      ),
      backgroundColor: ["#7EB6FF"],
    },
    {
      type: "bar",
      label: COMPROMISED_ENDPOINTS,
      data: AssignmentData.defaultReport.items[COMPROMISED_ENDPOINTS].slice(
        0,
        timelineFilter
      ),
      backgroundColor: ["#CAE1FF"],
    },
  ];

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const chartLabels = getTimeLineChartLabels();
    setTimeLineLabels(chartLabels);
    setChartData({
      labels: chartLabels,
      datasets: intitalDataSets.filter((dataset) => {
        const selectedRiskFilters = riskCategoryFilters.filter(
          (item) => item.selected
        );
        if (selectedRiskFilters.length == 0) {
          return true;
        }
        return selectedRiskFilters
          .map((item) => item.label)
          .includes(dataset.label);
      }),
    });
  }, [timelineFilter, riskCategoryFilters]);

  // labels logic based on filter
  const getTimeLineChartLabels = () => {
    const startDate = new Date(
      new Date().setDate(new Date().getDate() - (timelineFilter - 1))
    );
    const endDate = new Date();
    const tempLabels = [];
    while (
      (startDate.getMonth() == endDate.getMonth() &&
        startDate.getDate() <= endDate.getDate()) ||
      (startDate.getMonth() <= endDate.getMonth() && startDate < new Date())
    ) {
      tempLabels.push(`${startDate.getMonth() + 1}/${startDate.getDate()}`);
      startDate.setDate(startDate.getDate() + 1);
    }
    return tempLabels;
  };

  return (
    <>
      <div>TimeLine Details</div>
      <div>
        {chartData && (
          <Bar
            ref={chartRef}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "No. of Occurences",
                },
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
            data={chartData}
          />
        )}
      </div>
    </>
  );
};

export default TimeLineChart;
