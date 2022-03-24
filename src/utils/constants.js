export const DATA_EXFILTRATION = "Data Exfiltration";
export const INSIDER_THREATS = "Insider Threats";
export const COMPROMISED_USERS = "Compromised Users";
export const COMPROMISED_ENDPOINTS = "Compromised EndPoints";

export const LAST_1_DAY = 1;
export const LAST_1_WEEK = 7;
export const LAST_2_WEEKS = 14;
export const LAST_1_MONTH = 30;

export const TIMELINE_FILTER_OPTIONS = [
  {
    label: "Last 1 Day",
    value: LAST_1_DAY,
  },
  {
    label: "Last 1 Week",
    value: LAST_1_WEEK,
  },
  {
    label: "Last 2 Weeks",
    value: LAST_2_WEEKS,
  },
  {
    label: "Last 1 Month",
    value: LAST_1_MONTH,
  },
];

export const RISK_CATEGORY_FILTERS = [
  {
    label: DATA_EXFILTRATION,
    value: DATA_EXFILTRATION,
    selected: false,
  },
  {
    label: INSIDER_THREATS,
    value: INSIDER_THREATS,
    selected: false,
  },
  {
    label: COMPROMISED_USERS,
    value: COMPROMISED_USERS,
    selected: false,
  },
  {
    label: COMPROMISED_ENDPOINTS,
    value: COMPROMISED_ENDPOINTS,
    selected: false,
  },
];
