import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dashboardConfig from "../data/dashboardConfig.json";
import { generateWidgetId } from "../utils/jsonUtils";

const useDashboardStore = create(
  persist(
    (set, get) => ({
      // Initial state
      categories: dashboardConfig.categories,
      availableWidgets: dashboardConfig.availableWidgets,
      searchTerm: "",

      // Actions

      /**
       * Add a custom widget to a category
       */
      addCustomWidget: (categoryId, widgetName, widgetText) => {
        const newWidget = {
          id: generateWidgetId("custom"),
          name: widgetName.trim(),
          type: "custom",
          text: widgetText.trim() || "No additional information provided",
          isCustom: true,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, widgets: [...cat.widgets, newWidget] }
              : cat
          ),
        }));
      },

      /**
       * Add predefined widgets to a category
       */
      addPredefinedWidgets: (categoryId, widgetIds) => {
        const { availableWidgets, categories } = get();
        const categoryAvailableWidgets = availableWidgets[categoryId] || [];

        const newWidgets = widgetIds
          .map((widgetId) => {
            const widgetTemplate = categoryAvailableWidgets.find(
              (w) => w.id === widgetId
            );
            if (!widgetTemplate) return null;

            return {
              id: generateWidgetId(widgetTemplate.id),
              name: widgetTemplate.name,
              type: widgetTemplate.type,
              chartType: widgetTemplate.chartType,
              data: widgetTemplate.defaultData,
              isCustom: false,
              createdAt: new Date().toISOString(),
            };
          })
          .filter(Boolean);

        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, widgets: [...cat.widgets, ...newWidgets] }
              : cat
          ),
        }));
      },

      /**
       * Remove a widget from a category
       */
      removeWidget: (categoryId, widgetId) => {
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  widgets: cat.widgets.filter((w) => w.id !== widgetId),
                }
              : cat
          ),
        }));
      },

      /**
       * Remove multiple widgets from a category
       */
      removeWidgets: (categoryId, widgetIds) => {
        const widgetIdsSet = new Set(widgetIds);

        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  widgets: cat.widgets.filter((w) => !widgetIdsSet.has(w.id)),
                }
              : cat
          ),
        }));
      },

      /**
       * Update widgets in a category (add and remove in one operation)
       */
      updateCategoryWidgets: (
        categoryId,
        widgetIdsToAdd,
        widgetIdsToRemove
      ) => {
        const { availableWidgets } = get();
        const categoryAvailableWidgets = availableWidgets[categoryId] || [];
        const widgetIdsToRemoveSet = new Set(widgetIdsToRemove);

        // Create new widgets from IDs
        const newWidgets = widgetIdsToAdd
          .map((widgetId) => {
            const widgetTemplate = categoryAvailableWidgets.find(
              (w) => w.id === widgetId
            );
            if (!widgetTemplate) return null;

            return {
              id: generateWidgetId(widgetTemplate.id),
              name: widgetTemplate.name,
              type: widgetTemplate.type,
              chartType: widgetTemplate.chartType,
              data: widgetTemplate.defaultData,
              isCustom: false,
              createdAt: new Date().toISOString(),
            };
          })
          .filter(Boolean);

        set((state) => ({
          categories: state.categories.map((cat) => {
            if (cat.id === categoryId) {
              // Remove widgets that are in the remove list
              const filteredWidgets = cat.widgets.filter(
                (w) => !widgetIdsToRemoveSet.has(w.id)
              );

              // Add new widgets
              return {
                ...cat,
                widgets: [...filteredWidgets, ...newWidgets],
              };
            }
            return cat;
          }),
        }));
      },

      /**
       * Set search term
       */
      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },

      /**
       * Get filtered categories based on search term
       */
      getFilteredCategories: () => {
        const { categories, searchTerm } = get();

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
      },

      /**
       * Get widgets for a specific category
       */
      getCategoryWidgets: (categoryId) => {
        const { categories } = get();
        const category = categories.find((cat) => cat.id === categoryId);
        return category?.widgets || [];
      },

      /**
       * Reset dashboard to initial state
       */
      resetDashboard: () => {
        set({
          categories: dashboardConfig.categories,
          searchTerm: "",
        });
      },

      /**
       * Clear all widgets from a category
       */
      clearCategory: (categoryId) => {
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, widgets: [] } : cat
          ),
        }));
      },

      /**
       * Get widget count for a category
       */
      getWidgetCount: (categoryId) => {
        const { categories } = get();
        const category = categories.find((cat) => cat.id === categoryId);
        return category?.widgets.length || 0;
      },

      /**
       * Check if a widget exists in a category
       */
      widgetExists: (categoryId, widgetName) => {
        const { categories } = get();
        const category = categories.find((cat) => cat.id === categoryId);
        return (
          category?.widgets.some(
            (w) => w.name.toLowerCase() === widgetName.toLowerCase()
          ) || false
        );
      },
    }),
    {
      name: "dashboard-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDashboardStore;
