/**
 * Utility functions for JSON configuration operations
 */

/**
 * Load dashboard configuration from JSON
 * @param {Object} config - The dashboard configuration object
 * @returns {Object} Parsed dashboard data
 */
export const loadDashboardConfig = (config) => {
  try {
    return {
      categories: config.categories || [],
      availableWidgets: config.availableWidgets || {},
    };
  } catch (error) {
    console.error("Error loading dashboard configuration:", error);
    return {
      categories: [],
      availableWidgets: {},
    };
  }
};

/**
 * Export current dashboard state to JSON
 * @param {Array} categories - Current dashboard categories
 * @returns {string} JSON string of the configuration
 */
export const exportDashboardConfig = (categories) => {
  const config = {
    categories: categories,
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(config, null, 2);
};

/**
 * Validate widget structure
 * @param {Object} widget - Widget object to validate
 * @returns {boolean} True if valid
 */
export const validateWidget = (widget) => {
  return (
    widget &&
    typeof widget.id === "string" &&
    typeof widget.name === "string" &&
    typeof widget.type === "string"
  );
};

/**
 * Filter widgets by search term
 * @param {Array} categories - Dashboard categories
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered categories
 */
export const filterWidgetsBySearch = (categories, searchTerm) => {
  if (!searchTerm.trim()) {
    return categories;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  return categories
    .map((category) => ({
      ...category,
      widgets: category.widgets.filter(
        (widget) =>
          widget.name.toLowerCase().includes(lowerSearchTerm) ||
          category.name.toLowerCase().includes(lowerSearchTerm)
      ),
    }))
    .filter((category) => category.widgets.length > 0);
};

/**
 * Get widget by ID from categories
 * @param {Array} categories - Dashboard categories
 * @param {string} widgetId - Widget ID to find
 * @returns {Object|null} Widget object or null
 */
export const getWidgetById = (categories, widgetId) => {
  for (const category of categories) {
    const widget = category.widgets.find((w) => w.id === widgetId);
    if (widget) {
      return { widget, categoryId: category.id };
    }
  }
  return null;
};

/**
 * Generate unique widget ID
 * @param {string} baseId - Base ID for the widget
 * @returns {string} Unique widget ID
 */
export const generateWidgetId = (baseId) => {
  return `${baseId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a custom widget object
 * @param {string} name - Widget name
 * @param {string} text - Widget text/description
 * @param {string} categoryId - Category ID where widget will be added
 * @returns {Object} Custom widget object
 */
export const createCustomWidget = (name, text, categoryId) => {
  return {
    id: generateWidgetId("custom"),
    name: name.trim(),
    type: "custom",
    text: text.trim() || "No additional information provided",
    isCustom: true,
    createdAt: new Date().toISOString(),
    categoryId,
  };
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
