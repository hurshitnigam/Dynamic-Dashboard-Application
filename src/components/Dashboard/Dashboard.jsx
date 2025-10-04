import { useState, useMemo } from 'react';
import Header from '../Header/Header';
import CategorySection from '../Category/CategorySection';
import AddWidgetModal from '../Modal/AddWidgetModal';
import useDashboardStore from '../../store/dashboardStore';
import { TABS } from '../../utils/constants';

const Dashboard = () => {
    // Zustand store
    const categories = useDashboardStore((state) => state.categories);
    const availableWidgets = useDashboardStore((state) => state.availableWidgets);
    const searchTerm = useDashboardStore((state) => state.searchTerm);
    const setSearchTerm = useDashboardStore((state) => state.setSearchTerm);
    const addCustomWidget = useDashboardStore((state) => state.addCustomWidget);
    const removeWidget = useDashboardStore((state) => state.removeWidget);
    const updateCategoryWidgets = useDashboardStore((state) => state.updateCategoryWidgets);
    const resetDashboard = useDashboardStore((state) => state.resetDashboard);
    const getCategoryWidgets = useDashboardStore((state) => state.getCategoryWidgets);

    // Local state for modal
    const [showAddWidget, setShowAddWidget] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [activeTab, setActiveTab] = useState(TABS.CSPM);
    const [selectedWidgets, setSelectedWidgets] = useState({});
    const [widgetsToRemove, setWidgetsToRemove] = useState(new Set());

    // Filter widgets based on search term
    const filteredDashboardData = useMemo(() => {
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
                )
            }))
            .filter((category) => category.widgets.length > 0);
    }, [categories, searchTerm]);

    const openAddWidget = (categoryId) => {
        setSelectedCategory(categoryId);
        setShowAddWidget(true);
        setWidgetsToRemove(new Set());

        // Set active tab based on category
        if (categoryId === 'cspm') setActiveTab(TABS.CSPM);
        else if (categoryId === 'cwpp') setActiveTab(TABS.CWPP);
        else if (categoryId === 'registry') setActiveTab(TABS.IMAGE);

        // Initialize selected widgets for available widgets
        const categoryWidgets = getCategoryWidgets(categoryId);
        const selected = {};

        availableWidgets[categoryId]?.forEach((w) => {
            const exists = categoryWidgets.some(
                (widget) => widget.name.toLowerCase() === w.name.toLowerCase() && !widget.isCustom
            );
            selected[w.id] = exists;
        });

        setSelectedWidgets(selected);
    };

    const handleAddCustomWidget = (widgetName, widgetText) => {
        if (!widgetName.trim() || !selectedCategory) return;
        addCustomWidget(selectedCategory, widgetName, widgetText);
    };

    const handleRemoveWidget = (categoryId, widgetId) => {
        removeWidget(categoryId, widgetId);
    };

    const toggleWidget = (widgetId, isCurrentWidget = false) => {
        if (isCurrentWidget) {
            setWidgetsToRemove((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(widgetId)) {
                    newSet.delete(widgetId);
                } else {
                    newSet.add(widgetId);
                }
                return newSet;
            });
        } else {
            setSelectedWidgets((prev) => ({
                ...prev,
                [widgetId]: !prev[widgetId]
            }));
        }
    };

    const confirmWidgets = () => {
        // Get widget IDs to add (newly selected)
        const widgetIdsToAdd = Object.keys(selectedWidgets).filter(
            (id) => selectedWidgets[id]
        );

        // Get widget IDs to remove (unchecked from current widgets)
        const widgetIdsToRemove = Array.from(widgetsToRemove);

        // Update category widgets using Zustand
        updateCategoryWidgets(selectedCategory, widgetIdsToAdd, widgetIdsToRemove);

        // Close modal and reset state
        setShowAddWidget(false);
        setSelectedWidgets({});
        setWidgetsToRemove(new Set());
    };

    const handleRefresh = () => {
        resetDashboard();
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    // Get current category widgets for the modal
    const getCurrentCategoryWidgets = () => {
        return getCategoryWidgets(selectedCategory);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                onAddWidget={() => openAddWidget('cspm')}
                onRefresh={handleRefresh}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />

            <div className="p-6">
                {filteredDashboardData.length > 0 ? (
                    filteredDashboardData.map((category) => (
                        <CategorySection
                            key={category.id}
                            category={category}
                            onRemoveWidget={handleRemoveWidget}
                            onAddWidget={openAddWidget}
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-2">🔍</div>
                        <p className="text-gray-500">No widgets found matching "{searchTerm}"</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>

            <AddWidgetModal
                isOpen={showAddWidget}
                onClose={() => {
                    setShowAddWidget(false);
                    setWidgetsToRemove(new Set());
                }}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                availableWidgets={availableWidgets}
                selectedWidgets={selectedWidgets}
                onToggleWidget={toggleWidget}
                onConfirm={confirmWidgets}
                onAddCustomWidget={handleAddCustomWidget}
                currentCategoryWidgets={getCurrentCategoryWidgets()}
            />
        </div>
    );
};

export default Dashboard;