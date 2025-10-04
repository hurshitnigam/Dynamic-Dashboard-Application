// Widget Types
export const WIDGET_TYPES = {
  DONUT: "donut",
  BAR: "bar",
  EMPTY: "empty",
};

// Category IDs
export const CATEGORIES = {
  CSPM: "cspm",
  CWPP: "cwpp",
  REGISTRY: "registry",
};

// Tab Names
export const TABS = {
  CSPM: "CSPM",
  CWPP: "CWPP",
  IMAGE: "Image",
  TICKET: "Ticket",
};

// Chart Colors
export const CHART_COLORS = {
  blue: "#3b82f6",
  red: "#ef4444",
  amber: "#f59e0b",
  green: "#10b981",
  orange: "#fb923c",
  gray: "#e5e7eb",
};

// Time Ranges
export const TIME_RANGES = [
  { value: "2d", label: "Last 2 days" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

// Search Configuration
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 2,
  PLACEHOLDER: "Search widgets...",
};

// Widget Chart Types
export const CHART_TYPES = {
  CLOUD_ACCOUNTS: "cloudAccounts",
  RISK_ASSESSMENT: "riskAssessment",
};
