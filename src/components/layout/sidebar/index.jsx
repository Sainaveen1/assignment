import { Checkbox, Col, Menu, Row } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import { RISK_CATEGORY_FILTERS } from "../../../utils/constants";

const Sidebar = () => {
  const [riskCategoryFilters, setRiskCategoryFilters] = useState(
    RISK_CATEGORY_FILTERS
  );
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      width="250"
      color="#fafbfd"
    >
      <div className="logo">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/0/03/Citrix_Systems_logo.svg"
          }
          width="100%"
          height="100%"
          alt=""
          srcSet=""
        />
      </div>
      <Row justify="space-between" style={{ padding: "10px 18px 10px 24px" }}>
        <Col>
          <span>Filters</span>
        </Col>
        <Col>
          <span className="link">
            <a>Clear All</a>
          </span>
        </Col>
      </Row>
      <Menu mode="inline">
        <SubMenu key="Risk Category" title="Risk Category">
          {riskCategoryFilters.map((item, index) => (
            <Menu.Item key={index}>
              <Checkbox>{item.label}</Checkbox>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
