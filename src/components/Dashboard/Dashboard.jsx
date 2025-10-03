import { useState } from 'react';
import Header from '../Header/Header';
import CategorySection from '../Category/CategorySection';
import AddWidgetModal from '../Modal/AddWidgetModal';
import dashboardConfig from '../../data/dashboardConfig.json';
import { TABS } from '../../utils/constants';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(dashboardConfig.categories);
    const [showAddWidget, setShowAddWidget] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [activeTab, setActiveTab] = useState(TABS.CSPM);
    const [selectedWidgets, setSelectedWidgets] = useState({});

    const openAddWidget = (categoryId) => {
        setSelectedCategory(categoryId);
        setShowAddWidget(true);

        // Set active tab based on category
        if (categoryId === 'cspm') setActiveTab(TABS.CSPM);
        else if (categoryId === 'cwpp') setActiveTab(TABS.CWPP);
        else if (categoryId === 'registry') setActiveTab(TABS.IMAGE);

        // Initialize selected widgets
        const category = dashboardData.find(c => c.id === categoryId);
        const selected = {};
        dashboardConfig.availableWidgets[categoryId]?.forEach(w => {
            const exists = category?.widgets.some(widget =>
                widget.name.toLowerCase().includes(w.name.toLowerCase())
            );
            selected[w.id] = exists;
        });
        setSelectedWidgets(selected);
    };

    const removeWidget = (categoryId, widgetId) => {
        setDashboardData(prev =>
            prev.map(cat =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        widgets: cat.widgets.filter(w => w.id !== widgetId)
                    }
                    : cat
            )
        );
    };

    const toggleWidget = (widgetId) => {
        setSelectedWidgets(prev => ({
            ...prev,
            [widgetId]: !prev[widgetId]
        }));
    };

    const confirmWidgets = () => {
        setShowAddWidget(false);
        // Here you can implement logic to add/remove widgets based on selection
        console.log('Selected widgets:', selectedWidgets);
    };

    const handleRefresh = () => {
        // Refresh dashboard data
        setDashboardData(dashboardConfig.categories);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                onAddWidget={() => openAddWidget('cspm')}
                onRefresh={handleRefresh}
            />

            <div className="p-6">
                {dashboardData.map(category => (
                    <CategorySection
                        key={category.id}
                        category={category}
                        onRemoveWidget={removeWidget}
                        onAddWidget={openAddWidget}
                    />
                ))}
            </div>

            <AddWidgetModal
                isOpen={showAddWidget}
                onClose={() => setShowAddWidget(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                availableWidgets={dashboardConfig.availableWidgets}
                selectedWidgets={selectedWidgets}
                onToggleWidget={toggleWidget}
                onConfirm={confirmWidgets}
            />
        </div>
    );
};

export default Dashboard;