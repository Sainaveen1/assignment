import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AssignmentData from "../../utils/assignment-data.json";

const RiskCategorySummary = () => {
  const riskCategoryFilters = useSelector(
    (state) => state.riskCategory.filters
  );
  const [tableData, setTableData] = useState();
  const columns = [
    {
      title: "Risk Category",
      dataIndex: "label",
      render: (text) => <a style={{ color: "#07a3ef" }}>{text}</a>,
    },
    {
      title: "Impact",
      dataIndex: "impact",
      sorter: {
        compare: (a, b) => a.impact - b.impact,
      },
      render: (text, record) => `${record.impact} %`,
    },
    {
      title: "Occurences",
      dataIndex: "occurences",
      sorter: {
        compare: (a, b) => a.occurences - b.occurences,
      },
    },
    {
      title: "High",
      dataIndex: "high",
      sorter: {
        compare: (a, b) => a.high - b.high,
      },
    },
    {
      title: "Medium",
      dataIndex: "medium",
      sorter: {
        compare: (a, b) => a.medium - b.medium,
      },
    },
    {
      title: "Low",
      dataIndex: "low",
      sorter: {
        compare: (a, b) => a.low - b.low,
      },
    },
  ];

  useEffect(() => {
    console.log(AssignmentData);
    const selectedRiskFilters = riskCategoryFilters.filter(
      (item) => item.selected
    );
    if (selectedRiskFilters.length === 0) {
      setTableData(AssignmentData.defaultReport.aggregated);
    } else {
      const data = AssignmentData.defaultReport.aggregated.filter((item) =>
        selectedRiskFilters.map((item) => item.label).includes(item.label)
      );
      setTableData(data);
    }
  }, [riskCategoryFilters]);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      rowKey={(record) => record.label}
    />
  );
};

export default RiskCategorySummary;
