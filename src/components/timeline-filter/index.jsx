import { Col, Row, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTimeLineFilter } from "../../store/slices/timelineFilter";
import { TIMELINE_FILTER_OPTIONS } from "../../utils/constants";

const TimeLineFilter = () => {
  const dispatch = useDispatch();
  const selectedTimeLineFilter = useSelector(
    (state) => state.timelineFilter.selectedFilter
  );
  const onTimeLineFilterChange = (data) => {
    console.log(data);
    dispatch(setSelectedTimeLineFilter(data));
  };
  return (
    <>
      <Row align="middle" justify="end">
        <Col>
          <h3>Timeline Filter</h3>
          <Select
            style={{ width: "300px" }}
            options={TIMELINE_FILTER_OPTIONS}
            onChange={onTimeLineFilterChange}
            value={selectedTimeLineFilter}
          ></Select>
        </Col>
      </Row>
    </>
  );
};

export default TimeLineFilter;
