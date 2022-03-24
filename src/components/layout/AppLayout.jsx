import { Checkbox, Col, Divider, Layout, Menu, Row } from "antd";

import React from "react";
import SubMenu from "antd/lib/menu/SubMenu";
import "./AppLayout.css";
import { Typography } from "antd";
import RiskCategorySummary from "../riskcategory-summary";
import RiskCategoryReport from "../riskcategory-report";
import TimeLineChart from "../timeline-chart";
import TimeLineFilter from "../timeline-filter";
import {
  checkedCategoryFilter,
  clearCategoryFilters,
} from "../../store/slices/riskCategory";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const AppLayout = () => {
  const riskCategoryFilters = useSelector(
    (state) => state.riskCategory.filters
  );
  const dispatch = useDispatch();

  return (
    <Layout>
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
              <a onClick={() => dispatch(clearCategoryFilters())}>Clear All</a>
            </span>
          </Col>
        </Row>
        <Menu mode="inline" defaultOpenKeys={["Risk Category"]}>
          <SubMenu key="Risk Category" title="Risk Category">
            {riskCategoryFilters.map((item, index) => (
              <Menu.Item key={index}>
                <Checkbox
                  onChange={(e) => {
                    dispatch(checkedCategoryFilter(e.target.value));
                  }}
                  value={item.value}
                  checked={item.selected}
                >
                  {item.label}
                </Checkbox>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <Row align="middle">
            <Col>
              <Title level={3} style={{ padding: "15px" }}>
                Risk Categories
              </Title>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <TimeLineFilter />
            <RiskCategoryReport />
            <Divider />
            <TimeLineChart />
            <Divider />
            <RiskCategorySummary />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
